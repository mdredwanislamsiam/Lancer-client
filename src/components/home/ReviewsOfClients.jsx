import { useEffect, useState } from 'react';
import ReviewCardHome from './ReviewCardHome';
import authAPIClient from '../../services/auth-api-client';
import LoadingSpinner from '../common/LoadingSpinner';

const ReviewsOfClients = () => {
	const [reviews, setReviews] = useState([]); 
	const [loading, setLoading] = useState(false); 


	const fetctReviews = async () => {
		setLoading(true); 
		try {
			const res = await authAPIClient.get("/reviews"); 
			// console.log(res);
			setReviews(res.data.reviews);

		}
		catch (error) {
			console.log(error); 
		}
		finally {
			setLoading(false); 
		}
	}
	useEffect(() => { fetctReviews() }, []); 

	if (!reviews) return; 
	return (
		<div>
			{loading && (
				<LoadingSpinner /> 
			)}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{reviews.map((review) => (
					<ReviewCardHome key={review.id} review={review} />
				))}
			</div>
		</div>
	);
};

export default ReviewsOfClients;