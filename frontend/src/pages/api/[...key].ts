import type { NextApiRequest, NextApiResponse } from "next";

const API_BE = {
	v1: process.env.NEXT_API_TODO,
};

const validMethod: string[] = ["GET", "PUT", "POST", "DELETE", "PATCH"];

type TApiVersion = "v1";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, body, headers, method } = req;
	// for url parameter api
	const { key } = query;
	try {
		// OPTIONS
		const options: RequestInit = {
			method: method,
			headers: {
				// key: process.env.NEXT_API_KEY!,
				version: headers?.version as TApiVersion,
				"content-type": "application/json",
				// device: process.env.NEXT_API_DEVICE!,
				// ...(authorization &&
				// 	authorization !== "no_auth" && {
				// 		Authorization: authorization,
				// 	}),
			},
			...(method !== "GET" && { body: JSON.stringify(body) }),
		};

		// delete key = this dynamic route
		delete query.key;

		// create params
		const params = query
			? new URLSearchParams(query as { [key: string]: string })
			: null;

		// FULLY URL
		const URL = `${API_BE[headers?.version as TApiVersion]}/${(
			key as string[]
		).join("/")}?${params}`;

		const response = await fetch(URL, options);
		const result = await response.json();

		const status = response.status;

		// if (!response.ok) {
		// 	res.status(status).json(result);
		// }

		res.status(status).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
}
