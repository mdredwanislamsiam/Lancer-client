import React, { useState } from "react";
import { FiClock } from "react-icons/fi";

const NotificationList = ({ notification, openNoti }) => {
	const [hovered, setHovered] = useState(false);

	const getTime = () => {
		const createdTime = new Date(notification.created_at).getTime();
		const diff = Date.now() - createdTime;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		if (weeks > 0) return `${weeks}w ago`;
		if (days > 0) return `${days}d ago`;
		if (hours > 0) return `${hours}h ago`;
		if (minutes > 0) return `${minutes}m ago`;
		return `${seconds}s ago`;
	};

	const isRead = notification.is_read;
	const isCompact = openNoti;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

				/* ── base card ── */
				.nl-card {
					font-family: 'DM Sans', sans-serif;
					position: relative;
					display: flex;
					align-items: stretch;
					background: #ffffff;
					border: 1px solid rgba(0,0,0,0.07);
					border-radius: 16px;
					margin-bottom: 8px;
					overflow: hidden;
					cursor: pointer;
					transition:
						box-shadow 0.22s ease,
						transform  0.22s cubic-bezier(0.34,1.56,0.64,1),
						border-color 0.2s ease;
					will-change: transform;
				}
				.nl-card:hover {
					transform: translateY(-2px) scale(1.005);
					box-shadow: 0 6px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
					border-color: rgba(0,0,0,0.11);
				}

				/* unread variant */
				.nl-card.nl-unread {
					background: #0d0d0d;
					border-color: rgba(48,96,115,0.25);
				}
				.nl-card.nl-unread:hover {
					border-color: rgba(48,96,115,0.5);
					box-shadow: 0 8px 28px rgba(0,0,0,0.2), 0 0 0 1px rgba(48,96,115,0.2);
				}

				/* compact (openNoti) variants */
				.nl-card.nl-compact {
					border-radius: 12px;
					margin-bottom: 6px;
				}
				.nl-card.nl-compact-unread {
					background: #0d0d0d;
					border-color: rgba(48,96,115,0.2);
				}

				/* ── left accent bar ── */
				.nl-accent {
					width: 3px;
					flex-shrink: 0;
					border-radius: 3px 0 0 3px;
					background: rgba(0,0,0,0.07);
					transition: background 0.2s;
				}
				.nl-unread        .nl-accent { background: #306073; }
				.nl-compact-unread .nl-accent { background: #306073; }
				.nl-card:hover .nl-accent { background: #306073; }

				/* ── body ── */
				.nl-body {
					flex: 1;
					padding: 14px 16px 12px;
					display: flex;
					flex-direction: column;
					gap: 5px;
				}
				.nl-compact .nl-body { padding: 10px 14px 9px; }

				/* ── top row ── */
				.nl-top {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					gap: 8px;
				}

				/* title */
				.nl-title {
					font-family: 'Syne', sans-serif;
					font-size: 13px;
					font-weight: 700;
					letter-spacing: -0.01em;
					color: #0d0d0d;
					line-height: 1.2;
					flex: 1;
				}
				.nl-compact .nl-title { font-size: 11px; }
				.nl-unread         .nl-title { color: #ffffff; }
				.nl-compact-unread .nl-title { color: #ffffff; }

				/* new badge on unread title */
				.nl-new-badge {
					display: inline-block;
					font-family: 'DM Sans', sans-serif;
					font-size: 8px;
					font-weight: 700;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: #306073;
					background: rgba(48,96,115,0.12);
					border: 1px solid rgba(48,96,115,0.25);
					border-radius: 100px;
					padding: 2px 7px;
					vertical-align: middle;
					margin-left: 7px;
					white-space: nowrap;
				}
				.nl-unread .nl-new-badge {
					background: rgba(48,96,115,0.2);
					border-color: rgba(48,96,115,0.4);
				}

				/* timestamp */
				.nl-time {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					font-size: 10px;
					font-weight: 400;
					color: #bbb;
					white-space: nowrap;
					flex-shrink: 0;
				}
				.nl-unread         .nl-time { color: rgba(255,255,255,0.3); }
				.nl-compact-unread .nl-time { color: rgba(255,255,255,0.3); }

				/* message */
				.nl-msg {
					font-size: 12px;
					font-weight: 300;
					color: #666;
					line-height: 1.65;
					text-align: left;
				}
				.nl-compact .nl-msg { font-size: 11px; }
				.nl-unread         .nl-msg { color: rgba(255,255,255,0.5); }
				.nl-compact-unread .nl-msg { color: rgba(255,255,255,0.5); }

				/* ── read/unread state indicator dot (right edge) ── */
				.nl-state-dot {
					flex-shrink: 0;
					width: 34px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.nl-dot-inner {
					width: 7px; height: 7px;
					border-radius: 50%;
					background: #306073;
					box-shadow: 0 0 0 0 rgba(48,96,115,0.5);
					animation: nlSonar 2s infinite;
				}
				@keyframes nlSonar {
					0%   { box-shadow: 0 0 0 0   rgba(48,96,115,0.5); }
					70%  { box-shadow: 0 0 0 7px rgba(48,96,115,0); }
					100% { box-shadow: 0 0 0 0   rgba(48,96,115,0); }
				}

				/* read state subtle tick */
				.nl-tick {
					color: rgba(0,0,0,0.15);
					font-size: 12px;
					line-height: 1;
				}
				.nl-unread .nl-tick { color: rgba(255,255,255,0.15); }
			`}</style>

			<div
				key={notification.id}
				className={[
					"nl-card",
					!isRead && !isCompact ? "nl-unread" : "",
					isCompact ? "nl-compact" : "",
					isCompact && !isRead ? "nl-compact-unread" : "",
				]
					.filter(Boolean)
					.join(" ")}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}>
				{/* Left accent bar */}
				<span className="nl-accent" />

				{/* Body */}
				<div className="nl-body">
					<div className="nl-top">
						<span className="nl-title">
							{notification.title}
							{!isRead && <span className="nl-new-badge">New</span>}
						</span>
						<span className="nl-time">
							<FiClock size={10} />
							{getTime()}
						</span>
					</div>
					<p className="nl-msg">{notification.message}</p>
				</div>

				{/* Right state indicator */}
				<div className="nl-state-dot">
					{!isRead ?
						<span className="nl-dot-inner" />
					:	<span className="nl-tick">✓</span>}
				</div>
			</div>
		</>
	);
};

export default NotificationList;
