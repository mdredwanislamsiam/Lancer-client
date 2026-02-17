import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import authAPIClient from "../../services/auth-api-client";
import OrderItem from "./OrderItem";
import { FiAlertCircle } from "react-icons/fi";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import useOrder from "../../hooks/useOrder";

const OrderCard = ({ order }) => {
	const { user } = useAuthContext();
	const [status, setStatus] = useState(order.status);
	const [loading, setLoading] = useState(false);
	const { cancelOrder } = useOrder(); 


	const size = 20; 
	const statusConfig = {
		"Not paid": {
			color: "bg-red-100 text-red-700 border-red-200",
			icon: <FiAlertCircle size={size} />,
			label: "Unpaid",
		},
		Paid: {
			color: "bg-blue-100 text-blue-700 border-blue-200",
			icon: <BiCheckCircle size={size} />,
			label: "Paid",
		},
		Delivered: {
			color: "bg-emerald-100 text-emerald-700 border-emerald-200",
			icon: <BiCheckCircle size={size} />,
			label: "Delivered",
		},
		Canceled: {
			color: "bg-slate-100 text-slate-600 border-slate-200",
			icon: <BiXCircle size={size} />,
			label: "Canceled",
		},
		Active: {
			color: "bg-orange-100 text-orange-700 border-orange-200",
			icon: <CiLock size={size} />,
			label: "Active",
		},
	};

	// console.log(order);
	const handleCancelOrder = async (orderId) => {
		const status = await cancelOrder(orderId); 
		if (status === 200) {
			setStatus("Canceled"); 
		} 
	}
	

	const handleStatusChange = async (event) => {
		const newStatus = event.target.value;
		try {
			const response = await authAPIClient.patch(`/orders/${order.id}/update_status/`, { status: newStatus });
			if (response.status === 200) {
				setStatus(newStatus);
				alert(response.data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handlePayment = async () => {
		setLoading(true);
		try {
			const response = await authAPIClient.post("/payment/initiate/", {
				amount: order.total_price,
				orderId: order.id,
			});
			console.log(response);
			if (response.data.payment_url) {
				setLoading(false);
				window.location.href = response.data.payment_url;
			} else {
				alert("payment failed!");
			}
		} catch (error) {
			console.log(error);
		}
	};


	



	if (!order) return; 
	return (
		<div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
			<div className="bg-gradient-to-t to-[#3a61a4d4] from-[#dfd5b284] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex justify-between items-baseline gap-2">
					<div>
						<h2 className="text-lg font-bold text-[#fbfbfb]">Order </h2>
					</div>
					<div>
						<h2 className="text-md font-semibold text-[#032c42]"> {order.id}</h2>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					{user.is_staff ?
						<select
							className="px-2 py-1 rounded-full text-gray-700 text-sm font-medium h-fit bg-gray-300 outline-none"
							value={status}
							onChange={handleStatusChange}>
							<option value="Not paid"> Unpaid</option>
							<option value="Paid"> Paid</option>
							<option value="Active"> Active</option>
							<option value="Delivered"> Delivered</option>
							<option value="Canceled"> Canceled</option>
						</select>
					:	<span className={`px-3 py-1 rounded-full text-sm font-medium h-fit ${statusConfig[status].color}`}>
							<div className="flex justify-between items-center gap-2">
								<div>{statusConfig[status].icon}</div>
								<div>{statusConfig[status].label}</div>
							</div>
						</span>
					}
				</div>
			</div>
			<div className="py-3 px-10 bg-gradient-to-b from-[#dfd5b284] to-[#ffffff]">
				<h3 className="font-medium text-lg mb-4 text-center">Order Info</h3>

				<OrderItem item={order} />
			</div>
			<div className="flex border-t pt-4 py-2 px-10 items-center w-full">
				{/* LEFT SIDE */}
				<div className="font-bold">
					<span>Service Price: </span>
					<span>${parseFloat(order.total_price).toFixed(2)}</span>
				</div>

				{/* RIGHT SIDE */}
				<div className="flex items-center gap-3 ml-auto">
					<button className="btn bg-primary rounded-2xl shadow text-white">Contact Seller</button>

					{order.status !== "Delivered" &&
						order.status !== "Active" &&
						order.status !== "Paid" &&
						status !== "Canceled" &&
						!user.is_staff && (
							<button
								onClick={() => handleCancelOrder(order.id)}
								className="text-red-700 btn btn-ghost shadow rounded-full">
								Cancel
							</button>
						)}

					{order.status === "Not paid" && status !== "Canceled" && !user.is_staff && (
						<button
							onClick={handlePayment}
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow transition-colors"
							disabled={loading}>
							{loading ? "Processing..." : "Pay Now"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
