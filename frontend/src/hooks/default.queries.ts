import { DefaultFetcher } from "@/utils/fetcher";

export const defaultQuery = (params: any) => ({
	queryFn: async (payload: any) =>
		DefaultFetcher({
			...payload,
			url: params?.url,
			method: "GET",
		}),
});
