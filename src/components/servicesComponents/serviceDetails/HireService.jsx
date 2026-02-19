import React, { useEffect, useState } from 'react';
import useOrder from '../../../hooks/useOrder';
import { FaCheck } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const HireService = ({service}) => {
    const [hiring, setHiring] = useState(false); 
	const [hired, setHired] = useState(false); 
	const { createOrder, canOrderService, canOrder } = useOrder();
	const { user } = useAuth(); 

	useEffect(() => {
		canOrder(service.id);
	}, [service.id])

	const onSubmit = async () => {
		setHiring(true); 
		try {
			const order = await createOrder(service.id); 
			console.log("Order: ", order); 
			setHired(true); 
		}
		catch (error) {
			console.log(error); 
		}
		finally {
			setHiring(false); 
		}
	}
	// console.log(canOrderService); 
	if (!user) return; 
    return (
		<div>
			<button
				className="btn px-6 py-2 lg:px-10 lg:py-3 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-md w-full"
				onClick={onSubmit}
				disabled={hiring || hired || !canOrderService || user.role === "Seller"}>
				{hiring ?
					<span className="flex items-center">
						<span className="loading loading-spinner loading-sm mr-2"></span>
						Hiring...
					</span>
				: hired || !canOrderService ?
					<span className="flex items-center">
						<FaCheck className="mr-2 h-4 w-4" />
						Hired
					</span>
				:	<span className="flex items-center">
						<FaShoppingCart className="mr-2 h-4 w-4" />
						Hire Service
					</span>
				}
			</button>
		</div>
	);
};

export default HireService;