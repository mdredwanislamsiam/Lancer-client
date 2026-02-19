import React from 'react';
import useOtherInfo from '../../../hooks/useOtherInfo';
import OrderComponent from './OrderComponent';

const UnpaidOrders = () => {
    const { unpaidOrders, loading, getTime } = useOtherInfo(); 
    
    return (
        <div>
            <OrderComponent loading={loading} orders={unpaidOrders} getTime={getTime} title={"Unpaid Orders"}/> 
        </div>
    );
};

export default UnpaidOrders;