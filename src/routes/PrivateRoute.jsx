import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from 'react-router';


const PrivateRoute = ({children}) => {
    const { user, loading } = useAuthContext();
    if (loading) {
		return <LoadingSpinner />;
	}
    return user ? children : <Navigate to="/login" />; 
};

export default PrivateRoute;