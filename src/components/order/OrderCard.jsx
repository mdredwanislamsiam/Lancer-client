import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import authAPIClient from "../../services/auth-api-client";
import OrderItem from "./OrderItem";

const OrderCard = ({ order, cancelOrder }) => {
	const { user } = useAuthContext();
	const [status, setStatus] = useState(order.status);
	const [loading, setLoading] = useState(false);

	// console.log(order); 

	// const handleStatusChange = async (event) => {
	// 	const newStatus = event.target.value;
	// 	try {
	// 		const response = await authAPIClient.patch(`/orders/${order.id}/update_status/`, { status: newStatus });
	// 		if (response.status === 200) {
	// 			setStatus(newStatus);
	// 			alert(response.data.status);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const handlePayment = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await authAPIClient.post("/payment/initiate", {
	// 			amount: order.total_price,
	// 			orderId: order.id,
	// 			numItems: order.items?.length,
	// 		});
	// 		console.log(response);
	// 		if (response.data.payment_url) {
	// 			setLoading(false);
	// 			window.location.href = response.data.payment_url;
	// 		} else {
	// 			alert("payment failed!");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	if (!order) return; 
	return (
		<div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
			<div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h2 className="text-lg font-bold">Order #{order.id}</h2>
					<p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
				</div>
				{/* <div className="flex gap-2 items-center">
					{user.is_staff ?
						<select
							className="px-2 py-1 rounded-full text-white text-sm font-medium h-fit bg-gray-500 outline-none"
							value={status}
							onChange={handleStatusChange}>
							<option value="Not paid"> Not Paid</option>
							<option value="Ready to ship"> Ready To Ship</option>
							<option value="Shipped"> Shipped</option>
							<option value="Delivered"> Delivered</option>
							<option value="Canceled"> Canceled</option>
						</select>
					:	<span
							className={`px-3 py-1 rounded-full text-white text-sm font-medium h-fit ${
								order.status === "Not paid" ? "bg-red-500" : "bg-green-500"
							}`}>
							{order.status}
						</span>
					}
					{order.status !== "Deliverd" && order.status !== "Canceled" && !user.is_staff && (
						<button
							onClick={() => cancelOrder(order.id)}
							className="text-red-700 hover:underline btn btn-ghost rounded-full">
							Cancel
						</button>
					)}
				</div> */}
			</div>
			<div className="p-6">
				<h3 className="font-medium text-lg mb-4">Order Items</h3>
				{/* Order Items Table  */}
				<OrderItem item={order}/>
			</div>
			<div className="border-t p-6 flex flex-col items-end">
				<div className="space-y-2 w-full max-w-[200]">
					<div className="flex justify-between">
						<span>Subtotal:</span>
						<span>${parseFloat(order.total_price).toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping:</span>
						<span>$0.00</span>
					</div>
					<div className="flex justify-between font-bold border-t pt-2">
						<span>Total:</span>
						<span>${parseFloat(order.total_price).toFixed(2)}</span>
					</div>
				</div>
				{/* {order.status === "Not paid" && !user.is_staff && (
					<button
						onClick={handlePayment}
						className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" disabled ={loading}>
						{loading ? "Processing..." : "Pay Now"}
					</button>
				)} */}
			</div>
		</div>
	);
};

export default OrderCard;
