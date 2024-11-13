import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { defaultQuery } from "@/hooks/default.queries";

export const ssrWrapper = (ssr: (payload: any) => any, url?: string) => {
	return async (context: GetServerSidePropsContext) => {
		const { req, res, query } = context;

		// default queries in ssr Wrapper
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: defaultQuery({ url }),
			},
		});

		// clear cache in ssr agar memory tidak leaks
		queryClient.clear();

		// ssr callback yg mereturn si callbacnya dan parameter callback ini adalah
		// value dari utils ini sendiri
		const additional = await ssr({ test: "ss", queryClient, ...context });

		return {
			props: {
				query,
				...additional?.props,
				dehydratedState: dehydrate(queryClient),
			},
		};
	};
};
