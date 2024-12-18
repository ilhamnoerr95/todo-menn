import { useRouter } from "next/router";
import { Card, List } from "antd";

export default function Home() {
	const router = useRouter();

	const onTest = () => {
		router.push("/blog/123/44");
		console.log("klik");
	};

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
			<button
				type="button"
				onClick={() => onTest()}
			>
				Home
			</button>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 3,
				}}
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<Card title={item.title}>Card content</Card>
					</List.Item>
				)}
			/>
		</>
	);
}
