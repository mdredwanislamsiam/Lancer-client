import React, { useEffect, useState } from "react";
import authAPIClient from "../../services/auth-api-client";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			setLoading(true);
			try {
				const response = await authAPIClient.get("/orders/");
				setOrders(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	if (loading)
		return (
			<div className="flex justify-center items-center my-20">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
	return (
		<div className="mt-6 card bg-base-100 shadow-sm">
			<div className="card-body">
				<h3 className="card-title text-lg">Recent Orders</h3>
				<div className="overflow-x-auto">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer</th>
								<th>Status</th>
								<th>Date</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td># {order.id}</td>
									<td>{order.user}</td>
									<td>
										<div className={`badge ${order.status === "Canceled" ? "badge-error" : order.status === "Delivered" ? "badge-success" : "bg-blue-500"} text-gray-100`}>{order.status}</div>
									</td>
									<td>{order.created_at}</td>
									<td>{order.total_price}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Order;
