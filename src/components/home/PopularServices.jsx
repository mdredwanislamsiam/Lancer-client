import React, { useEffect } from 'react';
import ServiceCard from '../servicesComponents/ServiceCard';
import useService from '../../hooks/useService';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router';
import LoadingSpinner from '../common/LoadingSpinner';

const PopularServices = () => {
	const { services, fetchServices, loading} = useService();
	useEffect(() => {
		fetchServices();
	}, [])

	if (!services) return; 

	return (
		<section className="py-10 ">
			<div className="flex flex-col md:flex-row justify-between items-center px-10 md:px-20 mb-5">
				<Link to={"services"} className="mx-auto">
					<button className="btn bg-linear-to-l from-[#114a99] to-[#fbdfdf] hover:from-[#072e4c]">
						View All
					</button>
				</Link>
			</div>
			{/* Loading Spinner */}
			{loading && (
				<LoadingSpinner /> 
			)}

			{/*Product Slider*/}
			{!loading && services.length > 0 && (
				<Swiper
					effect={"coverflow"}
					slidesPerView={1}
					spaceBetween={10}
					coverflowEffect={{
						rotate: 0,
						stretch: 10,
						depth: 300,
						modifier: 1,
						slideShadows: false,
					}}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					// navigation={true}
					breakpoints={{
						640: { slidesPerView: 1 },
						1024: { slidesPerView: 3 },
						2056: { slidesPerView: 5 },
					}}
					className="mt-10 px-4 container"
					modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}>
					{services.map((service) => (
						<SwiperSlide key={service.id}>
							<ServiceCard service={service} />
						</SwiperSlide>
					))}
				</Swiper>
			)}

			{!loading && services.length === 0 && (
				<div>
					<p className="text-pink-600 font-bold text-xl lg:text-4xl text-center my-10">Not Available</p>
				</div>
			)}
		</section>
	);
};

export default PopularServices;