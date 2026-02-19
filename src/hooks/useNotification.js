import {  useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useNotification = () => {

    const [notifications, setNotifications] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [totalPages, setTotalPages] = useState(0); 


    const fetchNotifications = async (currentPage) => {
        setLoading(true);
        const url = `/notifications/?page=${currentPage}`
		try {
            const res = await authAPIClient.get(url);
            // console.log(res); 
            setNotifications(res.data.results); 
            setTotalPages(Math.ceil(res.data.count / 10)); 
			
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
    }



    const markNotification = async (id, currentPage) => {
        try {
            await authAPIClient.patch(`/notifications/mark/${id}`);
            await fetchNotifications(currentPage);
		} catch (error) {
			console.log(error);
		}
    }

    return {notifications, loading, markNotification, fetchNotifications, totalPages}; 
};

export default useNotification;