import React, { createContext } from 'react';
import useNotification from '../hooks/useNotification';

const NotificationContext = createContext(); 

export const NotificationProvider = ({ children }) => {
    const allContext = useNotification(); 
    return <NotificationContext.Provider value={allContext}>{children}</NotificationContext.Provider>
}

export default NotificationContext;