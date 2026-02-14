import React from 'react';
import heroBg from "../../assets/videos/Hero.mp4"; 

const Hero = () => {
    return (
		<div>
			<div className="absolute w-full h-200 bg-black/70 flex justify-center items-center text-white  flex-col z-2">
				<h1 className="text-4xl md:text-7xl font-bold p-2 m-2 md:p-5 md:m-5 drop-shadow-md drop-shadow-[#BBE1FA]">
					Connecting Brilliance, Delivering Excellence
				</h1>
				<div className='flex flex-col md:flex-row gap-10'>
					<button className="btn bg-[#3282B8] hover:bg-[#226795] hover:scale-105 text-2xl px-10 py-6 text-black border-0 shadow-sm transition-colors duration-300 mt-10">
						Get Lancers
					</button>
					<button className="btn bg-[#3282B8] hover:bg-[#226795] hover:scale-105 text-2xl px-10 py-6 text-black border-0 shadow-sm transition-colors duration-300 mt-10">
						Start Lancing
					</button>
				</div>
			</div>
			<video src={heroBg} autoPlay loop muted className="w-full h-200 object-cover drop-shadow-xl drop-shadow-black"></video>
            
		</div>
	);
};

export default Hero;