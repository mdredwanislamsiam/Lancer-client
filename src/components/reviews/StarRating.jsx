import { useState } from "react";

const LABELS = ["Terrible", "Poor", "Okay", "Great", "Excellent"];

const StarRating = ({ onChange, ratings }) => {
	const [hovered, setHovered] = useState(null);
	const [burst, setBurst] = useState(null);

	const active = hovered ?? ratings ?? 0;

	const handleClick = (value) => {
		setBurst(value);
		setTimeout(() => setBurst(null), 500);
		onChange(value);
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.sr-wrap {
					display: inline-flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 10px;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── track container ── */
				.sr-track {
					display: flex;
					align-items: center;
					gap: 0;
					background: #ffffff;
					border: 1.5px solid rgba(0,0,0,0.08);
					border-radius: 18px;
					padding: 10px 16px;
					box-shadow:
						0 2px 8px rgba(0,0,0,0.05),
						0 1px 2px rgba(0,0,0,0.04);
					position: relative;
					transition: box-shadow 0.25s ease, border-color 0.25s ease;
				}
				.sr-track:hover {
					box-shadow: 0 6px 24px rgba(0,0,0,0.09);
					border-color: rgba(0,0,0,0.13);
				}

				/* teal left accent bar */
				.sr-track::before {
					content: '';
					position: absolute;
					left: 0; top: 25%; bottom: 25%;
					width: 3px;
					background: #306073;
					border-radius: 0 3px 3px 0;
					opacity: 0.7;
				}

				/* ── each star slot ── */
				.sr-slot {
					position: relative;
					width: 40px;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					outline: none;
					border: none;
					background: none;
					padding: 0;
				}

				/* filled star SVG */
				.sr-star {
					position: relative;
					z-index: 1;
					transition:
						transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
						filter 0.2s ease;
					will-change: transform;
				}

				.sr-slot:hover .sr-star,
				.sr-slot.sr-hovered .sr-star {
					transform: scale(1.22) rotate(-5deg);
				}

				/* burst ring */
				.sr-burst {
					position: absolute;
					inset: 0;
					border-radius: 50%;
					border: 2px solid rgba(245, 158, 11, 0.6);
					transform: scale(0.5);
					opacity: 0;
					animation: srBurst 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
					pointer-events: none;
					z-index: 0;
				}
				@keyframes srBurst {
					0%   { transform: scale(0.5); opacity: 0.9; }
					100% { transform: scale(1.9); opacity: 0; }
				}

				/* separator between stars */
				.sr-sep {
					width: 1px;
					height: 14px;
					background: rgba(0,0,0,0.06);
					flex-shrink: 0;
				}

				/* ── label + score row ── */
				.sr-meta {
					display: flex;
					align-items: center;
					gap: 10px;
					padding-left: 4px;
					min-height: 22px;
				}

				.sr-score {
					font-family: 'Syne', sans-serif;
					font-size: 22px;
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #0d0d0d;
					line-height: 1;
					transition: color 0.2s ease;
					min-width: 26px;
				}
				.sr-score.sr-has-value { color: #0d0d0d; }

				.sr-score-denom {
					font-size: 12px;
					color: #ccc;
					font-weight: 300;
					margin-top: 4px;
					align-self: flex-end;
				}

				.sr-divider {
					width: 1px;
					height: 18px;
					background: rgba(0,0,0,0.1);
				}

				.sr-label {
					font-size: 12px;
					font-weight: 500;
					letter-spacing: 0.04em;
					color: #888;
					transition: color 0.2s ease, opacity 0.2s ease;
					opacity: 0.6;
				}
				.sr-label.sr-has-value {
					opacity: 1;
					color: #0d0d0d;
				}

				/* ── responsive ── */
				@media (max-width: 480px) {
					.sr-track {
						padding: 8px 12px;
						border-radius: 14px;
					}
					.sr-slot {
						width: 32px;
						height: 32px;
					}
					.sr-score {
						font-size: 18px;
					}
					.sr-label {
						font-size: 11px;
					}
					.sr-pip {
						width: 16px;
					}
					.sr-pip.sr-pip-active {
						width: 22px;
					}
				}

				/* pip row */
				.sr-pips {
					display: flex;
					gap: 4px;
					padding-left: 4px;
				}
				.sr-pip {
					width: 20px;
					height: 3px;
					border-radius: 99px;
					background: rgba(0,0,0,0.08);
					transition: background 0.25s ease, width 0.25s ease;
				}
				.sr-pip.sr-pip-on {
					background: #0d0d0d;
				}
				.sr-pip.sr-pip-hover {
					background: rgba(245,158,11,0.5);
				}
				.sr-pip.sr-pip-active {
					background: #f59e0b;
					width: 28px;
				}
			`}</style>

			<div className="sr-wrap">
				{/* Track */}
				<div className="sr-track">
					{[1, 2, 3, 4, 5].map((value, i) => {
						const isFilled = value <= active;
						const isSelected = value <= (ratings ?? 0);
						const isBurst = burst === value;

						return (
							<>
								{i > 0 && <span className="sr-sep" key={`sep-${value}`} />}
								<button
									key={value}
									className={`sr-slot${hovered !== null && value <= hovered ? " sr-hovered" : ""}`}
									onClick={() => handleClick(value)}
									onMouseEnter={() => setHovered(value)}
									onMouseLeave={() => setHovered(null)}
									aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
									type="button">
									{isBurst && <span className="sr-burst" />}
									<svg className="sr-star" width="22" height="22" viewBox="0 0 22 22" fill="none">
										<path
											d="M11 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L11 14.27l-4.77 2.44.91-5.32L3.27 7.62l5.34-.78z"
											fill={
												isFilled ?
													hovered !== null ?
														"#f59e0b"
													: isSelected ?
														"#f59e0b"
													:	"#f59e0b"
												:	"none"
											}
											stroke={isFilled ? "#f59e0b" : "rgba(0,0,0,0.18)"}
											strokeWidth="1.4"
											strokeLinejoin="round"
											style={{
												filter:
													isFilled ?
														`drop-shadow(0 2px 6px rgba(245,158,11,${
															hovered !== null ? 0.5
															: isSelected ? 0.35
															: 0.2
														}))`
													:	"none",
												transition: "fill 0.15s ease, stroke 0.15s ease, filter 0.2s ease",
											}}
										/>
									</svg>
								</button>
							</>
						);
					})}
				</div>

				{/* Score + label */}
				<div className="sr-meta">
					<span className={`sr-score${active > 0 ? " sr-has-value" : ""}`}>{active > 0 ? active : "—"}</span>
					<span className="sr-score-denom">/5</span>
					{active > 0 && (
						<>
							<span className="sr-divider" />
							<span className={`sr-label${active > 0 ? " sr-has-value" : ""}`}>{LABELS[active - 1]}</span>
						</>
					)}
				</div>

				{/* Pip indicators */}
				<div className="sr-pips">
					{[1, 2, 3, 4, 5].map((value) => (
						<span
							key={value}
							className={`sr-pip${
								value === active ? " sr-pip-active"
								: hovered !== null && value <= hovered ? " sr-pip-hover"
								: value <= (ratings ?? 0) ? " sr-pip-on"
								: ""
							}`}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default StarRating;
