import React, { useEffect, useState } from 'react';
import useOrder from '../hooks/useOrder';
import OrderCard from '../components/order/OrderCard';
import ServicePagination from '../components/servicesComponents/ServicePagination';

const Orders = () => {
	const [currentPage, setCurrentPage] = useState(1)
    const { orders, loading, totalPages, fetchOrders} = useOrder(); 

	useEffect(() => {
		fetchOrders(currentPage);
	}, [currentPage]);

    if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
    return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-6">Order Details</h1>
			{orders.length === 0 ?
				<div className="text-2xl text-center mt-80 text-gray-500">No Orders</div>
			:	<div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
						{orders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
					<ServicePagination handlePageChange={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
				</div>
			}
		</div>
	);
};

export default Orders;