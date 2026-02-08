import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import PopularServices from '../components/home/PopularServices';
import Milestones from '../components/home/Milestones';
import MoneyBack from '../components/home/MoneyBack';
import MadeBy from '../components/home/MadeBy';

const Home = () => {
    return (
		<div className="">
			<Hero />
			<div className="container mx-auto mt-40 my-20">
				<CategoryCards />
			</div>
			<div className="container mx-auto my-20">
				<PopularServices />
			</div>
			<div className="container mx-auto my-20">
				<Milestones />
			</div>
			<div className="container mx-auto my-20">
				<MoneyBack />
			</div>
			<div className="container mx-auto my-20">
				<MadeBy />
			</div>
		</div>
	);
};

export default Home;