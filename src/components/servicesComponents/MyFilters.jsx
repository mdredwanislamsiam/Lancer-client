import React, { useState } from "react";

const MyFilters = ({
	priceRange,
	handlePriceChange,
	categories,
	selectedCategory,
	handleCategoryChange,
	sortOrder,
	handleSorting,
	handleSearchQuery,
	searchQuery,
}) => {
	const [searchFocused, setSearchFocused] = useState(false);
	const [hasSearch, setHasSearch] = useState(false);

	const onSearch = (val) => {
		handleSearchQuery(val);
		setHasSearch(val.length > 0);
	};

	const MAX_PRICE = 10000;
	const minPct = (priceRange[0] / MAX_PRICE) * 100;
	const maxPct = (priceRange[1] / MAX_PRICE) * 100;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

				.mf-root {
					--teal: #306073;
					--teal-light: rgba(48,96,115,0.07);
					--teal-mid: rgba(48,96,115,0.18);
					--teal-glow: rgba(48,96,115,0.2);
					--ink: #0e1a20;
					--muted: #6b7c85;
					--border: #e0e8ec;
					--surface: #f7fafb;
					font-family: 'DM Sans', sans-serif;
				}

				/* ── Shell ── */
				.mf-shell {
					background: #ffffff;
					border-radius: 18px;
					overflow: hidden;
					animation: mf-in 0.45s ease both;
				}

				@keyframes mf-in {
					from { opacity: 0; transform: translateY(12px); }
					to   { opacity: 1; transform: translateY(0); }
				}

				/* ── Header bar ── */
				.mf-header {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 14px 20px 12px;
					border-bottom: 1px solid var(--border);
					background: var(--surface);
				}

				.mf-header-icon {
					display: flex; align-items: center; justify-content: center;
					width: 30px; height: 30px;
					border-radius: 8px;
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					color: var(--teal);
					flex-shrink: 0;
				}

				.mf-header-title {
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.01em;
					margin: 0;
				}

				/* ── Grid of filter blocks ── */
				.mf-grid {
					display: grid;
					grid-template-columns: 1fr 1.8fr 1fr 1fr;
					gap: 0;
				}

				@media (max-width: 1024px) {
					.mf-grid { grid-template-columns: 1fr 1fr; }
					.mf-block:nth-child(2) { border-right: none; border-bottom: 1px solid var(--border); }
				}

				@media (max-width: 600px) {
					.mf-grid { grid-template-columns: 1fr; }
					.mf-block { border-right: none !important; border-bottom: 1px solid var(--border); }
					.mf-block:last-child { border-bottom: none; }
				}

				/* ── Individual filter block ── */
				.mf-block {
					padding: 18px 20px;
					border-right: 1px solid var(--border);
					display: flex;
					flex-direction: column;
					gap: 10px;
				}

				.mf-block:last-child { border-right: none; }

				/* ── Label ── */
				.mf-label {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: var(--muted);
				}

				.mf-label-icon { color: var(--teal); display: flex; align-items: center; }

				/* ── Search input ── */
				.mf-search-wrap {
					position: relative;
					display: flex;
					align-items: center;
				}

				.mf-search-icon {
					position: absolute;
					left: 11px;
					color: var(--muted);
					pointer-events: none;
					transition: color 0.2s ease;
				}

				.mf-search-wrap.focused .mf-search-icon { color: var(--teal); }

				.mf-input {
					width: 100%;
					padding: 9px 36px 9px 34px;
					border-radius: 9px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 400;
					color: var(--ink);
					outline: none;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
					box-sizing: border-box;
				}

				.mf-input::placeholder { color: #a8bbc3; font-weight: 300; }

				.mf-input:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.mf-clear-btn {
					position: absolute;
					right: 10px;
					width: 18px; height: 18px;
					border-radius: 50%;
					background: #dde5e9;
					border: none;
					cursor: pointer;
					color: #6b7c85;
					display: flex; align-items: center; justify-content: center;
					padding: 0;
					opacity: 0;
					pointer-events: none;
					transform: scale(0.6);
					transition: all 0.18s ease;
				}

				.mf-clear-btn.show {
					opacity: 1; pointer-events: auto; transform: scale(1);
				}

				.mf-clear-btn:hover { background: var(--teal); color: #fff; }

				/* ── Price range ── */
				.mf-price-display {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 8px;
				}

				.mf-price-val {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 2px;
					flex: 1;
				}

				.mf-price-tag {
					font-size: 10px;
					font-weight: 500;
					color: var(--muted);
					letter-spacing: 0.06em;
					text-transform: uppercase;
				}

				.mf-price-num {
					font-family: 'Syne', sans-serif;
					font-size: 17px;
					font-weight: 800;
					color: var(--ink);
					letter-spacing: -0.02em;
					line-height: 1;
				}

				.mf-price-dash {
					font-size: 13px;
					color: var(--border);
					font-weight: 300;
					align-self: flex-end;
					padding-bottom: 2px;
				}

				/* Dual range track */
				.mf-track-wrap {
					position: relative;
					height: 24px;
					display: flex;
					align-items: center;
				}

				.mf-track-bg {
					position: absolute;
					left: 0; right: 0;
					height: 4px;
					border-radius: 4px;
					background: #e0e8ec;
				}

				.mf-track-fill {
					position: absolute;
					height: 4px;
					border-radius: 4px;
					background: var(--teal);
					transition: left 0.05s, right 0.05s;
				}

				.mf-range {
					position: absolute;
					width: 100%;
					height: 4px;
					-webkit-appearance: none;
					appearance: none;
					background: transparent;
					outline: none;
					pointer-events: none;
					margin: 0;
				}

				.mf-range::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					width: 18px; height: 18px;
					border-radius: 50%;
					background: #ffffff;
					border: 2.5px solid var(--teal);
					box-shadow: 0 2px 8px var(--teal-glow);
					cursor: pointer;
					pointer-events: all;
					transition: transform 0.15s ease, box-shadow 0.15s ease;
				}

				.mf-range::-moz-range-thumb {
					width: 18px; height: 18px;
					border-radius: 50%;
					background: #ffffff;
					border: 2.5px solid var(--teal);
					box-shadow: 0 2px 8px var(--teal-glow);
					cursor: pointer;
					pointer-events: all;
				}

				.mf-range:hover::-webkit-slider-thumb,
				.mf-range:focus::-webkit-slider-thumb {
					transform: scale(1.2);
					box-shadow: 0 0 0 4px var(--teal-light), 0 2px 8px var(--teal-glow);
				}

				/* ── Select ── */
				.mf-select {
					width: 100%;
					padding: 9px 32px 9px 12px;
					border-radius: 9px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 400;
					color: var(--ink);
					outline: none;
					appearance: none;
					-webkit-appearance: none;
					background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23306073' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
					background-repeat: no-repeat;
					background-position: right 12px center;
					cursor: pointer;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
					box-sizing: border-box;
				}

				.mf-select:focus {
					border-color: var(--teal);
					background-color: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				/* Active chip under a select */
				.mf-active-chip {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					font-size: 11px;
					font-weight: 500;
					color: var(--teal);
					background: var(--teal-light);
					border: 1px solid var(--teal-mid);
					padding: 2px 8px;
					border-radius: 100px;
					transition: opacity 0.2s ease;
					max-width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				/* Number inputs for price */
				.mf-price-inputs {
					display: flex;
					gap: 8px;
					align-items: center;
				}

				.mf-price-input {
					flex: 1;
					padding: 7px 10px;
					border-radius: 8px;
					border: 1.5px solid var(--border);
					background: var(--surface);
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					color: var(--ink);
					outline: none;
					text-align: center;
					transition: border-color 0.2s ease, box-shadow 0.2s ease;
					box-sizing: border-box;
					width: 0; /* let flex handle it */
					min-width: 0;
				}

				.mf-price-input:focus {
					border-color: var(--teal);
					background: #ffffff;
					box-shadow: 0 0 0 3px var(--teal-light);
				}

				.mf-price-sep {
					font-size: 13px;
					color: var(--border);
					flex-shrink: 0;
				}
			`}</style>

			<div className="mf-root">
				<div className="mf-shell">
					{/* Header */}
					<div className="mf-header">
						<div className="mf-header-icon">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="4" y1="6" x2="20" y2="6" />
								<line x1="8" y1="12" x2="16" y2="12" />
								<line x1="11" y1="18" x2="13" y2="18" />
							</svg>
						</div>
						<h3 className="mf-header-title">Filters & Search</h3>
					</div>

					{/* Grid */}
					<div className="mf-grid">
						{/* ── Search ── */}
						<div className="mf-block">
							<span className="mf-label">
								<span className="mf-label-icon">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="11" cy="11" r="8" />
										<line x1="21" y1="21" x2="16.65" y2="16.65" />
									</svg>
								</span>
								Search
							</span>
							<div className={`mf-search-wrap ${searchFocused ? "focused" : ""}`}>
								<svg
									className="mf-search-icon"
									width="13"
									height="13"
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
									onFocus={() => setSearchFocused(true)}
									onBlur={() => setSearchFocused(false)}
									placeholder="Search services…"
									className="mf-input"
								/>
								<button
									className={`mf-clear-btn ${hasSearch ? "show" : ""}`}
									onClick={() => onSearch("")}
									tabIndex={hasSearch ? 0 : -1}
									type="button">
									<svg
										width="8"
										height="8"
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

						{/* ── Price Range ── */}
						<div className="mf-block">
							<span className="mf-label">
								<span className="mf-label-icon">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<line x1="12" y1="1" x2="12" y2="23" />
										<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
									</svg>
								</span>
								Price Range
							</span>

							{/* Big price display */}
							<div className="mf-price-display">
								<div className="mf-price-val">
									<span className="mf-price-tag">Min</span>
									<span className="mf-price-num">${priceRange[0]}</span>
								</div>
								<span className="mf-price-dash">–</span>
								<div className="mf-price-val">
									<span className="mf-price-tag">Max</span>
									<span className="mf-price-num">${priceRange[1]}</span>
								</div>
							</div>

							{/* Dual range slider */}
							<div className="mf-track-wrap">
								<div className="mf-track-bg" />
								<div
									className="mf-track-fill"
									style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
								/>
								<input
									type="range"
									min="0"
									max={priceRange[1]}
									step="10"
									value={priceRange[0]}
									onChange={(e) => handlePriceChange(0, Number(e.target.value))}
									className="mf-range"
								/>
								<input
									type="range"
									min={priceRange[0]}
									max={MAX_PRICE}
									step="10"
									value={priceRange[1]}
									onChange={(e) => handlePriceChange(1, Number(e.target.value))}
									className="mf-range"
								/>
							</div>

							{/* Manual number inputs */}
							<div className="mf-price-inputs">
								<input
									type="number"
									min="0"
									max={priceRange[1]}
									value={priceRange[0]}
									onChange={(e) => handlePriceChange(0, Number(e.target.value))}
									className="mf-price-input"
								/>
								<span className="mf-price-sep">–</span>
								<input
									type="number"
									min={priceRange[0]}
									max={MAX_PRICE}
									value={priceRange[1]}
									onChange={(e) => handlePriceChange(1, Number(e.target.value))}
									className="mf-price-input"
								/>
							</div>
						</div>

						{/* ── Category ── */}
						<div className="mf-block">
							<span className="mf-label">
								<span className="mf-label-icon">
									<svg
										width="11"
										height="11"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
									</svg>
								</span>
								Category
							</span>
							<select
								value={selectedCategory}
								onChange={(e) => handleCategoryChange(e.target.value)}
								className="mf-select">
								<option value="">All Categories</option>
								{categories?.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
							{selectedCategory && (
								<span className="mf-active-chip">
									<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
										<circle cx="12" cy="12" r="10" />
									</svg>
									{categories?.find((c) => String(c.id) === String(selectedCategory))?.name ||
										"Selected"}
								</span>
							)}
						</div>

						{/* ── Sort ── */}
						<div className="mf-block">
							<span className="mf-label">
								<span className="mf-label-icon">
									<svg
										width="11"
										height="11"
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
								</span>
								Sort by Price
							</span>
							<select
								value={sortOrder}
								onChange={(e) => handleSorting(e.target.value)}
								className="mf-select">
								<option value="">Default Order</option>
								<option value="price">Low → High</option>
								<option value="-price">High → Low</option>
							</select>
							{sortOrder && (
								<span className="mf-active-chip">
									<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
										<circle cx="12" cy="12" r="10" />
									</svg>
									{sortOrder === "price" ? "Low → High" : "High → Low"}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyFilters;
