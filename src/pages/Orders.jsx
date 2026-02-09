import React from 'react';
import useOrder from '../hooks/useOrder';
import OrderCard from '../components/order/OrderCard';

const Orders = () => {
    const { orders, loading } = useOrder(); 


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
			:	orders.map((order) => <OrderCard key={order.id} order={order} />)}
		</div>
	);
};

export default Orders;