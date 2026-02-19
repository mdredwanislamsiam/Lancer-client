import StatCard from '../components/dashboard/StatCard';
import { FiPackage, FiShoppingCart } from 'react-icons/fi';
import IncomeChart from '../components/dashboard/IncomeChart';
import { Link, Outlet } from 'react-router';
import IncomeBoard from '../components/dashboard/IncomeBoard';
import { MdOutlinePendingActions, MdPaid } from 'react-icons/md';
import { GrTime } from 'react-icons/gr';
import { GiCancel } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useAuthContext from '../hooks/useAuthContext';
import useOtherInfoContext from '../hooks/useOtherInfoContext';

const Dashboard = () => {
	const { paidOrders, allOrders, numOrder, loading, deliveredOrders, activeOrders,canceledOrders, unpaidOrders } = useOtherInfoContext(); 
	const { user } = useAuthContext(); 
	// console.log(deliveredOrders)
	const [displayLg, setDisplayLg] = useState(window.innerWidth >= 1024);
	useEffect(() => {
		const handleResize = () => {
			setDisplayLg(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

    return (
		<div>
			{/* Loading Spinner */}
			{loading ?
				<LoadingSpinner /> 
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

						{displayLg || <Link to="unpaidOrders" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
				<StatCard icon={MdOutlinePendingActions} title="Unpaid Orders" value={unpaidOrders?.length || 0} />
						</Link>}
						{displayLg ||

			<Link to="canceledOrders" className="hover:shadow-lg hover:scale-103 transition-all duration-300">
				<StatCard icon={GiCancel} title="Canceled Orders" value={canceledOrders?.length || 0} />
			</Link>}
					</div>
					{/* chart */}
					<div className="lg:grid flex flex-col-reverse lg:grid-flow-row-dense grid-cols-1 md:grid-cols-4 gap-5">
						<div className="mt-10 col-span-3">
							<IncomeChart />
							<Outlet />
						</div>
						<div className="w-full mt-10">
							<IncomeBoard displayLg={displayLg} />
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default Dashboard;