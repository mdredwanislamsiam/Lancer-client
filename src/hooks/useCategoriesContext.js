import React, { useContext } from 'react';
import categoriesContext from '../context/CategoriesContext';

const useCategoriesContext = () => {
    return useContext(categoriesContext); 
};

export default useCategoriesContext;