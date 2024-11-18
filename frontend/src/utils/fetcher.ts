interface IFetcher {
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
	body?: any;
	url?: string;
	// queryKey default dari react query, jadi fungsi di dalam react query
	// masih bisa digunakan tanpa melempar parameter di dalam fungsinya
	queryKey?: string[];
	apiVersion?: string;
}

// utils
import { urlUtils } from "@/Utils/url.utils";

export const DefaultFetcher = async (payload: IFetcher) => {
	try {
		// 2 optional jika payload url ada jika tidak ambil dari query keys
		let URL: string = "";

		if (payload.url) {
			// ini pilihan apabila tidak menggunakan queryKey untuk url atau params
			URL = payload.url;
		} else {
			// const queryKeys = payload.queryKey ?? [];
			// URL = new URLSearchParams(payload.body).toString();

			URL = urlUtils({
				query: payload.queryKey?.[1],
				urlApi: payload.queryKey?.[0] as string,
			});
		}

		// console.log({ URL });

		const OPTION: RequestInit = {
			method: payload.method,
			headers: {
				"Content-Type": "application/json",
				version: payload.apiVersion || "v1",
			},
			...(payload.body && { body: JSON.stringify(payload.body) }),
		};

		const response = await fetch(URL, OPTION);
		const result = await response.json();

		if (!response.ok) {
			Promise.reject(response);
		}

		return result;
	} catch (error) {
		Promise.reject(error);
	}
};
