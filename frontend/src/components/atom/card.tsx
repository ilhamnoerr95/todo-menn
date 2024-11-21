import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { useDelete } from "@/hooks/index";

interface Card {
	title?: string;
	content?: string;
	id?: string;
	completed?: boolean;
	key?: number;
	refetch: () => void;
}

const Card: React.FC<Card> = (props) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { title, content, id, completed, key } = props;
	const cardClick = (id: string | undefined) => {
		router.push({ pathname: `/detail/${id}` });
	};

	const mutation = useDelete({
		config: {
			mutationKey: [`/todo/${id}`, "", "v1"],

			onSuccess: (res: any) => {
				if (res.status === 200) {
					console.log(res);
					toast.success("Deleted Success!", {
						position: "top-center",
					});

					props.refetch();

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

	const deleteButton = () => {
		mutation.mutate();
	};

	return (
		<>
			<div
				key={key}
				className="card"
				onClick={() => cardClick(id)}
			>
				<div className="card-content">
					<p className="card-title">{title}</p>
					<span className="flex gap-2">
						{/* <input
							type="radio"
							disabled
							checked={completed && completed}
							name="content"
							title="content"
						/> */}
						<p className={`card-text ${completed ? "completed" : ""}`}>
							{content}
						</p>
					</span>
				</div>
				<button
					onClick={deleteButton}
					type="button"
					title="btnDelete"
					className="text-black bg-red-200 font-bold"
				>
					Delete
				</button>
			</div>

			<style>
				{`
//                 input[type=radio] {
//   border: 1px solid #000;
//   padding: 1px 0.6em;
//   -webkit-appearance: none;
// }

// input[type=radio]:focus {
//   outline-color: transparent;
// }
  
        .card {
            cursor:pointer;
            background-color: #FFFFFF;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(88, 0, 0, 0.1);
            padding: 20px;
            margin: 10px;
            position: relative;
            max-width: 450px;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: row;
            
        }
        .card::before {
            content: '';
            position: absolute;
            top: 20px;
            left: -10px;
            width: 20px;
            height: 20px;
            background-color: #580000;
            border-radius: 50%;
            box-shadow: 0 0 0 5px #FFFFFF;
        }
        .card::after {
            content: '';
            position: absolute;
            top: 30px;
            left: 0;
            width: 3px;
            height: calc(100% - 50px);
            background-color: #580000;
        }
        .card-content {
            position: relative;
            z-index: 1;
            width: 100%;
            
        }
        .card-title {
            color: #580000;
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .card-text {
            color: #1A1A1A;
            line-height: 1.6;
        }

        .completed {
        text-decoration: line-through;
        } 
      

                    `}
			</style>
		</>
	);
};

export default Card;
