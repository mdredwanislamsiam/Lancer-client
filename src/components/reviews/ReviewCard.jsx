import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { FaStar } from "react-icons/fa";
import EditReviewForm from "./EditReviewForm";
import defImg from "../../assets/images/DefaultImage.jpg"
import { TbTrash } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router";

const ReviewCard = ({
	review,
	setEditReview,
	editReview,
	onEditClick,
	isEditing,
	onCancelClick,
    handleUpdateReview,
    onDelete
}) => {
	const { user } = useAuthContext();
	// console.log(user.id, review.user.id); 
	return (
		<div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border border-base-200 rounded-xl overflow-hidden mt-2">
			<div className="card-body">
				<div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
					<div>
						<Link
							to={`/infoPage/${review.user.id}`}
							className="flex gap-2 justify-center items-center my-2 cursor-pointer">
							<img
								src={review.user.image || defImg}
								alt=""
								className="w-6 h-6 lg:w-8 lg:h-8 rounded-full shadow-sm"
							/>
							<p className="font-semibold my-2 text-xs lg:text-sm">{review.user.username}</p>
						</Link>
						<div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-5 py-1 w-fit">
							<div className="flex text-yellow-400 ">
								{[...Array(5)].map((_, i) => (
									<FaStar
										key={i}
										size={20}
										className={
											i < review.ratings ?
												"text-yellow-500 w-4 lg:w-8 "
											:	"text-gray-300 w-4 lg:w-8 "
										}
									/>
								))}
							</div>
						</div>
					</div>

					{user && user.id === review.user.id && (
						<div className="flex gap-2 h-full">
							<button onClick={onEditClick} className="btn btn-ghost btn-primary">
								<BiEditAlt size={25} className="w-4 lg:w-12" />
							</button>
							<button onClick={() => onDelete(review.id)} className="btn btn-ghost btn-error">
								<TbTrash size={25} className="w-4 lg:w-12" />
							</button>
						</div>
					)}
				</div>
				{isEditing ?
					<EditReviewForm
						editReview={editReview}
						setEditReview={setEditReview}
						onCancelClick={onCancelClick}
						handleUpdateReview={() => handleUpdateReview(review.id)}
					/>
				:	<div className="mt-4 bg-blue-200 py-1 px-3 lg:px-10 rounded-lg shadow-lg text-black">
						<p className="leading-relaxed whitespace-pre-line text-xs  lg:text-sm break-words font-newfont1">{review.comment}</p>
					</div>
				}
			</div>
		</div>
	);
};

export default ReviewCard;
