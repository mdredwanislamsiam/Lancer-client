import React from "react";
import default_img from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import { BiUser } from "react-icons/bi";
import useAuthContext from "../../hooks/useAuthContext";

const ServiceCard = ({ service }) => {
	const { user } = useAuthContext(); 
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
					<div className="flex">
						<label htmlFor="" className="label font-semibold text-center px-5 text-xs lg:text-sm">
							<BiUser className="w-5 h-5" />
							<span>Seller</span>
						</label>
						<Link
							to={user ? `/infoPage/${service.seller.id}` : `/login`}
							className="flex justify-center items-center gap-3 rounded-xl hover:scale-102 transition-all duration-300  hover:shadow-lg text-xs lg:text-sm px-3 py-1 w-fit">
							<img
								src={service.seller.image ? service.seller.image : default_img}
								alt="seller profile image"
								className="w-5 h-5 lg:w-8 lg:h-8 rounded-full drop-shadow-xl"
							/>
							<h1 className="font-semibold text-xs lg:text-sm">{service.seller.username}</h1>
						</Link>
					</div>
					<p className="text-lg lg:text-xl font-bold text-shadow-lg text-[#145f91]">${service.price}</p>
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
