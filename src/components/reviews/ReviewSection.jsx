import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router";
import authAPIClient from "../../services/auth-api-client";
import ReviewList from "./ReviewList";

/* ─── star display ──────────────────────────────────────────────── */
const Stars = ({ count = 0, total = 5 }) => (
	<div className="flex items-center gap-0.5">
		{[...Array(total)].map((_, i) => (
			<svg
				key={i}
				viewBox="0 0 16 16"
				className="w-3.5 h-3.5"
				fill={i < count ? "#306073" : "none"}
				stroke={i < count ? "#306073" : "#d0d0d0"}
				strokeWidth="1.5">
				<path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.35l-3.71 2.2.71-4.13L2 5.5l4.15-.75Z" />
			</svg>
		))}
	</div>
);

/* ─── summary bar ───────────────────────────────────────────────── */
const RatingSummary = ({ reviews }) => {
	if (reviews.length === 0) return null;
	const avg = reviews.reduce((s, r) => s + (r.ratings ?? 0), 0) / reviews.length;
	const counts = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: reviews.filter((r) => r.ratings === star).length,
	}));

	return (
		<div className="bg-[#fafafa] border border-[#ebebeb] p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
			{/* big score */}
			<div className="flex flex-col items-center flex-shrink-0 w-24">
				<span className="text-4xl font-extrabold text-[#0d0d0d] tracking-tight leading-none">
					{avg.toFixed(1)}
				</span>
				<Stars count={Math.round(avg)} />
				<span className="text-xs text-[#888] mt-1">
					{reviews.length} review{reviews.length !== 1 ? "s" : ""}
				</span>
			</div>

			{/* bar breakdown */}
			<div className="flex-1 w-full space-y-1.5">
				{counts.map(({ star, count }) => {
					const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
					return (
						<div key={star} className="flex items-center gap-2.5">
							<span className="text-xs text-[#555] w-3 text-right">{star}</span>
							<svg viewBox="0 0 12 12" className="w-3 h-3 flex-shrink-0" fill="#306073">
								<path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.4 3.22 8.03l.53-3.09L1.5 3.75l3.1-.45Z" />
							</svg>
							<div className="flex-1 h-1.5 bg-[#ebebeb] overflow-hidden rounded-full">
								<div
									className="h-full bg-[#306073] rounded-full transition-all duration-500"
									style={{ width: `${pct}%` }}
								/>
							</div>
							<span className="text-xs text-[#888] w-6 text-right">{count}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

/* ─── skeleton reviews ──────────────────────────────────────────── */
const SkeletonReviews = () => (
	<div className="space-y-4">
		{[...Array(3)].map((_, i) => (
			<div key={i} className="border border-[#ebebeb] p-5 animate-pulse">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-9 h-9 rounded-full bg-[#f0f0f0]" />
					<div className="space-y-1.5">
						<div className="h-3 w-24 bg-[#ebebeb] rounded" />
						<div className="h-2.5 w-16 bg-[#f2f2f2] rounded" />
					</div>
				</div>
				<div className="space-y-2">
					<div className="h-3 w-full bg-[#f5f5f5] rounded" />
					<div className="h-3 w-4/5 bg-[#f5f5f5] rounded" />
				</div>
			</div>
		))}
	</div>
);

/* ─── empty state ───────────────────────────────────────────────── */
const EmptyReviews = () => (
	<div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
		<div className="w-14 h-14 rounded-full border-2 border-dashed border-[#c8dce2] flex items-center justify-center">
			<svg viewBox="0 0 24 24" fill="none" stroke="#306073" strokeWidth="1.5" className="w-6 h-6 opacity-60">
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		</div>
		<div>
			<p className="text-sm font-bold text-[#0d0d0d]">No reviews yet</p>
			<p className="text-xs text-[#888] mt-1">Be the first to share your experience</p>
		</div>
	</div>
);

/* ─── write-a-review panel ──────────────────────────────────────── */
const WriteReviewPanel = ({ onSubmit }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className=" overflow-hidden">
			{/* toggle header */}
			<button
				onClick={() => setOpen((v) => !v)}
				className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#fafafa] transition-colors duration-150 group">
				<div className="flex items-center gap-3">
					<span className="w-px h-5 bg-[#306073]" />
					<span className="text-sm font-bold text-[#0d0d0d] tracking-tight">Write a Review</span>
				</div>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="w-4 h-4 text-[#888] transition-transform duration-300"
					style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
					<path d="M3 6l5 5 5-5" />
				</svg>
			</button>

			{/* collapsible form */}
			<div
				className="overflow-hidden transition-all duration-300"
				style={{ maxHeight: open ? "800px" : "0px", opacity: open ? 1 : 0 }}>
				<div className=" pb-5 pt-2">
					<ReviewForm
						onSubmit={(data) => {
							onSubmit(data);
							setOpen(false);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

/* ─── main component ────────────────────────────────────────────── */
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
		} catch (e) {
			console.log("Error fetchReviews:", e);
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = async (data) => {
		try {
			await authAPIClient.post(`/services/${id}/reviews/`, data);
			fetchReviews();
			checkHasReviewed();
		} catch (e) {
			console.log("Error submitting review:", e);
		}
	};

	const checkUserPermission = async () => {
		try {
			const res = await authAPIClient.get(`/orders/has-ordered/${id}`);
			setUserCanReview(res.data.has_ordered);
		} catch (e) {
			console.log("Error checking permission:", e);
		}
	};

	const checkHasReviewed = async () => {
		try {
			const res = await authAPIClient.get(`/services/${id}/reviews/has-reviewed/`);
			setHasReviewed(res.data.has_reviewed);
		} catch (e) {
			console.log("Error checking has-reviewed:", e);
		}
	};

	const handleUpdateReview = async (reviewId) => {
		try {
			await authAPIClient.put(`/services/${id}/reviews/${reviewId}/`, editReview);
			setEditingId(null);
			fetchReviews();
		} catch (e) {
			console.log("Error updating review:", e);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		try {
			await authAPIClient.delete(`/services/${id}/reviews/${reviewId}/`);
			fetchReviews();
			checkHasReviewed();
		} catch (e) {
			console.log("Error deleting review:", e);
		}
	};

	useEffect(() => {
		checkUserPermission();
		checkHasReviewed();
		fetchReviews();
	}, []);

	return (
		<section className="mt-12 max-w-3xl mx-auto px-4 pb-16 space-y-6">
			{/* ── section heading ── */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="w-px h-6 bg-[#306073]" />
					<h2 className="text-lg sm:text-xl font-bold text-[#0d0d0d] tracking-tight">Customer Reviews</h2>
				</div>

				{/* count badge */}
				<span className="flex items-center gap-1.5 border border-[#dde9ec] bg-[#f5f9fa] text-[#306073] text-xs font-semibold px-3 py-1 rounded-full">
					<svg viewBox="0 0 12 12" fill="#306073" className="w-3 h-3">
						<path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.4 3.22 8.03l.53-3.09L1.5 3.75l3.1-.45Z" />
					</svg>
					{reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
				</span>
			</div>

			{/* ── rating summary bar ── */}
			{!isLoading && reviews.length > 0 && <RatingSummary reviews={reviews} />}

			{/* ── divider ── */}
			<div className="border-t border-[#f0f0f0]" />

			{/* ── write review (collapsible) ── */}
			{userCanReview && !hasReviewed && <WriteReviewPanel onSubmit={onSubmit} />}

			{/* ── already reviewed notice ── */}
			{userCanReview && hasReviewed && (
				<div className="flex items-center gap-3 border border-[#dde9ec] bg-[#f5f9fa] px-4 py-3 text-sm text-[#306073] font-medium">
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="#306073"
						strokeWidth="1.8"
						className="w-4 h-4 flex-shrink-0">
						<circle cx="8" cy="8" r="7" />
						<path d="M5 8l2 2 4-4" />
					</svg>
					You've already reviewed this service. Edit or delete your review below.
				</div>
			)}

			{/* ── cannot review notice (non-buyer) ── */}
			{!userCanReview && (
				<div className="flex items-center gap-3 border border-[#ebebeb] bg-[#fafafa] px-4 py-3 text-xs text-[#888]">
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="#aaa"
						strokeWidth="1.8"
						className="w-4 h-4 flex-shrink-0">
						<circle cx="8" cy="8" r="7" />
						<path d="M8 5v4M8 11v.5" />
					</svg>
					Only verified buyers can leave a review.
				</div>
			)}

			{/* ── review list / loading / empty ── */}
			{isLoading ?
				<SkeletonReviews />
			: reviews.length === 0 ?
				<EmptyReviews />
			:	<ReviewList
					reviews={reviews}
					editReview={editReview}
					setEditReview={setEditReview}
					editingId={editingId}
					setEditingId={setEditingId}
					handleUpdateReview={handleUpdateReview}
					onDelete={handleDeleteReview}
				/>
			}
		</section>
	);
};

export default ReviewSection;
