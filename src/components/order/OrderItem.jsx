import React from 'react';

import defaultImg from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';
import { BiCalendar, BiUser } from 'react-icons/bi';
import { HiCalendarDateRange } from 'react-icons/hi2';

const OrderItem = ({ item }) => {
	const getTime = () => {
		const createdTime = new Date(item.created_at);
		// console.log(item); 
		const day = createdTime.getDate();
		const month = createdTime.toLocaleString("en-US", { month: "long" });
		const year = createdTime.getFullYear();

		return `${day} ${month}, ${year}`;
	};

	const size = window.innerWidth < 640 ? 15 : 30;
	return (
		<div>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 lg:p-4 border-gray-100 last:border-0  transition-colors duration-200 gap-5">
				<Link
					to={`/services/${item.service.id}`}
					className="flex items-center gap-4 flex-1 hover:scale-102 transition-all duration-300 ">
					<div className="w-12 h-8 lg:w-20 lg:h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
						<img src={item.service?.images[0]?.image || defaultImg} alt="" className="object-fill" />
					</div>
					<div>
						<h1 className="text-xs lg:text-sm font-semibold text-gray-400">SERVICE</h1>
						<h4 className="font-bold text-xs lg:text-sm text-gray-800">{item.service.title}</h4>
					</div>
				</Link>
				<div className="flex gap-5">
					<div>
						<label htmlFor="" className="label font-semibold text-center px-3 text-xs lg:text-sm">
							<BiUser />
							<span>Seller</span>
						</label>
						<Link
							to={`/infoPage/${item.service.seller.id}`}
							className="flex justify-center items-center gap-3 bg-white rounded-xl hover:scale-102 transition-all duration-300  hover:shadow-lg text-xs lg:text-sm px-3 py-1 w-fit">
							<img
								src={item.service.seller.image ? item.service.seller.image : defaultImg}
								alt="seller profile image"
								className="w-5 h-5 lg:w-8 lg:h-8 rounded-full drop-shadow-xl"
							/>
							<h1 className="font-semibold text-xs lg:text-sm">{item.service.seller.username}</h1>
						</Link>
					</div>
					<div>
						<label htmlFor="" className="label font-semibold text-center text-xs lg:text-sm px-3">
							<BiUser />
							<span>Buyer</span>
						</label>
						<Link
							to={`/infoPage/${item.buyer.id}`}
							className="flex justify-center items-center gap-3 bg-white rounded-xl hover:scale-102 transition-all duration-300  hover:shadow-lg text-xs lg:text-sm px-3 py-1 w-fit">
							<img
								src={item.service.seller.image ? item.buyer.image : defaultImg}
								alt="seller profile image"
								className="w-5 h-5 lg:w-8 lg:h-8 rounded-full drop-shadow-xl"
							/>
							<h1 className="font-semibold text-xs lg:text-sm">{item.buyer.username}</h1>
						</Link>
					</div>
				</div>
			</div>
			<div className="px-4 pt-2">
				<p className="font-semibold  flex items-center gap-3">
					<BiCalendar size={size} className='w-8 lg:w-10' />
					<span className="text-xs lg:text-sm">Ordered At:</span>
					<span className="text-gray-600 text-xs lg:text-sm">{getTime()}</span>
				</p>
			</div>
		</div>
	);
};

export default OrderItem;