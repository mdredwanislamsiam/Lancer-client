import React from 'react';
import defImg from "../../../assets/images/DefaultImage.jpg";
import { Link } from 'react-router';
import LoadingSpinner from '../../common/LoadingSpinner';



const OrderComponent = ({ orders, loading, getTime, title }) => {
	// spinner
	if (loading) return <LoadingSpinner />;
	return (
		<div>
			<div className="mt-6 card bg-gradient-to-b to-[rgba(111,175,247,0.76)] shadow-sm">
				<div className="card-body">
					<h3 className="card-title text-lg lg:text-2xl">{title}</h3>
					<div className="overflow-x-auto max-h-100 overflow-y-auto">
						{!(orders?.length === 0) ?
							<table className="table text-xs lg:text-sm">
								<thead className="sticky bg-base-100 top-0  z-10">
									<tr>
										<th>Order ID</th>
										<th>Seller</th>
										<th>Buyer</th>
										<th>Status</th>
										<th>Date</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order.id}>
											<td># {order.id}</td>
											<td className="">
												<Link
													to={`/infoPage/${order.service.seller.id}`}
													className="flex gap-1 items-center">
													<img
														src={order?.service?.seller?.image || defImg}
														alt=""
														className="w-8 h-8 rounded-full object-cover"
													/>
													<span>{order.service.seller.username}</span>
												</Link>
											</td>
											<td className="">
												<Link
													to={`/infoPage/${order.buyer.id}`}
													className="flex gap-1 items-center">
													<img
														src={order?.buyer?.image || defImg}
														alt=""
														className="w-8 h-8 rounded-full object-cover"
													/>
													<span>{order.buyer.username}</span>
												</Link>
											</td>
											<td>
												<div
													className={`badge ${
														order.status === "Canceled" ? "badge-error"
														: order.status === "Delivered" ? "badge-success"
														: "bg-blue-500"
													} text-gray-100 w-fit h-fit`}>
													{order.status}
												</div>
											</td>
											<td>{getTime(order?.created_at)}</td>
											<td>${order.total_price}</td>
										</tr>
									))}
								</tbody>
							</table>
						:	<div className=" text-xl  mx-auto w-fit my-20">No {title}</div>}
					</div>
				</div>
			</div>
		</div>
	);
};;

export default OrderComponent;