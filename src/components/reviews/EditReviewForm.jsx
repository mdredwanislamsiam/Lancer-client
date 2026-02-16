import React from 'react';
import StarRating from './StarRating';

const EditReviewForm = ({ setEditReview, editReview, onCancelClick,handleUpdateReview}) => {
    return (
		<div className="mt-4 space-y-4 bg-base-200 p-4 rounded-lg">
			{/* Rating */}
			<div className=''>
				<label className="label-text font-medium mb-1 block">Rating</label>
				<StarRating
					ratings={editReview.ratings}
					onChange={(value) => setEditReview({ ...editReview, ratings: value })}
				/>
			</div>
			{/* Comment */}
			<div>
				<label className="label-text font-medium mb-1 block">Comment</label>
				<textarea
					value={editReview.comment}
					onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
					className="textarea outline-none w-full min-h-[100px]"
				/>
			</div>
			{/* Buttons */}
			<div className="flex gap-2">
				<button onClick={() => handleUpdateReview()} className="btn btn-sm btn-ghost btn-success text-green-600 hover:text-green-900 text-sm">Save Changes</button>
				<button onClick={onCancelClick} className="btn btn-sm btn-ghost text-sm">
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EditReviewForm;