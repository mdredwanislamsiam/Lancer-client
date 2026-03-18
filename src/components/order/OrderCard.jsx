import { useState } from "react";
import authAPIClient from "../../services/auth-api-client";
import OrderItem from "./OrderItem";
import { FiAlertCircle } from "react-icons/fi";
import { BiCheckCircle, BiMessage, BiXCircle } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { GiCancel, GiSandsOfTime } from "react-icons/gi";
import { BsWallet } from "react-icons/bs";
import { CgHashtag } from "react-icons/cg";
import useAuthContext from "../../hooks/useAuthContext";
import useOrderContext from "../../hooks/useOrderContext";

/* ─── status config ──────────────────────────────────────────── */
const STATUS_CONFIG = {
	"Not paid": {
		bg: "rgba(185,64,64,0.08)",
		border: "rgba(185,64,64,0.2)",
		color: "#b94040",
		dot: "#b94040",
		label: "Unpaid",
		Icon: FiAlertCircle,
	},
	Paid: {
		bg: "rgba(48,96,115,0.08)",
		border: "rgba(48,96,115,0.2)",
		color: "#306073",
		dot: "#306073",
		label: "Paid",
		Icon: BiCheckCircle,
	},
	Delivered: {
		bg: "rgba(22,163,74,0.08)",
		border: "rgba(22,163,74,0.2)",
		color: "#16a34a",
		dot: "#16a34a",
		label: "Delivered",
		Icon: BiCheckCircle,
	},
	Canceled: {
		bg: "rgba(100,100,100,0.07)",
		border: "rgba(100,100,100,0.18)",
		color: "#666",
		dot: "#aaa",
		label: "Canceled",
		Icon: BiXCircle,
	},
	Active: {
		bg: "rgba(217,119,6,0.08)",
		border: "rgba(217,119,6,0.2)",
		color: "#b45309",
		dot: "#d97706",
		label: "Active",
		Icon: CiLock,
	},
};

/* ─── ghost action button ────────────────────────────────────── */
const GhostBtn = ({ onClick, disabled, loading, icon: Icon, label, variant = "teal", size = "sm" }) => {
	const palette = {
		teal: { base: "#306073", hoverBg: "#306073", hoverText: "#fff" },
		dark: { base: "#111", hoverBg: "#111", hoverText: "#fff" },
		red: { base: "#b94040", hoverBg: "#b94040", hoverText: "#fff" },
		pay: { base: "#306073", hoverBg: "#306073", hoverText: "#fff" },
	};
	const p = palette[variant];
	const pad = size === "sm" ? "8px 16px" : "9px 20px";
	const fs = size === "sm" ? "12px" : "13px";
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "6px",
				padding: pad,
				fontSize: fs,
				fontWeight: 600,
				letterSpacing: "0.03em",
				borderRadius: "8px",
				border: "none",
				cursor: disabled ? "not-allowed" : "pointer",
				color: p.base,
				background: `${p.base}10`,
				outline: `1px solid ${p.base}30`,
				transition: "all 0.18s ease",
				opacity: disabled ? 0.5 : 1,
			}}
			onMouseEnter={(e) => {
				if (!disabled) {
					e.currentTarget.style.background = p.hoverBg;
					e.currentTarget.style.color = p.hoverText;
					e.currentTarget.style.outline = `1px solid ${p.hoverBg}`;
					e.currentTarget.style.boxShadow = `0 4px 14px ${p.hoverBg}40`;
					e.currentTarget.style.transform = "translateY(-1px)";
				}
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.background = `${p.base}10`;
				e.currentTarget.style.color = p.base;
				e.currentTarget.style.outline = `1px solid ${p.base}30`;
				e.currentTarget.style.boxShadow = "none";
				e.currentTarget.style.transform = "translateY(0)";
			}}>
			{Icon && <Icon size={14} />}
			{loading ? "Processing…" : label}
		</button>
	);
};

/* ─── main component ─────────────────────────────────────────── */
const OrderCard = ({ order }) => {
	const { user } = useAuthContext();
	const [status, setStatus] = useState(order.status);
	const [loading, setLoading] = useState(false);
	const { cancelOrder } = useOrderContext();

	const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["Not paid"];

	const handleCancelOrder = async (orderId) => {
		const res = await cancelOrder(orderId);
		if (res === 200) setStatus("Canceled");
	};

	const handleStatusChange = async (e) => {
		const newStatus = e.target.value;
		try {
			const response = await authAPIClient.patch(`/orders/${order.id}/update_status/`, { status: newStatus });
			if (response.status === 200) {
				setStatus(newStatus);
				alert(response.data.status);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handlePayment = async () => {
		setLoading(true);
		try {
			const response = await authAPIClient.post("/payment/initiate/", {
				amount: order.total_price,
				orderId: order.id,
			});
			if (response.data.payment_url) {
				setLoading(false);
				window.location.href = response.data.payment_url;
			} else {
				alert("Payment failed!");
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};

	if (!order) return null;

	const showPay = order.status === "Not paid" && status !== "Canceled" && !user.is_staff;
	const showCancel =
		!["Delivered", "Active", "Paid"].includes(order.status) && status !== "Canceled" && !user.is_staff;

	return (
		<>
			<style>{`
				.oc-card { transition: box-shadow 0.26s ease, transform 0.26s ease; }
				.oc-card:hover { box-shadow: 0 16px 48px rgba(48,96,115,0.14) !important; transform: translateY(-2px); }
				.oc-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px !important; }
				@keyframes ocIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
				.oc-card { animation: ocIn 0.38s ease both; }
			`}</style>

			<div className="oc-card" style={S.card}>
				{/* ── Header ── */}
				<div style={S.header}>
					{/* accent bar */}
					<div style={S.headerBar} />

					<div style={S.headerInner}>
						{/* Order ID */}
						<div style={S.orderIdBlock}>
							<div style={S.hashBubble}>
								<CgHashtag size={16} color="#fff" />
							</div>
							<div>
								<p style={S.orderLabel}>Order</p>
								<p style={S.orderId}>#{order.id}</p>
							</div>
						</div>

						{/* Status */}
						{user.is_staff ?
							<select className="oc-select" value={status} onChange={handleStatusChange} style={S.select}>
								<option value="Not paid">Unpaid</option>
								<option value="Paid">Paid</option>
								<option value="Active">Active</option>
								<option value="Delivered">Delivered</option>
								<option value="Canceled">Canceled</option>
							</select>
						:	<div
								style={{
									...S.statusPill,
									background: cfg.bg,
									border: `1px solid ${cfg.border}`,
									color: cfg.color,
								}}>
								<div style={{ ...S.statusDot, background: cfg.dot }} />
								<cfg.Icon size={13} />
								<span>{cfg.label}</span>
							</div>
						}
					</div>
				</div>

				{/* ── Order Items ── */}
				<div style={S.itemsSection}>
					<OrderItem item={order} />
				</div>

				{/* ── Footer ── */}
				<div style={S.footer}>
					{/* Price */}
					<div style={S.priceBlock}>
						<div style={S.walletIcon}>
							<BsWallet size={16} color="#306073" />
						</div>
						<div>
							<p style={S.priceLabel}>Total</p>
							<p style={S.priceValue}>${parseFloat(order.total_price).toFixed(2)}</p>
						</div>
					</div>

					{/* Actions */}
					<div style={S.actions}>
						<GhostBtn icon={BiMessage} label="Contact Seller" variant="teal" />

						{showPay && (
							<GhostBtn
								onClick={handlePayment}
								disabled={loading}
								loading={loading}
								icon={loading ? GiSandsOfTime : MdPayment}
								label="Pay Now"
								variant="pay"
							/>
						)}

						{showCancel && (
							<GhostBtn
								onClick={() => handleCancelOrder(order.id)}
								icon={GiCancel}
								label="Cancel"
								variant="red"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

/* ─── styles ─────────────────────────────────────────────────── */
const S = {
	card: {
		background: "#ffffff",
		borderRadius: "18px",
		border: "1px solid rgba(48,96,115,0.1)",
		boxShadow: "0 2px 12px rgba(48,96,115,0.06)",
		overflow: "hidden",
		marginBottom: "16px",
	},

	/* header */
	header: {
		position: "relative",
		background: "#111111",
		overflow: "hidden",
	},
	headerBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: "3px",
		background: "linear-gradient(90deg, #306073 0%, #4a8fa6 55%, #82c4d4 100%)",
	},
	headerInner: {
		position: "relative",
		zIndex: 1,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "18px 22px",
		/* subtle teal glow top-right */
		backgroundImage: "radial-gradient(circle at 90% 0%, rgba(48,96,115,0.45) 0%, transparent 60%)",
	},
	orderIdBlock: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
	},
	hashBubble: {
		width: "36px",
		height: "36px",
		borderRadius: "10px",
		background: "#306073",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	orderLabel: {
		fontSize: "10px",
		fontWeight: 600,
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		color: "rgba(255,255,255,0.4)",
		margin: 0,
	},
	orderId: {
		fontSize: "15px",
		fontWeight: 700,
		color: "#ffffff",
		letterSpacing: "-0.01em",
		margin: "2px 0 0",
	},

	/* status */
	statusPill: {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		padding: "6px 14px",
		borderRadius: "99px",
		fontSize: "12px",
		fontWeight: 600,
		letterSpacing: "0.03em",
	},
	statusDot: {
		width: "6px",
		height: "6px",
		borderRadius: "50%",
		flexShrink: 0,
	},

	/* staff select */
	select: {
		padding: "7px 28px 7px 12px",
		fontSize: "12px",
		fontWeight: 600,
		color: "#111",
		background: "#fff",
		border: "1px solid rgba(48,96,115,0.25)",
		borderRadius: "8px",
		outline: "none",
		cursor: "pointer",
	},

	/* items */
	itemsSection: {
		padding: "16px 22px",
		background: "#fafafa",
		borderTop: "1px solid rgba(48,96,115,0.06)",
		borderBottom: "1px solid rgba(48,96,115,0.06)",
	},

	/* footer */
	footer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		gap: "12px",
		padding: "14px 22px",
		background: "#ffffff",
	},
	priceBlock: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	walletIcon: {
		width: "36px",
		height: "36px",
		borderRadius: "10px",
		background: "rgba(48,96,115,0.08)",
		border: "1px solid rgba(48,96,115,0.15)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	priceLabel: {
		fontSize: "10px",
		fontWeight: 600,
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		color: "#999",
		margin: 0,
	},
	priceValue: {
		fontSize: "20px",
		fontWeight: 700,
		color: "#111",
		letterSpacing: "-0.02em",
		margin: "2px 0 0",
		lineHeight: 1,
	},
	actions: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		flexWrap: "wrap",
	},
};

export default OrderCard;
