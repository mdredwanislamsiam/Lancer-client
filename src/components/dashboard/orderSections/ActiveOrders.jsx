import React from 'react';
import useOtherInfo from '../../../hooks/useOtherInfo';
import OrderComponent from './OrderComponent';

const ActiveOrders = () => {
    const { activeOrders, loading, getTime } = useOtherInfo(); 

    return (
        <div>
            <OrderComponent orders={activeOrders} loading={loading} getTime={getTime} title={"Active Orders"} />         
        </div>
    );
};

export default ActiveOrders;