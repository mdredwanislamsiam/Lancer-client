import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const ratingValue = watch("ratings", 0);
	const commentValue = watch("comment", "");
	const [focused, setFocused] = useState(false);
	const MAX_CHARS = 500;

	const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.rf-root {
					--teal: #306073;
					--teal-light: rgba(48, 96, 115, 0.07);
					--teal-mid: rgba(48, 96, 115, 0.18);
					--teal-glow: rgba(48, 96, 115, 0.22);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--error: #dc2626;
					--error-bg: #fff1f1;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Card shell ── */
				.rf-card {
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 20px;
					padding: 32px 28px;
					box-shadow: 0 4px 24px rgba(0,0,0,0.05);
					max-width: 560px;
					width: 100%;
					box-sizing: border-box;
				}

				.rf-card-header {
					margin-bottom: 28px;
				}

				.rf-eyebrow {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.16em;
					text-transform: uppercase;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 4px 12px;
					border-radius: 100px;
					margin-bottom: 10px;
				}

				.rf-eyebrow-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: var(--teal);
					animation: rf-pulse 2s ease-in-out infinite;
				}

				@keyframes rf-pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.4; transform: scale(0.7); }
				}

				.rf-title {
					font-family: 'Syne', sans-serif;
					font-size: 22px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					margin: 0 0 4px;
				}

				.rf-subtitle {
					font-size: 13px;
					color: var(--muted);
					font-weight: 300;
					line-height: 1.6;
					margin: 0;
				}

				/* ── Form layout ── */
				.rf-form {
					display: flex;
					flex-direction: column;
					gap: 24px;
				}

				/* ── Field block ── */
				.rf-field { display: flex; flex-direction: column; gap: 8px; }

				.rf-label {
					font-size: 13px;
					font-weight: 500;
					color: var(--ink);
					display: flex;
					align-items: center;
					gap: 6px;
				}

				.rf-label-icon {
					display: flex;
					align-items: center;
					color: var(--teal);
				}

				.rf-required {
					color: var(--error);
					font-size: 12px;
					margin-left: 1px;
				}

				/* ── Star rating display ── */
				.rf-star-wrap {
					display: flex;
					align-items: center;
					gap: 14px;
					flex-wrap: wrap;
				}

				.rf-rating-label {
					font-family: 'Syne', sans-serif;
					font-size: 13px;
					font-weight: 700;
					color: var(--teal);
					min-width: 64px;
					transition: opacity 0.2s ease;
					opacity: 0;
				}

				.rf-rating-label.visible { opacity: 1; }

				/* ── Textarea ── */
				.rf-textarea-wrap {
					position: relative;
				}

				.rf-textarea {
					width: 100%;
					min-height: 130px;
					padding: 14px 16px;
					border-radius: 12px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 14px;
					font-weight: 300;
					color: var(--ink);
					line-height: 1.65;
					resize: vertical;
					outline: none;
					box-sizing: border-box;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
				}

				.rf-textarea::placeholder { color: #a8bbc3; }

				.rf-textarea:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.rf-textarea.has-error {
					border-color: var(--error);
					box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
				}

				.rf-char-count {
					position: absolute;
					bottom: 10px;
					right: 14px;
					font-size: 11px;
					color: var(--muted);
					font-weight: 400;
					pointer-events: none;
					transition: color 0.2s ease;
				}

				.rf-char-count.near-limit { color: #f59e0b; }
				.rf-char-count.at-limit    { color: var(--error); }

				/* ── Error message ── */
				.rf-error {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 12.5px;
					color: var(--error);
					font-weight: 400;
					animation: rf-shake 0.35s ease;
				}

				@keyframes rf-shake {
					0%, 100% { transform: translateX(0); }
					25%       { transform: translateX(-4px); }
					75%       { transform: translateX(4px); }
				}

				/* ── Divider ── */
				.rf-divider {
					height: 1px;
					background: var(--border);
					margin: 0 -4px;
				}

				/* ── Submit button ── */
				.rf-submit-btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
					padding: 13px 32px;
					border-radius: 11px;
					border: none;
					background: var(--teal);
					color: #ffffff;
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					letter-spacing: 0.02em;
					cursor: pointer;
					transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
					width: 100%;
					position: relative;
					overflow: hidden;
				}

				.rf-submit-btn::before {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
					pointer-events: none;
				}

				.rf-submit-btn:hover:not(:disabled) {
					background: #3d7a91;
					transform: translateY(-2px);
					box-shadow: 0 8px 24px var(--teal-glow);
				}

				.rf-submit-btn:active:not(:disabled) {
					transform: translateY(0);
					box-shadow: none;
				}

				.rf-submit-btn:disabled {
					opacity: 0.65;
					cursor: not-allowed;
				}

				/* Spinner */
				.rf-spinner {
					width: 15px; height: 15px;
					border: 2px solid rgba(255,255,255,0.3);
					border-top-color: #ffffff;
					border-radius: 50%;
					animation: rf-spin 0.7s linear infinite;
					flex-shrink: 0;
				}

				@keyframes rf-spin { to { transform: rotate(360deg); } }

				/* ── Progress dots (rating hint) ── */
				.rf-rating-dots {
					display: flex;
					gap: 4px;
					margin-top: 2px;
				}

				.rf-rating-dot {
					width: 6px; height: 6px;
					border-radius: 50%;
					background: var(--border);
					transition: background 0.2s ease, transform 0.2s ease;
				}

				.rf-rating-dot.filled {
					background: var(--teal);
					transform: scale(1.2);
				}
			`}</style>

			<div className="rf-root">
				<div className="rf-card">
					{/* Header */}
					<div className="rf-card-header">
						<div className="rf-eyebrow">
							<span className="rf-eyebrow-dot" />
							Share Your Experience
						</div>
						<h2 className="rf-title">Leave a Review</h2>
						<p className="rf-subtitle">Your feedback helps others make better decisions.</p>
					</div>

					<form className="rf-form" onSubmit={handleSubmit(onSubmit)}>
						{/* Rating */}
						<div className="rf-field">
							<label className="rf-label">
								<span className="rf-label-icon">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>
								</span>
								Rating <span className="rf-required">*</span>
							</label>

							<div className="rf-star-wrap">
								<StarRating
									onChange={(value) => setValue("ratings", value, { shouldValidate: true })}
									ratings={ratingValue}
								/>
								<span className={`rf-rating-label ${ratingValue > 0 ? "visible" : ""}`}>
									{ratingLabels[ratingValue] || ""}
								</span>
							</div>

							{/* Progress dots */}
							<div className="rf-rating-dots">
								{[1, 2, 3, 4, 5].map((i) => (
									<span key={i} className={`rf-rating-dot ${i <= ratingValue ? "filled" : ""}`} />
								))}
							</div>

							<input type="hidden" {...register("ratings", { required: true, min: 1 })} />
							{errors.ratings && (
								<p className="rf-error">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									Please select a rating
								</p>
							)}
						</div>

						<div className="rf-divider" />

						{/* Comment */}
						<div className="rf-field">
							<label className="rf-label">
								<span className="rf-label-icon">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									</svg>
								</span>
								Your Review <span className="rf-required">*</span>
							</label>

							<div className="rf-textarea-wrap">
								<textarea
									{...register("comment", {
										required: true,
										maxLength: MAX_CHARS,
									})}
									className={`rf-textarea ${errors.comment ? "has-error" : ""}`}
									placeholder="Share your experience — what went well, what could be better…"
									maxLength={MAX_CHARS}
									onFocus={() => setFocused(true)}
									onBlur={() => setFocused(false)}
								/>
								<span
									className={`rf-char-count ${
										(commentValue?.length || 0) >= MAX_CHARS ? "at-limit"
										: (commentValue?.length || 0) >= MAX_CHARS * 0.85 ? "near-limit"
										: ""
									}`}>
									{commentValue?.length || 0}/{MAX_CHARS}
								</span>
							</div>

							{errors.comment && (
								<p className="rf-error">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									{errors.comment.type === "maxLength" ?
										`Review cannot exceed ${MAX_CHARS} characters`
									:	"Please write a review"}
								</p>
							)}
						</div>

						{/* Submit */}
						<button type="submit" className="rf-submit-btn" disabled={isSubmitting}>
							{isSubmitting ?
								<>
									<span className="rf-spinner" /> Submitting…
								</>
							:	<>
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<line x1="22" y1="2" x2="11" y2="13" />
										<polygon points="22 2 15 22 11 13 2 9 22 2" />
									</svg>
									Submit Review
								</>
							}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ReviewForm;
