import {  useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useService = () => {
    
    const [services, setServices] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [totalPages, setTotalPages] = useState(0); 


    const fetchServices = async (currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder) => {
        setLoading(true);

        const url = `/services/?price__gte=${priceRange[0]}&price__lte=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${debouncedSearch}&ordering=${sortOrder}`;
        try {
			const response = await authAPIClient.get(url);
			const data = await response.data;
			setServices(data.results);
			setTotalPages(Math.ceil(data.count / 10));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
    };
    
    return {fetchServices, services, loading, totalPages}; 

};

export default useService;