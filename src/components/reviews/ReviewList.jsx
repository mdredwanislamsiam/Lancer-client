import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, setEditReview, editReview, editingId, setEditingId, handleUpdateReview, onDelete}) => {
	// console.log(reviews);

	return (
		<div>
			{reviews.map((review) => (
				<ReviewCard
					key={review.id}
					review={review}
					editReview={editReview}
                    setEditReview={setEditReview}
                    isEditing={editingId === review.id}
                    onCancelClick={() => {
                        setEditingId(null); 
                    }}
                    onEditClick={() => {
                        setEditingId(review.id); 
						setEditReview({ ratings: review.ratings, comment: review.comment });
                    }}
                    handleUpdateReview={handleUpdateReview}
                    onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default ReviewList;
