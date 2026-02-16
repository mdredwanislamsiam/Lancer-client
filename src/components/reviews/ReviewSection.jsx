import  { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import { useParams } from "react-router";
import authAPIClient from "../../services/auth-api-client";
import ReviewList from "./ReviewList";

const ReviewSection = () => {
	const { id } = useParams();
	const [userCanReview, setUserCanReview] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
    const [editingId, setEditingId] = useState(null); 
	const [hasReviewed, setHasReviewed] = useState(false); 


	const fetchReviews = async () => {
		setLoading(true);
		try {
			const res = await authAPIClient.get(`/services/${id}/reviews/`);
			setReviews(res.data.results);
		} catch (error) {
			console.log("Error fetchReviews:", error);
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = async (data) => {
		// console.log(data);
		// console.log(id);
		try {
			const res = await authAPIClient.post(`/services/${id}/reviews/`, data);
			// console.log(res);
			fetchReviews();
			checkHasReviewed()
		} catch (error) {
			console.log("Error submitting review: ", error);
		}
	};

	const checkUserPermission = async () => {
		try {
			const res = await authAPIClient.get(`/orders/has-ordered/${id}`);
			setUserCanReview(res.data.has_ordered);
		} catch (error) {
			console.log("Error Checking user permission: ", error);
		}
	};
	

	const checkHasReviewed = async () => {
		try {
			const res = await authAPIClient.get(`/services/${id}/reviews/has-reviewed/`);
		
			setHasReviewed(res.data.has_reviewed);
		} catch (error) {
			console.log("Error Checking user permission: ", error);
		}
	}
    

    const handleUpdateReview = async (reviewId) => {
        try {
            const res = await authAPIClient.put(`/services/${id}/reviews/${reviewId}/`, editReview);
            // console.log(res.data); 
            setEditingId(null); 
            fetchReviews(); 
		} catch (error) {
			console.log("Error Update Review: ", error);
		}
    }

    const handleDeleteReview = async (reviewId) => {
        try {
			await authAPIClient.delete(`/services/${id}/reviews/${reviewId}/`, editReview);
			// console.log(res.data);
			fetchReviews();
			checkHasReviewed()
		} catch (error) {
			console.log("Error Delete Review: ", error);
		}
    }

	useEffect(() => {
		checkUserPermission();
		checkHasReviewed(); 
		fetchReviews();
	}, []);

	

	return (
		<div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Customer Reviews</h2>
				<div className="badge badge-lg">
					{reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
				</div>
			</div>

			{userCanReview && !hasReviewed && (
				<div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
					<div className="card-body">
						<h3 className="card-title text-lg">Write a Review</h3>
						<ReviewForm onSubmit={onSubmit} />
					</div>
				</div>
			)}

			<div className="divider"></div>

			{isLoading ?
				<div className="flex justify-center py-8">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			: reviews.length === 0 ?
				<div className="text-center py-8">
					<div className="text-5xl mb-4">📝</div>
					<h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
					<p className="text-base-content/70">Be the first to review this product!</p>
				</div>
			:	<ReviewList reviews={reviews} editReview={editReview} setEditReview={setEditReview} editingId={editingId} setEditingId={setEditingId} handleUpdateReview={handleUpdateReview} onDelete={handleDeleteReview}/>}
		</div>

		// <div>
		// 	{userCanReview && <ReviewForm onSubmit={onSubmit} />}
		// 	<ReviewList reviews={reviews} />
		// </div>
	);
};

export default ReviewSection;
