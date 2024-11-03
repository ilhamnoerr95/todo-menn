import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import "antd/dist/reset.css"; // Ant Design versi 5
// import { useEffect } from "react";
import {
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

export default function App({ Component, pageProps }: AppProps) {
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
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary
						onReset={reset}
						FallbackComponent={FallbackComponent}
					>
						<Component {...pageProps} />
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}
