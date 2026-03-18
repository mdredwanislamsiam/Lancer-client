import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { useNavigate, Link } from "react-router";
import ErrorAlert from "../alerts/ErrorAlert";
import { FiShoppingCart, FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";

const ResendActivation = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [sent, setSent] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setErrorMsg("");
		setLoading(true);
		try {
			await apiClient.post("/auth/users/resend_activation/", data);
			setSent(true);
			setTimeout(() => {
				navigate("/login", {
					state: { message: "An activation email was sent. Please activate to login." },
				});
			}, 2200);
		} catch (error) {
			setErrorMsg(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
				.ra * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
				.ra-inp {
					width:100%; padding:11px 14px 11px 40px;
					background:rgba(255,255,255,0.06);
					border:1px solid rgba(255,255,255,0.12);
					border-radius:10px; font-size:14px; color:#fff; outline:none;
					transition:border-color .2s, background .2s;
				}
				.ra-inp::placeholder { color:rgba(255,255,255,0.28); }
				.ra-inp:focus { border-color:rgba(48,96,115,0.8); background:rgba(255,255,255,0.09); }
				.ra-inp.err { border-color:rgba(185,64,64,0.7); }
				.ra-btn {
					width:100%; padding:12px;
					background:#306073; color:#fff;
					border:none; border-radius:10px;
					font-size:14px; font-weight:600; letter-spacing:.04em;
					cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
					transition:background .2s, transform .18s, box-shadow .2s;
					font-family:'DM Sans',sans-serif;
				}
				.ra-btn:hover:not(:disabled) { background:#254e5e; box-shadow:0 6px 20px rgba(48,96,115,0.4); transform:translateY(-1px); }
				.ra-btn:disabled { opacity:0.65; cursor:not-allowed; }
				.ra-back { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:rgba(255,255,255,0.4); text-decoration:none; transition:color .15s; }
				.ra-back:hover { color:#82c4d4; }
				.ra-signin { font-size:13px; font-weight:600; color:#82c4d4; text-decoration:none; transition:color .15s; }
				.ra-signin:hover { color:#a8d8e8; }
				@keyframes raUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
				.ra-card { animation:raUp .5s ease both; }
				@keyframes raOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
				.ra-orb { animation:raOrb 8s ease-in-out infinite; }
				@keyframes spin { to{transform:rotate(360deg)} }
				@keyframes checkPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
				.ra-check { animation:checkPop .5s ease both; }
				@keyframes raPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
				.ra-pulse { animation:raPulse 2s ease-in-out infinite; }
			`}</style>

			<div className="ra" style={S.page}>
				{/* orbs */}
				<div className="ra-orb" style={S.orb1} />
				<div style={S.orb2} />

				<div className="ra-card" style={S.card}>
					{/* ── Left panel ── */}
					<div style={S.left}>
						{/* Logo */}
						<div style={S.brandRow}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={18} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>

						{/* Illustration area */}
						<div style={S.illustrationWrap}>
							<div style={S.illustrationCircle}>
								<div className="ra-pulse" style={S.illustrationRing} />
								<FiMail size={38} color="rgba(255,255,255,0.9)" />
							</div>
						</div>

						<div style={{ flex: 1 }}>
							<h1 style={S.leftH}>Check your inbox</h1>
							<p style={S.leftSub}>
								We'll send a new activation link to your registered email address. Follow the link to
								unlock your account.
							</p>
							<div style={S.stepList}>
								{["Enter your email below", "Open the activation link", "Sign in to Lancer"].map(
									(step, i) => (
										<div key={i} style={S.stepItem}>
											<div style={S.stepNum}>{i + 1}</div>
											<span style={S.stepText}>{step}</span>
										</div>
									),
								)}
							</div>
						</div>

						<p style={S.leftFooter}>© 2025 Lancer · All rights reserved</p>
					</div>

					{/* ── Right panel ── */}
					<div style={S.right}>
						<Link to="/login" className="ra-back" style={{ marginBottom: "28px", alignSelf: "flex-start" }}>
							<FiArrowLeft size={13} /> Back to sign in
						</Link>

						{!sent ?
							<>
								<div style={S.formHeader}>
									<h2 style={S.formTitle}>Resend activation</h2>
									<p style={S.formSub}>Enter your email and we'll send a new activation link.</p>
								</div>

								{errorMsg && <ErrorAlert err={errorMsg} />}

								<form onSubmit={handleSubmit(onSubmit)} style={S.form}>
									<div style={S.fieldWrap}>
										<label style={S.label}>Email address</label>
										<div style={S.inputRow}>
											<FiMail size={15} style={S.inputIcon} />
											<input
												id="email"
												type="email"
												placeholder="name@example.com"
												className={`ra-inp${errors.email ? " err" : ""}`}
												{...register("email", { required: "Email is required" })}
											/>
										</div>
										{errors.email && <span style={S.errMsg}>{errors.email.message}</span>}
									</div>

									<button type="submit" className="ra-btn" disabled={loading}>
										{loading ?
											<>
												<svg
													width="15"
													height="15"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2.5"
													strokeLinecap="round"
													style={{ animation: "spin 1s linear infinite" }}>
													<path d="M21 12a9 9 0 1 1-6.219-8.56" />
												</svg>
												Sending…
											</>
										:	<>
												Send activation email <FiArrowRight size={15} />
											</>
										}
									</button>
								</form>

								<div style={S.signinRow}>
									<span style={S.signinText}>Remember your password?</span>
									<Link to="/login" className="ra-signin">
										Sign in
									</Link>
								</div>
							</>
						:	/* ── Success state ── */
							<div style={S.successBlock}>
								<div className="ra-check" style={S.successIcon}>
									<svg
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#306073"
										strokeWidth="2.5"
										strokeLinecap="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								</div>
								<h3 style={S.successTitle}>Email sent!</h3>
								<p style={S.successSub}>
									Check your inbox for the activation link. Redirecting you to sign in…
								</p>
								<div style={S.redirectBar}>
									<div style={S.redirectFill} />
								</div>
							</div>
						}
					</div>
				</div>
			</div>

			<style>{`
				@keyframes fillBar { from{width:0%} to{width:100%} }
				.ra-fill { animation:fillBar 2.2s linear forwards; }
			`}</style>
		</>
	);
};

/* ─── styles ─────────────────────────────────────────────────── */
const S = {
	page: {
		minHeight: "100vh",
		background: "#0e1a1f",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "32px 16px",
		position: "relative",
		overflow: "hidden",
	},
	orb1: {
		position: "absolute",
		top: "-120px",
		left: "-100px",
		width: "420px",
		height: "420px",
		borderRadius: "50%",
		background: "radial-gradient(circle, rgba(48,96,115,0.35) 0%, transparent 70%)",
		pointerEvents: "none",
	},
	orb2: {
		position: "absolute",
		bottom: "-80px",
		right: "-80px",
		width: "320px",
		height: "320px",
		borderRadius: "50%",
		background: "radial-gradient(circle, rgba(48,96,115,0.2) 0%, transparent 70%)",
		pointerEvents: "none",
	},
	card: {
		display: "flex",
		width: "100%",
		maxWidth: "820px",
		borderRadius: "20px",
		overflow: "hidden",
		boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
		border: "1px solid rgba(48,96,115,0.2)",
		position: "relative",
		zIndex: 1,
	},

	/* left */
	left: {
		width: "300px",
		flexShrink: 0,
		background: "#306073",
		padding: "36px 30px",
		display: "flex",
		flexDirection: "column",
	},
	brandRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" },
	logoBubble: {
		width: "34px",
		height: "34px",
		borderRadius: "9px",
		background: "rgba(255,255,255,0.15)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	brandName: {
		fontSize: "18px",
		fontWeight: 800,
		color: "#fff",
		letterSpacing: "-0.02em",
		textTransform: "uppercase",
	},

	/* illustration */
	illustrationWrap: { display: "flex", justifyContent: "center", marginBottom: "28px" },
	illustrationCircle: {
		width: "96px",
		height: "96px",
		borderRadius: "50%",
		background: "rgba(255,255,255,0.12)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	illustrationRing: {
		position: "absolute",
		inset: "-10px",
		borderRadius: "50%",
		border: "1.5px solid rgba(255,255,255,0.2)",
	},

	leftH: {
		fontSize: "22px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
		margin: "0 0 10px",
	},
	leftSub: { fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 26px" },

	stepList: { display: "flex", flexDirection: "column", gap: "12px" },
	stepItem: { display: "flex", alignItems: "center", gap: "12px" },
	stepNum: {
		width: "22px",
		height: "22px",
		borderRadius: "50%",
		background: "rgba(255,255,255,0.18)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "11px",
		fontWeight: 700,
		color: "#fff",
		flexShrink: 0,
	},
	stepText: { fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 },
	leftFooter: { fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "auto", paddingTop: "24px" },

	/* right */
	right: {
		flex: 1,
		background: "#111a1f",
		padding: "40px 36px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	formHeader: { marginBottom: "28px" },
	formTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" },
	formSub: { fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 },

	form: { display: "flex", flexDirection: "column", gap: "18px", marginBottom: "24px" },
	fieldWrap: { display: "flex", flexDirection: "column", gap: "6px" },
	label: {
		fontSize: "11px",
		fontWeight: 600,
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		color: "rgba(255,255,255,0.45)",
	},
	inputRow: { position: "relative", display: "flex", alignItems: "center" },
	inputIcon: { position: "absolute", left: "13px", color: "rgba(255,255,255,0.3)", pointerEvents: "none" },
	errMsg: { fontSize: "11px", color: "#e57373", fontWeight: 500 },

	signinRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "6px",
		paddingTop: "20px",
		borderTop: "1px solid rgba(255,255,255,0.07)",
	},
	signinText: { fontSize: "13px", color: "rgba(255,255,255,0.35)" },

	/* success */
	successBlock: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
		textAlign: "center",
		padding: "20px 0",
	},
	successIcon: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		background: "rgba(48,96,115,0.15)",
		border: "1.5px solid rgba(48,96,115,0.35)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	successTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 },
	successSub: { fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, maxWidth: "320px" },
	redirectBar: {
		width: "100%",
		height: "3px",
		borderRadius: "99px",
		background: "rgba(48,96,115,0.2)",
		overflow: "hidden",
		marginTop: "8px",
	},
	redirectFill: {
		height: "100%",
		background: "#306073",
		borderRadius: "99px",
		animation: "fillBar 2.2s linear forwards",
	},
};

export default ResendActivation;
