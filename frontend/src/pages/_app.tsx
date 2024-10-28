import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { useEffect } from "react";

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

	return <Component {...pageProps} />;
}
