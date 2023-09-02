import { useEffect, useState } from 'react';

const MAX_REQUEST_DURATION_MS = 5000;
const ERROR_STATUS_CODE = 500;

interface FetchProps {
	endpoint: string;
	headers?: HeadersInit;
}

const API_URL = "https://mern-api-zzah.onrender.com";

export function useFetch<T>(props: FetchProps) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any>(null);
	const [statusCode, setStatusCode] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const controller = new AbortController();
	const timeOutId = setTimeout(() => controller.abort(), MAX_REQUEST_DURATION_MS);

	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch(`${API_URL}${props.endpoint}`, {
					method: 'get',
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
                setStatusCode(ERROR_STATUS_CODE);
			} finally {
                setIsLoading(false);
			}
		})();
	}, [props.endpoint]);

	return { data, error, statusCode, isLoading };
}
