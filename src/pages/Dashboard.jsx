import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FiPackage, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';
import Order from '../components/dashboard/Order';

const Dashboard = () => {
    return (
		<div>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard icon={FiPackage} title="Pending Services" value="245" />
				<StatCard icon={FiShoppingCart} title="Total Orders" value="245" />
				<StatCard icon={FiUser} title="Total Clients" value="245" />
				<StatCard icon={FiStar} title="Average Rating" value="4.8" />
			</div>

			{/* <Order /> */}
		</div>
	);
};

export default Dashboard;