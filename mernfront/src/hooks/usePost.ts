import { useRef } from 'react';

const MAX_REQUEST_DURATION_MS = process.env.MAX_REQUEST_DURATION_MS!;
const ERROR_STATUS_CODE = process.env.ERROR_STATUS_CODE!;

interface FetchProps {
	endpoint: string;
	headers?: HeadersInit;
}

//const API_URL = "https://mern-api-zzah.onrender.com";
const API_URL = process.env.API_URL!;

export function usePost<U, T>(props: FetchProps) {
	const data = useRef<T | null>(null);
	const error = useRef<any>(null);
	const statusCode = useRef<number | null>(null);
	const isLoading = useRef(true);

	const PostData = async (body: U) => {
		const controller = new AbortController();
		const timeOutId = setTimeout(() => controller.abort(), Number(MAX_REQUEST_DURATION_MS));

		try {
			const resp = await fetch(`${API_URL}${props.endpoint}`, {
				method: 'post',
				body: JSON.stringify(body),
				headers: {
					...props.headers ?? {},
					'Content-Type': 'application/json',
				},
				signal: controller.signal,
			});

			clearTimeout(timeOutId);
			statusCode.current = resp.status;
		} catch (err) {
			controller.abort();
			error.current = err;
			statusCode.current = Number(ERROR_STATUS_CODE);
		} finally {
			isLoading.current = false;
		}
	};

	return { PostData, data, error, statusCode, isLoading };
}
