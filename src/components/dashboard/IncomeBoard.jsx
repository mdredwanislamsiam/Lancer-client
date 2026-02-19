import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import useOtherInfo from "../../hooks/useOtherInfo";
import { FiUsers } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import StatCard from "./StatCard";
import { GrTime } from "react-icons/gr";
import { TbBasketCancel } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { MdOutlinePending, MdOutlinePendingActions } from "react-icons/md";

const IncomeBoard = ({displayLg}) => {
	const { user } = useAuth();
    const { clients, canceledOrders, unpaidOrders } = useOtherInfo();
	// console.log(clients);
	
	const size =
		window.innerWidth < 640 ? 15
		: window.innerWidth < 1024 ? 25
		: 30;

	return (
		<div className="flex flex-col gap-6 w-full h-full bg-gradient-to-r from-[#e8f4ff] p-6 shadow-sm rounded-2xl">
			<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between bg-gradient-to-r to-[#3c6a95]">
				<div className="flex justify-between  items-center">
					<h2 className="text-md lg:text-xl font-semibold text-gray-500">
						Total {user?.role === "Seller" ? "Income" : "Cost"}
					</h2>
					<div className="bg-blue-100 p-3 w-fit rounded-full">
						<FaWallet size={size} className="text-[#3c6a95]" />
					</div>
				</div>

				<h1 className="text-xl lg:text-3xl font-bold text-gray-800 mt-6">$ {user?.wallet}</h1>
			</div>

			{/* Clients Card */}
			<Link
				to="clients"
				className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between bg-gradient-to-r to-[#3c6a95]">
				<div className="flex justify-between items-center">
					<h2 className="text-md lg:text-xl font-semibold text-gray-500">Total Clients</h2>
					<div className="bg-blue-100 p-3 rounded-full">
						<FiUsers size={size} className="text-[#3c6a95]" />
					</div>
				</div>

				<h1 className="text-3xl font-bold text-gray-800 mt-6">{clients?.length || 0}</h1>
			</Link>

			{displayLg && (
				<Link to="unpaidOrders" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
					<StatCard icon={MdOutlinePendingActions} title="Unpaid Orders" value={unpaidOrders?.length || 0} />
				</Link>
			)}

			{displayLg && (
				<Link to="canceledOrders" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
					<StatCard icon={GiCancel} title="Canceled Orders" value={canceledOrders?.length || 0} />
				</Link>
			)}

			{/* Empty card (optional future stats) */}
			<div className="bg-white rounded-2xl bg-gradient-to-r to-[#3c6a95] shadow-md p-6 flex items-center justify-center text-gray-700">
				Coming Soon
			</div>
		</div>
	);
};

export default IncomeBoard;
