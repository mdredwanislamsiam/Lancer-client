import { useState } from "react";
import authAPIClient from "../../services/auth-api-client";
import OrderItem from "./OrderItem";
import { FiAlertCircle } from "react-icons/fi";
import { BiCheckCircle, BiMessage, BiXCircle } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { GiCancel, GiSandsOfTime } from "react-icons/gi";
import { BsWallet } from "react-icons/bs";
import { CgHashtag } from "react-icons/cg";
import useAuthContext from "../../hooks/useAuthContext";
import useOrderContext from "../../hooks/useOrderContext";


const OrderCard = ({ order }) => {
	const { user } = useAuthContext(); 
	const [status, setStatus] = useState(order.status);
	const [loading, setLoading] = useState(false);
	const { cancelOrder } = useOrderContext(); 

	const size = window.innerWidth < 640 ? 15 : 25;
	const bigSize = window.innerWidth < 640 ? 30 : 40;

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
		<div className="bg-white rounded-lg shadow-lg mb-8 hover:shadow-2xl hover:shadow-[#286aa1] overflow-hidden ">
			<div className="bg-gradient-to-t to-[#2c5190d4] from-[#add1fc84] hover:from-[#fcd8ad2f] p-3 lg:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex justify-between items-baseline gap-2">
					<div className="flex items-center gap-2">
						<CgHashtag size={bigSize} className="shadow-sm shadow-white w-10 h-fit" />
						<div>
							<h2 className="text-sm lg:text-md font-bold text-[#ffffffd3]">ORDER </h2>
							<h2 className="text-xs lg:text-md font-bold text-[#032c42]"> {order.id}</h2>
						</div>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					{user.is_staff ?
						<select
							className="px-2 py-1 rounded-full text-gray-700 font-medium h-fit text-xs lg:text-sm bg-gray-300 outline-none"
							value={status}
							onChange={handleStatusChange}>
							<option value="Not paid"> Unpaid</option>
							<option value="Paid"> Paid</option>
							<option value="Active"> Active</option>
							<option value="Delivered"> Delivered</option>
							<option value="Canceled"> Canceled</option>
						</select>
					:	<span
							className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium h-fit ${statusConfig[status].color}`}>
							<div className="flex justify-between items-center gap-2">
								<div>{statusConfig[status].icon}</div>
								<div>{statusConfig[status].label}</div>
							</div>
						</span>
					}
				</div>
			</div>
			<div className="py-3 px-2 lg:px-10 bg-base-200">
				<OrderItem item={order} />
			</div>
			<div className="lg:flex grid lg:justify-between grid-cols-2 border-t-3 my-2 border-gray-300  pt-4 py-2 px-2 lg:px-10 items-center w-full">
				{/* LEFT SIDE */}
				<div className="">
					<div className="flex items-center gap-2">
						<BsWallet size={bigSize} />
						<div>
							<p className="text-gray-500 text-xs lg:text-sm font-semibold">Service Price </p>
							<p className="font-extrabold text-md lg:text-xl">
								${parseFloat(order.total_price).toFixed(2)}
							</p>
						</div>
					</div>
				</div>
				<button className="btn btn-xs lg:btn-md btn-primary rounded-full flex items-center shadow text-white">
					<BiMessage className="w-4 h-4  lg:w-6 lg:h-6" /> <div>Contact Seller</div>
				</button>

				{order.status === "Not paid" && status !== "Canceled" && !user.is_staff && (
					<button
						onClick={handlePayment}
						className="px-4 py-2 btn btn-xs lg:btn-md bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition-colors"
						disabled={loading}>
						{loading ?
							<div className="flex items-center gap-2">
								<GiSandsOfTime className="w-4 h-4  lg:w-6 lg:h-6" />
								<span>Processing</span>
							</div>
						:	<div className="flex items-center gap-2">
								<MdPayment className="w-4 h-4  lg:w-6 lg:h-6" />
								<span>Pay Now</span>
							</div>
						}
					</button>
				)}

				{order.status !== "Delivered" &&
					order.status !== "Active" &&
					order.status !== "Paid" &&
					status !== "Canceled" &&
					!user.is_staff && (
						<button
							onClick={() => handleCancelOrder(order.id)}
							className="text-red-700 btn btn-xs lg:btn-md btn-error shadow rounded-full">
							<div className="flex items-center gap-2">
								<GiCancel className="w-4 h-4  lg:w-6 lg:h-6" />
								<span>cancel</span>
							</div>
						</button>
					)}

				{/* RIGHT SIDE */}
				{/* <div className="flex flex-col lg:felx-row items-center gap-3 ml-auto"></div> */}
			</div>
		</div>
	);
};

export default OrderCard;
