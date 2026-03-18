import React, { useState } from "react";
import StarRating from "./StarRating";

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
const MAX_CHARS = 500;

const EditReviewForm = ({ setEditReview, editReview, onCancelClick, handleUpdateReview }) => {
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		setSaving(true);
		try {
			await handleUpdateReview();
		} finally {
			setSaving(false);
		}
	};

	const charCount = editReview?.comment?.length || 0;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.erf-root {
					--teal: #306073;
					--teal-light: rgba(48, 96, 115, 0.07);
					--teal-mid: rgba(48, 96, 115, 0.18);
					--teal-glow: rgba(48, 96, 115, 0.22);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Wrapper ── */
				.erf-card {
					background: #ffffff;
					border: 1px solid var(--teal-mid);
					overflow: hidden;
					animation: erf-in 0.3s cubic-bezier(0.34, 1.3, 0.64, 1) both;
				}

				@keyframes erf-in {
					from { opacity: 0; transform: translateY(-10px) scale(0.98); }
					to   { opacity: 1; transform: translateY(0) scale(1); }
				}

				/* ── Header strip ── */
				.erf-header {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 14px 18px 12px;
					border-bottom: 1px solid var(--border);
					background: var(--teal-light);
				}

				.erf-header-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 28px; height: 28px;
					border-radius: 8px;
					background: var(--teal-mid);
					color: var(--teal);
					flex-shrink: 0;
				}

				.erf-header-title {
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					color: var(--ink);
					letter-spacing: -0.01em;
					margin: 0;
				}

				.erf-header-sub {
					font-size: 11.5px;
					color: var(--muted);
					font-weight: 300;
					margin-left: auto;
				}

				/* ── Body ── */
				.erf-body {
					padding: 20px 18px;
					display: flex;
					flex-direction: column;
					gap: 20px;
				}

				/* ── Field ── */
				.erf-field { display: flex; flex-direction: column; gap: 8px; }

				.erf-label {
					font-size: 12.5px;
					font-weight: 500;
					color: var(--ink);
					display: flex;
					align-items: center;
					gap: 6px;
				}

				.erf-label-icon { color: var(--teal); display: flex; align-items: center; }

				/* ── Stars row ── */
				.erf-stars-row {
					display: flex;
					align-items: center;
					gap: 12px;
					flex-wrap: wrap;
				}

				.erf-rating-label {
					font-family: 'Syne', sans-serif;
					font-size: 12px;
					font-weight: 700;
					color: var(--teal);
					opacity: 0;
					transition: opacity 0.2s ease;
				}

				.erf-rating-label.visible { opacity: 1; }

				.erf-rating-dots {
					display: flex;
					gap: 3px;
					margin-top: 2px;
				}

				.erf-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: var(--border);
					transition: background 0.2s ease, transform 0.2s ease;
				}

				.erf-dot.filled {
					background: var(--teal);
					transform: scale(1.25);
				}

				/* ── Textarea ── */
				.erf-textarea-wrap { position: relative; }

				.erf-textarea {
					width: 100%;
					min-height: 110px;
					padding: 12px 14px 28px;
					border-radius: 11px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 300;
					color: var(--ink);
					line-height: 1.65;
					resize: vertical;
					outline: none;
					box-sizing: border-box;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
				}

				.erf-textarea::placeholder { color: #a8bbc3; }

				.erf-textarea:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.erf-char-count {
					position: absolute;
					bottom: 9px; right: 12px;
					font-size: 10.5px;
					color: var(--muted);
					pointer-events: none;
					transition: color 0.2s ease;
				}

				.erf-char-count.near  { color: #f59e0b; }
				.erf-char-count.over  { color: #dc2626; }

				/* ── Divider ── */
				.erf-divider {
					height: 1px;
					background: var(--border);
					margin: 0 -18px;
				}

				/* ── Footer buttons ── */
				.erf-footer {
					padding: 14px 18px;
					display: flex;
					align-items: center;
					gap: 10px;
					justify-content: flex-end;
					background: var(--surface);
					border-top: 1px solid var(--border);
				}

				.erf-btn {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 9px 20px;
					border-radius: 9px;
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 500;
					cursor: pointer;
					border: 1.5px solid;
					transition: all 0.2s ease;
					letter-spacing: 0.01em;
				}

				.erf-btn-cancel {
					background: transparent;
					border-color: var(--border);
					color: var(--muted);
				}

				.erf-btn-cancel:hover {
					background: #f0f4f6;
					border-color: #c0ccd2;
					color: var(--ink);
				}

				.erf-btn-save {
					background: var(--teal);
					border-color: var(--teal);
					color: #ffffff;
					font-weight: 600;
					position: relative;
					overflow: hidden;
				}

				.erf-btn-save::before {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
					pointer-events: none;
				}

				.erf-btn-save:hover:not(:disabled) {
					background: #3d7a91;
					border-color: #3d7a91;
					transform: translateY(-1px);
					box-shadow: 0 5px 16px var(--teal-glow);
				}

				.erf-btn-save:disabled {
					opacity: 0.65;
					cursor: not-allowed;
				}

				/* Spinner */
				.erf-spinner {
					width: 13px; height: 13px;
					border: 2px solid rgba(255,255,255,0.3);
					border-top-color: #ffffff;
					border-radius: 50%;
					animation: erf-spin 0.7s linear infinite;
					flex-shrink: 0;
				}

				@keyframes erf-spin { to { transform: rotate(360deg); } }
			`}</style>

			<div className="erf-root">
				<div className="erf-card">
					{/* Header */}
					<div className="erf-header">
						<div className="erf-header-icon">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
						</div>
						<h3 className="erf-header-title">Edit Review</h3>
						<span className="erf-header-sub">Changes are saved immediately</span>
					</div>

					{/* Body */}
					<div className="erf-body">
						{/* Rating */}
						<div className="erf-field">
							<label className="erf-label">
								<span className="erf-label-icon">
									<svg
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>
								</span>
								Rating
							</label>
							<div className="erf-stars-row">
								<StarRating
									ratings={editReview?.ratings}
									onChange={(value) => setEditReview({ ...editReview, ratings: value })}
								/>
								<span className={`erf-rating-label ${editReview?.ratings > 0 ? "visible" : ""}`}>
									{ratingLabels[editReview?.ratings] || ""}
								</span>
							</div>
							<div className="erf-rating-dots">
								{[1, 2, 3, 4, 5].map((i) => (
									<span
										key={i}
										className={`erf-dot ${i <= (editReview?.ratings || 0) ? "filled" : ""}`}
									/>
								))}
							</div>
						</div>

						<div className="erf-divider" style={{ margin: "0 -18px" }} />

						{/* Comment */}
						<div className="erf-field">
							<label className="erf-label">
								<span className="erf-label-icon">
									<svg
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									</svg>
								</span>
								Comment
							</label>
							<div className="erf-textarea-wrap">
								<textarea
									value={editReview?.comment || ""}
									onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
									className="erf-textarea"
									placeholder="Update your experience…"
									maxLength={MAX_CHARS}
								/>
								<span
									className={`erf-char-count ${
										charCount >= MAX_CHARS ? "over"
										: charCount >= MAX_CHARS * 0.85 ? "near"
										: ""
									}`}>
									{charCount}/{MAX_CHARS}
								</span>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="erf-footer">
						<button
							type="button"
							className="erf-btn erf-btn-cancel"
							onClick={onCancelClick}
							disabled={saving}>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
							Cancel
						</button>
						<button type="button" className="erf-btn erf-btn-save" onClick={handleSave} disabled={saving}>
							{saving ?
								<>
									<span className="erf-spinner" /> Saving…
								</>
							:	<>
									<svg
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
									Save Changes
								</>
							}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditReviewForm;
