import OrderComponent from './OrderComponent';
import useOtherInfoContext from '../../../hooks/useOtherInfoContext';

const CanceledOrders = () => {
    const { canceledOrders, loading, getTime } = useOtherInfoContext();
    return (
        <div>
            <OrderComponent orders={canceledOrders} getTime={getTime} loading={loading} title={"Canceled Orders"}/> 
        </div>
    );
};

export default CanceledOrders;