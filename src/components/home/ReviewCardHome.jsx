import React from 'react';
import defImg from "../../assets/images/DefaultImage.jpg";
import { Link } from 'react-router';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import useAuthContext from '../../hooks/useAuthContext';

const ReviewCardHome = ({review}) => {
	const { user } = useAuthContext(); 
	// console.log(review); 
    return (
		<div className="card-body shadow-xl  font-newfont1 rounded-xl h-full bg-base-300 mx-5 ">
			<div className="mt-4 bg-base-200 py-5 text-center px-3 rounded-lg drop-shadow-xl  text-black">
				<div className="leading-relaxed whitespace-pre-line break-words flex gap-1">
					<span>
						<FaQuoteLeft size={20} color={"gray"} className="w-4 lg:w-8" />
					</span>
					<span className="text-[12px] lg:text-md">{review?.comment}</span>
					<span className="flex items-end">
						<FaQuoteRight size={20} color={"gray"} className="w-4 lg:w-8" />
					</span>
				</div>
			</div>
			<div className='text-center my-2 pb-5 text-lg font-bold text-gray-600 font-newfont2 border-b-3 border-gray-400 lg:text-xl'>
				{review?.service}
			</div>
			<div className="flex items-center gap-2 bg-gray-300 shadow-xl rounded-2xl px-5 py-1 w-fit mx-auto">
				<div className="flex text-yellow-400">
					{[...Array(5)].map((_, i) => (
						<FaStar
							key={i}
							size={20}
							className={i < review?.ratings ? "text-yellow-700 w-4 lg:w-8" : "text-white"}
						/>
					))}
				</div>
			</div>
			<Link
				to={user ? `/infoPage/${review?.user?.id}` : `/login`}
				className="flex flex-col justify-center items-center cursor-pointer w-fit mx-auto">
				<img src={review?.user?.image || defImg} alt="" className="w-8 h-8 lg:w-14 lg:h-14 rounded-full shadow-sm" />
				<p className="font-semibold text-sm lg:text-lg">{review?.user?.username}</p>
			</Link>
		</div>
	);
};

export default ReviewCardHome;