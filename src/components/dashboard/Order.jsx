import { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";
import OrderComponent from "./orderSections/OrderComponent";
import ServicePagination from "../servicesComponents/ServicePagination";
import useOtherInfo from "../../hooks/useOtherInfo";
import useAuth from "../../hooks/useAuth";


const Order = () => {
	const { orders, fetchOrders, totalPages } = useOrder(); 
	const [currentPage, setCurrentPage] = useState(1); 
	const { user } = useAuth(); 
	const { allOrders, loading} = useOtherInfo(); 

	useEffect(() => {fetchOrders(currentPage)}, [currentPage])


	// console.log(orders); 
	const getTime = (time) => {
		const createdTime = new Date(time);
		// console.log(createdTime);
		const day = createdTime.getDate();
		const month = createdTime.getMonth() + 1;
		const year = createdTime.getFullYear();

		return `${day}-${month}-${year}`;
	};

	if (!orders || !allOrders) return; 
	
	// spinner
	if (loading)
		return (
			<div className="flex justify-center items-center my-20">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
	return (
		<div>
			<OrderComponent orders={user?.is_staff ? orders : allOrders} loading={loading} getTime={getTime} title={"All Orders"} />
			{user?.is_staff && <ServicePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />}
		</div>
	);
};

export default Order;
