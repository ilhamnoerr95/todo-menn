import { Inter } from "next/font/google";
import { List } from "antd";
import dynamic from "next/dynamic";

// component
const Card = dynamic(() => import("@/components/atom/card"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
	const data = [
		{
			title: "Title 1",
		},
		{
			title: "Title 2",
		},
		{
			title: "Title 3",
		},
		{
			title: "Title 4",
		},
		{
			title: "Title 5",
		},
		{
			title: "Title 6",
		},
	];

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
					<Card
						title="a"
						content="bera"
					/>
					<Card
						title="a"
						content="bera"
					/>
					<Card
						title="a"
						content="bera"
					/>
					<Card
						title="a"
						content="bera"
					/>
					<Card
						title="a"
						content="bera"
					/>
					<Card
						title="a"
						content="bera"
					/>
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

export default Index;
