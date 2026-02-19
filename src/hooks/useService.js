import {  useState } from 'react';
import authAPIClient from '../services/auth-api-client';

const useService = () => {
    
    const [services, setServices] = useState([]); 
    const [myServices, setMyServices] = useState([]); 
    const [loading, setLoading] = useState(false); 
	const [totalPages, setTotalPages] = useState(0); 
	const [service, setService] = useState(null); 


    const fetchServices = async (
		currentPage = 1,
		priceRange = [0, 10000],
		selectedCategory = "",
		debouncedSearch = "",
		sortOrder = "",
	) => {
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


    const fetchMyServices = async (
		currentPage = 1,
		priceRange = [0, 10000],
		selectedCategory = "",
		debouncedSearch = "",
		sortOrder = "",
	) => {
		setLoading(true);

		const url = `/services/my/?price__gte=${priceRange[0]}&price__lte=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${debouncedSearch}&ordering=${sortOrder}`;
		try {
			const response = await authAPIClient.get(url);
			const data = await response.data;
			setMyServices(data.results);
			setTotalPages(Math.ceil(data.count / 10));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}; 


	const addService = async (data) => {
		// console.log(data)
		try {
			const res = await authAPIClient.post("/services/", data);
			// console.log(res);
			if (res.status === 201) {
				return { serviceId: res.data.id };
			}
		} catch (error) {
			console.log(error);
		}
	};


	const fetchService = async (serviceId) => {
		try {
			const res = await authAPIClient.get(`/services/${serviceId}/`);
			setService(res.data); 
		} catch (error) {
			console.log(error);
		}
	}
	


	const updateService = async (serviceId, data) => {
		try {
			const res = await authAPIClient.patch(`/services/${serviceId}/`, data);
			if (res.status === 200) {
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}


	const deleteService = async (serviceId) => {
		try {
			await authAPIClient.delete(`/services/${serviceId}/`);
			alert("Service was successfully deleted!")
		} catch (error) {
			console.log(error);
		}
	}
    
    return {fetchServices, services, myServices, loading, totalPages, addService, fetchMyServices, updateService, fetchService, service, deleteService, setMyServices}; 

};

export default useService;