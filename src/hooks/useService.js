import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import authAPIClient from '../services/auth-api-client';

const useService = () => {
    
    const [services, setServices] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [totalPages, setTotalPages] = useState(0); 
    // const [currentPage, setCurrentPage] = useState(1);
	// const [priceRange, setPriceRange] = useState([0, 10000]);
	// const [selectedCategory, setSelectedCategory] = useState("");
	// const [searchQuery, setSearchQuery] = useState("");
	// const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	// const [sortOrder, setSortOrder] = useState("");

    const fetchServices = async (currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder) => {
        setLoading(true);
        // setCurrentPage(currentPage); 
        // setDebouncedSearch(debouncedSearch); 
        // setSortOrder(sortOrder); 
        // setPriceRange(priceRange); 
        // setSelectedCategory(selectedCategory); 
        // setSearchQuery(searchQuery); 

        const url = `/services/?price__gte=${priceRange[0]}&price__lte=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${debouncedSearch}&ordering=${sortOrder}`;
        try {
			const response = await authAPIClient.get(url);
			const data = await response.data;
			// console.log(data);
			setServices(data.results);
			// console.log(debouncedSearch);
			setTotalPages(Math.ceil(data.count / 10));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
    };

    // useEffect(() => {
	// 		fetchServices(currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder);
	// 	},
	// 	[currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder]);
    
    
    return {fetchServices, services, loading, totalPages}; 

};

export default useService;