import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import PopularServices from '../components/home/PopularServices';
import Milestones from '../components/home/Milestones';
import MoneyBack from '../components/home/MoneyBack';
import ReviewsOfClients from '../components/home/ReviewsOfClients';

const Home = () => {
    return (
		<div className="">
			<Hero />
			<h1 className="text-5xl my-20 mt-40 font-bold text-[#1f4864] drop-shadow-sm text-center drop-shadow-[#194562] mb-10">
				Trending Categories
			</h1>
			<div className="container mx-auto mt-40 my-20">
				<CategoryCards />
			</div>
			<h1 className="text-5xl font-bold mt-40 text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Popular Services
			</h1>
			<div className="container mx-auto my-20">
				<PopularServices />
			</div>
			<h1 className="text-5xl font-bold mt-40 text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Our Promises
			</h1>
			<div className="container mx-auto my-20">
				<Milestones />
			</div>
			<div className="container mx-auto my-20">
				<MoneyBack />
			</div>
			<h1 className="text-5xl font-bold mt-40 text-[#1f4864] text-center drop-shadow-sm drop-shadow-[#194562] mb-10">
				Service Reviews
			</h1>
			<div className="container mx-auto my-20">
				<ReviewsOfClients />
			</div>
		</div>
	);
};

export default Home;