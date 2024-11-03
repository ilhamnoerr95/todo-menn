import React from "react";

interface Card {
	title?: string;
	content?: string;
}

const Card: React.FC<Card> = (props) => {
	const { title, content } = props;
	return (
		<>
			<div className="card">
				<div className="card-content">
					<p className="card-title">{title}</p>
					<span className="flex gap-2">
						<input
							type="radio"
							disabled
							name="content"
							title="content"
						/>
						<p className="card-text">{content}</p>
					</span>
				</div>
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
            background-color: #FFFFFF;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(88, 0, 0, 0.1);
            padding: 20px;
            margin: 10px;
            position: relative;
            max-width: 450px;
            transition: all 0.3s ease;
            
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

                    `}
			</style>
		</>
	);
};

export default Card;
