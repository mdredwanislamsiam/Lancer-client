import React, { useContext } from 'react';
import serviceContext from '../context/ServiceContext';

const useServiceContext = () => {
    return useContext(serviceContext); 
};

export default useServiceContext;