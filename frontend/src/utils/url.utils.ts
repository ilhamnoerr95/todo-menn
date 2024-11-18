interface IUrlPayload {
	urlApi: string;
	query: any;
	id?: string | undefined;
}

export const urlUtils = (payload: IUrlPayload) => {
	const { urlApi, query, id } = payload;

	const params = query ? `?${new URLSearchParams({ ...(query as any) })}` : "";
	console.log("params", params);
	// idString digunakan apbila urlApi tidak memiliki id
	// url Api diambil dari queryKey array[0]
	const idString = id ? `/${id}` : "";

	const url = `${process.env.NEXT_PUBLIC_ROOT_FE}/api${urlApi}${idString}${params}`;

	return url;
};
