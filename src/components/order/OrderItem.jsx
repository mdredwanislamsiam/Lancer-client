import React from "react";
import defaultImg from "../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";
import { BiCalendar, BiUser } from "react-icons/bi";

const OrderItem = ({ item }) => {
	const getTime = () => {
		const d = new Date(item.created_at);
		return `${d.getDate()} ${d.toLocaleString("en-US", { month: "long" })}, ${d.getFullYear()}`;
	};

	return (
		<>
			<style>{`
				.oi-link { text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; align-items: center; }
				.oi-link:hover { transform: translateY(-1px); }
				.oi-person:hover { box-shadow: 0 6px 18px rgba(48,96,115,0.14) !important; }
				.oi-service:hover .oi-service-img { box-shadow: 0 4px 16px rgba(48,96,115,0.18) !important; }
			`}</style>

			<div style={S.root}>
				{/* ── Service row ── */}
				<div style={S.mainRow}>
					{/* Service thumbnail + title */}
					<Link to={`/services/${item.service.id}`} className="oi-link oi-service" style={S.serviceLink}>
						<div style={S.imgWrap} className="oi-service-img">
							<img
								src={item.service?.images?.[0]?.image || defaultImg}
								alt={item.service.title}
								style={S.img}
							/>
						</div>
						<div style={S.serviceMeta}>
							<span style={S.serviceTag}>Service</span>
							<p style={S.serviceTitle}>{item.service.title}</p>
						</div>
					</Link>

					{/* Seller + Buyer */}
					<div style={S.personsRow}>
						<PersonChip
							label="Seller"
							to={`/infoPage/${item.service.seller.id}`}
							image={item.service.seller.image}
							name={item.service.seller.username}
						/>
						<div style={S.personDivider} />
						<PersonChip
							label="Buyer"
							to={`/infoPage/${item.buyer.id}`}
							image={item.buyer.image}
							name={item.buyer.username}
						/>
					</div>
				</div>

				{/* ── Date row ── */}
				<div style={S.dateRow}>
					<div style={S.dateIcon}>
						<BiCalendar size={13} color="#306073" />
					</div>
					<span style={S.dateLabel}>Ordered at</span>
					<span style={S.dateSep}>·</span>
					<span style={S.dateValue}>{getTime()}</span>
				</div>
			</div>
		</>
	);
};

/* ─── Person chip sub-component ─────────────────────────────── */
const PersonChip = ({ label, to, image, name }) => (
	<div style={PC.wrap}>
		<div style={PC.labelRow}>
			<BiUser size={11} color="#306073" />
			<span style={PC.labelText}>{label}</span>
		</div>
		<Link to={to} className="oi-link oi-person" style={PC.chip}>
			<img
				src={image || ""}
				alt={name}
				onError={(e) => {
					e.currentTarget.style.display = "none";
				}}
				style={PC.avatar}
			/>
			<span style={PC.name}>{name}</span>
		</Link>
	</div>
);

/* ─── styles ─────────────────────────────────────────────────── */
const S = {
	root: {
		display: "flex",
		flexDirection: "column",
		gap: "12px",
	},
	mainRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		gap: "14px",
	},

	/* service */
	serviceLink: {
		gap: "12px",
		flex: "1 1 180px",
		minWidth: 0,
	},
	imgWrap: {
		width: "56px",
		height: "48px",
		borderRadius: "10px",
		overflow: "hidden",
		flexShrink: 0,
		background: "rgba(48,96,115,0.06)",
		border: "1px solid rgba(48,96,115,0.1)",
		transition: "box-shadow 0.2s ease",
	},
	img: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		display: "block",
	},
	serviceMeta: {
		display: "flex",
		flexDirection: "column",
		minWidth: 0,
	},
	serviceTag: {
		fontSize: "10px",
		fontWeight: 600,
		letterSpacing: "0.09em",
		textTransform: "uppercase",
		color: "#306073",
		marginBottom: "3px",
	},
	serviceTitle: {
		fontSize: "13px",
		fontWeight: 700,
		color: "#111",
		margin: 0,
		lineHeight: 1.3,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},

	/* persons */
	personsRow: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		flexShrink: 0,
	},
	personDivider: {
		width: "1px",
		height: "36px",
		background: "rgba(48,96,115,0.1)",
	},

	/* date */
	dateRow: {
		display: "flex",
		alignItems: "center",
		gap: "6px",
		paddingTop: "10px",
		borderTop: "1px solid rgba(48,96,115,0.07)",
	},
	dateIcon: {
		width: "24px",
		height: "24px",
		borderRadius: "6px",
		background: "rgba(48,96,115,0.08)",
		border: "1px solid rgba(48,96,115,0.13)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	dateLabel: {
		fontSize: "11px",
		fontWeight: 600,
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		color: "#888",
	},
	dateSep: {
		fontSize: "11px",
		color: "#ccc",
	},
	dateValue: {
		fontSize: "12px",
		fontWeight: 600,
		color: "#306073",
	},
};

const PC = {
	wrap: {
		display: "flex",
		flexDirection: "column",
		gap: "4px",
	},
	labelRow: {
		display: "flex",
		alignItems: "center",
		gap: "4px",
	},
	labelText: {
		fontSize: "10px",
		fontWeight: 600,
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		color: "#306073",
	},
	chip: {
		display: "flex",
		alignItems: "center",
		gap: "7px",
		padding: "5px 10px",
		background: "#ffffff",
		border: "1px solid rgba(48,96,115,0.1)",
		borderRadius: "8px",
		boxShadow: "0 1px 4px rgba(48,96,115,0.06)",
		transition: "box-shadow 0.2s ease, transform 0.2s ease",
	},
	avatar: {
		width: "24px",
		height: "24px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "1.5px solid rgba(48,96,115,0.2)",
		flexShrink: 0,
		background: "rgba(48,96,115,0.06)",
	},
	name: {
		fontSize: "12px",
		fontWeight: 600,
		color: "#111",
		whiteSpace: "nowrap",
	},
};

export default OrderItem;
