import { DefaultFetcher } from "@/utils/fetcher";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// utils
import { urlUtils } from "@/Utils/url.utils";

interface IPayloHook {
	config?: any;
}

export const usePut = <
	TVariables = void,
	TData = unknown,
	TError = { status?: number; message?: any },
	TContext = unknown
>(
	payload: IPayloHook
): UseMutationResult<TData, TError, TVariables, TContext> => {
	const { config } = payload;

	const hookMutation = useMutation<TData, TError, TVariables, TContext>({
		...config,
		mutationFn: async (param: any) =>
			DefaultFetcher({
				url: urlUtils({
					query: config.mutationKey[1],
					urlApi: config.mutationKey[0],
				}),
				method: "PATCH",
				apiVersion: config.mutationKey[2] || "v1",
				body: param,
			}),
	});

	return hookMutation;
};
