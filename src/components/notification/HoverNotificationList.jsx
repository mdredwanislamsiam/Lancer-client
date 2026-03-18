import { useEffect } from "react";
import NotificationList from "./NotificationList";
import { Link } from "react-router";
import useNotificationContext from "../../hooks/useNotificationContext";

const HoverNotificationList = ({ openNoti }) => {
	const { fetchNotifications, notifications, markNotification } = useNotificationContext();

	useEffect(() => {
		fetchNotifications(1);
	}, [openNoti]);

	const unreadCount = notifications?.filter((n) => !n.is_read)?.length || 0;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.hnl-root {
					--teal: #306073;
					--teal-light: rgba(48,96,115,0.07);
					--teal-mid: rgba(48,96,115,0.18);
					--teal-glow: rgba(48,96,115,0.18);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
					width: 340px;
					max-width: 94vw;
				}

				/* ── Panel shell ── */
				.hnl-panel {
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 18px;
					overflow: hidden;
					box-shadow: 0 16px 48px rgba(0,0,0,0.1);
					animation: hnl-in 0.22s cubic-bezier(0.34,1.3,0.64,1) both;
				}

				@keyframes hnl-in {
					from { opacity: 0; transform: scale(0.94) translateY(-8px); }
					to   { opacity: 1; transform: scale(1)   translateY(0); }
				}

				/* ── Header ── */
				.hnl-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 14px 18px 12px;
					border-bottom: 1px solid var(--border);
					background: var(--surface);
				}

				.hnl-header-left {
					display: flex;
					align-items: center;
					gap: 9px;
				}

				.hnl-header-icon {
					display: flex; align-items: center; justify-content: center;
					width: 30px; height: 30px;
					border-radius: 8px;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					color: var(--teal);
					flex-shrink: 0;
				}

				.hnl-title {
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.01em;
					margin: 0;
				}

				.hnl-unread-badge {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					min-width: 20px;
					height: 20px;
					padding: 0 6px;
					border-radius: 100px;
					background: var(--teal);
					color: #ffffff;
					font-size: 11px;
					font-weight: 700;
					line-height: 1;
					animation: hnl-badge-pop 0.3s cubic-bezier(0.34,1.5,0.64,1) both;
				}

				@keyframes hnl-badge-pop {
					from { transform: scale(0); }
					to   { transform: scale(1); }
				}

				.hnl-mark-all {
					font-size: 11.5px;
					font-weight: 500;
					color: var(--teal);
					background: none;
					border: none;
					cursor: pointer;
					padding: 4px 8px;
					border-radius: 6px;
					transition: background 0.15s ease;
					font-family: 'DM Sans', sans-serif;
				}

				.hnl-mark-all:hover { background: var(--teal-light); }

				/* ── List ── */
				.hnl-list {
					display: flex;
					flex-direction: column;
					max-height: 340px;
					overflow-y: auto;
					scrollbar-width: thin;
					scrollbar-color: var(--teal-mid) transparent;
				}

				.hnl-list::-webkit-scrollbar { width: 3px; }
				.hnl-list::-webkit-scrollbar-thumb { background: var(--teal-mid); border-radius: 3px; }

				/* ── Notification row ── */
				.hnl-item {
					display: flex;
					align-items: flex-start;
					gap: 0;
					width: 100%;
					background: transparent;
					border: none;
					cursor: pointer;
					padding: 0;
					text-align: left;
					border-bottom: 1px solid var(--border);
					transition: background 0.15s ease;
					animation: hnl-row-in 0.35s ease both;
				}

				.hnl-item:last-child { border-bottom: none; }

				.hnl-item:hover { background: var(--teal-light); }

				.hnl-item.unread { background: rgba(48,96,115,0.035); }
				.hnl-item.unread:hover { background: var(--teal-light); }

				@keyframes hnl-row-in {
					from { opacity: 0; transform: translateX(-6px); }
					to   { opacity: 1; transform: translateX(0); }
				}

				/* Unread indicator bar */
				.hnl-item-bar {
					width: 3px;
					align-self: stretch;
					background: transparent;
					flex-shrink: 0;
					border-radius: 0;
					transition: background 0.15s ease;
				}

				.hnl-item.unread .hnl-item-bar { background: var(--teal); }

				.hnl-item-inner {
					flex: 1;
					padding: 12px 14px;
				}

				/* ── Empty state ── */
				.hnl-empty {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 40px 24px;
					gap: 10px;
					text-align: center;
				}

				.hnl-empty-icon {
					width: 56px; height: 56px;
					border-radius: 50%;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					display: flex; align-items: center; justify-content: center;
					color: var(--teal);
					margin-bottom: 4px;
				}

				.hnl-empty-title {
					font-family: 'Syne', sans-serif;
					font-size: 15px;
					font-weight: 700;
					color: var(--ink);
					margin: 0;
				}

				.hnl-empty-sub {
					font-size: 12.5px;
					color: var(--muted);
					font-weight: 300;
					margin: 0;
				}

				/* ── Footer ── */
				.hnl-footer {
					padding: 10px 14px;
					border-top: 1px solid var(--border);
					background: var(--surface);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.hnl-view-all {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 13px;
					font-weight: 500;
					color: var(--teal);
					text-decoration: none;
					padding: 7px 18px;
					border-radius: 100px;
					border: 1.5px solid var(--teal-mid);
					background: var(--teal-light);
					transition: all 0.2s ease;
					font-family: 'DM Sans', sans-serif;
				}

				.hnl-view-all:hover {
					background: var(--teal);
					border-color: var(--teal);
					color: #ffffff;
					box-shadow: 0 4px 14px var(--teal-glow);
					transform: translateY(-1px);
				}

				.hnl-view-all:hover svg { stroke: #ffffff; }
			`}</style>

			<div className="hnl-root">
				<div className="hnl-panel">
					{/* Header */}
					<div className="hnl-header">
						<div className="hnl-header-left">
							<div className="hnl-header-icon">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
									<path d="M13.73 21a2 2 0 0 1-3.46 0" />
								</svg>
							</div>
							<h3 className="hnl-title">Notifications</h3>
							{unreadCount > 0 && <span className="hnl-unread-badge">{unreadCount}</span>}
						</div>
						{unreadCount > 0 && (
							<button
								className="hnl-mark-all"
								onClick={() =>
									notifications.filter((n) => !n.is_read).forEach((n) => markNotification(n.id, 1))
								}>
								Mark all read
							</button>
						)}
					</div>

					{/* List or empty */}
					{notifications?.length > 0 ?
						<div className="hnl-list">
							{notifications.slice(0, 5).map((notification, i) => (
								<button
									key={notification.id}
									className={`hnl-item ${!notification.is_read ? "unread" : ""}`}
									style={{ animationDelay: `${i * 0.05}s` }}
									onClick={() => markNotification(notification.id, 1)}>
									<span className="hnl-item-bar" />
									<span className="hnl-item-inner">
										<NotificationList notification={notification} openNoti={openNoti} />
									</span>
								</button>
							))}
						</div>
					:	<div className="hnl-empty">
							<div className="hnl-empty-icon">
								<svg
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
									<path d="M13.73 21a2 2 0 0 1-3.46 0" />
								</svg>
							</div>
							<p className="hnl-empty-title">All caught up!</p>
							<p className="hnl-empty-sub">No new notifications right now.</p>
						</div>
					}

					{/* Footer */}
					<div className="hnl-footer">
						<Link to="/dashboard/notifications" className="hnl-view-all">
							View all notifications
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default HoverNotificationList;
