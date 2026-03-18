import { useEffect, useState } from "react";
import ReviewCardHome from "./ReviewCardHome";
import authAPIClient from "../../services/auth-api-client";

/* ── Skeleton Card ─────────────────────────────────────────────────── */
const SkeletonCard = ({ delay = 0 }) => (
	<div className="review-skeleton" style={{ animationDelay: `${delay}s` }}>
		<div className="sk-line sk-line--short" />
		<div className="sk-line" />
		<div className="sk-line" />
		<div className="sk-line sk-line--med" />
		<div className="sk-divider" />
		<div className="sk-stars" />
		<div className="sk-author">
			<div className="sk-avatar" />
			<div className="sk-author-text">
				<div className="sk-line sk-line--name" />
				<div className="sk-line sk-line--tag" />
			</div>
		</div>
	</div>
);

/* ── Empty State ───────────────────────────────────────────────────── */
const EmptyState = () => (
	<div className="reviews-empty">
		<div className="reviews-empty-icon">
			<svg
				width="40"
				height="40"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		</div>
		<p className="reviews-empty-title">No reviews yet</p>
		<p className="reviews-empty-sub">Client reviews will appear here once submitted.</p>
	</div>
);

/* ── Main Component ────────────────────────────────────────────────── */
const ReviewsOfClients = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchReviews = async () => {
		setLoading(true);
		try {
			const res = await authAPIClient.get("/reviews");
			setReviews(res.data.reviews ?? []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.reviews-section {
					font-family: 'DM Sans', sans-serif;
					padding: 72px 24px 80px;
					background: #ffffff;
					max-width: 1200px;
					margin: 0 auto;
				}

				/* ── Header ── */
				.reviews-header {
					text-align: center;
					margin-bottom: 52px;
				}

				.reviews-eyebrow {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.18em;
					text-transform: uppercase;
					color: #306073;
					background: rgba(48, 96, 115, 0.07);
					border: 1px solid rgba(48, 96, 115, 0.18);
					padding: 6px 16px;
					border-radius: 100px;
					margin-bottom: 18px;
				}

				.reviews-eyebrow-dot {
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: #306073;
					animation: pulse-dot 2s ease-in-out infinite;
				}

				@keyframes pulse-dot {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.4; transform: scale(0.7); }
				}

				.reviews-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(26px, 3.5vw, 42px);
					font-weight: 800;
					color: #0e1a20;
					letter-spacing: -0.025em;
					line-height: 1.1;
					margin: 0 0 12px;
				}

				.reviews-title span {
					color: #306073;
				}

				.reviews-subtitle {
					font-size: 15px;
					color: #6b7c85;
					font-weight: 300;
					max-width: 420px;
					margin: 0 auto;
					line-height: 1.7;
				}

				/* ── Count badge ── */
				.reviews-count-badge {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					margin-top: 20px;
					font-size: 13px;
					font-weight: 500;
					color: #0e1a20;
					background: #f5f8fa;
					border: 1px solid #e4eaed;
					padding: 6px 16px;
					border-radius: 100px;
				}

				.reviews-count-badge strong {
					color: #306073;
					font-weight: 700;
				}

				/* ── Grid ── */
				.reviews-grid {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 22px;
				}

				@media (max-width: 900px) {
					.reviews-grid { grid-template-columns: repeat(2, 1fr); }
				}
				@media (max-width: 560px) {
					.reviews-grid { grid-template-columns: 1fr; }
				}

				/* ── Skeleton ── */
				.review-skeleton {
					background: #ffffff;
					border: 1px solid #e4eaed;
					border-radius: 20px;
					padding: 28px 24px 24px;
					display: flex;
					flex-direction: column;
					gap: 12px;
					animation: sk-fade 1.6s ease-in-out infinite;
				}

				@keyframes sk-fade {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.5; }
				}

				.sk-line {
					height: 12px;
					border-radius: 6px;
					background: linear-gradient(90deg, #f0f4f6 25%, #e4eaed 50%, #f0f4f6 75%);
					background-size: 200% 100%;
					animation: sk-shimmer 1.6s linear infinite;
					width: 100%;
				}

				.sk-line--short { width: 45%; height: 10px; }
				.sk-line--med   { width: 70%; }
				.sk-line--name  { width: 60%; height: 13px; }
				.sk-line--tag   { width: 40%; height: 10px; margin-top: 4px; }

				@keyframes sk-shimmer {
					0%   { background-position: 200% 0; }
					100% { background-position: -200% 0; }
				}

				.sk-divider {
					height: 1px;
					background: #e4eaed;
					margin: 4px 0;
				}

				.sk-stars {
					height: 16px;
					width: 100px;
					border-radius: 4px;
					background: linear-gradient(90deg, #f0f4f6 25%, #e4eaed 50%, #f0f4f6 75%);
					background-size: 200% 100%;
					animation: sk-shimmer 1.6s linear infinite;
				}

				.sk-author {
					display: flex;
					align-items: center;
					gap: 12px;
					background: #f5f8fa;
					border-radius: 12px;
					padding: 10px 14px;
					margin-top: 4px;
				}

				.sk-avatar {
					width: 44px;
					height: 44px;
					border-radius: 50%;
					flex-shrink: 0;
					background: linear-gradient(90deg, #e4eaed 25%, #d6dfe3 50%, #e4eaed 75%);
					background-size: 200% 100%;
					animation: sk-shimmer 1.6s linear infinite;
				}

				.sk-author-text { flex: 1; }

				/* ── Empty ── */
				.reviews-empty {
					grid-column: 1 / -1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 64px 24px;
					text-align: center;
					gap: 12px;
				}

				.reviews-empty-icon {
					width: 72px;
					height: 72px;
					border-radius: 50%;
					background: rgba(48, 96, 115, 0.07);
					border: 1px solid rgba(48, 96, 115, 0.15);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #306073;
					margin-bottom: 8px;
				}

				.reviews-empty-title {
					font-family: 'Syne', sans-serif;
					font-size: 18px;
					font-weight: 700;
					color: #0e1a20;
					margin: 0;
				}

				.reviews-empty-sub {
					font-size: 14px;
					color: #7a9aaa;
					font-weight: 300;
					margin: 0;
				}

				/* ── Card entrance ── */
				.review-card-enter {
					animation: card-in 0.5s ease both;
				}

				@keyframes card-in {
					from { opacity: 0; transform: translateY(24px); }
					to   { opacity: 1; transform: translateY(0); }
				}
			`}</style>

			<section className="reviews-section">
				{/* Header */}
				<div className="reviews-header">
					<h2 className="reviews-title">
						What our clients <span>say</span>
					</h2>
					<p className="reviews-subtitle">
						Real feedback from real people — every review is from a verified transaction on our platform.
					</p>
					{!loading && reviews.length > 0 && (
						<div className="reviews-count-badge">
							<strong>{reviews.length}</strong> verified review{reviews.length !== 1 ? "s" : ""}
						</div>
					)}
				</div>

				{/* Grid */}
				<div className="reviews-grid">
					{loading ?
						[...Array(6)].map((_, i) => <SkeletonCard key={i} delay={i * 0.1} />)
					: reviews.length === 0 ?
						<EmptyState />
					:	reviews.map((review, i) => (
							<div
								key={review.id}
								className="review-card-enter"
								style={{ animationDelay: `${i * 0.07}s` }}>
								<ReviewCardHome review={review} />
							</div>
						))
					}
				</div>
			</section>
		</>
	);
};

export default ReviewsOfClients;
