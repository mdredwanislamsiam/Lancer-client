import React from 'react';

const PopularServices = () => {
    return (
		<div>
			<h1 className="text-5xl font-bold text-[#1f4864] drop-shadow-sm drop-shadow-[#194562] mb-10">
				Popular Services
			</h1>
			<div className="card bg-base-100 w-72 shadow-sm">
				<figure className="">
					<img
						src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
						alt="Shoes"
						className=""
					/>
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Card Title</h2>
					<p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
					<div className="card-actions">
						<button className="btn bg-[#3282B8] hover:bg-[#226795] hover:scale-105">Hire Service</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularServices;