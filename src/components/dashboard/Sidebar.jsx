import React from "react";
import { FiBarChart2, FiPlusCircle, FiShoppingBag, FiTag, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router";
import { FaShop } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { GrServices } from "react-icons/gr";
import { MdCircleNotifications } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";
import defaultImg from "../../assets/images/DefaultImage.jpg";

/* ─── nav items ──────────────────────────────────────────────── */
const sellerItems = [
	{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
	{ to: "/services", icon: FaShop, label: "All Services" },
	{ to: "/dashboard/services/my", icon: GrServices, label: "My Services" },
	{ to: "/dashboard/services/add", icon: FiPlusCircle, label: "Add Service" },
	{ to: "/dashboard/categories", icon: FiTag, label: "Categories" },
	{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
	{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
];
const buyerItems = [
	{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
	{ to: "/services", icon: FaShop, label: "All Services" },
	{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
	{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
];
const adminItems = [
	{ to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
	{ to: "/services", icon: FaShop, label: "All Services" },
	{ to: "/dashboard/categories", icon: FiTag, label: "Categories" },
	{ to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
	{ to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
	{ to: "/dashboard/notifications", icon: MdCircleNotifications, label: "Notifications" },
];

/* ─── role badge colours ─────────────────────────────────────── */
const ROLE_STYLE = {
	Seller: { bg: "rgba(48,96,115,0.12)", color: "#306073", border: "rgba(48,96,115,0.25)" },
	Buyer: { bg: "rgba(0,0,0,0.06)", color: "#444", border: "rgba(0,0,0,0.15)" },
	Admin: { bg: "rgba(185,64,64,0.1)", color: "#b94040", border: "rgba(185,64,64,0.25)" },
};

/* ─── component ──────────────────────────────────────────────── */
const Sidebar = () => {
	const { user, logoutUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};

	const menuItems =
		user?.is_staff ? adminItems
		: user?.role === "Seller" ? sellerItems
		: buyerItems;

	const roleKey = user?.is_staff ? "Admin" : (user?.role ?? "Buyer");
	const roleStyle = ROLE_STYLE[roleKey] ?? ROLE_STYLE.Buyer;

	return (
		<>
			<style>{`
				.sb-link {
					display: flex; align-items: center; gap: 10px;
					padding: 9px 12px; border-radius: 10px;
					font-size: 13px; font-weight: 500;
					color: #555; text-decoration: none;
					transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
					position: relative;
				}
				.sb-link:hover {
					background: rgba(48,96,115,0.07);
					color: #306073;
					transform: translateX(2px);
				}
				.sb-link.active {
					background: rgba(48,96,115,0.1);
					color: #306073;
					font-weight: 600;
				}
				.sb-link.active::before {
					content: '';
					position: absolute; left: 0; top: 20%; bottom: 20%;
					width: 3px; border-radius: 0 3px 3px 0;
					background: #306073;
				}
				.sb-logout {
					display: flex; align-items: center; gap: 8px;
					padding: 9px 14px; border-radius: 10px;
					font-size: 13px; font-weight: 600;
					color: #111; background: rgba(0,0,0,0.05);
					border: 1px solid rgba(0,0,0,0.1);
					cursor: pointer; width: 100%;
					transition: background 0.18s ease, color 0.18s ease;
					letter-spacing: 0.02em;
				}
				.sb-logout:hover {
					background: #111; color: #fff;
					border-color: #111;
				}
				.sb-profile-btn {
					display: inline-flex; align-items: center;
					padding: 6px 18px; border-radius: 99px;
					font-size: 12px; font-weight: 600;
					color: #306073; background: rgba(48,96,115,0.09);
					border: 1px solid rgba(48,96,115,0.22);
					text-decoration: none; letter-spacing: 0.03em;
					transition: background 0.18s ease, color 0.18s ease;
				}
				.sb-profile-btn:hover {
					background: #306073; color: #fff;
				}
				@keyframes sbIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
				.sb-item { animation: sbIn 0.3s ease both; }
			`}</style>

			<div className="drawer-side z-10">
				<label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay" />

				<aside style={S.aside}>
					{/* ── Logo ── */}
					<Link to="/" style={S.logo}>
						<div style={S.logoBubble}>
							<FiShoppingCart size={16} color="#fff" />
						</div>
						<span style={S.logoText}>Lancer</span>
					</Link>

					{/* ── Accent divider ── */}
					<div style={S.accentLine} />

					{/* ── Profile ── */}
					<div style={S.profileBlock}>
						<div style={S.avatarRing}>
							<img
								src={user?.image || defaultImg}
								alt={user?.username}
								style={S.avatar}
								onError={(e) => {
									e.currentTarget.src = defaultImg;
								}}
							/>
						</div>
						<div style={S.profileMeta}>
							<p style={S.profileName}>{user?.username ?? "User"}</p>
							<span
								style={{
									...S.roleBadge,
									background: roleStyle.bg,
									color: roleStyle.color,
									border: `1px solid ${roleStyle.border}`,
								}}>
								{roleKey}
							</span>
							<Link to="profile" className="sb-profile-btn" style={{ marginTop: 6 }}>
								View Profile
							</Link>
						</div>
					</div>

					{/* ── Divider ── */}
					<div style={S.divider} />

					{/* ── Nav items ── */}
					<nav style={S.nav}>
						{menuItems.map((item, i) => {
							const isActive = location.pathname === item.to;
							return (
								<div key={i} className="sb-item" style={{ animationDelay: `${i * 35}ms` }}>
									<Link to={item.to} className={`sb-link${isActive ? " active" : ""}`}>
										<item.icon size={16} style={{ flexShrink: 0 }} />
										<span>{item.label}</span>
									</Link>
								</div>
							);
						})}
					</nav>

					{/* ── Bottom ── */}
					<div style={S.bottom}>
						<div style={S.divider} />
						<button className="sb-logout" onClick={handleLogout}>
							<AiOutlineLogout size={16} />
							Logout
						</button>
						<p style={S.footer}>© 2025 Lancer</p>
					</div>
				</aside>
			</div>
		</>
	);
};

/* ─── styles ─────────────────────────────────────────────────── */
const S = {
	aside: {
		width: "240px",
		minHeight: "100vh",
		background: "#ffffff",
		borderRight: "1px solid rgba(48,96,115,0.1)",
		display: "flex",
		flexDirection: "column",
		padding: "20px 14px",
		boxSizing: "border-box",
		boxShadow: "2px 0 16px rgba(48,96,115,0.06)",
	},

	/* logo */
	logo: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		textDecoration: "none",
		marginBottom: "4px",
		padding: "4px 4px",
	},
	logoBubble: {
		width: "32px",
		height: "32px",
		borderRadius: "9px",
		background: "#306073",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	logoText: {
		fontSize: "18px",
		fontWeight: 800,
		color: "#111",
		letterSpacing: "-0.02em",
		textTransform: "uppercase",
	},
	accentLine: {
		height: "2px",
		background: "linear-gradient(90deg, #306073 0%, #4a8fa6 50%, transparent 100%)",
		borderRadius: "99px",
		marginBottom: "18px",
		opacity: 0.5,
	},

	/* profile */
	profileBlock: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "10px",
		padding: "4px 0 14px",
	},
	avatarRing: {
		padding: "3px",
		borderRadius: "50%",
		background: "linear-gradient(135deg, #306073, #82c4d4)",
		display: "inline-block",
	},
	avatar: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		objectFit: "cover",
		display: "block",
		border: "2px solid #fff",
	},
	profileMeta: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "5px",
	},
	profileName: {
		fontSize: "14px",
		fontWeight: 700,
		color: "#111",
		letterSpacing: "-0.01em",
		margin: 0,
	},
	roleBadge: {
		display: "inline-block",
		fontSize: "10px",
		fontWeight: 600,
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		padding: "3px 10px",
		borderRadius: "99px",
	},

	divider: {
		height: "1px",
		background: "rgba(48,96,115,0.08)",
		margin: "4px 0 10px",
	},

	/* nav */
	nav: {
		display: "flex",
		flexDirection: "column",
		gap: "2px",
		flex: 1,
	},

	/* bottom */
	bottom: {
		display: "flex",
		flexDirection: "column",
		gap: "8px",
		marginTop: "auto",
		paddingTop: "10px",
	},
	footer: {
		fontSize: "11px",
		color: "#bbb",
		textAlign: "center",
		margin: "4px 0 0",
		letterSpacing: "0.04em",
	},
};

export default Sidebar;
