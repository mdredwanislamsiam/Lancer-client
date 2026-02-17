import React, { useEffect, useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useOtherInfo = () => {
    const [services, setServices] = useState([]); 
	const [paidOrders, setPaidOrders] = useState([]); 
	const [unpaidOrders, setUnpaidOrders] = useState([]); 
	const [canceledOrders, setCanceledOrders] = useState([]); 
	const [clients, setClients] = useState([]); 
	const [loading, setLoading] = useState(false); 
    const [allOrders, setAllOrders] = useState([]); 
    const [deliveredOrders, setDeliveredOrders] = useState([]); 
    const [activeOrders, setAcitveOrders] = useState([]); 
	const [incomeData, setIncomeData] = useState([]); 
	const [numOrder, setNumOrder] = useState(0); 
	

	const fetchOtherInfo = async () => {
		setLoading(true); 
		
		try {
			const res = await authAPIClient.get("/other_info"); 
			// console.log(res); 
			setPaidOrders(res.data?.paid_orders); 
			setServices(res.data?.total_services); 
			setAllOrders(res.data?.total_orders); 
            setClients(res.data?.total_clients); 
            setAcitveOrders(res.data?.active_orders); 
			setDeliveredOrders(res.data?.delivered_orders);
			setCanceledOrders(res.data?.canceled_orders);
			setUnpaidOrders(res.data?.unpaid_orders),
			setNumOrder(res.data?.numOrder); 
		}
		catch (error) {
			console.log(error); 
		}
		finally {
			setLoading(false); 
		}
	}
    useEffect(() => { fetchOtherInfo() }, []); 
    
    const getTime = (time) => {
		const createdTime = new Date(time);
		const day = createdTime.getDate();
		const month = createdTime.getMonth() + 1;
		const year = createdTime.getFullYear();

		return `${day}-${month}-${year}`;
	};



    
	const fetchIncomeData = async () => {
		setLoading(true); 
        try {
			const res = await authAPIClient.get("/income_data"); 
			// console.log(res); 
			setIncomeData(res.data.income_data); 
		}
		catch (error) {
			console.log(error); 
		}
		finally {
			setLoading(false); 
		}
    }

    return {clients, loading,  services, paidOrders, allOrders, getTime, deliveredOrders, activeOrders, fetchIncomeData, incomeData, numOrder, unpaidOrders, canceledOrders};
};

export default useOtherInfo;