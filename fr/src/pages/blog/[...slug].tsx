import { useRouter } from "next/router";
import React from "react";

const Page: React.FC<{ params: { slug: string | number } }> = ({ params }) => {
	const router = useRouter();
	const { slug = [] } = router.query;
	// Tipekan 'params' sebagai array string atau undefined
	const segments = Array.isArray(slug) ? slug : [];

	for (let index in slug as any) {
		let idx = Number(index);
		console.log(index + ": " + slug[idx]);
	}

	// Membuat URL parameter baru dengan menggabungkan segmen
	const newUrlParam = segments.join("/");

	console.log("segment:", newUrlParam);

	return <div>Dynamic routes: {router.query.slug}</div>;
};

export default Page;
