import React from "react";
import default_img from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const ServiceCard = ({ service }) => {
	const { user } = useAuthContext();
	if (!service) return null;

	const image = service.images?.length > 0 ? service.images[0].images : default_img;
	const sellerImage = service.seller?.image || default_img;

	return (
		<div className="group bg-[#30373f] flex flex-col h-full overflow-hidden rounded-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
			{/* ── Thumbnail ── */}
			<div className="relative overflow-hidden aspect-[4/3] bg-[#f0f0f0]">
				<img
					src={image}
					alt={service.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{/* price badge — top-right */}
				<div className="absolute top-3 right-3 bg-[#0d0d0d] text-white text-xs font-bold px-3 py-1 tracking-wide">
					${service.price}
				</div>

				{/* category tag — top-left, if present */}
				{service.category?.name && (
					<div className="absolute top-3 left-3 bg-[#306073]/90 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
						{service.category.name}
					</div>
				)}
			</div>

			{/* ── Body ── */}
			<div className="flex flex-col flex-1 p-5">
				{/* title */}
				<h2 className="text-[#e3e3e3] font-bold text-sm lg:text-base leading-snug line-clamp-2 mb-3 tracking-tight">
					{service.title}
				</h2>

				{/* description */}
				<p className="text-[#b0b0b0] text-xs leading-relaxed line-clamp-2 mb-4">{service.description}</p>

				{/* spacer pushes footer down */}
				<div className="flex-1" />

				{/* ── Footer row ── */}
				<div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
					{/* seller */}
					<Link
						to={user ? `/infoPage/${service.seller?.id}` : `/login`}
						className="flex items-center gap-2 group/seller min-w-0">
						<img
							src={sellerImage}
							alt={service.seller?.username}
							className="w-7 h-7 rounded-full object-cover border border-[#e4e4e4] flex-shrink-0"
						/>
						<span className="text-xs font-semibold text-[#ffffff] truncate group-hover/seller:text-[#306073] transition-colors duration-200">
							{service.seller?.username}
						</span>
					</Link>

					{/* hire button */}
					<Link to={`/services/${service.id}`}>
						<button className="flex items-center gap-1.5 bg-[#306073] hover:bg-[#1d4a59] text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 transition-colors duration-250 flex-shrink-0">
							Hire
							<svg
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="w-3 h-3">
								<path d="M3 8h10M9 4l4 4-4 4" />
							</svg>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
