import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import ProfileForm from "../components/dashboard/Profile/ProfileForm";
import PasswordChangeForm from "../components/dashboard/Profile/PasswordChangeForm";


/* ── Toast Notification ─────────────────────────────────────────── */
const Toast = ({ message, type, onDone }) => {
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
		<div className={`profile-toast ${visible ? "show" : "hide"} ${isSuccess ? "toast-success" : "toast-error"}`}>
			<div className="toast-icon-wrap">
				{isSuccess ?
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				:	<svg
						width="14"
						height="14"
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
			<span className="toast-msg">{message}</span>
			<div className="toast-progress" />
		</div>
	);
};

/* ── Section Wrapper ─────────────────────────────────────────────── */
const SectionCard = ({ title, icon, children, index }) => (
	<div className="profile-section-card" style={{ animationDelay: `${index * 0.1}s` }}>
		<div className="profile-section-header">
			<div className="profile-section-icon">{icon}</div>
			<h3 className="profile-section-title">{title}</h3>
		</div>
		<div className="profile-section-body">{children}</div>
	</div>
);

/* ── Main Component ──────────────────────────────────────────────── */
const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const { user, updateUserProfile, errorMsg, changePassword } = useAuthContext();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();
	const [toast, setToast] = useState(null);

	useEffect(() => {
		if (!user) return;
		Object.keys(user).forEach((key) => {
			if (key !== "image") setValue(key, user[key]);
		});
	}, [user, setValue]);

	const onSubmit = async (data) => {
		// 1. Handle password change first — abort if it fails
		if (data.current_password && data.new_password) {
			try {
				await changePassword({
					current_password: data.current_password,
					new_password: data.new_password,
				});
			} catch {
				setToast({
					message: errorMsg || "Password change failed. Please check your current password.",
					type: "error",
				});
				return; // stop here — don't update profile with a bad password state
			}
		}

		// 2. Update profile info
		try {
			const formData = new FormData();
			formData.append("first_name", data.first_name);
			formData.append("last_name", data.last_name);
			formData.append("email", data.email);
			formData.append("address", data.address);
			formData.append("phone_number", data.phone_number);
			formData.append("bio", data.bio);
			if (data.image?.[0]) formData.append("image", data.image[0]);

			const res = await updateUserProfile(formData);
			setToast({
				message: res.message || "Profile updated successfully!",
				type: "success",
			});
			setIsEditing(false);
		} catch {
			setToast({
				message: errorMsg || "Something went wrong updating your profile.",
				type: "error",
			});
		}
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.profile-root {
					--teal: #306073;
					--teal-light: rgba(48, 96, 115, 0.08);
					--teal-mid: rgba(48, 96, 115, 0.18);
					--teal-glow: rgba(48, 96, 115, 0.22);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--white: #ffffff;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
					min-height: 100vh;
					background: var(--surface);
					padding: 40px 20px 80px;
					box-sizing: border-box;
				}

				/* ── Page shell ── */
				.profile-shell {
					max-width: 680px;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					gap: 24px;
				}

				/* ── Page header ── */
				.profile-page-header {
					display: flex;
					align-items: center;
					gap: 16px;
					animation: fade-up 0.5s ease both;
				}

				@keyframes fade-up {
					from { opacity: 0; transform: translateY(18px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				.profile-avatar-area {
					position: relative;
					flex-shrink: 0;
				}

				.profile-avatar {
					width: 64px;
					height: 64px;
					border-radius: 50%;
					object-fit: cover;
					border: 3px solid #ffffff;
					box-shadow: 0 0 0 2.5px var(--teal);
					display: block;
				}

				.profile-avatar-placeholder {
					width: 64px;
					height: 64px;
					border-radius: 50%;
					background: var(--teal-light);
					border: 2.5px solid var(--teal-mid);
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--teal);
				}

				.profile-online-dot {
					position: absolute;
					bottom: 2px; right: 2px;
					width: 12px; height: 12px;
					border-radius: 50%;
					background: #22c55e;
					border: 2px solid #ffffff;
				}

				.profile-header-text { flex: 1; }

				.profile-name {
					font-family: 'Syne', sans-serif;
					font-size: 22px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					margin: 0 0 2px;
				}

				.profile-role {
					font-size: 13px;
					color: var(--muted);
					font-weight: 400;
					display: flex;
					align-items: center;
					gap: 6px;
				}

				.profile-role-badge {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					font-size: 11px;
					font-weight: 500;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 2px 8px;
					border-radius: 100px;
					letter-spacing: 0.06em;
					text-transform: uppercase;
				}

				/* ── Edit mode indicator ── */
				.profile-mode-bar {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 10px 16px;
					border-radius: 10px;
					font-size: 13px;
					font-weight: 500;
					border: 1px solid;
					transition: all 0.3s ease;
					animation: fade-up 0.4s ease both;
				}

				.profile-mode-bar.viewing {
					background: var(--surface);
					border-color: var(--border);
					color: var(--muted);
				}

				.profile-mode-bar.editing {
					background: rgba(48, 96, 115, 0.06);
					border-color: var(--teal-mid);
					color: var(--teal);
				}

				.profile-mode-dot {
					width: 7px; height: 7px;
					border-radius: 50%;
					flex-shrink: 0;
					transition: background 0.3s ease;
				}

				.viewing .profile-mode-dot { background: #94a3b8; }
				.editing .profile-mode-dot {
					background: var(--teal);
					animation: pulse-teal 1.8s ease-in-out infinite;
				}

				@keyframes pulse-teal {
					0%, 100% { box-shadow: 0 0 0 0 var(--teal-glow); }
					50%       { box-shadow: 0 0 0 5px transparent; }
				}

				/* ── Section card ── */
				.profile-section-card {
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 18px;
					overflow: hidden;
					box-shadow: 0 2px 16px rgba(0,0,0,0.04);
					animation: fade-up 0.5s ease both;
					transition: border-color 0.3s ease, box-shadow 0.3s ease;
				}

				.profile-section-card:hover {
					border-color: var(--teal-mid);
					box-shadow: 0 8px 32px var(--teal-glow);
				}

				.profile-section-header {
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 18px 22px 14px;
					border-bottom: 1px solid var(--border);
				}

				.profile-section-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 34px;
					height: 34px;
					border-radius: 9px;
					background: var(--teal-light);
					color: var(--teal);
					flex-shrink: 0;
				}

				.profile-section-title {
					font-family: 'Syne', sans-serif;
					font-size: 15px;
					font-weight: 700;
					color: var(--ink);
					letter-spacing: -0.01em;
					margin: 0;
				}

				.profile-section-body {
					padding: 22px;
				}

				/* ── Action bar ── */
				.profile-action-bar {
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 14px;
					padding: 16px 20px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 12px;
					animation: fade-up 0.5s ease both;
					animation-delay: 0.3s;
					box-shadow: 0 2px 16px rgba(0,0,0,0.04);
				}

				.profile-btn {
					display: inline-flex;
					align-items: center;
					gap: 7px;
					padding: 10px 22px;
					border-radius: 10px;
					font-family: 'DM Sans', sans-serif;
					font-size: 13.5px;
					font-weight: 500;
					cursor: pointer;
					border: 1.5px solid;
					transition: all 0.2s ease;
					letter-spacing: 0.01em;
				}

				.profile-btn-ghost {
					background: transparent;
					border-color: var(--border);
					color: var(--muted);
				}

				.profile-btn-ghost:hover {
					border-color: #c0ccd2;
					background: var(--surface);
					color: var(--ink);
				}

				.profile-btn-primary {
					background: var(--teal);
					border-color: var(--teal);
					color: #ffffff;
					font-weight: 600;
				}

				.profile-btn-primary:hover:not(:disabled) {
					background: #3d7a91;
					border-color: #3d7a91;
					transform: translateY(-1px);
					box-shadow: 0 6px 20px var(--teal-glow);
				}

				.profile-btn-primary:disabled {
					opacity: 0.65;
					cursor: not-allowed;
				}

				.profile-btn-edit {
					background: var(--teal-light);
					border-color: var(--teal-mid);
					color: var(--teal);
				}

				.profile-btn-edit:hover {
					background: var(--teal);
					border-color: var(--teal);
					color: #ffffff;
					transform: translateY(-1px);
					box-shadow: 0 6px 20px var(--teal-glow);
				}

				/* Spinner */
				.profile-spinner {
					width: 14px; height: 14px;
					border: 2px solid rgba(255,255,255,0.35);
					border-top-color: #ffffff;
					border-radius: 50%;
					animation: spin 0.7s linear infinite;
				}

				@keyframes spin { to { transform: rotate(360deg); } }

				/* ── Toast ── */
				.profile-toast {
					position: fixed;
					top: 24px;
					right: 24px;
					z-index: 9999;
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 12px 18px 12px 14px;
					border-radius: 12px;
					font-size: 13.5px;
					font-weight: 500;
					border: 1px solid;
					box-shadow: 0 8px 32px rgba(0,0,0,0.12);
					max-width: 340px;
					overflow: hidden;
					transition: opacity 0.4s ease, transform 0.4s ease;
				}

				.profile-toast.show {
					animation: toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
				}

				.profile-toast.hide {
					opacity: 0;
					transform: translateX(24px);
				}

				@keyframes toast-in {
					from { opacity: 0; transform: translateX(60px); }
					to   { opacity: 1; transform: translateX(0); }
				}

				.toast-success {
					background: #ffffff;
					border-color: #bbf7d0;
					color: #166534;
				}

				.toast-error {
					background: #ffffff;
					border-color: #fecaca;
					color: #991b1b;
				}

				.toast-icon-wrap {
					width: 24px; height: 24px;
					border-radius: 50%;
					display: flex; align-items: center; justify-content: center;
					flex-shrink: 0;
				}

				.toast-success .toast-icon-wrap { background: #dcfce7; }
				.toast-error   .toast-icon-wrap { background: #fee2e2; }

				.toast-msg { flex: 1; line-height: 1.4; }

				.toast-progress {
					position: absolute;
					bottom: 0; left: 0;
					height: 3px;
					border-radius: 0 0 0 12px;
					animation: toast-bar 3s linear both;
				}

				.toast-success .toast-progress { background: #22c55e; }
				.toast-error   .toast-progress { background: #ef4444; }

				@keyframes toast-bar {
					from { width: 100%; }
					to   { width: 0%; }
				}
			`}</style>

			<div className="profile-root">
				{/* Toast */}
				{toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

				<div className="profile-shell">
					{/* Page header */}
					<div className="profile-page-header">
						<div className="profile-avatar-area">
							{user?.image ?
								<img src={user.image} alt="Avatar" className="profile-avatar" />
							:	<div className="profile-avatar-placeholder">
									<svg
										width="28"
										height="28"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
										<circle cx="12" cy="7" r="4" />
									</svg>
								</div>
							}
							<span className="profile-online-dot" />
						</div>
						<div className="profile-header-text">
							<h1 className="profile-name">
								{user?.first_name && user?.last_name ?
									`${user.first_name} ${user.last_name}`
								:	user?.username || "Your Profile"}
							</h1>
							<div className="profile-role">
								<span className="profile-role-badge">
									<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
										<circle cx="12" cy="12" r="10" />
									</svg>
									Verified
								</span>
								{user?.email && <span>{user.email}</span>}
							</div>
						</div>
					</div>

					{/* Mode indicator */}
					<div className={`profile-mode-bar ${isEditing ? "editing" : "viewing"}`}>
						<span className="profile-mode-dot" />
						{isEditing ?
							"Edit mode — make your changes and save below"
						:	"Viewing mode — click Edit Profile to make changes"}
					</div>

					{/* Profile info section */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
							<SectionCard
								index={0}
								title="Personal Information"
								icon={
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
										<circle cx="12" cy="7" r="4" />
									</svg>
								}>
								<ProfileForm register={register} errors={errors} isEditing={isEditing} />
							</SectionCard>

							<SectionCard
								index={1}
								title="Change Password"
								icon={
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0 1 10 0v4" />
									</svg>
								}>
								<PasswordChangeForm
									errors={errors}
									register={register}
									isEditing={isEditing}
									watch={watch}
								/>
							</SectionCard>

							{/* Action bar */}
							<div className="profile-action-bar">
								{isEditing ?
									<>
										<button
											type="button"
											className="profile-btn profile-btn-ghost"
											onClick={() => setIsEditing(false)}>
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2.5"
												strokeLinecap="round"
												strokeLinejoin="round">
												<line x1="18" y1="6" x2="6" y2="18" />
												<line x1="6" y1="6" x2="18" y2="18" />
											</svg>
											Cancel
										</button>
										<button
											type="submit"
											className="profile-btn profile-btn-primary"
											disabled={isSubmitting}>
											{isSubmitting ?
												<>
													<span className="profile-spinner" /> Saving…
												</>
											:	<>
													<svg
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2.5"
														strokeLinecap="round"
														strokeLinejoin="round">
														<polyline points="20 6 9 17 4 12" />
													</svg>
													Save Changes
												</>
											}
										</button>
									</>
								:	<button
										type="button"
										className="profile-btn profile-btn-edit"
										onClick={() => setIsEditing(true)}>
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
											<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
										</svg>
										Edit Profile
									</button>
								}
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Profile;
