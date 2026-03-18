/* ─── filter section label ──────────────────────────────────────── */
const FilterLabel = ({ children }) => (
	<p className="text-[10px] font-bold tracking-widest uppercase text-[#888] mb-3">{children}</p>
);

/* ─── divider ───────────────────────────────────────────────────── */
const Divider = () => <div className="border-t border-[#f0f0f0] my-4" />;

/* ─── custom range thumb styles (injected once) ─────────────────── */
const RangeStyles = () => (
	<style>{`
    .teal-range {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 3px;
      background: #e4e4e4;
      outline: none;
      border-radius: 9999px;
    }
    .teal-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #306073;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 0 0 1.5px #306073;
      transition: transform 0.15s ease;
    }
    .teal-range::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    .teal-range::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #306073;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 0 0 1.5px #306073;
    }
  `}</style>
);

/* ─── number input ──────────────────────────────────────────────── */
const NumInput = ({ value, onChange, min, max }) => (
	<input
		type="number"
		value={value}
		min={min}
		max={max}
		onChange={onChange}
		className="w-20 px-2.5 py-1.5 text-xs font-semibold border border-[#e0e0e0] focus:border-[#306073] focus:outline-none text-[#0d0d0d] bg-white transition-colors duration-150"
	/>
);

/* ─── styled select ─────────────────────────────────────────────── */
const StyledSelect = ({ value, onChange, children }) => (
	<div className="relative">
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="w-full appearance-none border border-[#e0e0e0] focus:border-[#306073] focus:outline-none bg-white text-xs font-medium text-[#333] px-3 py-2.5 pr-8 transition-colors duration-150 cursor-pointer">
			{children}
		</select>
		{/* chevron */}
		<svg
			viewBox="0 0 12 12"
			fill="none"
			stroke="#888"
			strokeWidth="2"
			className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
			<path d="M2 4l4 4 4-4" />
		</svg>
	</div>
);

/* ─── main Filters component ────────────────────────────────────── */
const Filters = ({
	priceRange,
	handlePriceChange,
	categories,
	selectedCategory,
	handleCategoryChange,
	sortOrder,
	handleSorting,
	onReset,
}) => {
	const isActive = priceRange[0] > 0 || priceRange[1] < 10000 || selectedCategory !== "" || sortOrder !== "";
	return (
		<div className="space-y-0">
			<RangeStyles />

			{/* ── Price range ── */}
			<div>
				<FilterLabel>Price Range</FilterLabel>

				{/* min row */}
				<div className="mb-3">
					<div className="flex items-center justify-between mb-1.5">
						<span className="text-[10px] text-[#aaa] uppercase tracking-wide">Min</span>
						<NumInput
							value={priceRange[0]}
							onChange={(e) => handlePriceChange(0, Number(e.target.value))}
							min={0}
							max={priceRange[1]}
						/>
					</div>
					<input
						type="range"
						className="teal-range"
						value={priceRange[0]}
						min={0}
						max={priceRange[1]}
						step={10}
						onChange={(e) => handlePriceChange(0, Number(e.target.value))}
					/>
				</div>

				{/* max row */}
				<div>
					<div className="flex items-center justify-between mb-1.5">
						<span className="text-[10px] text-[#aaa] uppercase tracking-wide">Max</span>
						<NumInput
							value={priceRange[1]}
							onChange={(e) => handlePriceChange(1, Number(e.target.value))}
							min={priceRange[0]}
							max={10000}
						/>
					</div>
					<input
						type="range"
						className="teal-range"
						value={priceRange[1]}
						min={priceRange[0]}
						max={10000}
						step={10}
						onChange={(e) => handlePriceChange(1, Number(e.target.value))}
					/>
				</div>

				{/* summary pill */}
				<div className="mt-3 flex items-center justify-center gap-1 bg-[#f5f9fa] border border-[#dde9ec] px-3 py-1.5">
					<span className="text-xs font-bold text-[#306073]">${priceRange[0]}</span>
					<span className="text-[10px] text-[#aaa] mx-1">—</span>
					<span className="text-xs font-bold text-[#306073]">${priceRange[1]}</span>
				</div>
			</div>

			<Divider />

			{/* ── Category ── */}
			<div>
				<FilterLabel>Category</FilterLabel>
				<StyledSelect value={selectedCategory} onChange={handleCategoryChange}>
					<option value="">All Categories</option>
					{categories?.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</StyledSelect>
			</div>

			<Divider />

			{/* ── Sort by price ── */}
			<div>
				<FilterLabel>Sort by Price</FilterLabel>
				<StyledSelect value={sortOrder} onChange={handleSorting}>
					<option value="">Default</option>
					<option value="price">Low → High</option>
					<option value="-price">High → Low</option>
				</StyledSelect>

				{/* active sort indicator */}
				{sortOrder && (
					<div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#306073] font-semibold">
						<svg viewBox="0 0 12 12" fill="none" stroke="#306073" strokeWidth="2" className="w-3 h-3">
							<path d={sortOrder === "price" ? "M6 10V2M3 5l3-3 3 3" : "M6 2v8M3 7l3 3 3-3"} />
						</svg>
						{sortOrder === "price" ? "Lowest first" : "Highest first"}
					</div>
				)}
			</div>

			{/* ── Reset button ── */}
			{isActive && (
				<>
					<Divider />
					<button
						onClick={onReset}
						className="w-full flex items-center justify-center gap-2 border border-[#e0e0e0] hover:border-[#b84040] text-[#888] hover:text-[#b84040] text-xs font-semibold tracking-wide py-2.5 transition-all duration-200 group">
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-[-90deg]">
							<path d="M3 8a5 5 0 1 0 1.5-3.5" />
							<polyline points="1 4 3 8 7 6" />
						</svg>
						Reset Filters
					</button>
				</>
			)}
		</div>
	);
};

export default Filters;
