import React, { useEffect, useState } from 'react';

import authAPIClient from '../services/auth-api-client';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await authAPIClient.get("/categories/");
            setCategories(res.data.results)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);
 
    

    const addCategory = async (data) => {
        try {
            const res = await authAPIClient.post("/categories/", data); 
            console.log(res); 
        }
        catch (error) {
            console.log(error); 
        }
    }
  

    return {fetchCategories, categories, addCategory}; 
};

export default useCategories;
