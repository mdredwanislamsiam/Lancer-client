import { useEffect, useState } from "react";
import { FiBell, FiCheck, FiInfo, FiAlertCircle, FiMessageSquare, FiPackage } from "react-icons/fi";
import NotificationList from "../components/notification/NotificationList";
import NotificationPagination from "../components/notification/NotificationPagination";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useNotificationContext from "../hooks/useNotificationContext";

const Notifications = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [mounted, setMounted] = useState(false);
	const { notifications, markNotification, totalPages, loading, fetchNotifications } = useNotificationContext();

	const unreadCount = notifications.filter((n) => !n.is_read).length;
	const readCount = notifications.length - unreadCount;

	useEffect(() => {
		fetchNotifications(currentPage);
	}, [currentPage]);
	useEffect(() => {
		setTimeout(() => setMounted(true), 80);
	}, []);

	const markAllAsRead = async () => {
		await Promise.all(notifications.map((n) => markNotification(n.id, currentPage)));
	};

	const getIcon = (type) => {
		switch (type) {
			case "order":
				return <FiPackage size={16} />;
			case "alert":
				return <FiAlertCircle size={16} />;
			case "message":
				return <FiMessageSquare size={16} />;
			case "info":
			default:
				return <FiInfo size={16} />;
		}
	};

	if (loading) return <LoadingSpinner />;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Figtree:wght@300;400;500;600&display=swap');

				.nf-root {
					font-family: 'Figtree', sans-serif;
					min-height: 100vh;
					background: #f6f6f6;
					display: flex;
					flex-direction: column;
					position: relative;
				}

				/* dot-grid texture */
				.nf-root::before {
					content: '';
					position: fixed;
					inset: 0;
					background-image: radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px);
					background-size: 30px 30px;
					pointer-events: none;
					z-index: 0;
				}

				/* ── hero bar ── */
				.nf-hero {
					position: relative;
					z-index: 1;
					background: #0d0d0d;
					overflow: hidden;
				}
				.nf-hero::before {
					content: '';
					position: absolute;
					top: -50px; right: -50px;
					width: 250px; height: 250px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.2) 0%, transparent 70%);
					pointer-events: none;
				}
				.nf-hero::after {
					content: '';
					position: absolute;
					bottom: 0; left: 0; right: 0;
					height: 2px;
					background: linear-gradient(90deg, #306073, #59b3cc 40%, transparent 80%);
				}

				.nf-hero-inner {
					max-width: 760px;
					margin: 0 auto;
					padding: 32px clamp(20px, 5vw, 48px) 28px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 20px;
					flex-wrap: wrap;
				}

				/* bell icon wrap */
				.nf-bell-wrap {
					position: relative;
					width: 44px; height: 44px;
					background: rgba(255,255,255,0.05);
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 14px;
					display: flex; align-items: center; justify-content: center;
					color: rgba(255,255,255,0.7);
					flex-shrink: 0;
				}
				.nf-bell-ring {
					position: absolute;
					inset: -4px;
					border-radius: 18px;
					border: 1px solid rgba(48,96,115,0.3);
					animation: nfRing 2.5s ease-in-out infinite;
					pointer-events: none;
				}
				@keyframes nfRing {
					0%,100% { opacity:0.5; transform:scale(1); }
					50%     { opacity:0; transform:scale(1.15); }
				}

				.nf-badge {
					position: absolute;
					top: -5px; right: -5px;
					min-width: 18px; height: 18px;
					background: #ef4444;
					color: #fff;
					font-family: 'Syne', sans-serif;
					font-size: 10px;
					font-weight: 700;
					border-radius: 9px;
					display: flex; align-items: center; justify-content: center;
					padding: 0 4px;
					border: 2px solid #0d0d0d;
					animation: nfPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
				}
				@keyframes nfPop {
					from { transform: scale(0); }
					to   { transform: scale(1); }
				}

				/* title */
				.nf-eyebrow {
					font-size: 9px;
					font-weight: 600;
					letter-spacing: 0.22em;
					text-transform: uppercase;
					color: #306073;
					margin-bottom: 5px;
					display: flex; align-items: center; gap: 7px;
				}
				.nf-eyebrow-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
					animation: nfPulse 2s infinite;
				}
				@keyframes nfPulse {
					0%,100% { opacity:1; transform:scale(1); }
					50%     { opacity:0.35; transform:scale(0.65); }
				}

				.nf-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(24px, 3.5vw, 36px);
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #fff;
					line-height: 1;
				}
				.nf-title-accent { color: #306073; }

				/* right side: stats + mark-all */
				.nf-hero-right {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					gap: 12px;
				}
				.nf-stat-row {
					display: flex;
					gap: 8px;
				}
				.nf-stat {
					display: inline-flex;
					flex-direction: column;
					align-items: center;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.07);
					border-radius: 12px;
					padding: 8px 16px;
					min-width: 68px;
				}
				.nf-stat-val {
					font-family: 'Syne', sans-serif;
					font-size: 20px;
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #fff;
					line-height: 1;
				}
				.nf-stat.nf-stat-teal .nf-stat-val { color: #306073; }
				.nf-stat-label {
					font-size: 8px;
					font-weight: 600;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.28);
					margin-top: 2px;
				}

				/* mark-all btn */
				.nf-mark-btn {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-family: 'Figtree', sans-serif;
					font-size: 11px;
					font-weight: 600;
					letter-spacing: 0.08em;
					color: rgba(255,255,255,0.5);
					background: none;
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 100px;
					padding: 7px 14px;
					cursor: pointer;
					transition: all 0.2s ease;
				}
				.nf-mark-btn:hover {
					color: #fff;
					border-color: rgba(48,96,115,0.4);
					background: rgba(48,96,115,0.1);
					box-shadow: 0 4px 16px rgba(48,96,115,0.15);
				}

				/* ── body ── */
				.nf-body {
					position: relative;
					z-index: 1;
					flex: 1;
					max-width: 760px;
					width: 100%;
					margin: 0 auto;
					padding: clamp(24px, 4vw, 40px) clamp(20px, 5vw, 48px) 32px;
					opacity: 0;
					transform: translateY(16px);
					transition: opacity 0.5s ease, transform 0.5s ease;
				}
				.nf-body.nf-mounted { opacity: 1; transform: translateY(0); }

				/* section label row */
				.nf-section-head {
					display: flex;
					align-items: center;
					gap: 12px;
					margin-bottom: 16px;
				}
				.nf-section-title {
					font-family: 'Syne', sans-serif;
					font-size: 12px;
					font-weight: 700;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: #0d0d0d;
					white-space: nowrap;
				}
				.nf-section-rule {
					flex: 1;
					height: 1px;
					background: linear-gradient(90deg, rgba(0,0,0,0.08), transparent);
				}

				/* notification item */
				.nf-item {
					width: 100%;
					text-align: left;
					background: #fff;
					border: 1px solid rgba(0,0,0,0.06);
					border-radius: 16px;
					padding: 0;
					cursor: pointer;
					transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
					margin-bottom: 10px;
					display: block;
					position: relative;
					overflow: hidden;
				}
				.nf-item::before {
					content: '';
					position: absolute;
					top: 0; left: 0;
					width: 3px; height: 100%;
					background: #306073;
					opacity: 0;
					transition: opacity 0.2s ease;
				}
				.nf-item.nf-unread::before { opacity: 1; }
				.nf-item.nf-unread {
					border-color: rgba(48,96,115,0.15);
					background: rgba(48,96,115,0.02);
				}
				.nf-item:hover {
					transform: translateY(-2px);
					box-shadow: 0 6px 24px rgba(0,0,0,0.08);
					border-color: rgba(48,96,115,0.25);
				}
				.nf-item:active { transform: scale(0.99); }

				/* unread dot */
				.nf-unread-dot {
					position: absolute;
					top: 14px; right: 14px;
					width: 7px; height: 7px;
					background: #306073;
					border-radius: 50%;
					box-shadow: 0 0 0 0 rgba(48,96,115,0.5);
					animation: nfSonar 2s infinite;
				}
				@keyframes nfSonar {
					0%   { box-shadow: 0 0 0 0   rgba(48,96,115,0.5); }
					70%  { box-shadow: 0 0 0 7px rgba(48,96,115,0);   }
					100% { box-shadow: 0 0 0 0   rgba(48,96,115,0);   }
				}

				/* ── empty state ── */
				.nf-empty {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 80px 24px;
					background: #fff;
					border: 1.5px dashed rgba(0,0,0,0.1);
					border-radius: 20px;
					text-align: center;
				}
				.nf-empty-icon {
					width: 64px; height: 64px;
					background: #0d0d0d;
					border-radius: 20px;
					display: flex; align-items: center; justify-content: center;
					color: rgba(255,255,255,0.3);
					margin-bottom: 20px;
					position: relative;
				}
				.nf-empty-icon::before {
					content: '';
					position: absolute;
					inset: -8px;
					border-radius: 28px;
					border: 1px dashed rgba(48,96,115,0.25);
				}
				.nf-empty-title {
					font-family: 'Syne', sans-serif;
					font-size: 18px;
					font-weight: 800;
					letter-spacing: -0.03em;
					color: #0d0d0d;
					margin-bottom: 6px;
				}
				.nf-empty-sub {
					font-size: 13px;
					color: #bbb;
					font-weight: 300;
				}
				.nf-empty-teal {
					display: inline-block;
					margin-top: 20px;
					font-size: 10px;
					font-weight: 600;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: #306073;
					border: 1px solid rgba(48,96,115,0.25);
					border-radius: 100px;
					padding: 5px 14px;
					background: rgba(48,96,115,0.05);
				}

				/* pagination wrap */
				.nf-pag {
					position: relative;
					z-index: 1;
					max-width: 760px;
					margin: 0 auto;
					padding: 0 clamp(20px, 5vw, 48px) 40px;
					opacity: 0;
					transform: translateY(10px);
					transition: opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s;
				}
				.nf-pag.nf-mounted { opacity: 1; transform: translateY(0); }

				/* ── responsive ── */
				@media (max-width: 600px) {
					.nf-hero-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
					.nf-hero-right { align-items: flex-start; }
					.nf-stat-row   { flex-wrap: wrap; }
				}
				@media (max-width: 400px) {
					.nf-stat       { padding: 6px 10px; min-width: 54px; }
					.nf-stat-val   { font-size: 17px; }
				}
			`}</style>

			<div className="nf-root">
				{/* ── HERO ── */}
				<div className="nf-hero">
					<div className="nf-hero-inner">
						{/* Left: icon + title */}
						<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
							<div className="nf-bell-wrap">
								<span className="nf-bell-ring" />
								<FiBell size={20} />
								{unreadCount > 0 && <span className="nf-badge">{unreadCount}</span>}
							</div>
							<div>
								<div className="nf-eyebrow">
									<span className="nf-eyebrow-dot" />
									Inbox
								</div>
								<h1 className="nf-title">
									Notifi<span className="nf-title-accent">cations</span>
								</h1>
							</div>
						</div>

						{/* Right: stats + mark-all */}
						<div className="nf-hero-right">
							<div className="nf-stat-row">
								<div className="nf-stat nf-stat-teal">
									<span className="nf-stat-val">{unreadCount}</span>
									<span className="nf-stat-label">Unread</span>
								</div>
								<div className="nf-stat">
									<span className="nf-stat-val">{readCount}</span>
									<span className="nf-stat-label">Read</span>
								</div>
								<div className="nf-stat">
									<span className="nf-stat-val">{totalPages}</span>
									<span className="nf-stat-label">Pages</span>
								</div>
							</div>

							{unreadCount > 0 && (
								<button className="nf-mark-btn" onClick={markAllAsRead}>
									<FiCheck size={12} />
									Mark all as read
								</button>
							)}
						</div>
					</div>
				</div>

				{/* ── BODY ── */}
				<div className={`nf-body${mounted ? " nf-mounted" : ""}`}>
					<div className="nf-section-head">
						<span className="nf-section-title">All Notifications</span>
						<span className="nf-section-rule" />
					</div>

					{notifications.length > 0 ?
						<div>
							{notifications.map((notification) => (
								<button
									key={notification.id}
									className={`nf-item${!notification.is_read ? " nf-unread" : ""}`}
									onClick={() => markNotification(notification.id, currentPage)}>
									{!notification.is_read && <span className="nf-unread-dot" />}
									<NotificationList notification={notification} openNoti={false} />
								</button>
							))}
						</div>
					:	<div className="nf-empty">
							<div className="nf-empty-icon">
								<FiBell size={28} />
							</div>
							<h3 className="nf-empty-title">All caught up</h3>
							<p className="nf-empty-sub">No new notifications right now.</p>
							<span className="nf-empty-teal">You're up to date</span>
						</div>
					}
				</div>

				{/* ── PAGINATION ── */}
				<div className={`nf-pag${mounted ? " nf-mounted" : ""}`}>
					<NotificationPagination
						currentPage={currentPage}
						handlePageChange={setCurrentPage}
						totalPages={totalPages}
					/>
				</div>
			</div>
		</>
	);
};

export default Notifications;
