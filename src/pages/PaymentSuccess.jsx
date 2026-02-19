import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
		<div>
			Payment Success return to{" "}
			<Link to="/dashboard">
				<span className="text-green-600 hover:underline ">Dashboard</span>
			</Link>
		</div>
	);
};

export default PaymentSuccess;