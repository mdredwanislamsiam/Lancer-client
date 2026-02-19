import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import PopularServices from '../components/home/PopularServices';
import Milestones from '../components/home/Milestones';
import MoneyBack from '../components/home/MoneyBack';
import ReviewsOfClients from '../components/home/ReviewsOfClients';

const Home = () => {
    return (
		<div className="bg-linear-to-t from-[#c0e3f9] ">
			<Hero />
			<h1 className="text-2xl lg:text-5xl my-5 lg:my-20 mt-20 lg:mt-40 font-bold text-[#1f4864] drop-shadow-sm text-center drop-shadow-[#194562] mb-10">
				Trending Categories
			</h1>
			<div className="max-w-7xl mx-auto my-5 lg:my-20 mt-10 lg:mt-40">
				<CategoryCards />
			</div>
			<h1 className="text-2xl lg:text-5xl my-5 lg:my-20 mt-20 lg:mt-40 font-bold text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Popular Services
			</h1>
			<div className="max-w-7xl mx-auto my-5 lg:my-20">
				<PopularServices />
			</div>
			<h1 className="text-2xl lg:text-5xl my-5 lg:my-20 mt-20 lg:mt-40 font-bold text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Our Promises
			</h1>
			<div className="max-w-7xl mx-auto my-5 lg:my-20">
				<Milestones />
			</div>
			<div className="max-w-7xl mx-auto my-5 lg:my-20">
				<MoneyBack />
			</div>
			<h1 className="text-2xl lg:text-5xl my-5 lg:my-20 mt-20 lg:mt-40 font-bold text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Service Reviews
			</h1>
			<div className="max-w-7xl mx-auto py-20">
				<ReviewsOfClients />
			</div>
		</div>
	);
};

export default Home;