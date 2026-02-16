import React from 'react';

import defaultImg from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';

const OrderItem = ({ item }) => {
	const getTime = () => {
		const createdTime = new Date(item.created_at);
		console.log(item); 
		const day = createdTime.getDate();
		const month = createdTime.toLocaleString("en-US", { month: "long" });
		const year = createdTime.getFullYear();

		return `${day} ${month}, ${year}`;
	};
	return (
		<div>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-gray-100 last:border-0  transition-colors duration-200 gap-5">
				<Link to={`/services/${item.service.id}`} className="flex items-center gap-4 flex-1">
					{/* Placeholder for product image if available in the future */}
					<div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
						<img src={item.service?.images[0]?.image || defaultImg} alt="" className="object-fill" />
					</div>
					<div>
						<h4 className="font-semibold text-gray-800">{item.service.title}</h4>
					</div>
				</Link>
				<div>
					<label htmlFor="" className="label font-semibold text-center text-sm">
						Seller
					</label>
					<Link
						to={`/infoPage/${item.service.seller.id}`}
						className="flex justify-center items-center gap-3 rounded-xl  hover:shadow-lg px-3 py-1">
						<h1 className="font-semibold">{item.service.seller.username}</h1>
						<img
							src={item.service.seller.image ? item.service.seller.image : defaultImg}
							alt="seller profile image"
							className="w-8 h-8 rounded-full drop-shadow-xl"
						/>
					</Link>
				</div>
				<div>
					<label htmlFor="" className="label font-semibold text-center text-sm">
						Buyer
					</label>
					<Link
						to={`/infoPage/${item.buyer.id}`}
						className="flex justify-center items-center gap-3 rounded-xl  hover:shadow-lg px-3 py-1">
						<h1 className="font-semibold">{item.buyer.username}</h1>
						<img
							src={item.service.seller.image ? item.buyer.image : defaultImg}
							alt="seller profile image"
							className="w-8 h-8 rounded-full drop-shadow-xl"
						/>
					</Link>
				</div>
			</div>
			<div className="px-4 pt-2">
				<p className="font-semibold text-sm flex gap-3">
					<span>Ordered At:</span>
					<span className="text-gray-600">{getTime()}</span>
				</p>
			</div>
		</div>
	);
};

export default OrderItem;