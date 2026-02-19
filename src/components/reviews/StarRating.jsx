import { FaStar } from "react-icons/fa";

const StarRating = ({ onChange, ratings }) => {
	return (
		<div className="flex gap-1 mt-1 items-center lg:gap-2 bg-gray-200 rounded-2xl px-5 py-1 w-fit shadow-lg">
			{[...Array(5)].map((_, i) => {
				const value = i + 1;
				return (
					<FaStar
						key={value}
						size={20}
						onClick={() => onChange(value)}
						className={`cursor-pointer transition-colors w-4 lg:w-8 ${value <= ratings ? "text-yellow-500" : "text-gray-400"} duration-200 hover:text-yellow-500`}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
