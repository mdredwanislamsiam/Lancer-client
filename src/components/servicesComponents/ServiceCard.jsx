import React from 'react';
import default_img from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';

const ServiceCard = ({ service }) => {
	if (!service) return null;
    return (
		<div>
			<Link to={`/services/${service.id}`} className=''>
				<div className="card bg-gradient-to-br from-[#e5eef3] to-[#155e85a7] max-w-66 md:w-96 shadow-sm mx-auto h-full">
					<figure className="">
						<img
							src={service.images?.length > 0 ? service.images[0].images : default_img}
							alt="Shoes"
							className="object-cover"
						/>
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">{service.title}</h2>
						<p className="text-xl font-semibold text-[#3282B8]">${service.price}</p>
						<p className="italic text-gray-700">{service.description}</p>
						<div className="card-actions mt-3">
							<button className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] ">Hire Service</button>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ServiceCard;