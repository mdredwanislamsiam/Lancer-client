import useOtherInfoContext from '../../../hooks/useOtherInfoContext';
import OrderComponent from './OrderComponent';


const PaidOrders = () => {
  const { paidOrders, loading, getTime } = useOtherInfoContext();
  
    
    return (
		<OrderComponent orders={paidOrders} loading={loading} getTime={getTime} title={"Paid Orders"}/>
	);
};

export default PaidOrders;