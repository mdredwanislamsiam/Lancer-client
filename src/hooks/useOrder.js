import { useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useOrder = () => { 
    const [orders, setOrder] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [canOrderService, setCanOrderService] = useState(null);
    const [totalPages, setTotalPages] = useState(0); 
    
      

    const fetchOrders = async (
        currentPage = 1
    ) => {
        setLoading(true); 
        const url = `/orders/?page=${currentPage}`   
        try {
            const res = await authAPIClient.get(url); 
            // console.log(res); 
            setTotalPages(Math.ceil(res.data.count / 10));
            setOrder(res.data.results); 
        }
        catch (error) {
            console.log(error); 
        }
        finally {
            setLoading(false); 
        }
    }
     

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


    return { canOrder, fetchOrders, createOrder, canOrderService, loading, orders, cancelOrder, totalPages}; 
};

export default useOrder;