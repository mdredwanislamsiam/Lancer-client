import React from 'react';
import { FiBarChart2, FiPackage, FiPlayCircle, FiPlusCircle, FiShoppingBag, FiShoppingCart, FiStar, FiTag, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';

import { FaShop } from 'react-icons/fa6';
import { AiOutlineLogout } from 'react-icons/ai';
import useAuthContext from '../../hooks/useAuthContext';

const Sidebar = () => {
	const { user, logoutUser } = useAuthContext();
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};
	const customerMenuItems = [
		{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
		{ to: "/shop", icon: FaShop, label: "Shop" },
		{ to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
		{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
		{ to: "/reviews", icon: FiStar, label: "Reviews" },
	];
    const adminMenuItems = [
		{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
		{ to: "/shop", icon: FaShop, label: "Shop" },
		{ to: "/products", icon: FiPackage, label: "Products" },
		{ to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
		{ to: "/categories", icon: FiTag, label: "Categories" },
		{ to: "/categories/add", icon: FiPlusCircle, label: "Add Category" },
		{ to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
		{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
		{ to: "/reviews", icon: FiStar, label: "Reviews" },
		{ to: "/users", icon: FiUsers, label: "Users" },
	];
	// console.log(user); 
	// const menuItems = (user.is_staff ? adminMenuItems : customerMenuItems)
	const menuItems = adminMenuItems; 

    return (
		<div className="drawer-side z-10">
			<label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
			<aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
				{/* header */}
				<Link to="/" className="flex items-center gap-2 mb-6 px-2 w-fit">
					<FiShoppingCart className="h-6 w-6" />
					<h1 className="text-2xl font-bold">Lancer</h1>
				</Link>

				{/* Profile */}
				<div className="my-10">
					<div className="w-40 mx-auto">
						<img
							className="rounded-full"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							alt="User avatar"
						/>
					</div>
					<div className="my-3 flex flex-col justify-center items-center gap-1">
						<h1 className="text-lg font-semibold">Mr. X</h1>
						<p className="badge badge-warning badge-lg">seller</p>
						<button className="py-1 px-5 rounded-full bg-[#8fcff9] border-0 hover:bg-[#6dc1f9] w-fit cursor-pointer">
							View Profile
						</button>
					</div>
				</div>

				{/* Menu */}
				<ul className="menu menu-md gap-2">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link to={item.to} className="flex items-center">
								<item.icon className="h-4 w-4" />
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				{/* Logout */}
				<button className="flex items-center gap-2 w-fit ml-5 mt-auto btn" onClick={handleLogout}>
					<AiOutlineLogout size={30} />
					<span className="text-lg font-semibold">Logout</span>
				</button>
				{/* Sidebar footer */}
				<div className="mt-auto pt-6 text-xs text-base-content/70">© 2025 PhiMart Admin</div>
			</aside>
		</div>
	);
};

export default Sidebar;