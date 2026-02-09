import React, { useContext } from 'react';
import OrderContext from '../context/OrderContext';

const useOrderContext = () => {
    return useContext(OrderContext); 
};

export default useOrderContext;