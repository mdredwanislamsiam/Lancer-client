import React from 'react';
import useOtherInfo from '../../../hooks/useOtherInfo';
import OrderComponent from './OrderComponent';

const DeliveryOrders = () => {
    const { deliveredOrders, loading, getTime} = useOtherInfo(); 
    
    return (
        <div>
            <OrderComponent orders={deliveredOrders} loading={loading} getTime={getTime} title={"Delivered Orders"} />
        </div>
    );
};

export default DeliveryOrders;