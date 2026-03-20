import React, { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["About us", "Jobs", "Press kit", "Blog", "Legal"];

const SOCIALS = [
	{
		label: "Twitter / X",
		handle: "@lancer",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.389 6.231H2.756l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		label: "YouTube",
		handle: "Lancer TV",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
				<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
			</svg>
		),
	},
	{
		label: "Facebook",
		handle: "Lancer HQ",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
				<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
			</svg>
		),
	},
];

const Footer = () => {
	const footerRef = useRef(null);
	const canvasRef = useRef(null);
	const animRef = useRef(null);
	const mouseRef = useRef({ x: -999, y: -999 });
	const [hoveredLink, setHoveredLink] = useState(null);
	const [hoveredSocial, setHoveredSocial] = useState(null);
	const [ripples, setRipples] = useState([]);

	/* ── Particle canvas ── */
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let W, H, particles;

		const resize = () => {
			W = canvas.width = canvas.offsetWidth;
			H = canvas.height = canvas.offsetHeight;
		};

		resize();
		window.addEventListener("resize", () => {
			resize();

		});

		return () => {
			cancelAnimationFrame(animRef.current);
			window.removeEventListener("resize", resize);
		};
	}, []);


	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500&display=swap');

				.ft-root {
					position: relative;
					font-family: 'Epilogue', sans-serif;
					background: #ffffff;
					overflow: hidden;
					user-select: none;
				}

				/* ── canvas layer ── */
				.ft-canvas {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					pointer-events: none;
					z-index: 0;
				}

				/* ── ripple ── */
				.ft-ripple {
					position: absolute;
					border-radius: 50%;
					width: 6px;
					height: 6px;
					border: 1px solid rgba(48,96,115,0.5);
					transform: translate(-50%, -50%) scale(0);
					animation: rippleOut 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
					pointer-events: none;
					z-index: 1;
				}
				@keyframes rippleOut {
					to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
				}

				/* ── top black band ── */
				.ft-top {
					position: relative;
					z-index: 2;
					background: #0d0d0d;
					padding: 56px 64px 48px;
					display: grid;
					grid-template-columns: 1.4fr 1fr 1fr;
					gap: 48px;
					align-items: start;
				}

				/* Brand col */
				.ft-brand-name {
					font-family: 'Syne', sans-serif;
					font-size: 38px;
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #ffffff;
					line-height: 1;
					margin-bottom: 16px;
				}
				.ft-brand-name span { color: #306073; }

				.ft-brand-tagline {
					font-size: 13px;
					font-weight: 300;
					color: rgba(255,255,255,0.4);
					line-height: 1.8;
					max-width: 240px;
					margin-bottom: 32px;
				}

				/* status pill */
				.ft-status {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					background: rgba(48,96,115,0.12);
					border: 1px solid rgba(48,96,115,0.3);
					border-radius: 100px;
					padding: 7px 14px;
					font-size: 11px;
					color: rgba(255,255,255,0.6);
					letter-spacing: 0.08em;
				}
				.ft-status-dot {
					width: 7px; height: 7px;
					background: #306073;
					border-radius: 50%;
					box-shadow: 0 0 0 0 rgba(48,96,115,0.6);
					animation: sonar 1.8s infinite;
				}
				@keyframes sonar {
					0%   { box-shadow: 0 0 0 0   rgba(48,96,115,0.6); }
					70%  { box-shadow: 0 0 0 8px rgba(48,96,115,0);   }
					100% { box-shadow: 0 0 0 0   rgba(48,96,115,0);   }
				}

				/* nav col header */
				.ft-col-head {
					font-size: 10px;
					font-weight: 600;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #306073;
					margin-bottom: 20px;
				}

				/* nav links */
				.ft-nav-link {
					display: flex;
					align-items: center;
					gap: 0;
					font-size: 14px;
					font-weight: 400;
					color: rgba(255,255,255,0.45);
					text-decoration: none;
					padding: 7px 0;
					border-bottom: 1px solid rgba(255,255,255,0.04);
					transition: color 0.2s ease, gap 0.25s ease;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}
				.ft-nav-link:last-child { border-bottom: none; }
				.ft-nav-link::before {
					content: '';
					position: absolute;
					left: 0; top: 0; bottom: 0;
					width: 0;
					background: rgba(48,96,115,0.08);
					transition: width 0.3s ease;
					border-radius: 4px;
				}
				.ft-nav-link:hover::before { width: 100%; }
				.ft-nav-link:hover {
					color: #ffffff;
					gap: 6px;
					padding-left: 8px;
				}
				.ft-link-arrow {
					opacity: 0;
					transform: translateX(-4px);
					transition: opacity 0.2s, transform 0.2s;
					font-size: 11px;
					color: #306073;
				}
				.ft-nav-link:hover .ft-link-arrow {
					opacity: 1;
					transform: translateX(0);
				}

				/* socials col */
				.ft-social-card {
					display: flex;
					align-items: center;
					gap: 14px;
					padding: 12px 14px;
					border-radius: 12px;
					border: 1px solid rgba(255,255,255,0.05);
					cursor: pointer;
					text-decoration: none;
					transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
					margin-bottom: 8px;
					position: relative;
					overflow: hidden;
				}
				.ft-social-card::after {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg, rgba(48,96,115,0.12), transparent);
					opacity: 0;
					transition: opacity 0.3s;
				}
				.ft-social-card:hover {
					background: rgba(255,255,255,0.04);
					border-color: rgba(48,96,115,0.35);
					transform: translateX(4px);
				}
				.ft-social-card:hover::after { opacity: 1; }

				.ft-social-icon {
					width: 36px; height: 36px;
					background: rgba(255,255,255,0.05);
					border-radius: 8px;
					display: flex; align-items: center; justify-content: center;
					color: rgba(255,255,255,0.5);
					flex-shrink: 0;
					transition: background 0.25s, color 0.25s;
				}
				.ft-social-card:hover .ft-social-icon {
					background: #306073;
					color: #ffffff;
				}
				.ft-social-label {
					font-size: 13px;
					font-weight: 500;
					color: rgba(255,255,255,0.7);
					display: block;
					transition: color 0.2s;
				}
				.ft-social-handle {
					font-size: 11px;
					color: rgba(255,255,255,0.3);
					display: block;
				}
				.ft-social-card:hover .ft-social-label { color: #fff; }

				.ft-social-ext {
					margin-left: auto;
					opacity: 0;
					color: rgba(48,96,115,0.8);
					font-size: 14px;
					transition: opacity 0.2s, transform 0.2s;
					transform: translate(-4px, 4px);
				}
				.ft-social-card:hover .ft-social-ext {
					opacity: 1;
					transform: translate(0,0);
				}

				/* ── white divider band ── */
				.ft-mid {
					position: relative;
					z-index: 2;
					background: #ffffff;
					padding: 0 64px;
					display: flex;
					align-items: center;
					gap: 0;
					overflow: hidden;
				}

				/* Scrolling marquee */
				.ft-marquee-track {
					display: flex;
					gap: 0;
					white-space: nowrap;
					animation: marquee 18s linear infinite;
					padding: 20px 0;
				}
				.ft-marquee-track:hover { animation-play-state: paused; }
				@keyframes marquee {
					0%   { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
				.ft-marquee-item {
					display: inline-flex;
					align-items: center;
					gap: 16px;
					padding: 0 32px;
					font-family: 'Syne', sans-serif;
					font-size: 13px;
					font-weight: 600;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					color: #0d0d0d;
					opacity: 0.18;
				}
				.ft-marquee-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
					flex-shrink: 0;
				}

				/* ── bottom white bar ── */
				.ft-bottom {
					position: relative;
					z-index: 2;
					background: #ffffff;
					padding: 20px 64px 32px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid rgba(0,0,0,0.06);
				}

				.ft-copy {
					font-size: 12px;
					color: #aaa;
					letter-spacing: 0.04em;
				}
				.ft-copy strong { color: #0d0d0d; font-weight: 500; }

				/* micro badges */
				.ft-badges {
					display: flex;
					gap: 8px;
				}
				.ft-badge {
					font-size: 10px;
					font-weight: 500;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: #306073;
					border: 1px solid rgba(48,96,115,0.25);
					border-radius: 100px;
					padding: 4px 10px;
					background: rgba(48,96,115,0.04);
					transition: background 0.2s, border-color 0.2s, transform 0.2s;
					cursor: default;
				}
				.ft-badge:hover {
					background: rgba(48,96,115,0.1);
					border-color: rgba(48,96,115,0.5);
					transform: translateY(-2px);
				}

				/* scroll-to-top */
				.ft-top-btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 36px; height: 36px;
					border-radius: 50%;
					background: #0d0d0d;
					border: none;
					cursor: pointer;
					transition: background 0.2s, transform 0.25s;
					color: #fff;
				}
				.ft-top-btn:hover {
					background: #306073;
					transform: translateY(-3px);
				}

				/* ── Responsive ── */
				@media (max-width: 900px) {
					.ft-top {
						grid-template-columns: 1fr 1fr;
						padding: 44px 32px 36px;
						gap: 36px;
					}
					.ft-brand-col { grid-column: 1 / -1; }
					.ft-mid, .ft-bottom { padding-left: 32px; padding-right: 32px; }
				}

				@media (max-width: 600px) {
					.ft-top {
						grid-template-columns: 1fr;
						padding: 36px 24px 28px;
						gap: 32px;
					}
					.ft-mid { padding-left: 20px; padding-right: 20px; }
					.ft-bottom {
						flex-direction: column;
						gap: 16px;
						padding: 20px 24px 28px;
						text-align: center;
					}
					.ft-badges { flex-wrap: wrap; justify-content: center; }
				}
			`}</style>

			<footer ref={footerRef} className="ft-root">
				<canvas ref={canvasRef} className="ft-canvas" />

				{/* Ripples */}
				{ripples.map((rp) => (
					<span key={rp.id} className="ft-ripple" style={{ left: rp.x, top: rp.y }} />
				))}

				{/* ── TOP BLACK SECTION ── */}
				<div className="ft-top">
					{/* Brand */}
					<div className="ft-brand-col">
						<div className="ft-brand-name">
							Lan<span>cer</span>
						</div>
						<p className="ft-brand-tagline">
							The freelance platform where ambition meets execution. Hire vetted pros. Ship faster.
						</p>
						<div className="ft-status">
							<span className="ft-status-dot" />
							All systems operational
						</div>
					</div>

					{/* Nav links */}
					<div>
						<p className="ft-col-head">Company</p>
						{NAV_LINKS.map((link) => (
							<a
								key={link}
								className="ft-nav-link"
								href="#"
								onMouseEnter={() => setHoveredLink(link)}
								onMouseLeave={() => setHoveredLink(null)}>
								{link}
								<span className="ft-link-arrow">→</span>
							</a>
						))}
					</div>

					{/* Socials */}
					<div>
						<p className="ft-col-head">Connect</p>
						{SOCIALS.map((s) => (
							<a
								key={s.label}
								href={s.href}
								className="ft-social-card"
								onMouseEnter={() => setHoveredSocial(s.label)}
								onMouseLeave={() => setHoveredSocial(null)}>
								<div className="ft-social-icon">{s.icon}</div>
								<div>
									<span className="ft-social-label">{s.label}</span>
									<span className="ft-social-handle">{s.handle}</span>
								</div>
								<span className="ft-social-ext">↗</span>
							</a>
						))}
					</div>
				</div>

				{/* ── MARQUEE BAND ── */}
				<div className="ft-mid">
					<div className="ft-marquee-track">
						{[...Array(2)].flatMap((_, groupIndex) =>
							[
								"Risk-Free Hiring",
								"Vetted Professionals",
								"Money-Back Guarantee",
								"Global Talent",
								"Fast Delivery",
								"Secure Payments",
							].map((t, i) => (
								<span key={`${groupIndex}-${i}`} className="ft-marquee-item">
									<span className="ft-marquee-dot" />
									{t}
								</span>
							)),
						)}
					</div>
				</div>

				{/* ── BOTTOM WHITE BAR ── */}
				<div className="ft-bottom">
					<p className="ft-copy">
						© {new Date().getFullYear()} <strong>Lancer Ltd.</strong> — All rights reserved.
					</p>

					<div className="ft-badges">
						<span className="ft-badge">SOC 2</span>
						<span className="ft-badge">GDPR</span>
						<span className="ft-badge">SSL</span>
					</div>

					<button
						className="ft-top-btn"
						onClick={(e) => {
							e.stopPropagation();
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						title="Back to top">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path
								d="M7 11V3M3 7l4-4 4 4"
								stroke="white"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</footer>
		</>
	);
};

export default Footer;
