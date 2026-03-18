import React, { useEffect } from "react";
import ServiceCard from "../servicesComponents/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router";
import useServiceContext from "../../hooks/useServiceContext";

/* ─── Skeleton slide ─────────────────────────────────────────────── */
const SkeletonCard = () => (
	<div className="bg-white border border-[#e4e4e4] rounded-xl overflow-hidden animate-pulse">
		<div className="h-44 bg-[#f0f0f0]" />
		<div className="p-5 space-y-3">
			<div className="flex items-center gap-2">
				<div className="w-7 h-7 rounded-full bg-[#e8e8e8]" />
				<div className="h-3 w-24 bg-[#ebebeb] rounded" />
			</div>
			<div className="h-4 w-4/5 bg-[#ebebeb] rounded" />
			<div className="h-3 w-3/5 bg-[#f2f2f2] rounded" />
			<div className="flex justify-between items-center pt-2">
				<div className="h-5 w-16 bg-[#e0eaee] rounded" />
				<div className="h-3 w-10 bg-[#f0f0f0] rounded" />
			</div>
		</div>
	</div>
);

/* ─── Arrow button for swiper nav ────────────────────────────────── */
const NavArrow = ({ dir, id }) => (
	<button
		id={id}
		aria-label={dir === "prev" ? "Previous" : "Next"}
		className="group w-10 h-10 rounded-full border border-[#d8d8d8] bg-white hover:border-[#306073] hover:bg-[#306073] flex items-center justify-center transition-all duration-250 shadow-sm flex-shrink-0">
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className="w-4 h-4 text-[#0d0d0d] group-hover:text-white transition-colors duration-250"
			style={{ transform: dir === "prev" ? "scaleX(-1)" : "none" }}>
			<path d="M3 8h10M9 4l4 4-4 4" />
		</svg>
	</button>
);

/* ─── Main component ─────────────────────────────────────────────── */
const PopularServices = () => {
	const { services, fetchServices, loading } = useServiceContext();

	useEffect(() => {
		fetchServices();
	}, []);

	const prevId = "ps-prev";
	const nextId = "ps-next";

	return (
		<section className="py-4">
			{/* top bar: label left, controls right */}
			<div className="flex items-center justify-between px-1 mb-8">
				<div className="flex items-center gap-3">
					<span className="w-px h-5 bg-[#306073]" />
					<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#306073]">
						Hand-picked for you
					</span>
				</div>

				<div className="flex items-center gap-3">
					<NavArrow dir="prev" id={prevId} />
					<NavArrow dir="next" id={nextId} />
					<Link to="services">
						<button className="flex items-center gap-2 border border-[#0d0d0d] px-5 py-2 text-xs font-semibold tracking-widest uppercase text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all duration-250">
							View All
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

			{/* ── Loading skeletons ── */}
			{loading && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{[...Array(3)].map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			)}

			{/* ── Swiper ── */}
			{!loading && services?.length > 0 && (
				<Swiper
					slidesPerView={1}
					spaceBetween={20}
					autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
					pagination={{ clickable: true, dynamicBullets: true }}
					navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1536: { slidesPerView: 4 },
					}}
					modules={[Autoplay, Pagination, Navigation]}
					className="!pb-10"
					style={{
						"--swiper-pagination-color": "#306073",
						"--swiper-pagination-bullet-inactive-color": "#c8d8dc",
						"--swiper-pagination-bullet-inactive-opacity": "1",
					}}>
					{services.map((service) => (
						<SwiperSlide key={service.id}>
							{/* thin teal top border on each slide card */}
							<div className="relative rounded-xl overflow-hidden hover:border-[#306073] hover:shadow-[0_4px_20px_rgba(48,96,115,0.10)] transition-all duration-300 group">
								<div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#306073] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />
								<ServiceCard service={service} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}

			{/* ── Empty state ── */}
			{!loading && (!services || services.length === 0) && (
				<div className="flex flex-col items-center justify-center py-20 gap-4">
					<div className="w-14 h-14 rounded-full border-2 border-dashed border-[#ccd8dc] flex items-center justify-center">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="#306073"
							strokeWidth="1.5"
							className="w-6 h-6 opacity-50">
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" />
						</svg>
					</div>
					<p className="text-sm font-semibold tracking-widest uppercase text-[#888]">No services available</p>
					<p className="text-xs text-[#aaa]">Check back soon — new services are added regularly.</p>
				</div>
			)}
		</section>
	);
};

export default PopularServices;
