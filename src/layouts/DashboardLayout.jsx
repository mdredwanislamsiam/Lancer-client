import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";

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
				<main className="p-6">
					<Outlet />
				</main>
			</div>

			{/* Slidebar */}
			<Sidebar />
		</div>
	);
};

export default DashboardLayout;
