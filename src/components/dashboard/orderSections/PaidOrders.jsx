import useOtherInfo from '../../../hooks/useOtherInfo';
import OrderComponent from './OrderComponent';


const PaidOrders = () => {
    const { paidOrders, loading, getTime } = useOtherInfo(); 
    
    return (
		<OrderComponent orders={paidOrders} loading={loading} getTime={getTime} title={"Paid Orders"}/>
	);
};

export default PaidOrders;