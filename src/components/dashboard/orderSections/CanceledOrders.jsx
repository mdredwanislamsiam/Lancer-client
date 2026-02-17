import React from 'react';
import useOtherInfo from '../../../hooks/useOtherInfo';
import OrderComponent from './OrderComponent';

const CanceledOrders = () => {
    const { canceledOrders, loading, getTime } = useOtherInfo();
    return (
        <div>
            <OrderComponent orders={canceledOrders} getTime={getTime} loading={loading} /> 
        </div>
    );
};

export default CanceledOrders;