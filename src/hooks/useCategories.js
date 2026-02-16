import React, { useEffect, useState } from 'react';

import authAPIClient from '../services/auth-api-client';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null); 
    const [loading, setLoading] = useState(null); 



    const fetchCategories = async () => {
        setLoading(true); 
        try {
            const res = await authAPIClient.get("/categories/");
            setCategories(res.data.results)
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    


    const fetchCategory = async(categoryId) => {
        try {
            const res = await authAPIClient.get(`/categories/${categoryId}/`);
            setCategory(res.data); 
        }
        catch (error) {
            console.log(error);
        }
    }
    

    const addCategory = async (data) => {
        try {
            await authAPIClient.post("/categories/", data); 
        }
        catch (error) {
            console.log(error); 
        }
    }
    

    const updateCategory = async (categoryId, data) => {
        console.log(data); 
        try {
            const res = await authAPIClient.patch(`/categories/${categoryId}/`, data);
            console.log(res)
        }
        catch (error) {
            console.log(error); 
        }
    }



    const deleteCategory = async (categoryId) => {
		try {
			const res = await authAPIClient.delete(`/categories/${categoryId}/`);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
    }

    return {fetchCategories, categories, addCategory, updateCategory, deleteCategory, fetchCategory, category, setCategories, loading}; 
};

export default useCategories;
