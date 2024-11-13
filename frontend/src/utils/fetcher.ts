interface IFetcher {
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
	body?: any;
	url?: string;
	// queryKey default dari react query, jadi fungsi di dalam react query
	// masih bisa digunakan tanpa melempar parameter di dalam fungsinya
	queryKey?: string[];
}

export const DefaultFetcher = async (payload: IFetcher) => {
	try {
		console.log("ini default fetcher", payload);
		// 2 optional jika payload url ada jika tidak ambil dari query keys
		let URL: string = "";

		if (payload.url) {
			// ini pilihan apabila tidak menggunakan queryKey untuk url atau params
			URL = payload.url;
		} else {
			// const queryKeys = payload.queryKey ?? [];
			// URL = new URLSearchParams(payload.body).toString();
			const params = payload.queryKey?.[1]
				? `?${new URLSearchParams({ ...(payload.queryKey?.[1] as any) })}`
				: "";

			URL = `${process.env.NEXT_PUBLIC_ROOT_FE}/api${payload.queryKey?.[0]}${params}`;
		}

		console.log({ URL, env: process.env.NEXT_PUBLIC_ROOT_FE });

		const OPTION: RequestInit = {
			method: payload.method,
			headers: {
				"Content-Type": "application/json",
				version: payload.queryKey?.[2] || "v1",
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
