import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router";
import ErrorAlert from "../components/alerts/ErrorAlert";
import { FiShoppingCart, FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiImage, FiArrowRight } from "react-icons/fi";

/* ─── tiny reusable field ────────────────────────────────────── */
const Field = ({ label, icon: Icon, error, children }) => (
	<div style={F.wrap}>
		<label style={F.label}>{label}</label>
		<div style={F.inputRow}>
			{Icon && <Icon size={14} style={F.icon} />}
			{children}
		</div>
		{error && <span style={F.err}>{error}</span>}
	</div>
);
const F = {
	wrap: { display: "flex", flexDirection: "column", gap: "5px" },
	label: {
		fontSize: "11px",
		fontWeight: 600,
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		color: "rgba(255,255,255,0.45)",
	},
	inputRow: { position: "relative", display: "flex", alignItems: "center" },
	icon: { position: "absolute", left: "13px", color: "rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 1 },
	err: { fontSize: "11px", color: "#e57373", fontWeight: 500 },
};

/* ─── main component ─────────────────────────────────────────── */
const Register = () => {
	const { registerUser, errorMsg } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(null);
	const [showPw, setShowPw] = useState(false);
	const [showCpw, setShowCpw] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("username", data.username);
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("email", data.email);
		formData.append("address", data.address);
		formData.append("phone_number", data.phone_number);
		formData.append("password", data.password);
		formData.append("bio", data.bio);
		formData.append("role", data.role);
		if (data.image?.[0]) formData.append("image", data.image[0]);
		delete data.confirm_password;
		setLoading(true);
		try {
			const response = await registerUser(formData);
			if (response.success) navigate("/login", { state: { response } });
		} catch (err) {
			console.error("Registration failed:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
				.rg * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
				.rg-inp {
					width:100%; padding:10px 14px 10px 40px;
					background:rgba(255,255,255,0.06);
					border:1px solid rgba(255,255,255,0.12);
					border-radius:10px; font-size:13px; color:#fff; outline:none;
					transition:border-color .2s, background .2s;
				}
				.rg-inp::placeholder { color:rgba(255,255,255,0.28); }
				.rg-inp:focus { border-color:rgba(48,96,115,0.8); background:rgba(255,255,255,0.09); }
				.rg-inp.err { border-color:rgba(185,64,64,0.7); }
				.rg-inp-no-icon { padding-left:14px; }
				.rg-textarea {
					width:100%; padding:10px 14px;
					background:rgba(255,255,255,0.06);
					border:1px solid rgba(255,255,255,0.12);
					border-radius:10px; font-size:13px; color:#fff; outline:none;
					resize:vertical; min-height:90px; line-height:1.6;
					transition:border-color .2s, background .2s;
					font-family:'DM Sans',sans-serif;
				}
				.rg-textarea::placeholder { color:rgba(255,255,255,0.28); }
				.rg-textarea:focus { border-color:rgba(48,96,115,0.8); background:rgba(255,255,255,0.09); }
				.rg-select {
					width:100%; padding:10px 14px;
					background:rgba(255,255,255,0.06);
					border:1px solid rgba(255,255,255,0.12);
					border-radius:10px; font-size:13px; color:#fff; outline:none;
					appearance:none; -webkit-appearance:none;
					background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.35)'/%3E%3C/svg%3E");
					background-repeat:no-repeat; background-position:right 14px center;
					cursor:pointer; transition:border-color .2s;
				}
				.rg-select:focus { border-color:rgba(48,96,115,0.8); }
				.rg-select option { background:#1a2a30; color:#fff; }
				.rg-file {
					width:100%; padding:9px 14px;
					background:rgba(255,255,255,0.04);
					border:1px dashed rgba(255,255,255,0.18);
					border-radius:10px; font-size:12px; color:rgba(255,255,255,0.5);
					cursor:pointer; outline:none; transition:border-color .2s;
				}
				.rg-file:hover { border-color:rgba(48,96,115,0.6); }
				.rg-btn {
					width:100%; padding:12px;
					background:#306073; color:#fff;
					border:none; border-radius:10px;
					font-size:14px; font-weight:600; letter-spacing:.04em;
					cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
					transition:background .2s, transform .18s, box-shadow .2s;
					font-family:'DM Sans',sans-serif;
				}
				.rg-btn:hover:not(:disabled) { background:#254e5e; box-shadow:0 6px 20px rgba(48,96,115,0.4); transform:translateY(-1px); }
				.rg-btn:disabled { opacity:0.65; cursor:not-allowed; }
				.rg-lnk { font-size:13px; font-weight:600; color:#82c4d4; text-decoration:none; transition:color .15s; }
				.rg-lnk:hover { color:#a8d8e8; }
				.rg-pw-eye { position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);padding:0;transition:color .15s; }
				.rg-pw-eye:hover { color:rgba(255,255,255,0.65); }
				@keyframes rgUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
				.rg-card { animation:rgUp .5s ease both; }
				@keyframes rgOrb { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
				.rg-orb { animation:rgOrb 8s ease-in-out infinite; }
				@keyframes spin { to{transform:rotate(360deg)} }
				::-webkit-scrollbar { width:5px; }
				::-webkit-scrollbar-track { background:transparent; }
				::-webkit-scrollbar-thumb { background:rgba(48,96,115,0.4); border-radius:99px; }

				/* ── Responsive ── */

				/* Tablet: hide left panel, keep card shape */
				@media (max-width: 768px) {
					.rg-left { display: none !important; }
					.rg-card {
						max-width: 480px !important;
						border-radius: 16px !important;
						max-height: none !important;
					}
					.rg-right {
						padding: 28px 24px 28px !important;
					}
					/* Show compact brand header inside form area */
					.rg-mobile-brand { display: flex !important; }
				}

				/* Mobile: full width, minimal padding */
				@media (max-width: 480px) {
					.rg-page {
						padding: 0 !important;
						align-items: flex-start !important;
					}
					.rg-card {
						border-radius: 0 !important;
						border: none !important;
						box-shadow: none !important;
						min-height: 100vh !important;
						max-height: none !important;
					}
					.rg-right {
						padding: 24px 18px 32px !important;
					}
					.rg-two-col {
						grid-template-columns: 1fr !important;
					}
				}

				/* Always hide mobile brand on desktop */
				.rg-mobile-brand { display: none; }
			`}</style>

			<div className="rg rg-page" style={S.page}>
				{/* orbs */}
				<div className="rg-orb" style={S.orb1} />
				<div style={S.orb2} />

				<div className="rg-card" style={S.card}>
					{/* ── Left panel ── */}
					<div className="rg-left" style={S.left}>
						<div style={S.brandRow}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={18} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>
						<div style={{ flex: 1 }}>
							<h1 style={S.leftH}>Join Lancer</h1>
							<p style={S.leftSub}>Create your account and start selling or buying services today.</p>
							<div style={S.featureList}>
								{[
									"Free to sign up",
									"Post or browse services",
									"Secure payments",
									"Direct seller messaging",
								].map((f, i) => (
									<div key={i} style={S.featureItem}>
										<div style={S.dot} />
										<span style={S.featureText}>{f}</span>
									</div>
								))}
							</div>
						</div>

						{/* Avatar preview */}
						{preview && (
							<div style={S.avatarPreviewWrap}>
								<img src={preview} alt="preview" style={S.avatarPreview} />
								<span style={S.avatarLabel}>Profile preview</span>
							</div>
						)}

						<p style={S.leftFooter}>© 2025 Lancer · All rights reserved</p>
					</div>

					{/* ── Right panel (scrollable form) ── */}
					<div className="rg-right" style={S.right}>
						{/* Mobile-only brand header */}
						<div className="rg-mobile-brand" style={S.mobileBrand}>
							<div style={S.logoBubble}>
								<FiShoppingCart size={16} color="#fff" />
							</div>
							<span style={S.brandName}>Lancer</span>
						</div>

						<div style={S.formHeader}>
							<h2 style={S.formTitle}>Create account</h2>
							<p style={S.formSub}>Fill in the details below to get started</p>
						</div>

						{errorMsg && <ErrorAlert err={errorMsg} />}

						<form onSubmit={handleSubmit(onSubmit)} style={S.form}>
							{/* Row: first + last */}
							<div className="rg-two-col" style={S.twoCol}>
								<Field label="First Name" icon={FiUser} error={errors.first_name?.message}>
									<input
										type="text"
										placeholder="First"
										className={`rg-inp${errors.first_name ? " err" : ""}`}
										{...register("first_name", { required: "Required" })}
									/>
								</Field>
								<Field label="Last Name" error={errors.last_name?.message}>
									<input
										type="text"
										placeholder="Last"
										className="rg-inp rg-inp-no-icon"
										{...register("last_name", { required: "Required" })}
									/>
								</Field>
							</div>

							{/* Username */}
							<Field label="Username" icon={FiUser} error={errors.username?.message}>
								<input
									type="text"
									placeholder="your_username"
									className={`rg-inp${errors.username ? " err" : ""}`}
									{...register("username", { required: "Username is required" })}
								/>
							</Field>

							{/* Email */}
							<Field label="Email" icon={FiMail} error={errors.email?.message}>
								<input
									type="email"
									placeholder="name@example.com"
									className={`rg-inp${errors.email ? " err" : ""}`}
									{...register("email", { required: "Email is required" })}
								/>
							</Field>

							{/* Row: phone + address */}
							<div className="rg-two-col" style={S.twoCol}>
								<Field label="Phone" icon={FiPhone} error={errors.phone_number?.message}>
									<input
										type="text"
										placeholder="01xxxxxxxxx"
										className={`rg-inp${errors.phone_number ? " err" : ""}`}
										{...register("phone_number", {
											required: "Required",
											pattern: { value: /^\d{8,11}$/, message: "8–11 digits only" },
										})}
									/>
								</Field>
								<Field label="Address" icon={FiMapPin} error={errors.address?.message}>
									<input
										type="text"
										placeholder="Your city"
										className={`rg-inp${errors.address ? " err" : ""}`}
										{...register("address", { required: "Required" })}
									/>
								</Field>
							</div>

							{/* Password */}
							<Field label="Password" icon={FiLock} error={errors.password?.message}>
								<input
									type={showPw ? "text" : "password"}
									placeholder="Min 8 characters"
									className={`rg-inp${errors.password ? " err" : ""}`}
									{...register("password", {
										required: "Password is required",
										minLength: { value: 8, message: "At least 8 characters" },
									})}
								/>
								<button type="button" className="rg-pw-eye" onClick={() => setShowPw((p) => !p)}>
									{showPw ?
										<svg
											width="14"
											height="14"
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
											width="14"
											height="14"
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
							</Field>

							{/* Confirm Password */}
							<Field label="Confirm Password" icon={FiLock} error={errors.confirm_password?.message}>
								<input
									type={showCpw ? "text" : "password"}
									placeholder="Repeat password"
									className={`rg-inp${errors.confirm_password ? " err" : ""}`}
									{...register("confirm_password", {
										required: "Please confirm your password",
										validate: (v) => v === watch("password") || "Passwords do not match",
									})}
								/>
								<button type="button" className="rg-pw-eye" onClick={() => setShowCpw((p) => !p)}>
									{showCpw ?
										<svg
											width="14"
											height="14"
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
											width="14"
											height="14"
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
							</Field>

							{/* Bio */}
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<label style={F.label}>Bio</label>
								<textarea
									className="rg-textarea"
									placeholder="Tell clients a bit about yourself…"
									{...register("bio", { maxLength: { value: 1000, message: "Max 1000 characters" } })}
								/>
								{errors.bio && <span style={F.err}>{errors.bio.message}</span>}
							</div>

							{/* Role */}
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<label style={F.label}>Account Role</label>
								<select className="rg-select" {...register("role")}>
									<option value="Buyer">Buyer</option>
									<option value="Seller">Seller</option>
								</select>
							</div>

							{/* Profile Image */}
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<label style={F.label}>
									<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
										<FiImage size={12} /> Profile Image
									</span>
								</label>
								<input
									type="file"
									accept="image/*"
									className="rg-file"
									{...register("image")}
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) setPreview(URL.createObjectURL(file));
									}}
								/>
								{/* Mobile avatar preview (shown when left panel is hidden) */}
								{preview && (
									<div style={S.mobileAvatarPreview}>
										<img src={preview} alt="preview" style={S.avatarPreview} />
										<span style={{ ...S.avatarLabel, color: "rgba(255,255,255,0.35)" }}>
											Profile preview
										</span>
									</div>
								)}
							</div>

							{/* Submit */}
							<button type="submit" className="rg-btn" disabled={loading}>
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
										Creating account…
									</>
								:	<>
										Create account <FiArrowRight size={15} />
									</>
								}
							</button>
						</form>

						<div style={S.signinRow}>
							<span style={S.signinText}>Already have an account?</span>
							<Link to="/login" className="rg-lnk">
								Sign in
							</Link>
						</div>
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
		maxWidth: "880px",
		borderRadius: "20px",
		overflow: "hidden",
		boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
		border: "1px solid rgba(48,96,115,0.2)",
		position: "relative",
		zIndex: 1,
		maxHeight: "92vh",
	},

	/* left */
	left: {
		width: "280px",
		flexShrink: 0,
		background: "#306073",
		padding: "36px 28px",
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
	},
	brandRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" },
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
	leftH: {
		fontSize: "24px",
		fontWeight: 700,
		color: "#fff",
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
		margin: "0 0 10px",
	},
	leftSub: { fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 28px" },
	featureList: { display: "flex", flexDirection: "column", gap: "10px" },
	featureItem: { display: "flex", alignItems: "center", gap: "10px" },
	dot: { width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 },
	featureText: { fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 },
	avatarPreviewWrap: {
		marginTop: "24px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "8px",
	},
	avatarPreview: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "3px solid rgba(255,255,255,0.3)",
	},
	avatarLabel: { fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" },
	leftFooter: { fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "auto", paddingTop: "24px" },

	/* mobile brand strip */
	mobileBrand: {
		alignItems: "center",
		gap: "10px",
		marginBottom: "24px",
		paddingBottom: "20px",
		borderBottom: "1px solid rgba(255,255,255,0.07)",
	},

	/* mobile avatar preview (inside right panel) */
	mobileAvatarPreview: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
		marginTop: "8px",
	},

	/* right */
	right: {
		flex: 1,
		background: "#111a1f",
		padding: "36px 32px 32px",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
	},
	formHeader: { marginBottom: "24px" },
	formTitle: { fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" },
	formSub: { fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 },
	form: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" },
	twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },

	signinRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "6px",
		paddingTop: "18px",
		borderTop: "1px solid rgba(255,255,255,0.07)",
	},
	signinText: { fontSize: "13px", color: "rgba(255,255,255,0.35)" },
};

export default Register;
