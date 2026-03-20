import { useEffect, useState } from "react";
import ErrorAlert from "../components/alerts/ErrorAlert";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SuccessAlert from "../components/alerts/SuccessAlert";
import { FiShoppingCart, FiUser, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
	const { loginUser, errorMsg } = useAuthContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [showPw, setShowPw] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setSuccessMsg("");
		if (location.state?.response?.message) {
			setSuccessMsg(location.state.response.message);
		} else if (location?.state?.message) {
			setSuccessMsg(location.state.message);
		}
		const timer = setTimeout(() => {
			navigate(location.pathname, { replace: true, state: null });
		}, 3000);
		return () => clearTimeout(timer);
	}, [location.state, location.pathname]);

	const onSubmit = async (data) => {
		setSuccessMsg("");
		setLoading(true);
		try {
			const response = await loginUser(data);
			if (response.success) navigate("/dashboard");
		} catch (error) {
			console.error("Login Error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
				.ln-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
				.ln-input {
					width: 100%; padding: 11px 14px 11px 40px;
					background: rgba(255,255,255,0.06);
					border: 1px solid rgba(255,255,255,0.12);
					border-radius: 10px; font-size: 14px; color: #fff;
					outline: none; transition: border-color .2s ease, background .2s ease;
				}
				.ln-input::placeholder { color: rgba(255,255,255,0.3); }
				.ln-input:focus { border-color: rgba(48,96,115,0.8); background: rgba(255,255,255,0.1); }
				.ln-input.err { border-color: rgba(185,64,64,0.7); }
				.ln-btn {
					width: 100%; padding: 12px;
					background: #306073; color: #fff;
					border: none; border-radius: 10px;
					font-size: 14px; font-weight: 600;
					letter-spacing: 0.04em; cursor: pointer;
					display: flex; align-items: center; justify-content: center; gap: 8px;
					transition: background .2s ease, transform .18s ease, box-shadow .2s ease;
				}
				.ln-btn:hover:not(:disabled) { background: #254e5e; box-shadow: 0 6px 20px rgba(48,96,115,0.4); transform: translateY(-1px); }
				.ln-btn:disabled { opacity: 0.65; cursor: not-allowed; }
				.ln-link { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); text-decoration: none; transition: color .15s; }
				.ln-link:hover { color: #82c4d4; }
				.ln-pw-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.35); padding:0; transition:color .15s; }
				.ln-pw-toggle:hover { color:rgba(255,255,255,0.7); }
				@keyframes lnUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
				.ln-card { animation: lnUp 0.5s ease both; }
				@keyframes lnOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
				.ln-orb { animation: lnOrb 8s ease-in-out infinite; }
				@keyframes spin { to { transform: rotate(360deg); } }

				/* ── Responsive ── */

				/* Tablet: stack panels vertically, left panel becomes a compact header */
				@media (max-width: 768px) {
					.ln-card {
						flex-direction: column !important;
						max-width: 480px !important;
					}
					.ln-left-panel {
						width: 100% !important;
						padding: 24px 28px !important;
						flex-direction: row !important;
						align-items: center !important;
						gap: 16px !important;
					}
					.ln-left-content { display: none !important; }
					.ln-left-footer { display: none !important; }
					.ln-brand-row { margin-bottom: 0 !important; }
					.ln-right-panel {
						padding: 28px 28px 32px !important;
					}
				}

				/* Mobile: tighter padding, full-width card */
				@media (max-width: 480px) {
					.ln-page { padding: 0 !important; align-items: stretch !important; }
					.ln-card {
						max-width: 100% !important;
						border-radius: 0 !important;
						min-height: 100vh !important;
						border: none !important;
						box-shadow: none !important;
					}
					.ln-left-panel { padding: 20px 20px !important; }
					.ln-right-panel { padding: 24px 20px 32px !important; flex: 1 !important; }
					.ln-links-row { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
				}
			`}</style>

			<div className="ln-root ln-page" style={S.page}>
				{/* Background orbs */}
				<div className="ln-orb" style={S.orb1} />
				<div style={S.orb2} />

				<div className="ln-card" style={S.card}>
					{/* Left panel */}
					<div className="ln-left-panel" style={S.leftPanel}>
						<div className="ln-brand-row" style={S.brandRow}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={18} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>
						<div className="ln-left-content" style={S.leftContent}>
							<h1 style={S.leftHeading}>Welcome back</h1>
							<p style={S.leftSub}>Sign in to manage your services, orders and clients.</p>
							<div style={S.featureList}>
								{["Sell & buy services", "Track your orders", "Manage your clients"].map((f, i) => (
									<div key={i} style={S.featureItem}>
										<div style={S.featureDot} />
										<span style={S.featureText}>{f}</span>
									</div>
								))}
							</div>
						</div>
						<p className="ln-left-footer" style={S.leftFooter}>
							© 2025 Lancer · All rights reserved
						</p>
					</div>

					{/* Right panel */}
					<div className="ln-right-panel" style={S.rightPanel}>
						<div style={S.formHeader}>
							<h2 style={S.formTitle}>Sign in</h2>
							<p style={S.formSub}>Enter your credentials to continue</p>
						</div>

						{/* Alerts */}
						{errorMsg && <ErrorAlert err={errorMsg} />}
						{successMsg && <SuccessAlert err={successMsg} />}

						<form onSubmit={handleSubmit(onSubmit)} style={S.form}>
							{/* Username */}
							<div style={S.fieldWrap}>
								<label style={S.label}>Username</label>
								<div style={S.inputWrap}>
									<FiUser size={15} style={S.inputIcon} />
									<input
										id="username"
										type="text"
										placeholder="your_username"
										className={`ln-input${errors.username ? " err" : ""}`}
										{...register("username", { required: "Username is required" })}
									/>
								</div>
								{errors.username && <span style={S.errMsg}>{errors.username.message}</span>}
							</div>

							{/* Password */}
							<div style={S.fieldWrap}>
								<label style={S.label}>Password</label>
								<div style={{ ...S.inputWrap, position: "relative" }}>
									<FiLock size={15} style={S.inputIcon} />
									<input
										id="password"
										type={showPw ? "text" : "password"}
										placeholder="••••••••••"
										className={`ln-input${errors.password ? " err" : ""}`}
										{...register("password", { required: "Password is required" })}
									/>
									<button type="button" className="ln-pw-toggle" onClick={() => setShowPw((p) => !p)}>
										{showPw ?
											<svg
												width="15"
												height="15"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round">
												<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
												<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
												<line x1="1" y1="1" x2="23" y2="23" />
											</svg>
										:	<svg
												width="15"
												height="15"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round">
												<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
												<circle cx="12" cy="12" r="3" />
											</svg>
										}
									</button>
								</div>
								{errors.password && <span style={S.errMsg}>{errors.password.message}</span>}
							</div>

							{/* Submit */}
							<button type="submit" className="ln-btn" disabled={loading}>
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
										Signing in…
									</>
								:	<>
										Sign in <FiArrowRight size={15} />
									</>
								}
							</button>
						</form>

						{/* Links */}
						<div className="ln-links-row" style={S.linksRow}>
							<Link to="/reset_password" className="ln-link">
								Forgot password?
							</Link>
							<Link to="/resend_activation" className="ln-link">
								Resend activation
							</Link>
						</div>

						<div style={S.signupRow}>
							<span style={S.signupText}>Don't have an account?</span>
							<Link to="/register" style={S.signupLink}>
								Create one
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const S = {
	page: {
		minHeight: "100vh",
		background: "#0e1a1f",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "24px 16px",
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
		maxWidth: "860px",
		borderRadius: "20px",
		overflow: "hidden",
		boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
		border: "1px solid rgba(48,96,115,0.2)",
		position: "relative",
		zIndex: 1,
	},

	/* left */
	leftPanel: {
		width: "340px",
		flexShrink: 0,
		background: "#306073",
		padding: "36px 32px",
		display: "flex",
		flexDirection: "column",
	},
	brandRow: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		marginBottom: "40px",
	},
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
	leftContent: { flex: 1 },
	leftHeading: {
		fontSize: "28px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
		margin: "0 0 12px",
	},
	leftSub: {
		fontSize: "13px",
		color: "rgba(255,255,255,0.6)",
		lineHeight: 1.65,
		margin: "0 0 32px",
	},
	featureList: { display: "flex", flexDirection: "column", gap: "12px" },
	featureItem: { display: "flex", alignItems: "center", gap: "10px" },
	featureDot: {
		width: "7px",
		height: "7px",
		borderRadius: "50%",
		background: "rgba(255,255,255,0.5)",
		flexShrink: 0,
	},
	featureText: { fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 },
	leftFooter: { fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "auto", paddingTop: "24px" },

	/* right */
	rightPanel: {
		flex: 1,
		background: "#111a1f",
		padding: "40px 36px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	formHeader: { marginBottom: "28px" },
	formTitle: {
		fontSize: "22px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.02em",
		margin: "0 0 6px",
	},
	formSub: { fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 },

	form: { display: "flex", flexDirection: "column", gap: "18px", marginBottom: "20px" },

	fieldWrap: { display: "flex", flexDirection: "column", gap: "6px" },
	label: {
		fontSize: "12px",
		fontWeight: 600,
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		color: "rgba(255,255,255,0.5)",
	},
	inputWrap: { position: "relative", display: "flex", alignItems: "center" },
	inputIcon: {
		position: "absolute",
		left: "13px",
		color: "rgba(255,255,255,0.3)",
		pointerEvents: "none",
	},
	errMsg: { fontSize: "11px", color: "#e57373", fontWeight: 500 },

	linksRow: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "24px",
	},

	signupRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "6px",
		paddingTop: "20px",
		borderTop: "1px solid rgba(255,255,255,0.07)",
	},
	signupText: { fontSize: "13px", color: "rgba(255,255,255,0.35)" },
	signupLink: {
		fontSize: "13px",
		fontWeight: 600,
		color: "#82c4d4",
		textDecoration: "none",
		transition: "color .15s",
	},
};

export default Login;
