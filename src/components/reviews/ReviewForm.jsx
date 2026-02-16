import React from 'react';
import { useForm, Watch } from 'react-hook-form';
import StarRating from './StarRating';

const ReviewForm = ({onSubmit}) => {
    const { register, watch, setValue, handleSubmit, formState: { errors, isSubmitting }, } = useForm(); 
    
    const ratingValue = watch("ratings", 0); 
    return (
		<form className="space-y-4 mt-5" onSubmit={handleSubmit(onSubmit)} >

			{/* Rating  */}
			<div>
				<label className="label font-medium">
					<span className="label-text">Rating</span>
                </label>
                <StarRating onChange ={(value) => setValue("ratings", value)} ratings= {ratingValue}/> 
				{errors.ratings && <p className="text-error text-sm mt-1">Rating is required</p>}
				<input type="hidden" {...register("ratings", { required: true })} />
			</div>

			
			{/* Comment */}
			<div className="form-control">
				<label className="label font-medium">
					<span className="label-text">Your Review</span>
				</label>
				<div>
					<textarea
						{...register("comment", { required: true })}
						className="textarea textarea-bordered min-h-[120px] focus:textarea-primary outline-none w-full"
						placeholder="Share your experience with this product..."
					/>
				</div>
				{errors.comment && <p className="text-error text-sm mt-1">Comment is required</p>}
			</div>

			<button type="submit" className="btn btn-primary w-full md:w-auto" disabled={isSubmitting}>
				{isSubmitting ?
					<>
						<span className="loading loading-spinner loading-xs mr-2"></span>
						Submitting...
					</>
				:	"Submit Review"}
			</button>
		</form>
	);
};

export default ReviewForm;