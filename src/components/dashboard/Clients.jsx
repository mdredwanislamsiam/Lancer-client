import { useState } from "react";
import defImg from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import useOtherInfoContext from "../../hooks/useOtherInfoContext";

/* ── Skeleton Row ─────────────────────────────────────────────────── */
const SkeletonRow = ({ delay = 0 }) => (
	<tr className="clients-sk-row" style={{ animationDelay: `${delay}s` }}>
		{[80, 100, 90, 120, 130].map((w, i) => (
			<td key={i} style={{ padding: "14px 16px" }}>
				{i === 0 ?
					<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
						<div className="clients-sk clients-sk-avatar" />
						<div className="clients-sk" style={{ width: 70, height: 12, borderRadius: 6 }} />
					</div>
				:	<div className="clients-sk" style={{ width: w, height: 12, borderRadius: 6 }} />}
			</td>
		))}
	</tr>
);

/* ── Empty State ──────────────────────────────────────────────────── */
const EmptyState = () => (
	<div className="clients-empty">
		<div className="clients-empty-icon">
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<line x1="23" y1="11" x2="17" y2="11" />
			</svg>
		</div>
		<p className="clients-empty-title">No clients yet</p>
		<p className="clients-empty-sub">Clients who work with you will appear here.</p>
	</div>
);

/* ── Avatar with fallback ─────────────────────────────────────────── */
const Avatar = ({ src, alt }) => {
	const [err, setErr] = useState(false);
	return <img src={err ? defImg : src || defImg} alt={alt} onError={() => setErr(true)} className="clients-avatar" />;
};

/* ── Main Component ───────────────────────────────────────────────── */
const Clients = () => {
	const { clients, loading } = useOtherInfoContext();
	const [search, setSearch] = useState("");

	const filtered = (clients || []).filter((c) => {
		const q = search.toLowerCase();
		return (
			c?.username?.toLowerCase().includes(q) ||
			c?.first_name?.toLowerCase().includes(q) ||
			c?.last_name?.toLowerCase().includes(q) ||
			c?.email?.toLowerCase().includes(q)
		);
	});

	const cols = ["Client", "Full Name", "Phone", "Address", "Email"];

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.clients-root {
					--teal: #306073;
					--teal-light: rgba(48,96,115,0.07);
					--teal-mid: rgba(48,96,115,0.18);
					--teal-glow: rgba(48,96,115,0.18);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Card ── */
				.clients-card {
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0 4px 24px rgba(0,0,0,0.05);
					animation: cl-fade 0.5s ease both;
				}

				@keyframes cl-fade {
					from { opacity: 0; transform: translateY(16px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				/* ── Card header ── */
				.clients-card-header {
					padding: 22px 24px 18px;
					border-bottom: 1px solid var(--border);
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 16px;
					flex-wrap: wrap;
					background: #ffffff;
				}

				.clients-header-left {
					display: flex;
					align-items: center;
					gap: 12px;
				}

				.clients-header-icon {
					width: 36px; height: 36px;
					border-radius: 10px;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					display: flex; align-items: center; justify-content: center;
					color: var(--teal);
					flex-shrink: 0;
				}

				.clients-title {
					font-family: 'Syne', sans-serif;
					font-size: 18px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					margin: 0;
				}

				.clients-count-badge {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					font-size: 11px;
					font-weight: 500;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 3px 10px;
					border-radius: 100px;
					letter-spacing: 0.04em;
				}

				/* ── Search ── */
				.clients-search-wrap {
					position: relative;
					flex-shrink: 0;
				}

				.clients-search-icon {
					position: absolute;
					left: 11px; top: 50%;
					transform: translateY(-50%);
					color: var(--muted);
					pointer-events: none;
					transition: color 0.2s ease;
				}

				.clients-search-wrap:focus-within .clients-search-icon {
					color: var(--teal);
				}

				.clients-search-input {
					padding: 8px 14px 8px 34px;
					border-radius: 9px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 400;
					color: var(--ink);
					outline: none;
					width: 200px;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
					box-sizing: border-box;
				}

				.clients-search-input::placeholder { color: #a0b4bc; }

				.clients-search-input:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				@media (max-width: 500px) {
					.clients-search-input { width: 100%; }
					.clients-card-header { flex-direction: column; align-items: flex-start; }
					.clients-search-wrap { width: 100%; }
				}

				/* ── Table wrapper ── */
				.clients-table-wrap {
					overflow-x: auto;
					-webkit-overflow-scrolling: touch;
				}

				/* ── Table ── */
				.clients-table {
					width: 100%;
					border-collapse: collapse;
					min-width: 580px;
				}

				/* Head */
				.clients-thead {
					background: var(--surface);
					border-bottom: 1px solid var(--border);
					position: sticky; top: 0; z-index: 2;
				}

				.clients-th {
					padding: 11px 16px;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: var(--muted);
					text-align: left;
					white-space: nowrap;
				}

				.clients-th:first-child { padding-left: 20px; }
				.clients-th:last-child  { padding-right: 20px; }

				/* Body rows */
				.clients-tr {
					border-bottom: 1px solid var(--border);
					transition: background 0.15s ease;
					animation: cl-row-in 0.4s ease both;
				}

				@keyframes cl-row-in {
					from { opacity: 0; transform: translateX(-8px); }
					to   { opacity: 1; transform: translateX(0); }
				}

				.clients-tr:last-child { border-bottom: none; }

				.clients-tr:hover { background: var(--teal-light); }

				.clients-td {
					padding: 13px 16px;
					font-size: 13.5px;
					color: var(--ink);
					font-weight: 400;
					vertical-align: middle;
					white-space: nowrap;
				}

				.clients-td:first-child { padding-left: 20px; }
				.clients-td:last-child  { padding-right: 20px; }

				/* Avatar + username cell */
				.clients-user-link {
					display: flex;
					align-items: center;
					gap: 10px;
					text-decoration: none;
					transition: color 0.15s ease;
				}

				.clients-user-link:hover .clients-username {
					color: var(--teal);
				}

				.clients-avatar {
					width: 34px; height: 34px;
					border-radius: 50%;
					object-fit: cover;
					border: 2px solid #ffffff;
					box-shadow: 0 0 0 1.5px var(--teal-mid);
					flex-shrink: 0;
					display: block;
				}

				.clients-username {
					font-weight: 500;
					color: var(--ink);
					font-size: 13.5px;
					transition: color 0.15s ease;
				}

				/* Pill cells */
				.clients-email-pill {
					display: inline-flex;
					align-items: center;
					gap: 5px;
					font-size: 12.5px;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 3px 10px;
					border-radius: 100px;
					font-weight: 400;
				}

				.clients-muted {
					color: var(--muted);
					font-size: 13px;
					font-weight: 300;
				}

				/* ── No results ── */
				.clients-no-results {
					padding: 32px;
					text-align: center;
					color: var(--muted);
					font-size: 13.5px;
					font-weight: 300;
				}

				/* ── Empty ── */
				.clients-empty {
					padding: 64px 24px;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 10px;
					text-align: center;
				}

				.clients-empty-icon {
					width: 68px; height: 68px;
					border-radius: 50%;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					display: flex; align-items: center; justify-content: center;
					color: var(--teal);
					margin-bottom: 4px;
				}

				.clients-empty-title {
					font-family: 'Syne', sans-serif;
					font-size: 17px;
					font-weight: 700;
					color: var(--ink);
					margin: 0;
				}

				.clients-empty-sub {
					font-size: 13px;
					color: var(--muted);
					font-weight: 300;
					margin: 0;
				}

				/* ── Skeleton ── */
				.clients-sk-row {
					animation: sk-fade 1.6s ease-in-out infinite;
					border-bottom: 1px solid var(--border);
				}

				@keyframes sk-fade {
					0%, 100% { opacity: 1; }
					50%       { opacity: 0.45; }
				}

				.clients-sk {
					display: block;
					background: linear-gradient(90deg, #f0f4f6 25%, #e4eaed 50%, #f0f4f6 75%);
					background-size: 200% 100%;
					animation: sk-shimmer 1.6s linear infinite;
				}

				.clients-sk-avatar {
					width: 34px; height: 34px;
					border-radius: 50%;
					flex-shrink: 0;
				}

				@keyframes sk-shimmer {
					0%   { background-position: 200% 0; }
					100% { background-position: -200% 0; }
				}
			`}</style>

			<div className="clients-root">
				<div className="clients-card">
					{/* Header */}
					<div className="clients-card-header">
						<div className="clients-header-left">
							<div className="clients-header-icon">
								<svg
									width="17"
									height="17"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<div>
								<h3 className="clients-title">My Clients</h3>
							</div>
							{!loading && clients?.length > 0 && (
								<span className="clients-count-badge">{clients.length} total</span>
							)}
						</div>

						{!loading && clients?.length > 0 && (
							<div className="clients-search-wrap">
								<svg
									className="clients-search-icon"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<circle cx="11" cy="11" r="8" />
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
								</svg>
								<input
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Search clients…"
									className="clients-search-input"
								/>
							</div>
						)}
					</div>

					{/* Content */}
					{loading ?
						<div className="clients-table-wrap">
							<table className="clients-table">
								<thead className="clients-thead">
									<tr>
										{cols.map((c) => (
											<th key={c} className="clients-th">
												{c}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{[...Array(5)].map((_, i) => (
										<SkeletonRow key={i} delay={i * 0.08} />
									))}
								</tbody>
							</table>
						</div>
					: clients?.length === 0 ?
						<EmptyState />
					:	<div className="clients-table-wrap">
							<table className="clients-table">
								<thead className="clients-thead">
									<tr>
										{cols.map((c) => (
											<th key={c} className="clients-th">
												{c}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{filtered.length === 0 ?
										<tr>
											<td colSpan={5} className="clients-no-results">
												No clients match "<strong>{search}</strong>"
											</td>
										</tr>
									:	filtered.map((client, i) => (
											<tr
												key={client.id}
												className="clients-tr"
												style={{ animationDelay: `${i * 0.05}s` }}>
												{/* Username + avatar */}
												<td className="clients-td">
													<Link to={`/infoPage/${client?.id}`} className="clients-user-link">
														<Avatar src={client?.image} alt={client?.username} />
														<span className="clients-username">{client?.username}</span>
													</Link>
												</td>

												{/* Full name */}
												<td className="clients-td">
													{client?.first_name || client?.last_name ?
														`${client.first_name ?? ""} ${client.last_name ?? ""}`.trim()
													:	<span className="clients-muted">—</span>}
												</td>

												{/* Phone */}
												<td className="clients-td">
													{client?.phone_number ?
														<span>{client.phone_number}</span>
													:	<span className="clients-muted">—</span>}
												</td>

												{/* Address */}
												<td className="clients-td">
													{client?.address ?
														<span>{client.address}</span>
													:	<span className="clients-muted">—</span>}
												</td>

												{/* Email pill */}
												<td className="clients-td">
													{client?.email ?
														<span className="clients-email-pill">
															<svg
																width="10"
																height="10"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round">
																<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
																<polyline points="22,6 12,13 2,6" />
															</svg>
															{client.email}
														</span>
													:	<span className="clients-muted">—</span>}
												</td>
											</tr>
										))
									}
								</tbody>
							</table>
						</div>
					}
				</div>
			</div>
		</>
	);
};

export default Clients;
