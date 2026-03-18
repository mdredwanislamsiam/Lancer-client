import { useState } from "react";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.pcf-root {
					--teal: #306073;
					--teal-light: rgba(48,96,115,0.07);
					--teal-mid: rgba(48,96,115,0.18);
					--teal-glow: rgba(48,96,115,0.2);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--surface: #f7fafb;
					--error: #dc2626;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Toggle button ── */
				.pcf-toggle-btn {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					padding: 8px 16px;
					border-radius: 10px;
					border: 1.5px solid var(--border);
					background: transparent;
					color: var(--ink);
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 500;
					cursor: pointer;
					transition: all 0.2s ease;
					width: 100%;
					justify-content: space-between;
				}

				.pcf-toggle-btn:hover {
					border-color: var(--teal-mid);
					background: var(--teal-light);
					color: var(--teal);
				}

				.pcf-toggle-btn.open {
					border-color: var(--teal-mid);
					background: var(--teal-light);
					color: var(--teal);
				}

				.pcf-toggle-left {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.pcf-toggle-icon {
					display: flex; align-items: center; justify-content: center;
					width: 26px; height: 26px;
					border-radius: 7px;
					background: var(--surface);
					border: 1px solid var(--border);
					color: var(--muted);
					transition: all 0.2s ease;
					flex-shrink: 0;
				}

				.pcf-toggle-btn:hover .pcf-toggle-icon,
				.pcf-toggle-btn.open .pcf-toggle-icon {
					background: var(--teal-mid);
					border-color: transparent;
					color: var(--teal);
				}

				.pcf-chevron {
					color: var(--muted);
					transition: transform 0.25s ease;
					flex-shrink: 0;
				}

				.pcf-chevron.rotated { transform: rotate(180deg); }

				/* ── Expandable body ── */
				.pcf-body {
					margin-top: 14px;
					border-left: 2px solid var(--teal-mid);
					padding-left: 18px;
					display: flex;
					flex-direction: column;
					gap: 16px;
					animation: pcf-expand 0.28s ease both;
				}

				@keyframes pcf-expand {
					from { opacity: 0; transform: translateY(-8px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				/* ── Field ── */
				.pcf-field { display: flex; flex-direction: column; gap: 6px; }

				.pcf-label {
					font-size: 12.5px;
					font-weight: 500;
					color: var(--ink);
					display: flex;
					align-items: center;
					gap: 5px;
				}

				.pcf-label-icon { color: var(--teal); display: flex; align-items: center; }

				/* ── Input wrap ── */
				.pcf-input-wrap {
					position: relative;
					display: flex;
					align-items: center;
				}

				.pcf-input {
					width: 100%;
					padding: 10px 42px 10px 14px;
					border-radius: 10px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 400;
					color: var(--ink);
					outline: none;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
					box-sizing: border-box;
				}

				.pcf-input::placeholder { color: #a8bbc3; font-weight: 300; }

				.pcf-input:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.pcf-input:disabled {
					background: var(--surface);
					color: #a0b4bc;
					cursor: not-allowed;
					border-color: #edf2f4;
				}

				.pcf-input.has-error {
					border-color: var(--error);
					box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
				}

				/* Eye toggle */
				.pcf-eye-btn {
					position: absolute;
					right: 12px;
					display: flex; align-items: center; justify-content: center;
					width: 24px; height: 24px;
					border: none;
					background: none;
					cursor: pointer;
					color: var(--muted);
					padding: 0;
					border-radius: 5px;
					transition: color 0.15s ease, background 0.15s ease;
				}

				.pcf-eye-btn:hover { color: var(--teal); background: var(--teal-light); }
				.pcf-eye-btn:disabled { cursor: not-allowed; opacity: 0.4; }

				/* ── Error ── */
				.pcf-error {
					display: flex;
					align-items: center;
					gap: 5px;
					font-size: 12px;
					color: var(--error);
					font-weight: 400;
					animation: pcf-shake 0.3s ease;
				}

				@keyframes pcf-shake {
					0%, 100% { transform: translateX(0); }
					25%       { transform: translateX(-4px); }
					75%       { transform: translateX(4px); }
				}

				/* ── Strength bar ── */
				.pcf-strength-wrap {
					display: flex;
					flex-direction: column;
					gap: 4px;
				}

				.pcf-strength-bars {
					display: flex;
					gap: 4px;
				}

				.pcf-strength-bar {
					flex: 1;
					height: 3px;
					border-radius: 3px;
					background: var(--border);
					transition: background 0.3s ease;
				}

				.pcf-strength-bar.s1 { background: #ef4444; }
				.pcf-strength-bar.s2 { background: #f97316; }
				.pcf-strength-bar.s3 { background: #eab308; }
				.pcf-strength-bar.s4 { background: #22c55e; }

				.pcf-strength-label {
					font-size: 11px;
					font-weight: 500;
					color: var(--muted);
					transition: color 0.2s ease;
				}

				.pcf-strength-label.s1 { color: #ef4444; }
				.pcf-strength-label.s2 { color: #f97316; }
				.pcf-strength-label.s3 { color: #eab308; }
				.pcf-strength-label.s4 { color: #22c55e; }

				/* ── Show password toggle ── */
				.pcf-show-wrap {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10px 14px;
					border-radius: 10px;
					background: var(--surface);
					border: 1px solid var(--border);
					cursor: pointer;
					transition: background 0.15s ease, border-color 0.15s ease;
					user-select: none;
				}

				.pcf-show-wrap:hover {
					background: var(--teal-light);
					border-color: var(--teal-mid);
				}

				.pcf-show-label {
					display: flex;
					align-items: center;
					gap: 7px;
					font-size: 13px;
					font-weight: 400;
					color: var(--ink);
				}

				/* Custom toggle switch */
				.pcf-switch {
					position: relative;
					width: 36px;
					height: 20px;
					flex-shrink: 0;
				}

				.pcf-switch input { opacity: 0; width: 0; height: 0; }

				.pcf-slider {
					position: absolute;
					inset: 0;
					background: #dde5e9;
					border-radius: 100px;
					transition: background 0.2s ease;
					cursor: pointer;
				}

				.pcf-slider::before {
					content: '';
					position: absolute;
					width: 14px; height: 14px;
					left: 3px; top: 3px;
					background: #ffffff;
					border-radius: 50%;
					transition: transform 0.2s ease;
					box-shadow: 0 1px 4px rgba(0,0,0,0.15);
				}

				.pcf-switch input:checked + .pcf-slider { background: var(--teal); }
				.pcf-switch input:checked + .pcf-slider::before { transform: translateX(16px); }
			`}</style>

			<div className="pcf-root">
				{/* Toggle button */}
				<button
					type="button"
					className={`pcf-toggle-btn ${isOpen ? "open" : ""}`}
					onClick={() => setIsOpen((p) => !p)}>
					<span className="pcf-toggle-left">
						<span className="pcf-toggle-icon">
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
						</span>
						Change Password
					</span>
					<svg
						className={`pcf-chevron ${isOpen ? "rotated" : ""}`}
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round">
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>

				{/* Expandable section */}
				{isOpen && (
					<div className="pcf-body">
						{/* Current password */}
						<div className="pcf-field">
							<label className="pcf-label">
								<span className="pcf-label-icon">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="3" />
										<path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
									</svg>
								</span>
								Current Password
							</label>
							<div className="pcf-input-wrap">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter current password"
									disabled={!isEditing}
									className={`pcf-input ${errors.current_password ? "has-error" : ""}`}
									{...register("current_password", { required: "Current password is required" })}
								/>
								<button
									type="button"
									className="pcf-eye-btn"
									onClick={() => setShowPassword((p) => !p)}
									disabled={!isEditing}
									tabIndex={-1}>
									{showPassword ?
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round">
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
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									}
								</button>
							</div>
							{errors.current_password && (
								<p className="pcf-error">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									{errors.current_password.message}
								</p>
							)}
						</div>

						{/* New password */}
						<div className="pcf-field">
							<label className="pcf-label">
								<span className="pcf-label-icon">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<rect x="3" y="11" width="18" height="11" rx="2" />
										<path d="M7 11V7a5 5 0 0 1 10 0v4" />
									</svg>
								</span>
								New Password
							</label>
							<div className="pcf-input-wrap">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Min. 8 characters"
									disabled={!isEditing}
									className={`pcf-input ${errors.new_password ? "has-error" : ""}`}
									{...register("new_password", {
										required: "New password is required",
										minLength: { value: 8, message: "Password must be at least 8 characters" },
									})}
								/>
								<button
									type="button"
									className="pcf-eye-btn"
									onClick={() => setShowPassword((p) => !p)}
									disabled={!isEditing}
									tabIndex={-1}>
									{showPassword ?
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round">
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
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									}
								</button>
							</div>

							{/* Strength bar */}
							{(() => {
								const val = watch("new_password") || "";
								const score =
									val.length === 0 ? 0
									: val.length < 6 ? 1
									: val.length < 8 ? 2
									: /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val) ? 4
									: /[A-Z]/.test(val) || /[0-9]/.test(val) ? 3
									: 2;
								const labels = ["", "Weak", "Fair", "Good", "Strong"];
								return score > 0 ?
										<div className="pcf-strength-wrap">
											<div className="pcf-strength-bars">
												{[1, 2, 3, 4].map((i) => (
													<div
														key={i}
														className={`pcf-strength-bar ${i <= score ? `s${score}` : ""}`}
													/>
												))}
											</div>
											<span className={`pcf-strength-label s${score}`}>{labels[score]}</span>
										</div>
									:	null;
							})()}

							{errors.new_password && (
								<p className="pcf-error">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									{errors.new_password.message}
								</p>
							)}
						</div>

						{/* Confirm password */}
						<div className="pcf-field">
							<label className="pcf-label">
								<span className="pcf-label-icon">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								</span>
								Confirm New Password
							</label>
							<div className="pcf-input-wrap">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Re-enter new password"
									disabled={!isEditing}
									className={`pcf-input ${errors.confirm_new_password ? "has-error" : ""}`}
									{...register("confirm_new_password", {
										validate: (v) => v === watch("new_password") || "Passwords do not match",
									})}
								/>
								<button
									type="button"
									className="pcf-eye-btn"
									onClick={() => setShowPassword((p) => !p)}
									disabled={!isEditing}
									tabIndex={-1}>
									{showPassword ?
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round">
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
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									}
								</button>
							</div>
							{errors.confirm_new_password && (
								<p className="pcf-error">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									{errors.confirm_new_password.message}
								</p>
							)}
						</div>

						{/* Show password toggle — only in edit mode */}
						{isEditing && (
							<label className="pcf-show-wrap">
								<span className="pcf-show-label">
									<svg
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										style={{ color: "var(--teal)" }}>
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
									Show passwords
								</span>
								<label className="pcf-switch">
									<input
										type="checkbox"
										checked={showPassword}
										onChange={() => setShowPassword((p) => !p)}
									/>
									<span className="pcf-slider" />
								</label>
							</label>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default PasswordChangeForm;
