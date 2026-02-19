import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const DashboardNavbar = ({ sidebarOpen }) => {
	const { logoutUser, user } = useAuthContext(); 
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};
	return (
		<div className="navbar bg-linear-to-br font-newfont1 from-[#83a4ce] shadow-sm ">
			<div className="flex-none lg:hidden mr-5">
				<label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
					{sidebarOpen ?
						<FiX className="h-5 w-5" />
					:	<FiMenu className="h-5 w-5" />}
				</label>
			</div>
			<div className="flex-1">
				<Link to="/dashboard" className="text-lg font-semibold">
					Dashboard
				</Link>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src={user?.image} alt="User avatar" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<Link to="/dashboard/profile/" className="justify-between">
								Profile
							</Link>
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
