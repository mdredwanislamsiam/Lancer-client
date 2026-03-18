import { useEffect, useRef, useState } from "react";
import defImg from "../assets/images/DefaultImage.jpg";
import {
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaUser,
	FaFacebook,
	FaTwitter,
	FaLinkedin,
	FaGithub,
	FaInstagram,
} from "react-icons/fa";
import InfoItem from "../components/infoPage/InfoItem";
import { useParams } from "react-router";
import authAPIClient from "../services/auth-api-client";
import LoadingSpinner from "../components/common/LoadingSpinner";

const SOCIALS = [
	{ Icon: FaFacebook, label: "Facebook" },
	{ Icon: FaTwitter, label: "Twitter" },
	{ Icon: FaLinkedin, label: "LinkedIn" },
	{ Icon: FaGithub, label: "GitHub" },
	{ Icon: FaInstagram, label: "Instagram" },
];

const INFO_FIELDS = (user) => [
	{ Icon: FaUser, label: "Full Name", value: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "—" },
	{ Icon: FaEnvelope, label: "Email", value: user.email || "—" },
	{ Icon: FaPhone, label: "Phone", value: user.phone_number || "—" },
	{ Icon: FaMapMarkerAlt, label: "Address", value: user.address || "—" },
];

const InfoPage = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [visible, setVisible] = useState(false);
	const cardRef = useRef(null);

	/* subtle 3-D tilt on mouse */
	const onMouseMove = (e) => {
		const el = cardRef.current;
		if (!el) return;
		const { left, top, width, height } = el.getBoundingClientRect();
		const x = ((e.clientX - left) / width - 0.5) * 7;
		const y = ((e.clientY - top) / height - 0.5) * -7;
		el.style.transform = `perspective(1400px) rotateY(${x}deg) rotateX(${y}deg)`;
	};
	const onMouseLeave = () => {
		if (cardRef.current) cardRef.current.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
	};

	const fetchUser = async () => {
		try {
			const res = await authAPIClient.get(`/users/${id}`);
			setUser(res?.data?.user);
			setTimeout(() => setVisible(true), 60);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [id]);

	if (!user) return <LoadingSpinner />;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Epilogue:wght@300;400;500;600&display=swap');

				.ip-root {
					font-family: 'Epilogue', sans-serif;
					min-height: 100vh;
					background: #f5f5f5;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 48px 20px;
					position: relative;
					overflow: hidden;
				}
				.ip-root::before {
					content: '';
					position: fixed;
					inset: 0;
					background-image: radial-gradient(rgba(0,0,0,0.065) 1px, transparent 1px);
					background-size: 28px 28px;
					pointer-events: none;
					z-index: 0;
				}

				/* ── card ── */
				.ip-card {
					position: relative;
					z-index: 1;
					width: 100%;
					max-width: 980px;
					display: grid;
					grid-template-columns: 280px 1fr;
					background: #fff;
					border-radius: 28px;
					overflow: hidden;
					box-shadow:
						0 1px 3px rgba(0,0,0,0.04),
						0 12px 40px rgba(0,0,0,0.08),
						0 40px 80px rgba(0,0,0,0.05);
					opacity: 0;
					transform: translateY(28px) perspective(1400px);
					transition:
						opacity  0.55s ease,
						transform 0.55s cubic-bezier(0.23,1,0.32,1),
						box-shadow 0.25s ease;
					will-change: transform;
				}
				.ip-card.ip-visible {
					opacity: 1;
					transform: translateY(0) perspective(1400px);
				}
				.ip-card:hover {
					box-shadow:
						0 2px 6px rgba(0,0,0,0.06),
						0 20px 60px rgba(0,0,0,0.12),
						0 60px 100px rgba(0,0,0,0.07);
				}
				/* teal top bar */
				.ip-card::after {
					content: '';
					position: absolute;
					top: 0; left: 0; right: 0;
					height: 3px;
					background: linear-gradient(90deg, #306073 0%, #59b3cc 55%, transparent 100%);
					z-index: 20;
				}

				/* ── LEFT: black panel ── */
				.ip-left {
					background: #0d0d0d;
					padding: 56px 28px 48px;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					position: relative;
					overflow: hidden;
				}
				.ip-left::before {
					content: '';
					position: absolute;
					top: 24px; left: 50%;
					transform: translateX(-50%);
					width: 220px; height: 220px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.18) 0%, transparent 68%);
					pointer-events: none;
				}

				/* scanning highlight */
				.ip-scan {
					position: absolute;
					top: 0; left: 0; right: 0;
					height: 1px;
					background: linear-gradient(90deg, transparent, rgba(48,96,115,0.5), transparent);
					animation: ipScan 5s ease-in-out infinite;
				}
				@keyframes ipScan {
					0%,100% { transform: translateY(0px);    opacity: 0.7; }
					50%     { transform: translateY(340px);  opacity: 0;   }
				}

				/* avatar */
				.ip-av-wrap {
					position: relative;
					width: 112px; height: 112px;
					margin-bottom: 22px;
					flex-shrink: 0;
				}
				.ip-av-dash {
					position: absolute;
					inset: -6px;
					border-radius: 50%;
					border: 1.5px dashed rgba(48,96,115,0.4);
					animation: ipSpin 14s linear infinite;
				}
				.ip-av-arc {
					position: absolute;
					inset: -6px;
					border-radius: 50%;
					border: 1.5px solid transparent;
					border-top-color: #306073;
					border-right-color: rgba(48,96,115,0.4);
					animation: ipSpin 3.5s linear infinite;
				}
				@keyframes ipSpin { to { transform: rotate(360deg); } }

				.ip-av {
					width: 100%; height: 100%;
					border-radius: 50%;
					object-fit: cover;
					border: 2.5px solid rgba(255,255,255,0.06);
					position: relative;
					z-index: 1;
					transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
				}
				.ip-av-wrap:hover .ip-av { transform: scale(1.07); }

				/* online dot */
				.ip-dot {
					position: absolute;
					bottom: 4px; right: 4px;
					width: 13px; height: 13px;
					background: #22c55e;
					border-radius: 50%;
					border: 2px solid #0d0d0d;
					z-index: 2;
					animation: ipSonar 2.2s infinite;
				}
				@keyframes ipSonar {
					0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.55); }
					70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0);    }
					100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);    }
				}

				.ip-name {
					font-family: 'Syne', sans-serif;
					font-size: 21px;
					font-weight: 800;
					letter-spacing: -0.03em;
					color: #fff;
					line-height: 1.1;
					margin-bottom: 8px;
				}
				.ip-role {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 9px;
					font-weight: 700;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #306073;
					border: 1px solid rgba(48,96,115,0.28);
					border-radius: 100px;
					padding: 4px 12px;
					background: rgba(48,96,115,0.08);
					margin-bottom: 30px;
				}
				.ip-role-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
					animation: ipPulse 2s infinite;
				}
				@keyframes ipPulse {
					0%,100% { opacity:1; transform:scale(1); }
					50%     { opacity:0.35; transform:scale(0.65); }
				}
				.ip-rule {
					width: 36px; height: 1px;
					background: rgba(255,255,255,0.07);
					margin-bottom: 26px;
				}

				/* socials */
				.ip-socials {
					display: flex;
					gap: 7px;
					flex-wrap: wrap;
					justify-content: center;
					margin-bottom: 36px;
				}
				.ip-social {
					width: 34px; height: 34px;
					border-radius: 10px;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.06);
					display: flex; align-items: center; justify-content: center;
					color: rgba(255,255,255,0.32);
					text-decoration: none;
					cursor: pointer;
					transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
				}
				.ip-social:hover {
					background: #306073;
					border-color: #306073;
					color: #fff;
					transform: translateY(-3px) scale(1.08);
					box-shadow: 0 6px 18px rgba(48,96,115,0.3);
				}

				/* CTA */
				.ip-cta {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					background: #fff;
					color: #0d0d0d;
					font-family: 'Epilogue', sans-serif;
					font-size: 11px;
					font-weight: 700;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					padding: 11px 22px;
					border-radius: 100px;
					border: none;
					cursor: pointer;
					transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
					margin-top: auto;
				}
				.ip-cta:hover {
					background: #306073;
					color: #fff;
					transform: translateY(-2px);
					box-shadow: 0 8px 24px rgba(48,96,115,0.32);
				}
				.ip-cta-arr { transition: transform 0.2s; }
				.ip-cta:hover .ip-cta-arr { transform: translateX(3px); }

				/* ── RIGHT: white panel ── */
				.ip-right {
					padding: 52px 44px 48px;
					display: flex;
					flex-direction: column;
					background: #fff;
				}
				.ip-sec-head {
					display: flex;
					align-items: center;
					gap: 14px;
					margin-bottom: 26px;
				}
				.ip-sec-title {
					font-family: 'Syne', sans-serif;
					font-size: 17px;
					font-weight: 800;
					letter-spacing: -0.02em;
					color: #0d0d0d;
					white-space: nowrap;
				}
				.ip-sec-line {
					flex: 1;
					height: 1px;
					background: linear-gradient(90deg, rgba(0,0,0,0.07), transparent);
				}

				/* info grid */
				.ip-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 12px;
					margin-bottom: 28px;
				}
				.ip-ic {
					display: flex;
					align-items: flex-start;
					gap: 12px;
					background: #f8f8f8;
					border: 1px solid rgba(0,0,0,0.05);
					border-radius: 14px;
					padding: 14px 16px;
					transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
				}
				.ip-ic:hover {
					border-color: rgba(48,96,115,0.2);
					box-shadow: 0 4px 16px rgba(0,0,0,0.05);
					transform: translateY(-2px);
				}
				.ip-ic-icon {
					width: 32px; height: 32px;
					background: #0d0d0d;
					border-radius: 9px;
					display: flex; align-items: center; justify-content: center;
					color: #fff;
					flex-shrink: 0;
				}
				.ip-ic-label {
					font-size: 9px;
					font-weight: 700;
					letter-spacing: 0.16em;
					text-transform: uppercase;
					color: #bbb;
					margin-bottom: 3px;
				}
				.ip-ic-value {
					font-size: 13px;
					font-weight: 500;
					color: #0d0d0d;
					word-break: break-all;
					line-height: 1.4;
				}

				/* bio */
				.ip-bio {
					background: #0d0d0d;
					border-radius: 18px;
					padding: 24px 26px;
					position: relative;
					overflow: hidden;
					flex: 1;
				}
				.ip-bio::before {
					content: '';
					position: absolute;
					top: 0; left: 0;
					width: 3px; height: 100%;
					background: linear-gradient(180deg, #306073, transparent);
				}
				.ip-bio::after {
					content: '';
					position: absolute;
					bottom: -40px; right: -40px;
					width: 130px; height: 130px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.18) 0%, transparent 70%);
					pointer-events: none;
				}
				.ip-bio-head {
					font-family: 'Syne', sans-serif;
					font-size: 10px;
					font-weight: 700;
					letter-spacing: 0.18em;
					text-transform: uppercase;
					color: #306073;
					margin-bottom: 10px;
				}
				.ip-bio-text {
					font-size: 13px;
					line-height: 1.85;
					color: rgba(255,255,255,0.52);
					font-weight: 300;
					position: relative;
					z-index: 1;
				}

				/* ── responsive ── */
				@media (max-width: 1024px) {
					.ip-card  { max-width: 100%; }
					.ip-right { padding: 44px 36px 44px; }
				}

				@media (max-width: 780px) {
					.ip-root  { padding: 32px 20px; align-items: flex-start; }
					.ip-card  { grid-template-columns: 1fr; border-radius: 22px; }
					.ip-left  { padding: 44px 28px 36px; }
					.ip-right { padding: 36px 28px 40px; }
					.ip-grid  { grid-template-columns: 1fr 1fr; }
					.ip-cta   { margin-top: 0; }
				}

				@media (max-width: 560px) {
					.ip-grid  { grid-template-columns: 1fr; }
				}

				@media (max-width: 480px) {
					.ip-root  { padding: 20px 14px; }
					.ip-card  { border-radius: 18px; }
					.ip-left  { padding: 36px 20px 28px; }
					.ip-right { padding: 24px 18px 28px; }
					.ip-grid  { gap: 10px; }
					.ip-name  { font-size: 18px; }
					.ip-bio   { padding: 20px; }
					.ip-sec-title { font-size: 15px; }
				}
			`}</style>

			<div className="ip-root">
				<div
					ref={cardRef}
					className={`ip-card${visible ? " ip-visible" : ""}`}
					onMouseMove={onMouseMove}
					onMouseLeave={onMouseLeave}>
					{/* ── LEFT PANEL ── */}
					<div className="ip-left">
						<span className="ip-scan" />

						<div className="ip-av-wrap">
							<span className="ip-av-dash" />
							<span className="ip-av-arc" />
							<img src={user?.image || defImg} alt={user.username} className="ip-av" />
							<span className="ip-dot" />
						</div>

						<h1 className="ip-name">{user.username}</h1>
						<span className="ip-role">
							<span className="ip-role-dot" />
							{user.role || "Member"}
						</span>

						<div className="ip-rule" />

						<div className="ip-socials">
							{SOCIALS.map(({ Icon, label }) => (
								<a key={label} href="#" className="ip-social" title={label}>
									<Icon size={14} />
								</a>
							))}
						</div>

						<button className="ip-cta">
							Contact Me
							<svg className="ip-cta-arr" width="13" height="13" viewBox="0 0 13 13" fill="none">
								<path
									d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>

					{/* ── RIGHT PANEL ── */}
					<div className="ip-right">
						<div className="ip-sec-head">
							<span className="ip-sec-title">Personal Information</span>
							<span className="ip-sec-line" />
						</div>

						<div className="ip-grid">
							{INFO_FIELDS(user).map(({ Icon, label, value }) => (
								<div key={label} className="ip-ic">
									<div className="ip-ic-icon">
										<Icon size={13} />
									</div>
									<div>
										<div className="ip-ic-label">{label}</div>
										<div className="ip-ic-value">{value}</div>
									</div>
								</div>
							))}
						</div>

						<div className="ip-bio">
							<div className="ip-bio-head">About Me</div>
							<p className="ip-bio-text">{user.bio || "No bio provided yet."}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InfoPage;
