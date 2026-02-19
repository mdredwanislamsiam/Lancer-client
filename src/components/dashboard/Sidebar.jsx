import React from 'react';
import { FiBarChart2, FiPackage, FiPlayCircle, FiPlusCircle, FiShoppingBag, FiShoppingCart, FiStar, FiTag, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';

import { FaShop } from 'react-icons/fa6';
import { AiOutlineLogout } from 'react-icons/ai';
import useAuthContext from '../../hooks/useAuthContext';
import { GrServices } from 'react-icons/gr';
import { IoNotificationsCircleOutline } from 'react-icons/io5';
import { MdCircleNotifications } from 'react-icons/md';

const Sidebar = () => {
	const { user, logoutUser } = useAuthContext();
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};
	const sellerItems = [
		{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
		{ to: "/services", icon: FaShop, label: "All Services" },
		{ to: "/dashboard/services/my", icon: GrServices, label: "My Services" },
		{ to: "/dashboard/services/add", icon: FiPlusCircle, label: "Add Service" },
		{ to: "/dashboard/categories", icon: FiTag, label: "Categories" },
		{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
		{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
	];
	const BuyerItems = [
		{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
		{ to: "/services", icon: FaShop, label: "All Services" },
		{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
		{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
	];
    const adminMenuItems = [
		{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
		{ to: "/services", icon: FaShop, label: "All Services" },
		{ to: "/dashboard/services/my", icon: GrServices, label: "My Services" },
		{ to: "/dashboard/services/add", icon: FiPlusCircle, label: "Add Service" },
		{ to: "/dashboard/categories", icon: FiTag, label: "Categories" },
		{ to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
		{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
		{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
	];
	// console.log(user); 
	// const menuItems = (user.is_staff ? adminMenuItems : customerMenuItems)
	const menuItems = (user?.is_staff ? adminMenuItems : user?.role === "Seller" ? sellerItems : BuyerItems); 

    return (
		<div className="drawer-side font-newfont1  z-10">
			<label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
			<aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
				{/* header */}
				<Link to="/" className="flex items-center gap-2 mb-6 px-2 w-fit">
					<FiShoppingCart className="h-6 w-6 stroke-3" />
					<h1 className="text-xl font-extrabold font-newfont3 uppercase headTitle">Lancer</h1>
				</Link>

				{/* Profile */}
				<div className=" my-2 lg:my-10">
					<div className="w-20 lg:w-40 mx-auto">
						<img
							className=" w-20 h-20 lg:w-40 lg:h-40 rounded-full object-cover"
							src={user?.image}
							alt="User avatar"
						/>
					</div>
					<div className="my-3 flex flex-col justify-center items-center gap-1">
						<h1 className="text-md lg:text-xl font-bold">{user?.username}</h1>
						<p className="badge badge-warning badge-sm lg:badge-lg">{user?.role}</p>
						<Link
							to={"profile"}
							className="py-1 btn btn-xs lg:btn-md px-5 rounded-full bg-[#8fcff9] border-0 hover:bg-[#6dc1f9] w-fit cursor-pointer">
							View Profile
						</Link>
					</div>
				</div>

				{/* Menu */}
				<ul className="menu menu-xs lg:menu-md gap-2">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link to={item.to} className="flex items-center">
								<item.icon size={20} className="" />
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				{/* Logout */}
				<button className="flex items-center gap-2 w-fit ml-5 mt-auto mx-auto btn" onClick={handleLogout}>
					<AiOutlineLogout size={20} />
					<span className="text-sm lg:text-lg font-semibold">Logout</span>
				</button>
				{/* Sidebar footer */}
				<div className="mt-auto pt-6 text-xs text-base-content/70">© 2025 PhiMart Admin</div>
			</aside>
		</div>
	);
};

export default Sidebar;