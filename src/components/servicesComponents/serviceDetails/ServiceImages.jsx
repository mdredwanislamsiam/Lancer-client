import React, { useState } from 'react';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import defaultImg from "../../../assets/images/DefaultImage.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ServiceImages = ({images = [], serviceName}) => {
    const [thumbsSwiper] = useState(null);
	const displayImages = (images.length > 0) ? images : [{ images: defaultImg }];
	console.log(images)
    
    return (
		<div className="rounded-lg shadow-2xl  overflow-hidden">
			<Swiper
				modules={[Autoplay, Navigation, Thumbs]}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
				className="product-main-slider">
				{displayImages.map((imageObj, index) => (
					<SwiperSlide key={index}>
						<img src={imageObj.images} alt={serviceName} className="h-full w-full object-fill" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ServiceImages;