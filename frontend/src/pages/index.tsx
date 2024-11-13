import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

// utils
import { ssrWrapper } from "@/Utils/ssrWrapper";
import { GetServerSideProps } from "next";
import { useQuery } from "@tanstack/react-query";

// component
const Card = dynamic(() => import("@/components/atom/card"), { ssr: false });

// type
import { IDataTodo } from "@/types/IData.type";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
	const { data: dataTodo } = useQuery<IDataTodo>({
		queryKey: [
			"/todo",
			{
				page: 1,
				limit: 10,
			},
			"v1",
		],
	});

	console.log(dataTodo?.data);
	return (
		<>
			<main
				className={`flex min-h-screen flex-col p-4 content-center gap-4${inter.className} overflow-auto`}
				style={{
					maxWidth: "500px",
					maxHeight: "90vh",
					position: "relative",
					left: "40%",
				}}
			>
				<div className="text-center mb-4 title">MY TODO LIST</div>
				<div className="grid gap-4">
					{dataTodo?.data?.map((data: any, key: number) => (
						<Card
							id={data?._id}
							key={key}
							title={data?.name}
							content={data?.content}
							completed={data?.completed}
						/>
					))}
				</div>
			</main>
			<style>
				{`
            .title {
              color: #580000;
              background-color: #fff;
            	box-shadow: 0 4px 15px rgba(88, 0, 0, 0.1);
              border-radius: 5px;
            }
          `}
			</style>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = ssrWrapper(
	async (context: any) => {
		const { queryClient } = context;
		// for query Key berisi url, maupun params sebagai api
		const KEY = [
			"/todo",
			{
				page: 1,
				limit: 10,
			},
			"v1",
		];

		await queryClient.prefetchQuery({ queryKey: KEY });

		return {
			props: {
				test: "uye",
			},
		};
	}
	// "/api/test"
);

export default Index;
