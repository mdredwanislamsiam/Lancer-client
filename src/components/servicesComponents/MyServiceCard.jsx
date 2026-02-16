import React from 'react';
import default_img from "../../assets/images/DefaultImage.jpg";
import { Link } from 'react-router';
import useService from '../../hooks/useService';

const MyServiceCard = ({ service, onDelete}) => {
	const { deleteService } = useService(); 
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this service?")) {
			await deleteService(service.id); 
			if (onDelete) onDelete(service.id); 
		}
	};
    return (
		<div className="card bg-gradient-to-br flex flex-col justify-between items-center from-[#e5eef3] to-[#155e85a7] w-72 shadow-sm mx-auto h-full">
			<figure className="">
				<img
					src={service.images?.length > 0 ? service.images[0].images : default_img}
					alt="Shoes"
					className="object-cover"
				/>
			</figure>
			<div className="flex flex-col justify-between items-center text-center  my-4 gap-1 mx-4">
				<h2 className="card-title text-center">{service.title}</h2>
				<p className="text-xl font-semibold text-[#3282B8]">${service.price}</p>
				<p className="italic text-gray-700">{service.description}</p>
				<div className="mt-3 flex justify-between gap-2">
					<Link to={`/dashboard/services/update/${service.id}`}>
						<button className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] ">Edit Service</button>
					</Link>
					<button onClick={() => handleDelete(service.id)} className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] ">Delete Service</button>
				</div>
			</div>
		</div>
	);
};

export default MyServiceCard;