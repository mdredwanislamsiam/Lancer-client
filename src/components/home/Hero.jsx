import React from 'react';
import heroBg from "../../assets/videos/Hero.mp4"; 
import { Link } from 'react-router';

const Hero = () => {
    return (
		<div>
			<div className="absolute w-full h-200 bg-black/70 flex justify-center items-center text-white  flex-col z-2">
				<h1 className="text-4xl text-center md:text-8xl font-bold p-2 m-2 md:p-5 md:m-5 drop-shadow-md drop-shadow-[#BBE1FA] font-newfont3">
					Connecting Brilliance.<br></br> Delivering Excellence.
				</h1>
				<div className="flex flex-col md:flex-row items-center gap-10">
					<Link to={"register"}>
						<button className="btn bg-linear-to-r from-[#114a99] hover:from-[#072e4c] hover:scale-105 text-lg md:text-2xl px-10 py-6 text-black border-0 shadow-sm transition-colors duration-300 mt-10">
							Get Lancers
						</button>
					</Link>
					<Link to={"register"}>
						<button className="btn bg-linear-to-l from-[#114a99] hover:from-[#072e4c] hover:scale-105 text-lg md:text-2xl px-10 py-6 text-black border-0 shadow-sm transition-colors duration-300 mt-10">
							Start Lancing
						</button>
					</Link>
				</div>
			</div>
			<video
				src={heroBg}
				autoPlay
				loop
				muted
				className="w-full h-200 object-cover drop-shadow-xl drop-shadow-black"></video>
		</div>
	);
};

export default Hero;