import { useEffect, useState } from 'react';

const MAX_REQUEST_DURATION_MS = process.env.MAX_REQUEST_DURATION_M!;
const ERROR_STATUS_CODE = process.env.ERROR_STATUS_CODE!;

interface FetchProps<U> {
	endpoint: string;
	headers?: HeadersInit;
    body: U,
}

//const API_URL = "https://mern-api-zzah.onrender.com";
const API_URL = process.env.API_URL!;

export function usePost<U, T>(props: FetchProps<U>) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any>(null);
	const [statusCode, setStatusCode] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const controller = new AbortController();
	const timeOutId = setTimeout(() => controller.abort(), Number(MAX_REQUEST_DURATION_MS));

	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch(`${API_URL}${props.endpoint}`, {
					method: 'post',
                    body: JSON.stringify(props.body),
					headers: props.headers,
					signal: controller.signal,
				});

				clearTimeout(timeOutId);

				if (resp.ok) {
					const json: T = await resp.json();
					setData(json);
				}

				setStatusCode(resp.status);
			} catch (error) {
                controller.abort();
				setError(error);
                setStatusCode(Number(ERROR_STATUS_CODE));
			} finally {
                setIsLoading(false);
			}
		})();
	}, [props.endpoint]);

	return { data, error, statusCode, isLoading };
}
