import StatCard from '../components/dashboard/StatCard';
import { FiPackage, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';
import IncomeChart from '../components/dashboard/IncomeChart';
import { Link, Outlet } from 'react-router';
import useOtherInfo from '../hooks/useOtherInfo';
import IncomeBoard from '../components/dashboard/IncomeBoard';
import { MdOutlinePendingActions, MdPaid } from 'react-icons/md';
import { GrTicket, GrTime } from 'react-icons/gr';
import useOrder from '../hooks/useOrder';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
	const { paidOrders, allOrders, numOrder, loading, deliveredOrders, activeOrders } = useOtherInfo(); 
	const { user } = useAuth();
	// console.log(deliveredOrders)

    return (
		<div>
			{/* Loading Spinner */}
			{loading ?
				<div className="flex justify-center items-center min-h-screen">
					<span className="loading loading-spinner loading-xl  text-secondary"></span>
				</div>
			:	<div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Link
							to="paidOrders"
							className="hover:shadow-lg hover:scale-103 transition-all duration-300">
							<StatCard
								icon={MdPaid}
								title="Paid Orders"
								value={paidOrders?.length || 0}
							/>
						</Link>
						<Link to="" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
							<StatCard icon={FiShoppingCart} title="Total Orders" value={user?.is_staff ? numOrder : allOrders?.length || 0} />
						</Link>
						<Link
							to="deliveredOrders"
							className="hover:shadow-lg hover:scale-103 transition-all duration-300">
							<StatCard icon={FiPackage} title="Delivered Orders" value={deliveredOrders?.length || 0} />
						</Link>
						<Link to="activeOrders" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
							<StatCard icon={GrTime} title="Active Orders" value={activeOrders?.length || 0} />
						</Link>
					</div>
					{/* chart */}
					<div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-4 gap-5">
						<div className="mt-10 col-span-3">
							<IncomeChart />
							<Outlet />
						</div>
						<div className="w-full mt-10">
							<IncomeBoard />
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default Dashboard;