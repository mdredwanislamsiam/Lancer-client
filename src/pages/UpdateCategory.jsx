import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import DescriptionPart from "../components/servicesComponents/updateService/formParts/DescriptionPart";
import NamePart from "../components/servicesComponents/updateService/formParts/NamePart";
import useCategoriesContext from "../hooks/useCategoriesContext";

/* ── Toast ── */
const Toast = ({ message, type = "success", onDone }) => {
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const t1 = setTimeout(() => setVisible(false), 2800);
		const t2 = setTimeout(() => onDone?.(), 3200);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);
	const isSuccess = type === "success";
	return (
		<div className={`uc-toast ${visible ? "show" : "hide"} ${isSuccess ? "uc-toast-success" : "uc-toast-error"}`}>
			<div className="uc-toast-icon">
				{isSuccess ?
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
				:	<svg
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				}
			</div>
			<span className="uc-toast-msg">{message}</span>
			<div className="uc-toast-bar" />
		</div>
	);
};

/* ── Skeleton ── */
const Skeleton = () => (
	<div className="uc-skeleton-card">
		<div className="uc-sk uc-sk-label" />
		<div className="uc-sk uc-sk-input" />
	</div>
);

const UpdateCategory = () => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();
	const { categoryId } = useParams();
	const { fetchCategory, category, updateCategory } = useCategoriesContext();
	const [toast, setToast] = useState(null);
	const [savedFields, setSavedFields] = useState({});

	useEffect(() => {
		fetchCategory(categoryId);
	}, [categoryId]);

	useEffect(() => {
		if (category) {
			setValue("name", category.name);
			setValue("description", category.description);
		}
	}, [category, setValue]);

	const descValue = watch("description", "");
	const MAX = 500;

	const handleUpdateCategory = async (data, field) => {
		try {
			const payload = field ? { [field]: data[field] } : data;
			const res = await updateCategory(categoryId, payload);
			if (res) {
				setSavedFields((prev) => ({ ...prev, [field || "all"]: true }));
				setToast({
					message: `${field === "name" ? "Name" : "Description"} updated successfully!`,
					type: "success",
				});
				setTimeout(() => setSavedFields((prev) => ({ ...prev, [field || "all"]: false })), 2000);
			}
		} catch (error) {
			console.error(error);
			setToast({ message: "Something went wrong. Please try again.", type: "error" });
		}
	};

	if (!category)
		return (
			<div className="uc-root">
				<div className="uc-shell">
					<div className="uc-page-header">
						<div className="uc-sk uc-sk-title" />
						<div className="uc-sk uc-sk-sub" />
					</div>
					<div className="uc-card">
						<div className="uc-card-header-sk" />
						<div className="uc-card-body">
							<Skeleton />
							<div className="uc-divider" />
							<Skeleton />
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.uc-root {
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
					padding: 40px 16px 80px;
					box-sizing: border-box;
				}

				.uc-shell {
					max-width: 560px;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					gap: 24px;
				}

				/* ── Page header ── */
				.uc-page-header {
					animation: uc-in 0.4s ease both;
				}

				@keyframes uc-in {
					from { opacity: 0; transform: translateY(14px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				.uc-eyebrow {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 4px 12px;
					border-radius: 100px;
					margin-bottom: 10px;
				}

				.uc-page-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(22px, 4vw, 30px);
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.025em;
					margin: 0 0 4px;
				}

				.uc-page-sub {
					font-size: 13px;
					color: var(--muted);
					font-weight: 300;
					margin: 0;
				}

				/* ── Card ── */
				.uc-card {
					background: #fff;
					border: 1px solid var(--border);
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0 4px 24px rgba(0,0,0,0.05);
					animation: uc-in 0.5s ease both;
					animation-delay: 0.08s;
				}

				/* ── Card header ── */
				.uc-card-header {
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 18px 24px 16px;
					border-bottom: 1px solid var(--border);
					background: var(--surface);
				}

				.uc-card-header-icon {
					width: 36px; height: 36px;
					border-radius: 10px;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					display: flex; align-items: center; justify-content: center;
					color: var(--teal);
					flex-shrink: 0;
				}

				.uc-card-title {
					font-family: 'Syne', sans-serif;
					font-size: 15px;
					font-weight: 700;
					color: var(--ink);
					letter-spacing: -0.01em;
					margin: 0;
				}

				.uc-card-sub {
					font-size: 12px;
					color: var(--muted);
					font-weight: 300;
					margin: 0;
				}

				/* ── Card body ── */
				.uc-card-body {
					padding: 24px;
					display: flex;
					flex-direction: column;
					gap: 0;
				}

				/* ── Field section ── */
				.uc-field-section {
					display: flex;
					flex-direction: column;
					gap: 14px;
					padding: 0 0 20px;
				}

				.uc-field-section:last-child { padding-bottom: 0; }

				.uc-section-label {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 12px;
					font-weight: 500;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					color: var(--muted);
				}

				.uc-section-label-icon { color: var(--teal); display: flex; align-items: center; }

				/* ── Input row ── */
				.uc-input-row {
					display: flex;
					align-items: flex-start;
					gap: 10px;
				}

				.uc-input-wrap { flex: 1; display: flex; flex-direction: column; gap: 6px; }

				/* ── Input ── */
				.uc-input {
					width: 100%;
					padding: 10px 14px;
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

				.uc-input::placeholder { color: #a8bbc3; font-weight: 300; }
				.uc-input:focus { border-color: var(--teal); background: #fff; box-shadow: 0 0 0 3px var(--teal-light); }
				.uc-input.has-error { border-color: var(--error); box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }

				/* ── Textarea ── */
				.uc-textarea-wrap { flex: 1; position: relative; display: flex; flex-direction: column; gap: 6px; }

				.uc-textarea {
					width: 100%;
					min-height: 110px;
					padding: 10px 14px 26px;
					border-radius: 10px;
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

				.uc-textarea::placeholder { color: #a8bbc3; }
				.uc-textarea:focus { border-color: var(--teal); background: #fff; box-shadow: 0 0 0 3px var(--teal-light); }
				.uc-textarea.has-error { border-color: var(--error); box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }

				.uc-char-count {
					position: absolute;
					bottom: 9px; right: 12px;
					font-size: 10.5px;
					color: var(--muted);
					pointer-events: none;
				}

				.uc-char-count.near { color: #f59e0b; }
				.uc-char-count.over { color: var(--error); }

				/* ── Error ── */
				.uc-error {
					display: flex;
					align-items: center;
					gap: 5px;
					font-size: 12px;
					color: var(--error);
					margin: 0;
					animation: uc-shake 0.3s ease;
				}

				@keyframes uc-shake {
					0%,100% { transform: translateX(0); }
					25%      { transform: translateX(-4px); }
					75%      { transform: translateX(4px); }
				}

				/* ── Save button ── */
				.uc-save-btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 6px;
					padding: 10px 18px;
					border-radius: 10px;
					border: none;
					background: var(--teal);
					color: #fff;
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 600;
					cursor: pointer;
					white-space: nowrap;
					transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
					flex-shrink: 0;
					align-self: flex-start;
					margin-top: 1px;
					position: relative;
					overflow: hidden;
				}

				.uc-save-btn::before {
					content: '';
					position: absolute; inset: 0;
					background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
					pointer-events: none;
				}

				.uc-save-btn:hover:not(:disabled) {
					background: #3d7a91;
					transform: translateY(-1px);
					box-shadow: 0 5px 16px var(--teal-glow);
				}

				.uc-save-btn:disabled { opacity: 0.65; cursor: not-allowed; }

				/* Saved state */
				.uc-save-btn.saved {
					background: #22c55e;
					pointer-events: none;
				}

				.uc-spinner {
					width: 12px; height: 12px;
					border: 2px solid rgba(255,255,255,0.3);
					border-top-color: #fff;
					border-radius: 50%;
					animation: uc-spin 0.7s linear infinite;
				}

				@keyframes uc-spin { to { transform: rotate(360deg); } }

				/* ── Divider ── */
				.uc-divider {
					height: 1px;
					background: var(--border);
					margin: 20px 0;
				}

				/* ── Skeleton ── */
				.uc-sk {
					background: linear-gradient(90deg, #f0f4f6 25%, #e4eaed 50%, #f0f4f6 75%);
					background-size: 200% 100%;
					animation: uc-shimmer 1.6s linear infinite;
					border-radius: 6px;
				}

				@keyframes uc-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

				.uc-sk-title  { height: 32px; width: 55%; margin-bottom: 8px; }
				.uc-sk-sub    { height: 14px; width: 35%; }
				.uc-sk-label  { height: 12px; width: 80px; }
				.uc-sk-input  { height: 42px; width: 100%; border-radius: 10px; }
				.uc-card-header-sk { height: 64px; background: var(--surface); border-bottom: 1px solid var(--border); }

				.uc-skeleton-card {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}

				/* ── Toast ── */
				.uc-toast {
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
					box-shadow: 0 8px 32px rgba(0,0,0,0.1);
					max-width: 320px;
					overflow: hidden;
					border: 1px solid;
					transition: opacity 0.35s ease, transform 0.35s ease;
				}

				.uc-toast-success { border-color: #bbf7d0; color: #166534; }
				.uc-toast-error   { border-color: #fecaca; color: #991b1b; }

				.uc-toast.show { animation: uc-toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
				.uc-toast.hide { opacity: 0; transform: translateX(24px); }

				@keyframes uc-toast-in {
					from { opacity: 0; transform: translateX(60px); }
					to   { opacity: 1; transform: translateX(0); }
				}

				.uc-toast-icon {
					width: 24px; height: 24px;
					border-radius: 50%;
					display: flex; align-items: center; justify-content: center;
					flex-shrink: 0;
				}

				.uc-toast-success .uc-toast-icon { background: #dcfce7; }
				.uc-toast-error   .uc-toast-icon { background: #fee2e2; }

				.uc-toast-msg { flex: 1; line-height: 1.4; }

				.uc-toast-bar {
					position: absolute;
					bottom: 0; left: 0;
					height: 3px;
					border-radius: 0 0 0 12px;
					animation: uc-bar 3s linear both;
				}

				.uc-toast-success .uc-toast-bar { background: #22c55e; }
				.uc-toast-error   .uc-toast-bar { background: #ef4444; }

				@keyframes uc-bar { from { width: 100%; } to { width: 0%; } }
			`}</style>

			{toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

			<div className="uc-root">
				<div className="uc-shell">
					{/* Page header */}
					<div className="uc-page-header">
						<div className="uc-eyebrow">
							<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
								<circle cx="12" cy="12" r="10" />
							</svg>
							Admin Panel
						</div>
						<h1 className="uc-page-title">Update Category</h1>
						<p className="uc-page-sub">
							Editing: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{category.name}</strong>
						</p>
					</div>

					{/* Card */}
					<div className="uc-card">
						{/* Card header */}
						<div className="uc-card-header">
							<div className="uc-card-header-icon">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
								</svg>
							</div>
							<div>
								<p className="uc-card-title">Edit Fields</p>
								<p className="uc-card-sub">Each section saves independently</p>
							</div>
						</div>

						<div className="uc-card-body">
							{/* ── Name section ── */}
							<div className="uc-field-section">
								<span className="uc-section-label">
									<span className="uc-section-label-icon">
										<svg
											width="11"
											height="11"
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
								</span>
								<form onSubmit={handleSubmit((data) => handleUpdateCategory(data, "name"))}>
									<div className="uc-input-row">
										<div className="uc-input-wrap">
											<NamePart defValue={category.name} register={register} errors={errors} />
											{errors.name && (
												<p className="uc-error">
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
													Name is required
												</p>
											)}
										</div>
										<button
											type="submit"
											className={`uc-save-btn ${savedFields.name ? "saved" : ""}`}
											disabled={isSubmitting}>
											{savedFields.name ?
												<>
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
													Saved
												</>
											: isSubmitting ?
												<span className="uc-spinner" />
											:	<>
													<svg
														width="13"
														height="13"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2.5"
														strokeLinecap="round"
														strokeLinejoin="round">
														<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
														<polyline points="17 21 17 13 7 13 7 21" />
														<polyline points="7 3 7 8 15 8" />
													</svg>
													Save
												</>
											}
										</button>
									</div>
								</form>
							</div>

							<div className="uc-divider" />

							{/* ── Description section ── */}
							<div className="uc-field-section">
								<span className="uc-section-label">
									<span className="uc-section-label-icon">
										<svg
											width="11"
											height="11"
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
								</span>
								<form onSubmit={handleSubmit((data) => handleUpdateCategory(data, "description"))}>
									<div className="uc-input-row" style={{ alignItems: "flex-start" }}>
										<div className="uc-textarea-wrap">
											<DescriptionPart
												defValue={category.description}
												register={register}
												errors={errors}
											/>
											<span
												className={`uc-char-count ${
													descValue?.length >= MAX ? "over"
													: descValue?.length >= MAX * 0.85 ? "near"
													: ""
												}`}>
												{descValue?.length || 0}/{MAX}
											</span>
											{errors.description && (
												<p className="uc-error">
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
													Description is required
												</p>
											)}
										</div>
										<button
											type="submit"
											className={`uc-save-btn ${savedFields.description ? "saved" : ""}`}
											disabled={isSubmitting}>
											{savedFields.description ?
												<>
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
													Saved
												</>
											: isSubmitting ?
												<span className="uc-spinner" />
											:	<>
													<svg
														width="13"
														height="13"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2.5"
														strokeLinecap="round"
														strokeLinejoin="round">
														<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
														<polyline points="17 21 17 13 7 13 7 21" />
														<polyline points="7 3 7 8 15 8" />
													</svg>
													Save
												</>
											}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateCategory;
