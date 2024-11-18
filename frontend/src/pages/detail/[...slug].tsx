import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// utils
import { ssrWrapper } from "@/Utils/ssrWrapper";
import { GetServerSideProps } from "next";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// type
import { IDataDetail } from "@/types/IData.type";

// hook
import { usePut } from "@/hooks/index";

const Page: React.FC = () => {
	const router = useRouter();
	const { slug = [] } = router.query;
	const queryClient = useQueryClient();

	const {
		data: dataDetail,
		refetch,
		isLoading,
	} = useQuery<IDataDetail>({
		queryKey: [
			`/todo/${slug?.[0]}`,
			{
				// key: "",
			},
			"v1",
		],
	});

	const mutation = usePut<{
		name?: string;
		completed: boolean | undefined;
		content: string | undefined;
		id?: string | undefined;
	}>({
		config: {
			mutationKey: [`/todo/${slug?.[0] as any}`, "", "v1"],

			onError: async (error: any) => {
				console.log(error);
			},

			onSuccess: async (res: any) => {
				if (res.status === 200) {
					queryClient.invalidateQueries({
						queryKey: [
							"/todo",
							{
								page: 1,
								limit: 10,
							},
							"v1",
						],
					});
					refetch();
					router.push("/");
				}
			},
		},
	});

	const [val, setVal] = useState<{
		edit: boolean;
		check?: boolean;
		content?: string;
	}>({
		edit: false,
		check: dataDetail?.data?.completed,
		content: dataDetail?.data?.content,
	});

	useEffect(() => {
		setVal((old) => ({
			...old,
			check: dataDetail?.data?.completed,
			content: dataDetail?.data?.content,
		}));
	}, [dataDetail]);

	return (
		<>
			<div
				className={`flex min-h-screen flex-col p-4 content-center gap-4 overflow-auto text-black`}
				style={{
					maxWidth: "500px",
					maxHeight: "90vh",
					position: "relative",
					left: "40%",
				}}
			>
				<button
					className="rounded-md"
					type="button"
					style={{ background: "pink", maxWidth: "20%" }}
					onClick={() => router.back()}
				>
					back
				</button>
				{isLoading ? (
					<div>...loading</div>
				) : (
					<section
						className="p-4 rounded-md flex-col gap-4 flex"
						style={{
							background: "pink",
						}}
					>
						<h2 className="text-bold">
							<strong>{dataDetail?.data?.name} </strong>
						</h2>
						<textarea
							onChange={(e: any) =>
								setVal(() => ({ ...val, content: e.target.value }))
							}
							value={val.content}
							placeholder="Content Name"
							disabled={!val.edit}
						/>
						<input
							title="checkbox"
							className="self-start"
							type="checkbox"
							id="completed"
							name="completed"
							disabled={!val.edit}
							checked={val.check}
							onChange={(e: any) =>
								setVal((dt: any) => ({ ...val, check: !dt.check }))
							}
						/>

						<div className="self-end ">
							{!val.edit ? (
								<button
									className={` rounded-sm ${
										!val.edit ? "bg-white" : "bg-blue-500 text-white"
									} px-4`}
									type="button"
									onClick={() =>
										setVal((dt: any) => ({ ...val, edit: !dt.edit }))
									}
								>
									edit
								</button>
							) : (
								<>
									<button
										className={`rounded-sm bg-white px-4 mr-2`}
										type="button"
										onClick={() =>
											setVal((dt: any) => ({ ...val, edit: !dt.edit }))
										}
									>
										cancel
									</button>
									<button
										className={`self-end rounded-sm bg-blue-500 text-white px-4`}
										type="submit"
										onClick={(e: any) => {
											e.preventDefault();
											mutation.mutate({
												completed: val?.check,
												content: val?.content,
											});
										}}
									>
										Submit
									</button>
								</>
							)}
						</div>
					</section>
				)}
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = ssrWrapper(
	async (context: any) => {
		const { queryClient, query } = context;
		// for query Key berisi url, maupun params sebagai api
		const KEY = [
			`/todo/${query.key?.[0]}`,
			{
				// key: "",
			},
			"v1",
		];

		await queryClient.prefetchQuery({ queryKey: KEY });
		// Store the query key in the queryClient

		return { props: { test: "detail" } };
	}
);

export default Page;
