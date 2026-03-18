import { useEffect, useState } from "react";
import ServicePagination from "../components/servicesComponents/ServicePagination";
import MyFilterSection from "../components/servicesComponents/MyFilterSection";
import MyServiceList from "../components/servicesComponents/MyServiceList";
import useServiceContext from "../hooks/useServiceContext";
import useCategoriesContext from "../hooks/useCategoriesContext";

const MyServices = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [sortOrder, setSortOrder] = useState("");
	const [mounted, setMounted] = useState(false);

	const { myServices, loading, totalPages, fetchMyServices, setMyServices } = useServiceContext();
	const { categories } = useCategoriesContext();

	useEffect(() => {
		fetchMyServices(currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder);
	}, [currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1);
		}, 2000);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		setTimeout(() => setMounted(true), 80);
	}, []);

	const handleDelete = (id) => {
		setMyServices(myServices.filter((s) => s.id !== id));
	};

	const handlePriceChange = (index, value) => {
		setPriceRange((prev) => {
			const next = [...prev];
			next[index] = value;
			return next;
		});
		setCurrentPage(1);
	};

	if (!categories || !myServices) return null;

	const serviceCount = myServices?.length ?? 0;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Figtree:wght@300;400;500;600&display=swap');

				.ms-root {
					font-family: 'Figtree', sans-serif;
					min-height: 100vh;
					position: relative;
				}

				/* dot texture */
				.ms-root::before {
					content: '';
					position: fixed;
					inset: 0;
					background-image: radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px);
					background-size: 30px 30px;
					pointer-events: none;
					z-index: 0;
				}

				/* ── hero header ── */
				.ms-hero {
					position: relative;
					z-index: 1;
					background: #0d0d0d;
					padding: 0 clamp(20px, 5vw, 64px);
					overflow: hidden;
				}
				.ms-hero::before {
					content: '';
					position: absolute;
					top: -60px; right: -60px;
					width: 300px; height: 300px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.18) 0%, transparent 70%);
					pointer-events: none;
				}
				/* teal bottom border */
				.ms-hero::after {
					content: '';
					position: absolute;
					bottom: 0; left: 0; right: 0;
					height: 2px;
					background: linear-gradient(90deg, #306073, #59b3cc 40%, transparent 80%);
				}

				.ms-hero-inner {
					max-width: 1280px;
					margin: 0 auto;
					padding: 32px 0 28px;
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					gap: 24px;
					flex-wrap: wrap;
				}

				.ms-title-eyebrow {
					font-size: 10px;
					font-weight: 600;
					letter-spacing: 0.22em;
					text-transform: uppercase;
					color: #306073;
					margin-bottom: 8px;
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.ms-title-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
					animation: msPulse 2s infinite;
				}
				@keyframes msPulse {
					0%,100% { opacity:1; transform:scale(1); }
					50%     { opacity:0.35; transform:scale(0.65); }
				}

				.ms-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(28px, 4vw, 46px);
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #ffffff;
					line-height: 1;
				}
				.ms-title-accent { color: #306073; }

				/* stats chips in header */
				.ms-stats {
					display: flex;
					gap: 10px;
					flex-wrap: wrap;
					align-items: center;
				}
				.ms-stat-chip {
					display: inline-flex;
					flex-direction: column;
					align-items: center;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.07);
					border-radius: 14px;
					padding: 10px 18px;
					min-width: 80px;
					transition: border-color 0.2s, background 0.2s;
				}
				.ms-stat-chip:hover {
					border-color: rgba(48,96,115,0.35);
					background: rgba(48,96,115,0.07);
				}
				.ms-stat-val {
					font-family: 'Syne', sans-serif;
					font-size: 22px;
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #fff;
					line-height: 1;
					margin-bottom: 2px;
				}
				.ms-stat-label {
					font-size: 9px;
					font-weight: 600;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.3);
				}
				.ms-stat-chip.ms-stat-teal .ms-stat-val { color: #306073; }

				/* ── main body ── */
				.ms-body {
					position: relative;
					z-index: 1;
					max-width: 1280px;
					margin: 0 auto;
					padding: clamp(24px, 4vw, 48px) clamp(20px, 5vw, 64px);
					opacity: 0;
					transform: translateY(16px);
					transition: opacity 0.5s ease, transform 0.5s ease;
				}
				.ms-body.ms-mounted {
					opacity: 1;
					transform: translateY(0);
				}

				/* filter card */
				.ms-filter-wrap {
					background: #ffffff;
					border: 1px solid rgba(0,0,0,0.06);
					border-radius: 20px;
					padding: 24px 28px;
					margin-bottom: 28px;
					box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.04);
					position: relative;
					overflow: hidden;
					transition: box-shadow 0.25s ease;
				}
				.ms-filter-wrap::before {
					content: '';
					position: absolute;
					top: 0; left: 0; right: 0;
					height: 2px;
					background: linear-gradient(90deg, #306073, transparent 60%);
				}
				.ms-filter-wrap:hover {
					box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.06);
				}

				/* list card */
				.ms-list-wrap {
					padding: 24px 28px;
					margin-bottom: 28px;

					min-height: 200px;
					opacity: 0;
					transform: translateY(12px);
					transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s, box-shadow 0.25s ease;
				}
				.ms-list-wrap.ms-mounted {
					opacity: 1;
					transform: translateY(0);
				}
				

				/* list header row */
				.ms-list-head {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20px;
					padding-bottom: 16px;
					border-bottom: 1px solid rgba(0,0,0,0.05);
					gap: 12px;
					flex-wrap: wrap;
				}
				.ms-list-title {
					font-family: 'Syne', sans-serif;
					font-size: 15px;
					font-weight: 800;
					letter-spacing: -0.02em;
					color: #0d0d0d;
				}
				.ms-count-badge {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 11px;
					font-weight: 600;
					letter-spacing: 0.08em;
					color: #306073;
					background: rgba(48,96,115,0.07);
					border: 1px solid rgba(48,96,115,0.2);
					border-radius: 100px;
					padding: 4px 12px;
				}

				/* pagination wrap */
				.ms-pagination-wrap {
					opacity: 0;
					transform: translateY(10px);
					transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
				}
				.ms-pagination-wrap.ms-mounted {
					opacity: 1;
					transform: translateY(0);
				}

				/* ── responsive ── */
				@media (max-width: 768px) {
					.ms-hero-inner { padding: 24px 0 20px; flex-direction: column; align-items: flex-start; }
					.ms-filter-wrap, .ms-list-wrap { padding: 18px 20px; border-radius: 16px; }
					.ms-stats { gap: 8px; }
				}

				@media (max-width: 480px) {
					.ms-filter-wrap, .ms-list-wrap { padding: 16px; border-radius: 14px; }
					.ms-stat-chip { padding: 8px 12px; min-width: 64px; }
					.ms-stat-val  { font-size: 18px; }
				}
			`}</style>

			<div className="ms-root">
				{/* ── HERO HEADER ── */}
				<div className="ms-hero">
					<div className="ms-hero-inner">
						<div>
							<div className="ms-title-eyebrow">
								<span className="ms-title-dot" />
								Dashboard
							</div>
							<h1 className="ms-title">
								My <span className="ms-title-accent">Services</span>
							</h1>
						</div>

						{/* Stats */}
						<div className="ms-stats">
							<div className="ms-stat-chip ms-stat-teal">
								<span className="ms-stat-val">{serviceCount}</span>
								<span className="ms-stat-label">Listed</span>
							</div>
							<div className="ms-stat-chip">
								<span className="ms-stat-val">{totalPages}</span>
								<span className="ms-stat-label">Pages</span>
							</div>
							<div className="ms-stat-chip">
								<span className="ms-stat-val">{currentPage}</span>
								<span className="ms-stat-label">Current</span>
							</div>
						</div>
					</div>
				</div>

				{/* ── BODY ── */}
				<div className={`ms-body${mounted ? " ms-mounted" : ""}`}>
					{/* Filters */}
					<div className="ms-filter-wrap">
						<MyFilterSection
							priceRange={priceRange}
							handlePriceChange={handlePriceChange}
							categories={categories}
							selectedCategory={selectedCategory}
							handleCategoryChange={setSelectedCategory}
							searchQuery={searchQuery}
							handleSearchQuery={setSearchQuery}
							sortOrder={sortOrder}
							handleSorting={setSortOrder}
						/>
					</div>

					{/* Service list */}
					<div className={`ms-list-wrap${mounted ? " ms-mounted" : ""}`}>
						<div className="ms-list-head">
							<span className="ms-list-title">Results</span>
							<span className="ms-count-badge">
								<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
									<circle cx="5" cy="5" r="4" stroke="#306073" strokeWidth="1.2" />
									<path d="M5 3v2.5l1.5 1" stroke="#306073" strokeWidth="1.2" strokeLinecap="round" />
								</svg>
								{serviceCount} service{serviceCount !== 1 ? "s" : ""}
							</span>
						</div>
						<MyServiceList services={myServices} loading={loading} onDelete={handleDelete} />
					</div>

					{/* Pagination */}
					<div className={`ms-pagination-wrap${mounted ? " ms-mounted" : ""}`}>
						<ServicePagination
							totalPages={totalPages}
							currentPage={currentPage}
							handlePageChange={setCurrentPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyServices;
