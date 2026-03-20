import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router";
import apiClient from "../../services/api-client";
import ErrorAlert from "../alerts/ErrorAlert";
import { FiShoppingCart, FiLock, FiArrowRight, FiArrowLeft } from "react-icons/fi";

/* ── password strength helper ────────────────────────────────── */
const getStrength = (pw = "") => {
	let score = 0;
	if (pw.length >= 8) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	return score; // 0–4
};
const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#b94040", "#d97706", "#306073", "#16a34a"];

const EyeIcon = ({ open }) =>
	open ?
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
		</svg>;

const ForgotPasswordConfirm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const { uid, token } = useParams();
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [showPw, setShowPw] = useState(false);
	const [showCpw, setShowCpw] = useState(false);
	const [done, setDone] = useState(false);
	const navigate = useNavigate();

	const watchedPw = watch("new_password", "");
	const strength = getStrength(watchedPw);

	const onSubmit = async (data) => {
		setErrorMsg("");
		setLoading(true);
		delete data.confirm_password;
		try {
			await apiClient.post("/auth/users/reset_password_confirm/", {
				uid,
				token,
				new_password: data.new_password,
			});
			setDone(true);
			setTimeout(() => navigate("/login", { state: { message: "Password reset successful!" } }), 2500);
		} catch (error) {
			console.error(error);
			setErrorMsg("Something went wrong. The link may have expired.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
				.fpc * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
				.fpc-inp {
					width:100%; padding:11px 42px 11px 40px;
					background:rgba(255,255,255,0.06);
					border:1px solid rgba(255,255,255,0.12);
					border-radius:10px; font-size:14px; color:#fff; outline:none;
					transition:border-color .2s, background .2s;
				}
				.fpc-inp::placeholder { color:rgba(255,255,255,0.28); }
				.fpc-inp:focus { border-color:rgba(48,96,115,0.8); background:rgba(255,255,255,0.09); }
				.fpc-inp.err { border-color:rgba(185,64,64,0.7); }
				.fpc-btn {
					width:100%; padding:12px;
					background:#306073; color:#fff;
					border:none; border-radius:10px;
					font-size:14px; font-weight:600; letter-spacing:.04em;
					cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
					transition:background .2s, transform .18s, box-shadow .2s;
					font-family:'DM Sans',sans-serif;
				}
				.fpc-btn:hover:not(:disabled) { background:#254e5e; box-shadow:0 6px 20px rgba(48,96,115,0.4); transform:translateY(-1px); }
				.fpc-btn:disabled { opacity:0.65; cursor:not-allowed; }
				.fpc-eye { position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);padding:0;transition:color .15s; }
				.fpc-eye:hover { color:rgba(255,255,255,0.65); }
				.fpc-back { display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:rgba(255,255,255,0.4);text-decoration:none;transition:color .15s; }
				.fpc-back:hover { color:#82c4d4; }
				@keyframes fpcUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
				.fpc-card { animation:fpcUp .5s ease both; }
				@keyframes fpcOrb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08) translate(10px,-10px)} }
				.fpc-orb { animation:fpcOrb 8s ease-in-out infinite; }
				@keyframes fpcPulse { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:.9;transform:scale(1.06)} }
				.fpc-ring { animation:fpcPulse 2s ease-in-out infinite; }
				@keyframes spin { to{transform:rotate(360deg)} }
				@keyframes checkPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
				.fpc-check { animation:checkPop .55s .1s ease both; }
				@keyframes fillBar { from{width:0%} to{width:100%} }
				.fpc-fill { animation:fillBar 2.5s linear forwards; }
				.fpc-strength-bar { height:100%;border-radius:99px;transition:width .35s ease,background .35s ease; }

				/* ── Responsive ── */

				/* Tablet: stack panels, left collapses to brand bar */
				@media (max-width: 768px) {
					.fpc-card {
						flex-direction: column !important;
						max-width: 480px !important;
					}
					.fpc-left {
						width: 100% !important;
						padding: 22px 28px !important;
						flex-direction: row !important;
						align-items: center !important;
						gap: 16px !important;
					}
					.fpc-left-body { display: none !important; }
					.fpc-left-footer { display: none !important; }
					.fpc-brand-row { margin-bottom: 0 !important; }
					.fpc-right {
						padding: 28px 28px 32px !important;
					}
				}

				/* Mobile: full-screen card */
				@media (max-width: 480px) {
					.fpc-page { padding: 0 !important; align-items: stretch !important; }
					.fpc-card {
						max-width: 100% !important;
						border-radius: 0 !important;
						min-height: 100vh !important;
						border: none !important;
						box-shadow: none !important;
					}
					.fpc-left { padding: 18px 20px !important; }
					.fpc-right { padding: 24px 20px 32px !important; flex: 1 !important; }
				}
			`}</style>

			<div className="fpc fpc-page" style={S.page}>
				<div className="fpc-orb" style={S.orb1} />
				<div style={S.orb2} />

				<div className="fpc-card" style={S.card}>
					{/* ── Left panel ── */}
					<div className="fpc-left" style={S.left}>
						<div className="fpc-brand-row" style={S.brandRow}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={18} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>

						<div className="fpc-left-body">
							{/* Lock illustration */}
							<div style={S.illustrationWrap}>
								<div
									style={{
										...S.illustrationCircle,
										background: done ? "rgba(22,163,74,0.18)" : "rgba(255,255,255,0.12)",
									}}>
									<div className="fpc-ring" style={S.illustrationRing} />
									{done ?
										<svg
											className="fpc-check"
											width="40"
											height="40"
											viewBox="0 0 24 24"
											fill="none"
											stroke="rgba(255,255,255,0.92)"
											strokeWidth="2.2"
											strokeLinecap="round">
											<polyline points="20 6 9 17 4 12" />
										</svg>
									:	<FiLock size={38} color="rgba(255,255,255,0.9)" />}
								</div>
							</div>

							<h1 style={S.leftH}>{done ? "All done!" : "Set new password"}</h1>
							<p style={S.leftSub}>
								{done ?
									"Your password has been updated. You'll be signed in shortly."
								:	"Choose a strong password with at least 8 characters, a number, and a symbol."}
							</p>

							{/* Password tips */}
							{!done && (
								<div style={S.tipList}>
									{[
										{ rule: "At least 8 characters", ok: watchedPw.length >= 8 },
										{ rule: "One uppercase letter", ok: /[A-Z]/.test(watchedPw) },
										{ rule: "One number", ok: /[0-9]/.test(watchedPw) },
										{ rule: "One special character", ok: /[^A-Za-z0-9]/.test(watchedPw) },
									].map((tip, i) => (
										<div key={i} style={S.tipItem}>
											<div
												style={{
													...S.tipDot,
													background:
														tip.ok ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
												}}
											/>
											<span
												style={{
													...S.tipText,
													color: tip.ok ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
												}}>
												{tip.rule}
											</span>
										</div>
									))}
								</div>
							)}
						</div>

						<p className="fpc-left-footer" style={S.leftFooter}>
							© 2025 Lancer · All rights reserved
						</p>
					</div>

					{/* ── Right panel ── */}
					<div className="fpc-right" style={S.right}>
						<Link
							to="/login"
							className="fpc-back"
							style={{ marginBottom: "28px", alignSelf: "flex-start" }}>
							<FiArrowLeft size={13} /> Back to sign in
						</Link>

						{!done ?
							<>
								<div style={S.formHeader}>
									<h2 style={S.formTitle}>Reset password</h2>
									<p style={S.formSub}>Enter and confirm your new password below.</p>
								</div>

								{errorMsg && <ErrorAlert err={errorMsg} />}

								<form onSubmit={handleSubmit(onSubmit)} style={S.form}>
									{/* New password */}
									<div style={S.fieldWrap}>
										<label style={S.label}>New password</label>
										<div style={S.inputRow}>
											<FiLock size={15} style={S.inputIcon} />
											<input
												id="new_password"
												type={showPw ? "text" : "password"}
												placeholder="Min 8 characters"
												className={`fpc-inp${errors.new_password ? " err" : ""}`}
												{...register("new_password", {
													required: "Password is required",
													minLength: { value: 8, message: "At least 8 characters" },
												})}
											/>
											<button
												type="button"
												className="fpc-eye"
												onClick={() => setShowPw((p) => !p)}>
												<EyeIcon open={showPw} />
											</button>
										</div>
										{errors.new_password && (
											<span style={S.errMsg}>{errors.new_password.message}</span>
										)}

										{/* Strength bar */}
										{watchedPw.length > 0 && (
											<div style={S.strengthWrap}>
												<div style={S.strengthTrack}>
													<div
														className="fpc-strength-bar"
														style={{
															width: `${(strength / 4) * 100}%`,
															background: STRENGTH_COLOR[strength],
														}}
													/>
												</div>
												<span style={{ ...S.strengthLabel, color: STRENGTH_COLOR[strength] }}>
													{STRENGTH_LABEL[strength]}
												</span>
											</div>
										)}
									</div>

									{/* Confirm password */}
									<div style={S.fieldWrap}>
										<label style={S.label}>Confirm password</label>
										<div style={S.inputRow}>
											<FiLock size={15} style={S.inputIcon} />
											<input
												id="confirmPassword"
												type={showCpw ? "text" : "password"}
												placeholder="Repeat your password"
												className={`fpc-inp${errors.confirm_password ? " err" : ""}`}
												{...register("confirm_password", {
													required: "Please confirm your password",
													validate: (v) =>
														v === watch("new_password") || "Passwords do not match",
												})}
											/>
											<button
												type="button"
												className="fpc-eye"
												onClick={() => setShowCpw((p) => !p)}>
												<EyeIcon open={showCpw} />
											</button>
										</div>
										{errors.confirm_password && (
											<span style={S.errMsg}>{errors.confirm_password.message}</span>
										)}
									</div>

									<button type="submit" className="fpc-btn" disabled={loading}>
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
												Saving…
											</>
										:	<>
												Save new password <FiArrowRight size={15} />
											</>
										}
									</button>
								</form>
							</>
						:	/* ── Success state ── */
							<div style={S.successBlock}>
								<div className="fpc-check" style={S.successIcon}>
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
								<h3 style={S.successTitle}>Password updated!</h3>
								<p style={S.successSub}>
									Your new password has been saved. Redirecting you to sign in…
								</p>
								<div style={S.redirectBar}>
									<div className="fpc-fill" style={S.redirectFill} />
								</div>
								<Link
									to="/login"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "7px",
										padding: "11px 24px",
										background: "#306073",
										color: "#fff",
										borderRadius: "10px",
										fontSize: "14px",
										fontWeight: 600,
										letterSpacing: ".04em",
										textDecoration: "none",
										marginTop: "8px",
										transition: "background .2s",
									}}>
									Sign in now
								</Link>
							</div>
						}
					</div>
				</div>
			</div>
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
	illustrationWrap: { display: "flex", justifyContent: "center", marginBottom: "26px" },
	illustrationCircle: {
		width: "90px",
		height: "90px",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		transition: "background 0.4s ease",
	},
	illustrationRing: {
		position: "absolute",
		inset: "-10px",
		borderRadius: "50%",
		border: "1.5px solid rgba(255,255,255,0.2)",
	},
	leftH: {
		fontSize: "20px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
		margin: "0 0 10px",
	},
	leftSub: { fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 22px" },
	tipList: { display: "flex", flexDirection: "column", gap: "9px" },
	tipItem: { display: "flex", alignItems: "center", gap: "10px" },
	tipDot: { width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0, transition: "background 0.25s ease" },
	tipText: { fontSize: "12.5px", fontWeight: 500, transition: "color 0.25s ease" },
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
	formHeader: { marginBottom: "26px" },
	formTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" },
	formSub: { fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 },
	form: { display: "flex", flexDirection: "column", gap: "18px" },
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

	/* strength */
	strengthWrap: { display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" },
	strengthTrack: {
		flex: 1,
		height: "4px",
		background: "rgba(255,255,255,0.08)",
		borderRadius: "99px",
		overflow: "hidden",
	},
	strengthLabel: { fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", minWidth: "44px", textAlign: "right" },

	/* success */
	successBlock: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "14px",
		textAlign: "center",
		padding: "10px 0",
	},
	successIcon: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		background: "rgba(48,96,115,0.15)",
		border: "1.5px solid rgba(48,96,115,0.4)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	successTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 },
	successSub: { fontSize: "14px", color: "rgba(255,255,255,0.42)", lineHeight: 1.65, margin: 0, maxWidth: "300px" },
	redirectBar: {
		width: "100%",
		height: "3px",
		borderRadius: "99px",
		background: "rgba(48,96,115,0.2)",
		overflow: "hidden",
	},
	redirectFill: { height: "100%", background: "#306073", borderRadius: "99px" },
};

export default ForgotPasswordConfirm;
