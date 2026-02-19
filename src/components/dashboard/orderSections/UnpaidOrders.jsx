import OrderComponent from './OrderComponent';
import useOtherInfoContext from '../../../hooks/useOtherInfoContext';

const UnpaidOrders = () => {
    const { unpaidOrders, loading, getTime } = useOtherInfoContext(); 
    
    return (
        <div>
            <OrderComponent loading={loading} orders={unpaidOrders} getTime={getTime} title={"Unpaid Orders"}/> 
        </div>
    );
};

export default UnpaidOrders;