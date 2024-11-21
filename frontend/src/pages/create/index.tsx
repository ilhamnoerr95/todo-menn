import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { usePost } from "@/hooks/index";

const Index = () => {
	const formref = useRef<any>();
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = usePost<{
		name?: string;
		completed: boolean | undefined;
		content: string | undefined;
	}>({
		config: {
			mutationKey: [`/todo`, "", "v1"],

			onSuccess: (res: any) => {
				if (res.status === 200) {
					toast.success("Created Success!", {
						position: "top-center",
					});

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
					router.push("/");
				} else {
					console.log(res);
					toast.error("Something Went Wrong!", {
						position: "top-center",
					});
				}
			},
			onError: () => {
				toast.error("Something went wrong", {
					position: "top-center",
				});
			},
		},
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			name: formref.current[0].value,
			content: formref.current[1].value,
			completed: formref.current[2].checked,
		};

		mutation.mutate(data);
		// Send data to your server here
		console.log(data);
	};
	console.log("render");
	return (
		<>
			<div
				className={`flex min-h-screen flex-col p-4 content-center gap-4 overflow-auto text-black`}
				style={{
					maxWidth: "500px",
					maxHeight: "90vh",
					position: "relative",
					left: "40%",
					textAlign: "center",
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
				<div style={{ backgroundColor: "pink", padding: "1rem" }}>
					<h4>Create something</h4>
				</div>
				<form
					className="flex flex-col gap-4"
					ref={formref}
					onSubmit={onSubmit}
				>
					<input
						type="text"
						title="name"
						placeholder="Title"
						style={{ border: "1px solid black" }}
					/>
					<textarea
						placeholder="Content"
						title="content"
						style={{ border: "1px solid black" }}
					/>
					<input
						title="checkbox"
						className="self-start"
						type="checkbox"
						id="completed"
						name="completed"
					/>
					<button
						type="submit"
						style={{
							width: "30%",
							textAlign: "center",
							border: "1px solid black",
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Index;
