interface IFetcher {
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
	body?: any;
	url?: string;
	queryKey?: string[];
}

export const DefaultFetcher = async (payload: IFetcher) => {
	try {
		// 2 optional jika payload url ada jika tidak ambil dari query keys
		let URL: string = "";

		if (payload.url) {
			URL = payload.url;
		} else {
			const queryKeys = payload.queryKey ?? [];
			URL = new URLSearchParams(payload.body).toString();
		}

		const OPTION: RequestInit = {
			method: payload.method,
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(URL, OPTION);
		if (!response.ok) {
			Promise.reject(response);
		}

		await response.json();
	} catch (error) {
		Promise.reject(error);
	}
};
