import { Link } from "react-router";
import useCategoriesContext from "../../hooks/useCategoriesContext";
import useAuthContext from "../../hooks/useAuthContext";

const CategoryCard = ({ category, onDelete }) => {
	const { deleteCategory } = useCategoriesContext();
	const { user } = useAuthContext();

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this Category?")) {
			await deleteCategory(category.id);
			if (onDelete) onDelete(category.id);
		}
	};

	if (!category) return null;

	const isStaff = user?.is_staff;

	return (
		<>
			<style>{`
				.cat-card {
					transition: transform 0.24s ease, box-shadow 0.24s ease;
				}
				.cat-card:hover {
					transform: translateY(-4px);
					box-shadow: 0 16px 40px rgba(48,96,115,0.16) !important;
				}
				.cat-card:hover .cat-accent {
					opacity: 1;
					transform: scaleX(1);
				}
				.cat-btn {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 8px 16px;
					font-size: 12px;
					font-weight: 600;
					letter-spacing: 0.04em;
					border-radius: 8px;
					border: none;
					cursor: pointer;
					transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
					text-decoration: none;
				}
				.cat-btn-edit {
					color: #306073;
					background: rgba(48,96,115,0.08);
					border: 1px solid rgba(48,96,115,0.2);
				}
				.cat-btn-edit:hover {
					background: #306073;
					color: #fff;
					border-color: #306073;
					box-shadow: 0 4px 14px rgba(48,96,115,0.3);
					transform: translateY(-1px);
				}
				.cat-btn-delete {
					color: #111;
					background: rgba(0,0,0,0.05);
					border: 1px solid rgba(0,0,0,0.12);
				}
				.cat-btn-delete:hover {
					background: #111;
					color: #fff;
					border-color: #111;
					box-shadow: 0 4px 14px rgba(0,0,0,0.2);
					transform: translateY(-1px);
				}
				.cat-btn:disabled {
					opacity: 0;
					pointer-events: none;
				}
				@keyframes catIn {
					from { opacity: 0; transform: translateY(10px); }
					to   { opacity: 1; transform: translateY(0); }
				}
				.cat-card { animation: catIn 0.38s ease both; }
			`}</style>

			<div className="cat-card" style={styles.card}>
				{/* top accent bar */}
				<div style={styles.accentBar} className="cat-accent" />

				{/* category index dot + name */}
				<div style={styles.header}>
					<div style={styles.iconDot}>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#fff"
							strokeWidth="2.5"
							strokeLinecap="round">
							<rect x="3" y="3" width="7" height="7" rx="1.5" />
							<rect x="14" y="3" width="7" height="7" rx="1.5" />
							<rect x="3" y="14" width="7" height="7" rx="1.5" />
							<rect x="14" y="14" width="7" height="7" rx="1.5" />
						</svg>
					</div>
					<span style={styles.categoryTag}>Category</span>
				</div>

				{/* name + description */}
				<div style={styles.body}>
					<h2 style={styles.name}>{category.name}</h2>
					<p style={styles.description}>{category.description}</p>
				</div>

				{/* divider */}
				<div style={styles.divider} />

				{/* actions */}
				{isStaff && (
					<div style={styles.actions}>
						<Link to={`/dashboard/categories/update/${category.id}`} style={{ textDecoration: "none" }}>
							<button className="cat-btn cat-btn-edit">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
								</svg>
								Edit
							</button>
						</Link>
						<button className="cat-btn cat-btn-delete" onClick={handleDelete}>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round">
								<polyline points="3 6 5 6 21 6" />
								<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
								<path d="M10 11v6m4-6v6" />
								<path d="M9 6V4h6v2" />
							</svg>
							Delete
						</button>
					</div>
				)}
			</div>
		</>
	);
};

const styles = {
	card: {
		position: "relative",
		background: "#ffffff",
		border: "1px solid rgba(48,96,115,0.1)",
		borderRadius: "16px",
		padding: "20px",
		height: "100%",
		boxSizing: "border-box",
		boxShadow: "0 2px 8px rgba(48,96,115,0.06)",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
	},
	accentBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: "3px",
		background: "linear-gradient(90deg, #306073 0%, #4a8fa6 55%, #82c4d4 100%)",
		opacity: 0.6,
		transform: "scaleX(0.6)",
		transformOrigin: "left",
		transition: "opacity 0.3s ease, transform 0.3s ease",
		borderRadius: "16px 16px 0 0",
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "16px",
	},
	iconDot: {
		width: "34px",
		height: "34px",
		borderRadius: "10px",
		background: "#306073",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	categoryTag: {
		fontSize: "10px",
		fontWeight: "600",
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		color: "#306073",
		background: "rgba(48,96,115,0.08)",
		border: "1px solid rgba(48,96,115,0.15)",
		padding: "3px 10px",
		borderRadius: "99px",
	},
	body: {
		flex: 1,
		marginBottom: "16px",
	},
	name: {
		fontSize: "16px",
		fontWeight: "700",
		color: "#111111",
		letterSpacing: "-0.02em",
		margin: "0 0 8px",
		lineHeight: 1.25,
	},
	description: {
		fontSize: "13px",
		color: "#777",
		lineHeight: 1.65,
		margin: 0,
	},
	divider: {
		height: "1px",
		background: "rgba(48,96,115,0.07)",
		marginBottom: "14px",
	},
	actions: {
		display: "flex",
		gap: "8px",
		flexWrap: "wrap",
	},
};

export default CategoryCard;
