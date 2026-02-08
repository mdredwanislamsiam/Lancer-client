import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await apiClient.get("/categories/");
            setCategories(res.data.results)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
		fetchCategories();
    }, []);
    
  

    return {fetchCategories, categories}; 
};

export default useCategories;
