import OrderComponent from './OrderComponent';
import useOtherInfoContext from '../../../hooks/useOtherInfoContext';

const ActiveOrders = () => {
    const { activeOrders, loading, getTime } = useOtherInfoContext(); 

    return (
        <div>
            <OrderComponent orders={activeOrders} loading={loading} getTime={getTime} title={"Active Orders"} />         
        </div>
    );
};

export default ActiveOrders;