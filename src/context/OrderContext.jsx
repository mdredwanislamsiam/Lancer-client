import React, { createContext } from 'react';
import useOrder from '../hooks/useOrder';

const OrderContext = createContext(); 

export const OrderProvider = ({ children }) => {
    const allContext = useOrder(); 
    return <OrderContext.Provider value={allContext}>{children}</OrderContext.Provider>
}; 

export default OrderContext;