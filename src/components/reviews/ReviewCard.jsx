import { FaStar } from "react-icons/fa";
import EditReviewForm from "./EditReviewForm";
import defImg from "../../assets/images/DefaultImage.jpg";
import { TbTrash } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewCard = ({
	review,
	setEditReview,
	editReview,
	onEditClick,
	isEditing,
	onCancelClick,
	handleUpdateReview,
	onDelete,
}) => {
	const { user } = useAuthContext();

	return (
		<div style={styles.card}>
			{/* Accent bar */}
			<div style={styles.accentBar} />

			<div style={styles.cardBody}>
				{/* Top row: user info + actions */}
				<div style={styles.topRow} className="px-5 py-4">
					{/* User info */}
					<Link to={`/infoPage/${review.user.id}`} style={styles.userLink}>
						<div style={styles.avatarWrap}>
							<img src={review.user.image || defImg} alt={review.user.username} style={styles.avatar} />
							<div style={styles.avatarRing} />
						</div>
						<div style={styles.userMeta}>
							<span style={styles.username}>{review.user.username}</span>
							<span style={styles.reviewerLabel}>Reviewer</span>
						</div>
					</Link>

					{/* Rating + Actions */}
					<div style={styles.rightSection}>
						<div style={styles.starsRow}>
							{[...Array(5)].map((_, i) => (
								<FaStar
									key={i}
									style={{
										...styles.star,
										color: i < review.ratings ? "#306073" : "#D1D5DB",
										filter:
											i < review.ratings ? "drop-shadow(0 0 4px rgba(48,96,115,0.5))" : "none",
									}}
								/>
							))}
						</div>
						<span style={styles.ratingText}>
							{review.ratings}
							<span style={styles.ratingMax}>/5</span>
						</span>
					</div>
				</div>



				{/* Comment or Edit Form */}
				{isEditing ?
					<EditReviewForm
						editReview={editReview}
						setEditReview={setEditReview}
						onCancelClick={onCancelClick}
						handleUpdateReview={() => handleUpdateReview(review.id)}
					/>
				:	<div style={styles.commentBlock}>
						<span style={styles.quoteIcon}>"</span>
						<p style={styles.commentText}>{review.comment}</p>
					</div>
				}

				{/* Footer: actions (only for owner) */}
				{user && user.id === review.user.id && (
					<div style={styles.actions} className="px-5 py-2">
						<button
							onClick={onEditClick}
							style={styles.editBtn}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#306073";
								e.currentTarget.style.color = "#fff";
								e.currentTarget.style.borderColor = "#306073";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = "#306073";
								e.currentTarget.style.borderColor = "rgba(48,96,115,0.3)";
							}}>
							<BiEditAlt size={15} />
							Edit
						</button>
						<button
							onClick={() => onDelete(review.id)}
							style={styles.deleteBtn}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#111";
								e.currentTarget.style.color = "#fff";
								e.currentTarget.style.borderColor = "#111";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = "#111";
								e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
							}}>
							<TbTrash size={15} />
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	card: {
		position: "relative",
		background: "#ffffff",
		border: "1px solid rgba(48,96,115,0.12)",
		borderRadius: "16px",
		overflow: "hidden",
		marginTop: "12px",
		boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(48,96,115,0.06)",
		transition: "box-shadow 0.25s ease, transform 0.25s ease",
		cursor: "default",
	},
	
	topRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		gap: "12px",
	},
	userLink: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
		textDecoration: "none",
		color: "inherit",
	},
	avatarWrap: {
		position: "relative",
		width: "42px",
		height: "42px",
	},
	avatar: {
		width: "42px",
		height: "42px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "2px solid #306073",
	},
	avatarRing: {
		position: "absolute",
		inset: "-3px",
		borderRadius: "50%",
		border: "1.5px solid rgba(48,96,115,0.2)",
		pointerEvents: "none",
	},
	userMeta: {
		display: "flex",
		flexDirection: "column",
	},
	username: {
		fontSize: "14px",
		fontWeight: "600",
		color: "#111111",
		letterSpacing: "-0.01em",
		lineHeight: 1.2,
	},
	reviewerLabel: {
		fontSize: "11px",
		color: "#306073",
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		fontWeight: "500",
		marginTop: "2px",
	},
	rightSection: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	starsRow: {
		display: "flex",
		gap: "2px",
		alignItems: "center",
	},
	star: {
		width: "17px",
		height: "17px",
		transition: "color 0.2s",
		flexShrink: 0,
	},
	ratingText: {
		fontSize: "18px",
		fontWeight: "700",
		color: "#111",
		lineHeight: 1,
	},
	ratingMax: {
		fontSize: "12px",
		fontWeight: "400",
		color: "#999",
	},
	divider: {
		height: "1px",
		background: "rgba(48,96,115,0.08)",
		margin: "14px 0",
	},
	commentBlock: {
		position: "relative",
		padding: "14px 18px 14px 36px",
		background: "linear-gradient(135deg, rgba(48,96,115,0.04) 0%, rgba(48,96,115,0.02) 100%)",
		borderRadius: "10px",
		border: "1px solid rgba(48,96,115,0.08)",
	},
	quoteIcon: {
		position: "absolute",
		top: "6px",
		left: "12px",
		fontSize: "36px",
		lineHeight: 1,
		color: "#306073",
		opacity: 0.2,
		fontFamily: "Georgia, serif",
		userSelect: "none",
	},
	commentText: {
		fontSize: "14px",
		lineHeight: "1.75",
		color: "#333333",
		whiteSpace: "pre-line",
		wordBreak: "break-word",
		margin: 0,
		fontWeight: "400",
	},
	actions: {
		display: "flex",
		gap: "8px",
		marginTop: "14px",
		justifyContent: "flex-end",
	},
	editBtn: {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		padding: "7px 16px",
		fontSize: "12px",
		fontWeight: "600",
		letterSpacing: "0.02em",
		color: "#306073",
		background: "transparent",
		border: "1px solid rgba(48,96,115,0.3)",
		borderRadius: "8px",
		cursor: "pointer",
		transition: "all 0.18s ease",
		outline: "none",
	},
	deleteBtn: {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		padding: "7px 16px",
		fontSize: "12px",
		fontWeight: "600",
		letterSpacing: "0.02em",
		color: "#111",
		background: "transparent",
		border: "1px solid rgba(0,0,0,0.2)",
		borderRadius: "8px",
		cursor: "pointer",
		transition: "all 0.18s ease",
		outline: "none",
	},
};

export default ReviewCard;
