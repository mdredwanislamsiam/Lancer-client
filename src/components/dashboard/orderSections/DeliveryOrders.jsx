import OrderComponent from './OrderComponent';
import useOtherInfoContext from '../../../hooks/useOtherInfoContext';

const DeliveryOrders = () => {
    const { deliveredOrders, loading, getTime} = useOtherInfoContext(); 
    
    return (
        <div>
            <OrderComponent orders={deliveredOrders} loading={loading} getTime={getTime} title={"Delivered Orders"} />
        </div>
    );
};

export default DeliveryOrders;