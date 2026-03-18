import React, { useEffect, useRef } from "react";
import moneyBack from "../../assets/videos/MoneyBack.mp4";
import { Link } from "react-router";

const MoneyBack = () => {
	const videoRef = useRef(null);
	const cardRef = useRef(null);

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const handleMouseMove = (e) => {
			const rect = card.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
			card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale(1.01)`;
		};

		const handleMouseLeave = () => {
			card.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)";
		};

		card.addEventListener("mousemove", handleMouseMove);
		card.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			card.removeEventListener("mousemove", handleMouseMove);
			card.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

				.mb-root {
					font-family: 'DM Sans', sans-serif;
					padding: 60px 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: 100vh;
				}

				.mb-card {
					position: relative;
					background: #ffffff;
					border-radius: 28px;
					overflow: hidden;
					max-width: 1100px;
					width: 100%;
					display: grid;
					grid-template-columns: 1fr 1fr;
					box-shadow:
						0 2px 4px rgba(0,0,0,0.04),
						0 12px 40px rgba(0,0,0,0.08),
						0 40px 80px rgba(0,0,0,0.06);
					transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1),
								box-shadow 0.25s ease;
					will-change: transform;
				}

				.mb-card:hover {
					box-shadow:
						0 4px 8px rgba(0,0,0,0.06),
						0 20px 60px rgba(0,0,0,0.12),
						0 60px 100px rgba(0,0,0,0.08);
				}

				/* Teal accent bar — 10% presence */
				.mb-accent-bar {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					height: 3px;
					background: linear-gradient(90deg, #306073, #4a8fa5, #306073);
					z-index: 10;
				}

				/* Left: White zone (60%) */
				.mb-left {
					padding: 52px 48px 52px 52px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					z-index: 2;
				}

				.mb-label {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-family: 'DM Sans', sans-serif;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.16em;
					text-transform: uppercase;
					color: #306073;
					margin-bottom: 24px;
				}

				.mb-label-dot {
					width: 6px;
					height: 6px;
					background: #306073;
					border-radius: 50%;
					animation: pulse 2s infinite;
				}

				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.5; transform: scale(0.8); }
				}

				.mb-heading {
					font-family: 'Syne', sans-serif;
					font-size: clamp(32px, 4vw, 52px);
					font-weight: 800;
					line-height: 1.05;
					letter-spacing: -0.03em;
					color: #0d0d0d;
					margin-bottom: 6px;
				}

				.mb-heading-accent {
					color: #306073;
					display: block;
				}

				.mb-divider {
					width: 40px;
					height: 2px;
					background: #0d0d0d;
					margin: 28px 0;
					border-radius: 2px;
				}

				.mb-body {
					font-size: 15px;
					line-height: 1.75;
					color: #444;
					font-weight: 300;
					max-width: 380px;
					margin-bottom: 40px;
				}

				.mb-body strong {
					color: #0d0d0d;
					font-weight: 500;
				}

				.mb-bottom {
					display: flex;
					align-items: center;
					gap: 20px;
				}

				.mb-btn {
					display: inline-flex;
					align-items: center;
					gap: 10px;
					background: #0d0d0d;
					color: #ffffff;
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 500;
					letter-spacing: 0.06em;
					padding: 14px 28px;
					border-radius: 100px;
					border: none;
					cursor: pointer;
					transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
					text-transform: uppercase;
				}

				.mb-btn:hover {
					background: #306073;
					transform: translateY(-2px);
					box-shadow: 0 8px 24px rgba(48, 96, 115, 0.35);
				}

				.mb-btn-arrow {
					width: 16px;
					height: 16px;
					transition: transform 0.2s ease;
				}

				.mb-btn:hover .mb-btn-arrow {
					transform: translateX(3px);
				}

				.mb-trust {
					font-size: 12px;
					color: #999;
					font-weight: 400;
				}

				/* Right: Black zone (30%) */
				.mb-right {
					position: relative;
					background: #0d0d0d;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 0;
					overflow: hidden;
				}

				.mb-right-noise {
					position: absolute;
					inset: 0;
					background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
					opacity: 0.6;
					pointer-events: none;
				}

				/* Teal glow blob */
				.mb-glow {
					position: absolute;
					width: 300px;
					height: 300px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.25) 0%, transparent 70%);
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					pointer-events: none;
				}

				.mb-video-wrap {
					position: relative;
					width: 88%;
					border-radius: 16px;
					overflow: hidden;
					border: 1px solid rgba(255,255,255,0.07);
					box-shadow:
						0 0 0 1px rgba(48,96,115,0.2),
						0 20px 60px rgba(0,0,0,0.6),
						inset 0 1px 0 rgba(255,255,255,0.06);
					z-index: 2;
				}

				.mb-video-wrap video {
					width: 100%;
					display: block;
					border-radius: 16px;
				}

				/* Guarantee badge */
				.mb-badge {
					position: absolute;
					bottom: 28px;
					right: 24px;
					display: flex;
					align-items: center;
					gap: 10px;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(48,96,115,0.3);
					border-radius: 100px;
					padding: 10px 16px;
					z-index: 3;
					backdrop-filter: blur(10px);
				}

				.mb-badge-icon {
					width: 22px;
					height: 22px;
					background: #306073;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
				}

				.mb-badge-text {
					font-family: 'DM Sans', sans-serif;
					font-size: 11px;
					color: rgba(255,255,255,0.7);
					font-weight: 400;
					letter-spacing: 0.04em;
				}

				.mb-badge-text span {
					color: #fff;
					font-weight: 500;
				}

				/* Corner mark */
				.mb-corner-mark {
					position: absolute;
					top: 24px;
					left: 24px;
					z-index: 3;
					display: flex;
					flex-direction: column;
					gap: 3px;
				}

				.mb-corner-line {
					height: 1px;
					background: rgba(48,96,115,0.5);
					border-radius: 2px;
					transition: width 0.4s ease;
				}

				.mb-card:hover .mb-corner-line:nth-child(1) { width: 28px; }
				.mb-card:hover .mb-corner-line:nth-child(2) { width: 16px; }
				.mb-card:hover .mb-corner-line:nth-child(3) { width: 22px; }

				/* Responsive */
				@media (max-width: 1024px) {
					.mb-card {
						grid-template-columns: 1fr 1fr;
					}

					.mb-left {
						padding: 40px 32px 40px 36px;
					}
				}

				@media (max-width: 768px) {
					.mb-root {
						padding: 20px 16px;
						min-height: unset;
					}

					.mb-card {
						grid-template-columns: 1fr;
						border-radius: 20px;
					}

					.mb-left {
						padding: 36px 28px;
					}

					.mb-body {
						max-width: 100%;
						margin-bottom: 32px;
					}

					.mb-right {
						min-height: 300px;
						padding: 28px;
					}

					.mb-video-wrap {
						width: 92%;
					}

					.mb-badge {
						bottom: 16px;
						right: 14px;
						padding: 8px 12px;
					}

					.mb-corner-mark {
						top: 16px;
						left: 16px;
					}
				}

				@media (max-width: 480px) {
					.mb-root {
						padding: 16px 12px;
					}

					.mb-card {
						border-radius: 16px;
					}

					.mb-left {
						padding: 28px 20px;
					}

					.mb-bottom {
						flex-direction: column;
						align-items: flex-start;
						gap: 12px;
					}

					.mb-right {
						min-height: 240px;
					}

					.mb-badge {
						bottom: 12px;
						right: 12px;
					}

					.mb-badge-text {
						font-size: 10px;
					}
				}
			`}</style>

			<div className="mb-root">
				<div className="mb-card" ref={cardRef}>
					<div className="mb-accent-bar" />

					{/* LEFT — White (60%) */}
					<div className="mb-left bg-gradient-to-br from-[#486d7f]">
						<div>
							<div className="mb-label">
								<span className="mb-label-dot" />
								Risk-Free Hiring
							</div>

							<h1 className="mb-heading">
								Build with
								<span className="mb-heading-accent">confidence.</span>
							</h1>

							<div className="mb-divider" />

							<p className="mb-body">
								Bring your vision to life <strong>risk-free</strong> on Lancer. Every project with
								vetted Pro freelancers is backed by our money-back guarantee — so you can tackle any
								high-stakes project with total peace of mind.
							</p>
						</div>

						<div className="mb-bottom">
							<Link to={"/register"} className="mb-btn">
								Join Lancer
								<svg className="mb-btn-arrow" viewBox="0 0 16 16" fill="none">
									<path
										d="M3 8h10M9 4l4 4-4 4"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
							<span className="mb-trust">No commitment required</span>
						</div>
					</div>

					{/* RIGHT — Black (30%) */}
					<div className="mb-right">
						<div className="mb-right-noise" />
						<div className="mb-glow" />

						<div className="mb-corner-mark">
							<div className="mb-corner-line" style={{ width: "24px" }} />
							<div className="mb-corner-line" style={{ width: "12px" }} />
							<div className="mb-corner-line" style={{ width: "18px" }} />
						</div>

						<div className="mb-video-wrap">
							<video ref={videoRef} src={moneyBack} autoPlay muted loop playsInline />
						</div>

						<div className="mb-badge">
							<div className="mb-badge-icon">
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
									<path
										d="M2 6.5L4.5 9L10 3"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<p className="mb-badge-text">
								<span>100% money-back</span> guarantee
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MoneyBack;
