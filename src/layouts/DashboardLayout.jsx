import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar"
import DashboardNavbar from "../components/dashboard/DashboardNavbar"

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};
	return (
		<div className="drawer lg:drawer-open">
			{/* Mobile drawer checkbox */}
			<input
				type="checkbox"
				id="drawer-toggle"
				className="drawer-toggle"
				checked={sidebarOpen}
				onChange={toggleSidebar}
			/>

			{/* Page Content */}
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<DashboardNavbar sidebarOpen={sidebarOpen} />

				{/* Main content */}
				<main className=" min-h-screen ">
					<Outlet />
				</main>
			</div>

			{/* Slidebar */}
			<Sidebar />
		</div>
	);
};

export default DashboardLayout;
