import React, { useState } from "react";
import defImg from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewCardHome = ({ review }) => {
	const { user } = useAuthContext();
	const [imgError, setImgError] = useState(false);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

				.review-card {
					font-family: 'DM Sans', sans-serif;
					background: #ffffff;
					border: 1px solid #e4eaed;
					border-radius: 20px;
					padding: 28px 24px 24px;
					height: 100%;
					box-sizing: border-box;
					position: relative;
					overflow: hidden;
					transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
					box-shadow: 0 2px 16px rgba(0,0,0,0.05);
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.review-card::before {
					content: '';
					position: absolute;
					top: 0; left: 0; right: 0;
					height: 3px;
					background: linear-gradient(90deg, #306073, #4a8fa8);
					transform: scaleX(0);
					transform-origin: left;
					transition: transform 0.4s ease;
				}

				.review-card:hover::before {
					transform: scaleX(1);
				}

				.review-card:hover {
					transform: translateY(-6px);
					box-shadow: 0 24px 52px rgba(48, 96, 115, 0.13);
					border-color: rgba(48, 96, 115, 0.3);
				}

				/* Quote mark watermark */
				.review-card-quote-watermark {
					position: absolute;
					top: 12px;
					right: 18px;
					font-family: 'Syne', sans-serif;
					font-size: 80px;
					font-weight: 800;
					color: rgba(48, 96, 115, 0.07);
					line-height: 1;
					pointer-events: none;
					user-select: none;
				}

				/* Comment block */
				.review-comment-block {
					position: relative;
					flex: 1;
				}

				.review-open-quote {
					display: block;
					font-family: 'Syne', sans-serif;
					font-size: 42px;
					font-weight: 800;
					color: #306073;
					line-height: 0.6;
					margin-bottom: 10px;
					opacity: 0.7;
				}

				.review-comment-text {
					font-size: 13.5px;
					line-height: 1.75;
					color: #3d4f57;
					font-weight: 300;
					font-style: italic;
					margin: 0;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				/* Service label */
				.review-service {
					font-family: 'Syne', sans-serif;
					font-size: 13px;
					font-weight: 700;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					color: #0e1a20;
					padding-bottom: 16px;
					border-bottom: 1px solid #e4eaed;
				}

				/* Stars */
				.review-stars {
					display: flex;
					gap: 3px;
					align-items: center;
				}

				.star-filled {
					color: #306073;
					filter: drop-shadow(0 0 3px rgba(48,96,115,0.4));
				}

				.star-empty {
					color: #dde5e9;
				}

				.review-rating-label {
					margin-left: 8px;
					font-size: 12px;
					font-weight: 500;
					color: #7a9aaa;
					letter-spacing: 0.04em;
				}

				/* Author row */
				.review-author-link {
					display: flex;
					align-items: center;
					gap: 12px;
					text-decoration: none;
					padding: 10px 14px;
					border-radius: 12px;
					background: #f5f8fa;
					border: 1px solid transparent;
					transition: background 0.2s ease, border-color 0.2s ease;
					margin-top: auto;
				}

				.review-author-link:hover {
					background: rgba(48, 96, 115, 0.06);
					border-color: rgba(48, 96, 115, 0.2);
				}

				.review-avatar-wrap {
					position: relative;
					flex-shrink: 0;
				}

				.review-avatar {
					width: 44px;
					height: 44px;
					border-radius: 50%;
					object-fit: cover;
					border: 2px solid #ffffff;
					box-shadow: 0 0 0 2px #306073;
					display: block;
				}

				.review-avatar-dot {
					position: absolute;
					bottom: 1px;
					right: 1px;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background: #306073;
					border: 2px solid #ffffff;
				}

				.review-author-info {
					flex: 1;
					min-width: 0;
				}

				.review-author-name {
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					color: #0e1a20;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					display: block;
				}

				.review-author-tag {
					font-size: 11px;
					color: #7a9aaa;
					font-weight: 400;
					letter-spacing: 0.04em;
				}

				.review-arrow {
					color: #306073;
					opacity: 0;
					transform: translateX(-4px);
					transition: opacity 0.2s ease, transform 0.2s ease;
					flex-shrink: 0;
				}

				.review-author-link:hover .review-arrow {
					opacity: 1;
					transform: translateX(0);
				}
			`}</style>

			<div className="review-card">
				{/* Decorative watermark */}
				<span className="review-card-quote-watermark">"</span>

				{/* Comment */}
				<div className="review-comment-block">
					<span className="review-open-quote">"</span>
					<p className="review-comment-text">{review?.comment}</p>
				</div>

				{/* Service */}
				<div className="review-service">{review?.service}</div>

				{/* Stars */}
				<div className="review-stars">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill={i < review?.ratings ? "currentColor" : "none"}
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={i < review?.ratings ? "star-filled" : "star-empty"}>
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
						</svg>
					))}
					<span className="review-rating-label">{review?.ratings}/5</span>
				</div>

				{/* Author */}
				<Link to={user ? `/infoPage/${review?.user?.id}` : `/login`} className="review-author-link">
					<div className="review-avatar-wrap">
						<img
							src={imgError ? defImg : review?.user?.image || defImg}
							alt={review?.user?.username || "Reviewer"}
							className="review-avatar"
							onError={() => setImgError(true)}
						/>
						<span className="review-avatar-dot" />
					</div>
					<div className="review-author-info">
						<span className="review-author-name">{review?.user?.username}</span>
						<span className="review-author-tag">Verified Client</span>
					</div>
					<svg
						className="review-arrow"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</Link>
			</div>
		</>
	);
};

export default ReviewCardHome;
