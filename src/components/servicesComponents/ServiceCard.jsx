import React from 'react';
import default_img from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';

const ServiceCard = ({ service }) => {
	if (!service) return null;
    return (
		<div>
			<div className="card bg-linear-to-b from-[#011e53e3] to-[#dfd6b958] hover:to-[#f5e3d2]  max-w-40 transition-all duration-700  lg:max-w-66 md:w-96 shadow-sm mx-auto h-full">
				<figure className="">
					<img
						src={service.images?.length > 0 ? service.images[0].images : default_img}
						alt="Shoes"
						className="object-cover"
					/>
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title text-sm lg:text-lg">{service.title}</h2>
					<p className="text-lg lg:text-xl font-semibold text-[#3282B8]">${service.price}</p>
					<p className="italic text-gray-700 text-xs lg:text-sm">{service.description}</p>
					<div className="card-actions mt-3">
						<div className="card-actions mt-3">
							<Link to={`/services/${service.id}`} className="">
								<button className="px-6 py-2 lg:px-10 lg:py-3 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-sm">
									Hire Service
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;