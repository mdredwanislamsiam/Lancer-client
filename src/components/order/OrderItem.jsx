import React from 'react';

import defaultImg from "../../assets/images/DefaultImage.jpg"

const OrderItem = ({ item }) => {
	const getTime = () => {
		const createdTime = new Date(item.created_at);

		const day = createdTime.getDate();
		const month = createdTime.toLocaleString("en-US", { month: "long" });
		const year = createdTime.getFullYear();

		return `${day} ${month}, ${year}`;
	};
	return (
		<div>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-gray-100 last:border-0  transition-colors duration-200">
				<div className="flex items-center gap-4 flex-1">
					{/* Placeholder for product image if available in the future */}
					<div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
						<span className="text-xs">IMG</span>
					</div>
					<div>
						<h4 className="font-semibold text-gray-800">{item.service.title}</h4>
					</div>
				</div>
				<div className="flex justify-center items-center gap-3">
					<h1 className="font-semibold">{item.service.seller.username}</h1>
					<img
						src={item.service.seller.image ? item.service.seller.image : defaultImg}
						alt="seller profile image"
						className="w-8 h-8 rounded-full drop-shadow-xl"
					/>
				</div>
			</div>
			<div className="px-4 pt-2">
				<p className="font-semibold text-sm flex gap-3">
					<span>Ordered At:</span>
					<span className='text-gray-600'>{getTime()}</span>
				</p>
			</div>
		</div>
	);
};

export default OrderItem;