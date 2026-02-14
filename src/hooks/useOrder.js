import React, { useEffect, useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useOrder = () => { 
    const [orders, setOrder] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [canOrderService, setCanOrderService] = useState(null);
    
    const fetchOrders = async () => {
        setLoading(true); 
        try {
            const res = await authAPIClient.get("/orders/"); 
            setOrder(res.data.results); 
        }
        catch (error) {
            console.log(error); 
        }
        finally {
            setLoading(false); 
        }
    }
    useEffect(() => { 
        fetchOrders(); 
     }, []); 

    const canOrder = async (service_id) => {
        try {
            const res = await authAPIClient.get(`/orders/can_order/${service_id}`)
            setCanOrderService(res.data.can_order)
        }
        catch (error) {
            console.log(error); 
        }
    }
 
    const createOrder = async (service_id) => {
        setLoading(true); 
        try {
            await authAPIClient.post("/orders/", {service_id: service_id}); 
        }
        catch (error) {
            console.log(error); 
        }
        finally {
            setLoading(false); 
        }
    }


    const cancelOrder = async (orderId) => {
        try {
            const res = await authAPIClient.post(`/orders/${orderId}/cancel/`);
            if (res.status === 200) {
				setOrder((prev) =>
					prev.map((order) => (order.id === orderId ? { ...order, status: "Canceled" } : order)),
                );
                return res.status; 
			} 
		} catch (error) {
			console.log(error);
		}
    }


    return { canOrder, createOrder, canOrderService, loading, orders, cancelOrder}; 
};

export default useOrder;