import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import "antd/dist/reset.css"; // Ant Design versi 5
// import { useEffect } from "react";
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	QueryErrorResetBoundary,
	useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ErrorBoundary } from "react-error-boundary";

// template component
import FallbackComponent from "@/components/template/fallbackComponent";
import Custom404 from "@/pages/404";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
	const { dehydratedState, test, ...restProp } = pageProps;
	console.log("pageprops:", pageProps);
	//   useEffect(() => {
	// 		/**
	// 		 * resgister this service worker in app because of
	// 		 * want to access to the full website - all asset, page etc
	// 		 */
	// 		if ('serviceWorker' in navigator) {
	// 			navigator.serviceWorker
	// 				.register('/sw.ts', { scope: '/' })
	// 				.then((registration) => console.log('scope is:', registration.scope))
	// 				.catch((error) => {
	//           console.error('Service Worker registration failed:', error);
	//         });
	// 		}
	// 	}, []);

	// NEVER DO THIS:
	// const queryClient = new QueryClient()
	//
	// Creating the queryClient at the file root level makes the cache shared
	// between all requests and means _all_ data gets passed to _all_ users.
	// Besides being bad for performance, this also leaks any sensitive data.

	// Instead do this, which ensures each request has its own cache:
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
						retry: 0,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{/* fungsi dari hydration yaitu menampilkan data secepatnya dari server ke client
				hyrate bekerja apabila sebagai preload/re render dalam menampilkan data terlebih dahulu sebelum html atau js
				saat menggunakan hydrate untuk ssr di mana kita bisa invoke setiap useQuery hook kedalam nest komponent yg lebih efektif
				dan disaat pemanggilan query di client, maka klien tidak perlu lagi untuk fetching ulang data yg sudah terhydrate sebelumnya
			*/}
			<HydrationBoundary state={dehydratedState}>
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary
							onReset={reset}
							FallbackComponent={FallbackComponent}
						>
							<Component {...restProp} />
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
			</HydrationBoundary>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}
