import React from 'react';
import defImg from "../../assets/images/DefaultImage.jpg";
import { Link } from 'react-router';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';

const ReviewCardHome = ({review}) => {

    return (
		<div className=''>
			<div className="card-body shadow-xl rounded-xl h-full ">
				<div className="mt-4 bg-base-200 py-5 text-center px-10 rounded-lg drop-shadow-xl  text-black">
					<div className="leading-relaxed whitespace-pre-line break-words flex gap-1">
						<span>
							<FaQuoteLeft size={20} color={"gray"} />
						</span>
						<span>{review?.comment}</span>
						<span className="flex items-end">
							<FaQuoteRight size={20} color={"gray"} />
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2 bg-gray-300 shadow-xl rounded-2xl px-5 py-1 my-5 w-fit mx-auto">
					<div className="flex text-yellow-400">
						{[...Array(5)].map((_, i) => (
							<FaStar
								key={i}
								size={20}
								className={i < review?.ratings ? "text-yellow-700" : "text-white"}
							/>
						))}
					</div>
				</div>
				<Link
					to={`/infoPage/${review?.user?.id}`}
					className="flex flex-col justify-center items-center cursor-pointer w-fit mx-auto">
					<img src={review?.user?.image || defImg} alt="" className="w-10 h-10 rounded-full shadow-sm" />
					<p className="font-semibold text-lg">{review?.user?.username}</p>
				</Link>
			</div>
		</div>
	);
};

export default ReviewCardHome;