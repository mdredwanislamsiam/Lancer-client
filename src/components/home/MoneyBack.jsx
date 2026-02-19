import React from 'react';
import moneyBack from "../../assets/videos/MoneyBack.mp4"

const MoneyBack = () => {
    return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gradient-to-br from-[#1B262C] to-[#236589] p-5 rounded-xl mx-10 lg:mx-0">
			<div className="flex flex-col justify-between">
				<div>
					<h1 className="text-[#3390c2] text-xl lg:text-3xl font-bold">Lancer</h1>
					<p className="text-[#3390c2] text-sm lg:text-xl pr-5 pt-5">
						you can bring your vision to life risk-free. Every project with vetted Pro freelancers is backed
						by our money-back guarantee, so you can accomplish any high-stakes project with total
						confidence.
					</p>
				</div>
				<button className="btn border-0 shadow-xl mt-5 bg-linear-to-l from-[#114a99] hover:from-[#072e4c] hover:scale-105 btn-xs lg:btn-lg w-fit">
					Join Us
				</button>
			</div>
			<div>
				<video
					src={moneyBack}
					autoPlay
					muted
					loop
					className="w-full rounded-2xl drop-shadow-xl drop-shadow-[#113244]"></video>
			</div>
		</div>
	);
};

export default MoneyBack;