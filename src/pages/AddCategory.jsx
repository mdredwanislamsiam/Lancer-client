import { useState } from "react";
import { useForm } from "react-hook-form";
import useCategoriesContext from "../hooks/useCategoriesContext";

/* ── Toast ── (reusing same pattern from the system) */
const Toast = ({ message, onDone }) => {
	const [visible, setVisible] = useState(true);
	useState(() => {
		const t1 = setTimeout(() => setVisible(false), 2800);
		const t2 = setTimeout(() => onDone?.(), 3200);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	});
	return (
		<div className={`ac-toast ${visible ? "show" : "hide"}`}>
			<div className="ac-toast-icon">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12" />
				</svg>
			</div>
			<span className="ac-toast-msg">{message}</span>
			<div className="ac-toast-bar" />
		</div>
	);
};

const AddCategory = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();
	const { addCategory } = useCategoriesContext();
	const [toast, setToast] = useState(null);

	const descValue = watch("description", "");
	const MAX = 500;

	const handleAddService = async (data) => {
		try {
			const res = await addCategory(data);
			if (res) {
				setToast("Category added successfully!");
				reset();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.ac-root {
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
					width: 100%;
					max-width: 520px;
					margin: 0 auto;
					padding: 40px 16px 80px;
				}

				/* ── Card ── */
				.ac-card {
					background: #fff;
					border: 1px solid var(--border);
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0 4px 28px rgba(0,0,0,0.06);
					animation: ac-in 0.45s ease both;
				}

				@keyframes ac-in {
					from { opacity: 0; transform: translateY(16px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				/* ── Card header ── */
				.ac-header {
					padding: 24px 28px 20px;
					border-bottom: 1px solid var(--border);
					background: var(--surface);
					display: flex;
					align-items: center;
					gap: 14px;
				}

				.ac-header-icon {
					width: 40px; height: 40px;
					border-radius: 11px;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					display: flex; align-items: center; justify-content: center;
					color: var(--teal);
					flex-shrink: 0;
				}

				.ac-header-text {}

				.ac-eyebrow {
					font-size: 10.5px;
					font-weight: 500;
					letter-spacing: 0.13em;
					text-transform: uppercase;
					color: var(--teal);
					margin: 0 0 2px;
				}

				.ac-title {
					font-family: 'Syne', sans-serif;
					font-size: 18px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					margin: 0;
				}

				/* ── Form body ── */
				.ac-body {
					padding: 26px 28px;
					display: flex;
					flex-direction: column;
					gap: 20px;
				}

				/* ── Field ── */
				.ac-field { display: flex; flex-direction: column; gap: 7px; }

				.ac-label {
					font-size: 12.5px;
					font-weight: 500;
					color: var(--ink);
					display: flex;
					align-items: center;
					gap: 5px;
				}

				.ac-label-icon { color: var(--teal); display: flex; align-items: center; }

				/* ── Input ── */
				.ac-input {
					width: 100%;
					padding: 11px 14px;
					border-radius: 11px;
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

				.ac-input::placeholder { color: #a8bbc3; font-weight: 300; }

				.ac-input:focus {
					border-color: var(--teal);
					background: #fff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.ac-input.has-error {
					border-color: var(--error);
					box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
				}

				/* ── Textarea ── */
				.ac-textarea-wrap { position: relative; }

				.ac-textarea {
					width: 100%;
					min-height: 120px;
					padding: 11px 14px 28px;
					border-radius: 11px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 300;
					color: var(--ink);
					outline: none;
					resize: vertical;
					line-height: 1.65;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
					box-sizing: border-box;
				}

				.ac-textarea::placeholder { color: #a8bbc3; }

				.ac-textarea:focus {
					border-color: var(--teal);
					background: #fff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.ac-textarea.has-error {
					border-color: var(--error);
					box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
				}

				.ac-char-count {
					position: absolute;
					bottom: 9px; right: 12px;
					font-size: 10.5px;
					color: var(--muted);
					pointer-events: none;
					transition: color 0.2s ease;
				}

				.ac-char-count.near  { color: #f59e0b; }
				.ac-char-count.over  { color: var(--error); }

				/* ── Error ── */
				.ac-error {
					display: flex;
					align-items: center;
					gap: 5px;
					font-size: 12px;
					color: var(--error);
					font-weight: 400;
					margin: 0;
					animation: ac-shake 0.3s ease;
				}

				@keyframes ac-shake {
					0%,100% { transform: translateX(0); }
					25%      { transform: translateX(-4px); }
					75%      { transform: translateX(4px); }
				}

				/* ── Footer ── */
				.ac-footer {
					padding: 18px 28px;
					border-top: 1px solid var(--border);
					background: var(--surface);
				}

				/* ── Submit btn ── */
				.ac-submit {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
					width: 100%;
					padding: 13px;
					border-radius: 11px;
					border: none;
					background: var(--teal);
					color: #fff;
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					letter-spacing: 0.02em;
					cursor: pointer;
					transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
					position: relative;
					overflow: hidden;
				}

				.ac-submit::before {
					content: '';
					position: absolute; inset: 0;
					background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
					pointer-events: none;
				}

				.ac-submit:hover:not(:disabled) {
					background: #3d7a91;
					transform: translateY(-1px);
					box-shadow: 0 6px 20px var(--teal-glow);
				}

				.ac-submit:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
				.ac-submit:disabled { opacity: 0.65; cursor: not-allowed; }

				.ac-spinner {
					width: 14px; height: 14px;
					border: 2px solid rgba(255,255,255,0.3);
					border-top-color: #fff;
					border-radius: 50%;
					animation: ac-spin 0.7s linear infinite;
				}

				@keyframes ac-spin { to { transform: rotate(360deg); } }

				/* ── Toast ── */
				.ac-toast {
					position: fixed;
					top: 24px; right: 24px;
					z-index: 9999;
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 12px 18px 12px 14px;
					border-radius: 12px;
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 500;
					background: #fff;
					border: 1px solid #bbf7d0;
					color: #166534;
					box-shadow: 0 8px 32px rgba(0,0,0,0.1);
					max-width: 320px;
					overflow: hidden;
					transition: opacity 0.35s ease, transform 0.35s ease;
				}

				.ac-toast.show { animation: ac-toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
				.ac-toast.hide { opacity: 0; transform: translateX(24px); }

				@keyframes ac-toast-in {
					from { opacity: 0; transform: translateX(60px); }
					to   { opacity: 1; transform: translateX(0); }
				}

				.ac-toast-icon {
					width: 24px; height: 24px;
					border-radius: 50%;
					background: #dcfce7;
					display: flex; align-items: center; justify-content: center;
					flex-shrink: 0;
				}

				.ac-toast-msg { flex: 1; line-height: 1.4; }

				.ac-toast-bar {
					position: absolute;
					bottom: 0; left: 0;
					height: 3px;
					background: #22c55e;
					border-radius: 0 0 0 12px;
					animation: ac-bar 3s linear both;
				}

				@keyframes ac-bar { from { width: 100%; } to { width: 0%; } }
			`}</style>

			{toast && <Toast message={toast} onDone={() => setToast(null)} />}

			<div className="ac-root">
				<div className="ac-card">
					{/* Header */}
					<div className="ac-header">
						<div className="ac-header-icon">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
								<line x1="12" y1="11" x2="12" y2="17" />
								<line x1="9" y1="14" x2="15" y2="14" />
							</svg>
						</div>
						<div className="ac-header-text">
							<p className="ac-eyebrow">Admin Panel</p>
							<h1 className="ac-title">Add Category</h1>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(handleAddService)}>
						<div className="ac-body">
							{/* Name */}
							<div className="ac-field">
								<label className="ac-label">
									<span className="ac-label-icon">
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
											<line x1="7" y1="7" x2="7.01" y2="7" />
										</svg>
									</span>
									Category Name
								</label>
								<input
									placeholder="e.g. Web Development"
									className={`ac-input ${errors.name ? "has-error" : ""}`}
									{...register("name", { required: "Category name is required" })}
								/>
								{errors.name && (
									<p className="ac-error">
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
										{errors.name.message}
									</p>
								)}
							</div>

							{/* Description */}
							<div className="ac-field">
								<label className="ac-label">
									<span className="ac-label-icon">
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round">
											<line x1="17" y1="10" x2="3" y2="10" />
											<line x1="21" y1="6" x2="3" y2="6" />
											<line x1="21" y1="14" x2="3" y2="14" />
											<line x1="17" y1="18" x2="3" y2="18" />
										</svg>
									</span>
									Description
								</label>
								<div className="ac-textarea-wrap">
									<textarea
										placeholder="Briefly describe what this category covers…"
										className={`ac-textarea ${errors.description ? "has-error" : ""}`}
										maxLength={MAX}
										{...register("description", { required: "Description is required" })}
									/>
									<span
										className={`ac-char-count ${
											descValue?.length >= MAX ? "over"
											: descValue?.length >= MAX * 0.85 ? "near"
											: ""
										}`}>
										{descValue?.length || 0}/{MAX}
									</span>
								</div>
								{errors.description && (
									<p className="ac-error">
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
										{errors.description.message}
									</p>
								)}
							</div>
						</div>

						{/* Footer */}
						<div className="ac-footer">
							<button type="submit" className="ac-submit" disabled={isSubmitting}>
								{isSubmitting ?
									<>
										<span className="ac-spinner" /> Adding category…
									</>
								:	<>
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round">
											<line x1="12" y1="5" x2="12" y2="19" />
											<line x1="5" y1="12" x2="19" y2="12" />
										</svg>
										Add Category
									</>
								}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddCategory;
