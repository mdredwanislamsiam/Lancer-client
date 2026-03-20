import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import apiClient from "../../services/api-client";
import { FiShoppingCart } from "react-icons/fi";

/* ── status enum ─────────────────────────────────────────────── */
const STATUS = { LOADING: "loading", SUCCESS: "success", ERROR: "error" };

const ActivateAccount = () => {
	const { uid, token } = useParams();
	const [status, setStatus] = useState(STATUS.LOADING);
	const navigate = useNavigate();

	useEffect(() => {
		if (!uid || !token) {
			setStatus(STATUS.ERROR);
			return;
		}
		apiClient
			.post("/auth/users/activation/", { uid, token })
			.then(() => {
				setStatus(STATUS.SUCCESS);
				setTimeout(
					() =>
						navigate("/login", {
							state: { message: "Account activated! You can now sign in." },
						}),
					2800,
				);
			})
			.catch((err) => {
				console.error(err);
				setStatus(STATUS.ERROR);
			});
	}, []);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
				.ac * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
				@keyframes acUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
				.ac-card { animation:acUp .5s ease both; }
				@keyframes acOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
				.ac-orb { animation:acOrb 8s ease-in-out infinite; }
				@keyframes spin { to{transform:rotate(360deg)} }
				.ac-spinner { animation:spin 1s linear infinite; }
				@keyframes checkPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.18)} 100%{transform:scale(1);opacity:1} }
				.ac-check { animation:checkPop .55s .1s ease both; }
				@keyframes errShake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
				.ac-err { animation:errShake .45s .1s ease both; }
				@keyframes acPulse { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:.9;transform:scale(1.06)} }
				.ac-ring { animation:acPulse 2s ease-in-out infinite; }
				@keyframes fillBar { from{width:0%} to{width:100%} }
				.ac-fill { animation:fillBar 2.8s linear forwards; }
				@keyframes dot { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }
				.ac-dot1 { animation:dot 1.2s .0s ease-in-out infinite; }
				.ac-dot2 { animation:dot 1.2s .2s ease-in-out infinite; }
				.ac-dot3 { animation:dot 1.2s .4s ease-in-out infinite; }

				.ac-btn {
					display:inline-flex; align-items:center; gap:7px;
					padding:11px 24px; background:#306073; color:#fff;
					border:none; border-radius:10px; font-size:14px; font-weight:600;
					letter-spacing:.04em; cursor:pointer; text-decoration:none;
					transition:background .2s, transform .18s, box-shadow .2s;
					font-family:'DM Sans',sans-serif;
				}
				.ac-btn:hover { background:#254e5e; box-shadow:0 6px 20px rgba(48,96,115,.4); transform:translateY(-1px); }
				.ac-btn-ghost {
					display:inline-flex; align-items:center; gap:7px;
					padding:11px 24px; background:transparent; color:rgba(255,255,255,.45);
					border:1px solid rgba(255,255,255,.12); border-radius:10px;
					font-size:14px; font-weight:500; cursor:pointer; text-decoration:none;
					transition:all .2s; font-family:'DM Sans',sans-serif;
				}
				.ac-btn-ghost:hover { color:#82c4d4; border-color:rgba(48,96,115,.4); }

				/* ── Responsive ── */
				@media (max-width: 768px) {
					.ac-left { display: none !important; }
					.ac-card {
						max-width: 460px !important;
						border-radius: 16px !important;
					}
					.ac-right {
						padding: 32px 28px !important;
					}
					.ac-mobile-brand { display: flex !important; }
				}

				@media (max-width: 480px) {
					.ac-page {
						padding: 0 !important;
						align-items: flex-start !important;
					}
					.ac-card {
						border-radius: 0 !important;
						border: none !important;
						box-shadow: none !important;
						min-height: 100vh !important;
					}
					.ac-right {
						padding: 24px 18px 32px !important;
						align-items: flex-start !important;
						justify-content: flex-start !important;
					}
				}

				.ac-mobile-brand { display: none; }
			`}</style>

			<div className="ac ac-page" style={S.page}>
				{/* orbs */}
				<div className="ac-orb" style={S.orb1} />
				<div style={S.orb2} />

				<div className="ac-card" style={S.card}>
					{/* ── Left panel ── */}
					<div className="ac-left" style={S.left}>
						<div style={S.brandRow}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={18} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>

						{/* Dynamic illustration */}
						<div style={S.illustrationWrap}>
							<div
								style={{
									...S.illustrationCircle,
									background:
										status === STATUS.ERROR ? "rgba(185,64,64,0.15)" : "rgba(255,255,255,0.12)",
								}}>
								<div
									className="ac-ring"
									style={{
										...S.illustrationRing,
										borderColor:
											status === STATUS.ERROR ? "rgba(185,64,64,0.35)" : "rgba(255,255,255,0.2)",
									}}
								/>
								{status === STATUS.LOADING && (
									<svg
										className="ac-spinner"
										width="40"
										height="40"
										viewBox="0 0 24 24"
										fill="none"
										stroke="rgba(255,255,255,0.85)"
										strokeWidth="2"
										strokeLinecap="round">
										<path d="M21 12a9 9 0 1 1-6.219-8.56" />
									</svg>
								)}
								{status === STATUS.SUCCESS && (
									<svg
										className="ac-check"
										width="40"
										height="40"
										viewBox="0 0 24 24"
										fill="none"
										stroke="rgba(255,255,255,0.92)"
										strokeWidth="2.2"
										strokeLinecap="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								)}
								{status === STATUS.ERROR && (
									<svg
										className="ac-err"
										width="38"
										height="38"
										viewBox="0 0 24 24"
										fill="none"
										stroke="rgba(220,100,100,0.9)"
										strokeWidth="2.2"
										strokeLinecap="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="15" y1="9" x2="9" y2="15" />
										<line x1="9" y1="9" x2="15" y2="15" />
									</svg>
								)}
							</div>
						</div>

						<h1 style={S.leftH}>Account Activation</h1>
						<p style={S.leftSub}>
							{status === STATUS.LOADING && "Verifying your activation link…"}
							{status === STATUS.SUCCESS && "You're all set. Welcome to Lancer!"}
							{status === STATUS.ERROR && "The link may have expired or already been used."}
						</p>

						<div style={S.stepList}>
							{[
								{ label: "Email confirmed", done: status !== STATUS.LOADING },
								{ label: "Account activated", done: status === STATUS.SUCCESS },
								{ label: "Redirect to sign in", done: false },
							].map((step, i) => (
								<div key={i} style={S.stepItem}>
									<div
										style={{
											...S.stepNum,
											background: step.done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)",
										}}>
										{step.done ?
											<svg
												width="10"
												height="10"
												viewBox="0 0 24 24"
												fill="none"
												stroke="#fff"
												strokeWidth="3"
												strokeLinecap="round">
												<polyline points="20 6 9 17 4 12" />
											</svg>
										:	<span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>
												{i + 1}
											</span>
										}
									</div>
									<span
										style={{
											...S.stepText,
											color: step.done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
										}}>
										{step.label}
									</span>
								</div>
							))}
						</div>

						<p style={S.leftFooter}>© 2025 Lancer · All rights reserved</p>
					</div>

					{/* ── Right panel ── */}
					<div className="ac-right" style={S.right}>
						{/* Mobile-only brand header */}
						<div className="ac-mobile-brand" style={S.mobileBrand}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={16} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>

						{/* loading */}
						{status === STATUS.LOADING && (
							<div style={S.stateBlock}>
								<div style={S.loadingDots}>
									<div className="ac-dot1" style={S.dot} />
									<div className="ac-dot2" style={S.dot} />
									<div className="ac-dot3" style={S.dot} />
								</div>
								<h2 style={S.stateTitle}>Activating your account</h2>
								<p style={S.stateSub}>
									Please hold on while we verify your activation link. This only takes a moment.
								</p>
								<div style={S.progressTrack}>
									<div
										style={{ ...S.progressFill, animation: "fillBar 8s linear forwards" }}
										className="ac-fill"
									/>
								</div>
							</div>
						)}

						{/* success */}
						{status === STATUS.SUCCESS && (
							<div style={S.stateBlock}>
								<div className="ac-check" style={S.successIcon}>
									<svg
										width="34"
										height="34"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#306073"
										strokeWidth="2.5"
										strokeLinecap="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								</div>
								<h2 style={S.stateTitle}>Account activated!</h2>
								<p style={S.stateSub}>
									Your account has been verified. You'll be redirected to sign in automatically.
								</p>
								<div style={S.progressTrack}>
									<div className="ac-fill" style={S.progressFill} />
								</div>
								<div style={S.redirectNote}>
									<div style={S.redirectDot} />
									<span style={S.redirectText}>Redirecting to sign in…</span>
								</div>
								<Link to="/login" className="ac-btn" style={{ marginTop: "8px" }}>
									Sign in now
								</Link>
							</div>
						)}

						{/* error */}
						{status === STATUS.ERROR && (
							<div style={S.stateBlock}>
								<div className="ac-err" style={S.errorIcon}>
									<svg
										width="34"
										height="34"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#b94040"
										strokeWidth="2.5"
										strokeLinecap="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="15" y1="9" x2="9" y2="15" />
										<line x1="9" y1="9" x2="15" y2="15" />
									</svg>
								</div>
								<h2 style={S.stateTitle}>Activation failed</h2>
								<p style={S.stateSub}>
									This link may have expired or already been used. Request a new activation email and
									try again.
								</p>
								<div style={S.errorActions}>
									<Link to="/resend_activation" className="ac-btn">
										Resend activation email
									</Link>
									<Link to="/login" className="ac-btn-ghost">
										Back to sign in
									</Link>
								</div>
							</div>
						)}
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
		flexShrink: 0,
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
		border: "1.5px solid",
		transition: "border-color 0.4s ease",
	},

	leftH: {
		fontSize: "20px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
		margin: "0 0 10px",
	},
	leftSub: {
		fontSize: "12.5px",
		color: "rgba(255,255,255,0.6)",
		lineHeight: 1.65,
		margin: "0 0 24px",
		transition: "all 0.3s",
	},

	stepList: { display: "flex", flexDirection: "column", gap: "12px" },
	stepItem: { display: "flex", alignItems: "center", gap: "12px" },
	stepNum: {
		width: "22px",
		height: "22px",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		transition: "background 0.3s ease",
	},
	stepText: { fontSize: "13px", fontWeight: 500, transition: "color 0.3s" },
	leftFooter: { fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "auto", paddingTop: "24px" },

	/* mobile brand strip */
	mobileBrand: {
		alignItems: "center",
		gap: "10px",
		marginBottom: "28px",
		paddingBottom: "20px",
		borderBottom: "1px solid rgba(255,255,255,0.07)",
		width: "100%",
	},

	/* right */
	right: {
		flex: 1,
		background: "#111a1f",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "40px 36px",
	},
	stateBlock: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		gap: "14px",
		width: "100%",
	},

	/* loading dots */
	loadingDots: { display: "flex", gap: "8px", marginBottom: "6px" },
	dot: { width: "10px", height: "10px", borderRadius: "50%", background: "#306073" },

	/* success */
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

	/* error */
	errorIcon: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		background: "rgba(185,64,64,0.1)",
		border: "1.5px solid rgba(185,64,64,0.35)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	errorActions: { display: "flex", flexDirection: "column", gap: "10px", width: "100%", marginTop: "6px" },

	stateTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 },
	stateSub: { fontSize: "14px", color: "rgba(255,255,255,0.42)", lineHeight: 1.65, margin: 0, maxWidth: "320px" },

	progressTrack: {
		width: "100%",
		height: "3px",
		borderRadius: "99px",
		background: "rgba(48,96,115,0.18)",
		overflow: "hidden",
	},
	progressFill: { height: "100%", background: "#306073", borderRadius: "99px", width: "0%" },

	redirectNote: { display: "flex", alignItems: "center", gap: "7px" },
	redirectDot: { width: "6px", height: "6px", borderRadius: "50%", background: "#306073", opacity: 0.7 },
	redirectText: { fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 500 },
};

export default ActivateAccount;
