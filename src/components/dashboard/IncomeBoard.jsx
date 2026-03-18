import { Link } from "react-router";
import { FiUsers } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import StatCard from "./StatCard";
import { GiCancel } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";
import useOtherInfoContext from "../../hooks/useOtherInfoContext";

/* ─── tiny helper: icon wrapper ─────────────────────────────── */
const IconBubble = ({ children }) => <div style={styles.iconBubble}>{children}</div>;

/* ─── reusable stat tile ─────────────────────────────────────── */
const Tile = ({ as: Tag = "div", to, children, hoverable = false, style: extra = {} }) => {
	const base = { ...styles.tile, ...extra };
	if (Tag === Link)
		return (
			<Link to={to} style={base} className="income-tile">
				{children}
			</Link>
		);
	return (
		<div style={base} className={hoverable ? "income-tile" : ""}>
			{children}
		</div>
	);
};

/* ─── main component ─────────────────────────────────────────── */
const IncomeBoard = ({ displayLg }) => {
	const { user } = useAuthContext();
	const { clients, canceledOrders, unpaidOrders } = useOtherInfoContext();

	const iconSize =
		window.innerWidth < 640 ? 16
		: window.innerWidth < 1024 ? 20
		: 22;

	return (
		<>
			{/* scoped CSS */}
			<style>{`
				.income-tile { transition: transform 0.22s ease, box-shadow 0.22s ease; }
				.income-tile:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(48,96,115,0.18) !important; }
				@keyframes fadeUp {
					from { opacity: 0; transform: translateY(12px); }
					to   { opacity: 1; transform: translateY(0); }
				}
				.income-animate { animation: fadeUp 0.45s ease both; }
			`}</style>

			<div style={styles.board}>
				{/* ── Hero wallet card ── */}
				<div className="income-animate income-tile" style={{ ...styles.heroCard, animationDelay: "0ms" }}>
					{/* decorative circle */}
					<div style={styles.heroBg} />
					<div style={styles.heroContent}>
						<div style={styles.heroTop}>
							<span style={styles.heroLabel}>Total {user?.role === "Seller" ? "Income" : "Cost"}</span>
							<IconBubble>
								<FaWallet size={iconSize} color="#306073" />
							</IconBubble>
						</div>
						<div style={styles.heroAmount}>
							<span style={styles.currencySign}>$</span>
							<span style={styles.amountValue}>{user?.wallet ?? "—"}</span>
						</div>
						<div style={styles.heroFooter}>
							<span style={styles.heroBadge}>
								{user?.role === "Seller" ? "Earnings" : "Spent"} · All time
							</span>
						</div>
					</div>
				</div>

				{/* ── Clients card ── */}
				<Link
					to="clients"
					className="income-animate income-tile"
					style={{ ...styles.tile, textDecoration: "none", animationDelay: "80ms" }}>
					<div style={styles.tileTop}>
						<div>
							<p style={styles.tileLabel}>Total Clients</p>
							<p style={styles.tileValue}>{clients?.length ?? 0}</p>
						</div>
						<IconBubble>
							<FiUsers size={iconSize} color="#306073" />
						</IconBubble>
					</div>
					<div style={styles.tileBar}>
						<div
							style={{ ...styles.tileBarFill, width: `${Math.min((clients?.length ?? 0) * 5, 100)}%` }}
						/>
					</div>
				</Link>

				{/* ── Unpaid Orders ── */}
				{displayLg && (
					<Link
						to="unpaidOrders"
						className="income-animate income-tile"
						style={{ ...styles.tile, textDecoration: "none", animationDelay: "160ms" }}>
						<div style={styles.tileTop}>
							<div>
								<p style={styles.tileLabel}>Unpaid Orders</p>
								<p style={styles.tileValue}>{unpaidOrders?.length ?? 0}</p>
							</div>
							<IconBubble>
								<MdOutlinePendingActions size={iconSize} color="#306073" />
							</IconBubble>
						</div>
						<div style={styles.tileBar}>
							<div
								style={{
									...styles.tileBarFill,
									width: `${Math.min((unpaidOrders?.length ?? 0) * 8, 100)}%`,
								}}
							/>
						</div>
					</Link>
				)}

				{/* ── Canceled Orders ── */}
				{displayLg && (
					<Link
						to="canceledOrders"
						className="income-animate income-tile"
						style={{ ...styles.tile, textDecoration: "none", animationDelay: "240ms" }}>
						<div style={styles.tileTop}>
							<div>
								<p style={styles.tileLabel}>Canceled Orders</p>
								<p style={{ ...styles.tileValue, color: "#b94040" }}>{canceledOrders?.length ?? 0}</p>
							</div>
							<IconBubble style={{ background: "rgba(185,64,64,0.08)" }}>
								<GiCancel size={iconSize} color="#b94040" />
							</IconBubble>
						</div>
						<div style={styles.tileBar}>
							<div
								style={{
									...styles.tileBarFill,
									width: `${Math.min((canceledOrders?.length ?? 0) * 8, 100)}%`,
									background: "#b94040",
								}}
							/>
						</div>
					</Link>
				)}

				{/* ── Coming soon ── */}
				<div
					className="income-animate"
					style={{ ...styles.comingSoon, animationDelay: displayLg ? "320ms" : "160ms" }}>
					<div style={styles.comingSoonDot} />
					<span style={styles.comingSoonText}>More stats coming soon</span>
				</div>
			</div>
		</>
	);
};

/* ─── styles ─────────────────────────────────────────────────── */
const styles = {
	board: {
		display: "flex",
		flexDirection: "column",
		gap: "14px",
		width: "100%",
		height: "100%",
		background: "#f7f9fa",
		padding: "20px",
		borderRadius: "20px",
		boxSizing: "border-box",
	},

	/* hero */
	heroCard: {
		position: "relative",
		background: "#111111",
		borderRadius: "18px",
		padding: "24px",
		overflow: "hidden",
		boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
		cursor: "default",
	},
	heroBg: {
		position: "absolute",
		width: "180px",
		height: "180px",
		borderRadius: "50%",
		background: "radial-gradient(circle, rgba(48,96,115,0.55) 0%, transparent 70%)",
		top: "-50px",
		right: "-40px",
		pointerEvents: "none",
	},
	heroContent: {
		position: "relative",
		zIndex: 1,
	},
	heroTop: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	heroLabel: {
		fontSize: "12px",
		fontWeight: "600",
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		color: "rgba(255,255,255,0.5)",
	},
	iconBubble: {
		background: "rgba(48,96,115,0.12)",
		border: "1px solid rgba(48,96,115,0.25)",
		borderRadius: "10px",
		padding: "9px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	heroAmount: {
		display: "flex",
		alignItems: "baseline",
		gap: "4px",
		marginTop: "18px",
	},
	currencySign: {
		fontSize: "22px",
		fontWeight: "400",
		color: "rgba(255,255,255,0.45)",
	},
	amountValue: {
		fontSize: "36px",
		fontWeight: "700",
		color: "#ffffff",
		letterSpacing: "-0.03em",
		lineHeight: 1,
	},
	heroFooter: {
		marginTop: "14px",
	},
	heroBadge: {
		display: "inline-block",
		fontSize: "11px",
		fontWeight: "500",
		color: "#306073",
		background: "rgba(48,96,115,0.15)",
		border: "1px solid rgba(48,96,115,0.3)",
		borderRadius: "6px",
		padding: "3px 10px",
		letterSpacing: "0.04em",
	},

	/* stat tiles */
	tile: {
		background: "#ffffff",
		borderRadius: "16px",
		padding: "18px 20px 14px",
		boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 2px 10px rgba(48,96,115,0.06)",
		border: "1px solid rgba(48,96,115,0.08)",
		display: "block",
		cursor: "pointer",
	},
	tileTop: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "14px",
	},
	tileLabel: {
		fontSize: "11px",
		fontWeight: "600",
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		color: "#888",
		margin: 0,
	},
	tileValue: {
		fontSize: "30px",
		fontWeight: "700",
		color: "#111",
		letterSpacing: "-0.03em",
		lineHeight: 1,
		margin: "6px 0 0",
	},
	tileBar: {
		height: "3px",
		background: "rgba(48,96,115,0.1)",
		borderRadius: "99px",
		overflow: "hidden",
	},
	tileBarFill: {
		height: "100%",
		background: "#306073",
		borderRadius: "99px",
		transition: "width 0.6s ease",
	},

	/* coming soon */
	comingSoon: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		padding: "14px 18px",
		borderRadius: "14px",
		border: "1.5px dashed rgba(48,96,115,0.2)",
		background: "rgba(48,96,115,0.02)",
	},
	comingSoonDot: {
		width: "7px",
		height: "7px",
		borderRadius: "50%",
		background: "#306073",
		opacity: 0.45,
		flexShrink: 0,
	},
	comingSoonText: {
		fontSize: "12px",
		fontWeight: "500",
		color: "#aaa",
		letterSpacing: "0.04em",
	},
};

export default IncomeBoard;
