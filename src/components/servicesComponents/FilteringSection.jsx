import React, { useState, useEffect, useRef } from "react";
import Filters from "./Filters";

const FilteringSection = ({
	priceRange,
	handlePriceChange,
	categories,
	selectedCategory,
	handleCategoryChange,
	handleSearchQuery,
	searchQuery,
	sortOrder,
	handleSorting,
	onReset
}) => {
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const drawerRef = useRef(null);
	const overlayRef = useRef(null);

	// Close drawer on outside click
	useEffect(() => {
		const handleClick = (e) => {
			if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	// Lock body scroll when drawer open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const onSearch = (val) => {
		handleSearchQuery(val);
		setHasValue(val.length > 0);
	};

	if (!categories) return null;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

				/* ── Root vars ── */
				.fs-root {
					--teal: #306073;
					--teal-light: rgba(48, 96, 115, 0.08);
					--teal-mid: rgba(48, 96, 115, 0.18);
					--teal-glow: rgba(48, 96, 115, 0.25);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--white: #ffffff;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Toolbar bar ── */
				.fs-toolbar {
					display: flex;
					align-items: center;
					gap: 16px;
					background: #ffffff;
					border: 1px solid var(--border);
					border-radius: 16px;
					padding: 12px 16px;
					box-shadow: 0 2px 16px rgba(0,0,0,0.05);
					position: relative;
					z-index: 10;
				}

				/* ── Filter toggle button ── */
				.fs-filter-btn {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					padding: 9px 18px;
					border-radius: 10px;
					background: var(--teal-light);
					color: var(--teal);
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 500;
					cursor: pointer;
					transition: all 0.22s ease;
					white-space: nowrap;
					flex-shrink: 0;
					position: relative;
					overflow: hidden;
				}

				.fs-filter-btn::before {
					content: '';
					position: absolute;
					inset: 0;
					background: var(--teal);
					opacity: 0;
					transition: opacity 0.22s ease;
				}

				.fs-filter-btn:hover::before,
				.fs-filter-btn.active::before {
					opacity: 1;
				}

				.fs-filter-btn:hover,
				.fs-filter-btn.active {
					color: #ffffff;
					border-color: var(--teal);
					box-shadow: 0 4px 16px var(--teal-glow);
				}

				.fs-filter-btn span,
				.fs-filter-btn svg {
					position: relative;
					z-index: 1;
				}

				.fs-filter-btn .fs-badge {
					position: relative;
					z-index: 1;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					background: rgba(255,255,255,0.25);
					font-size: 10px;
					font-weight: 700;
					line-height: 1;
					transition: background 0.22s ease;
				}

				.fs-filter-btn:not(.active) .fs-badge {
					background: var(--teal);
					color: #ffffff;
				}

				/* Filter icon bars animation */
				.fs-icon-bar {
					transition: transform 0.3s ease;
				}
				.fs-filter-btn.active .fs-icon-bar-1 { transform: rotate(45deg) translate(3px, 3px); }
				.fs-filter-btn.active .fs-icon-bar-2 { transform: scaleX(0); }
				.fs-filter-btn.active .fs-icon-bar-3 { transform: rotate(-45deg) translate(3px, -3px); }

				/* ── Divider ── */
				.fs-divider {
					width: 1px;
					height: 28px;
					background: var(--border);
					flex-shrink: 0;
				}

				/* ── Search wrapper ── */
				.fs-search-wrap {
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;
				}

				.fs-search-icon {
					position: absolute;
					left: 14px;
					color: var(--muted);
					transition: color 0.2s ease;
					pointer-events: none;
					flex-shrink: 0;
				}

				.fs-search-wrap.focused .fs-search-icon {
					color: var(--teal);
				}

				.fs-search-input {
					width: 100%;
					padding: 10px 40px 10px 42px;
					border-radius: 10px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 14px;
					font-weight: 400;
					color: var(--ink);
					outline: none;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
					box-sizing: border-box;
				}

				.fs-search-input::placeholder {
					color: #a0b4bc;
					font-weight: 300;
				}

				.fs-search-input:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.fs-clear-btn {
					position: absolute;
					right: 12px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 22px;
					height: 22px;
					border-radius: 50%;
					background: #dde5e9;
					border: none;
					cursor: pointer;
					color: #6b7c85;
					padding: 0;
					transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
					opacity: 0;
					pointer-events: none;
					transform: scale(0.7);
				}

				.fs-clear-btn.visible {
					opacity: 1;
					pointer-events: auto;
					transform: scale(1);
				}

				.fs-clear-btn:hover {
					background: var(--teal);
					color: #ffffff;
				}

				/* ── Overlay ── */
				.fs-overlay {
					position: fixed;
					inset: 0;
					background: rgba(14, 26, 32, 0.45);
					backdrop-filter: blur(3px);
					z-index: 39;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.3s ease;
				}

				.fs-overlay.visible {
					opacity: 1;
					pointer-events: auto;
				}

				/* ── Drawer ── */
				.fs-drawer {
					position: fixed;
					top: 0;
					left: 0;
					height: 100vh;
					width: 300px;
					max-width: 88vw;
					background: #ffffff;
					z-index: 40;
					display: flex;
					flex-direction: column;
					transform: translateX(-100%);
					transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 8px 0 48px rgba(0,0,0,0.14);
				}

				.fs-drawer.open {
					transform: translateX(0);
				}

				/* Drawer header */
				.fs-drawer-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 22px 22px 18px;
					border-bottom: 1px solid var(--border);
					flex-shrink: 0;
				}

				.fs-drawer-title {
					font-family: 'Syne', sans-serif;
					font-size: 18px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					display: flex;
					align-items: center;
					gap: 10px;
				}

				.fs-drawer-title-dot {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: var(--teal);
				}

				.fs-drawer-close {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 34px;
					height: 34px;
					border-radius: 8px;
					border: 1.5px solid var(--border);
					background: transparent;
					cursor: pointer;
					color: var(--muted);
					transition: all 0.2s ease;
					padding: 0;
				}

				.fs-drawer-close:hover {
					background: var(--teal);
					border-color: var(--teal);
					color: #ffffff;
					transform: rotate(90deg);
				}

				/* Drawer body */
				.fs-drawer-body {
					flex: 1;
					overflow-y: auto;
					padding: 20px;
					scrollbar-width: thin;
					scrollbar-color: var(--teal-mid) transparent;
				}

				.fs-drawer-body::-webkit-scrollbar { width: 4px; }
				.fs-drawer-body::-webkit-scrollbar-thumb { background: var(--teal-mid); border-radius: 4px; }

				/* Drawer footer */
				.fs-drawer-footer {
					padding: 16px 20px;
					border-top: 1px solid var(--border);
					flex-shrink: 0;
				}

				.fs-apply-btn {
					width: 100%;
					padding: 12px;
					border-radius: 10px;
					border: none;
					background: var(--teal);
					color: #ffffff;
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					letter-spacing: 0.03em;
					cursor: pointer;
					transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
				}

				.fs-apply-btn:hover {
					background: #3d7a91;
					transform: translateY(-1px);
					box-shadow: 0 6px 20px var(--teal-glow);
				}

				.fs-apply-btn:active {
					transform: translateY(0);
				}

				/* ── Active filters strip ── */
				.fs-active-strip {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
					margin-top: 10px;
					padding: 0 2px;
					min-height: 0;
					max-height: 0;
					overflow: hidden;
					transition: max-height 0.3s ease, margin-top 0.3s ease;
				}

				.fs-active-strip.has-filters {
					max-height: 80px;
				}

				.fs-active-label {
					font-size: 11px;
					font-weight: 500;
					color: var(--muted);
					letter-spacing: 0.06em;
					text-transform: uppercase;
					flex-shrink: 0;
				}

				.fs-chip {
					display: inline-flex;
					align-items: center;
					gap: 5px;
					font-size: 12px;
					font-weight: 500;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 3px 10px 3px 10px;
					border-radius: 100px;
					animation: chip-pop 0.2s ease both;
				}

				@keyframes chip-pop {
					from { opacity: 0; transform: scale(0.8); }
					to   { opacity: 1; transform: scale(1); }
				}
			`}</style>

			<div className="fs-root">
				{/* Overlay */}
				<div
					ref={overlayRef}
					className={`fs-overlay ${open ? "visible" : ""}`}
					onClick={() => setOpen(false)}
				/>

				{/* Drawer */}
				<div ref={drawerRef} className={`fs-drawer ${open ? "open" : ""}`}>
					<div className="fs-drawer-header">
						<div className="fs-drawer-title">
							<span className="fs-drawer-title-dot" />
							Filters
						</div>
						<button className="fs-drawer-close" onClick={() => setOpen(false)} aria-label="Close filters">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					<div className="fs-drawer-body">
						<Filters
							priceRange={priceRange}
							handlePriceChange={handlePriceChange}
							selectedCategory={selectedCategory}
							handleCategoryChange={handleCategoryChange}
							sortOrder={sortOrder}
							handleSorting={handleSorting}
							categories={categories}
							open={open}
							onReset={onReset}
						/>
					</div>

					<div className="fs-drawer-footer">
						<button className="fs-apply-btn" onClick={() => setOpen(false)}>
							Apply Filters
						</button>
					</div>
				</div>

				{/* Toolbar */}
				<div className="fs-toolbar">
					{/* Filter toggle */}
					<button
						className={`fs-filter-btn ${open ? "active" : ""}`}
						onClick={() => setOpen((p) => !p)}
						aria-expanded={open}>
						{/* Animated icon */}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<rect
								className="fs-icon-bar fs-icon-bar-1"
								x="2"
								y="3.5"
								width="12"
								height="1.5"
								rx="0.75"
								fill="currentColor"
							/>
							<rect
								className="fs-icon-bar fs-icon-bar-2"
								x="4"
								y="7.25"
								width="8"
								height="1.5"
								rx="0.75"
								fill="currentColor"
							/>
							<rect
								className="fs-icon-bar fs-icon-bar-3"
								x="6"
								y="11"
								width="4"
								height="1.5"
								rx="0.75"
								fill="currentColor"
							/>
						</svg>
						<span>Filters</span>
						{selectedCategory && <span className="fs-badge">1</span>}
					</button>

					<div className="fs-divider" />

					{/* Search */}
					<div className={`fs-search-wrap ${focused ? "focused" : ""}`}>
						<svg
							className="fs-search-icon"
							width="16"
							height="16"
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
							value={searchQuery}
							onChange={(e) => onSearch(e.target.value)}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							placeholder="Search services, categories…"
							className="fs-search-input"
						/>
						<button
							className={`fs-clear-btn ${hasValue ? "visible" : ""}`}
							onClick={() => onSearch("")}
							tabIndex={hasValue ? 0 : -1}
							aria-label="Clear search">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>
				</div>

				{/* Active filters strip */}
				<div className={`fs-active-strip ${selectedCategory || sortOrder ? "has-filters" : ""}`}>
					<span className="fs-active-label">Active:</span>
					{selectedCategory && (
						<span className="fs-chip">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
							</svg>
							{selectedCategory}
						</span>
					)}
					{sortOrder && (
						<span className="fs-chip">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="12" y1="20" x2="12" y2="10" />
								<line x1="18" y1="20" x2="18" y2="4" />
								<line x1="6" y1="20" x2="6" y2="16" />
							</svg>
							{sortOrder}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default FilteringSection;
