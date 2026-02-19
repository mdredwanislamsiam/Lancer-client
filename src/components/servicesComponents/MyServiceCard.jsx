import default_img from "../../assets/images/DefaultImage.jpg";
import { Link } from 'react-router';
import useServiceContext from '../../hooks/useServiceContext';

const MyServiceCard = ({ service, onDelete}) => {
	const { deleteService } = useServiceContext(); 
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this service?")) {
			await deleteService(service.id); 
			if (onDelete) onDelete(service.id); 
		}
	};
    return (
		<div className="card flex flex-col justify-between items-center bg-linear-to-b from-[#011e53e3] to-[#dfd6b958] hover:to-[#f5e3d2] transition-colors max-w-40 lg:max-w-66 md:w-96 shadow-sm mx-auto h-full">
			<figure className="">
				<img
					src={service.images?.length > 0 ? service.images[0].images : default_img}
					alt="Shoes"
					className="object-cover"
				/>
			</figure>
			<div className="flex flex-col justify-between items-center text-center  my-4 gap-1 mx-4">
				<h2 className="card-title text-center text-sm lg:text-lg">{service.title}</h2>
				<p className="text-lg lg:text-xl font-semibold text-[#3282B8]">${service.price}</p>
				<p className="italic text-gray-700 text-xs lg:text-sm">{service.description}</p>
				<div className="mt-3 flex flex-col items-center lg:flex-row justify-between gap-2">
					<Link to={`/dashboard/services/update/${service.id}`}>
						<button className="px-4 py-2 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-md">
							Edit Service
						</button>
					</Link>
					<button
						onClick={() => handleDelete(service.id)}
						className="px-4 py-2 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-md">
						Delete Service
					</button>
				</div>
			</div>
		</div>
	);
};

export default MyServiceCard;