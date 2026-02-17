const Filters = ({
	priceRange,
	handlePriceChange,
	categories,
	selectedCategory,
	handleCategoryChange,
	sortOrder,
	handleSorting,
	open,
}) => {

    
	return (
		<div>
			<div className="bg-gradient-to-br from-[#1B262C] text-white to-[#236589] p-4 rounded-lg shadow my-2">
				<label htmlFor="" className="block text-sm font-medium text-white/80 mb-2">
					Price Range
				</label>
				<div className="flex items-center space-x-4 mb-2">
					<input
						min="0"
						value={priceRange[0]}
						onChange={(e) => handlePriceChange(0, Number(e.target.value))}
						max={priceRange[1]}
						type="number"
						className="w-20 px-2 py-1 border rounded-md focus:ring-1 focus:ring-pink-500 focus:outline-none focus:border-pink-500"
					/>
					<input
						value={priceRange[0]}
						onChange={(e) => handlePriceChange(0, Number(e.target.value))}
						min="0"
						max={priceRange[1]}
						step="10"
						type="range"
						className="w-full"
					/>
				</div>
				<div className="flex items-center space-x-4">
					<input
						value={priceRange[1]}
						onChange={(e) => handlePriceChange(1, Number(e.target.value))}
						min={priceRange[0]}
						max="10000"
						type="number"
						className="w-20 px-2 py-1 border rounded-md focus:ring-1 focus:ring-pink-500 focus:outline-none focus:border-pink-500"
					/>
					<input
						value={priceRange[1]}
						onChange={(e) => handlePriceChange(1, Number(e.target.value))}
						min={priceRange[0]}
						max="10000"
						step="10"
						type="range"
						className="w-full"
					/>
				</div>
				<div className="flex justify-between text-md text-white/80 mt-2">
					<span>
						Min: <span className="font-semibold text-[#a2d2ff]">${priceRange[0]}</span>
					</span>
					<span>
						Max: <span className="font-semibold text-[#a2d2ff]">${priceRange[1]}</span>
					</span>
				</div>
			</div>
			{/* Category Filter */}
			<div className="bg-gradient-to-br from-[#1B262C] to-[#236589] p-4 rounded-lg shadow text-white my-2">
				<label htmlFor="" className="block text-sm font-medium text-white/80 mb-2">
					Category
				</label>
				<select
					value={selectedCategory}
					onChange={(e) => handleCategoryChange(e.target.value)}
					name=""
					className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#3cb2f1] focus:outline-none focus:border-[#3cb2f1]"
					id="">
					<option value="">All Categories</option>
					{categories?.map((category) => (
						<option key={category.id} value={category.id} className="text-black">
							{category.name}
						</option>
					))}
				</select>
			</div>
			{/* Sorting */}
			<div className="bg-gradient-to-br from-[#1B262C] to-[#236589] p-4 rounded-lg shadow text-white my-2">
				<label htmlFor="" className="block text-sm font-medium text-white/80 mb-2">
					Sort By Price
				</label>
				<select
					value={sortOrder}
					onChange={(e) => handleSorting(e.target.value)}
					name=""
					className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#3cb2f1] focus:outline-none focus:border-[#3cb2f1]"
					id="">
					<option value="">All Categories</option>
					<option value="price" className="text-black">
						Price: Low to High
					</option>
					<option value="-price" className="text-black">
						Price: High to Low
					</option>
				</select>
			</div>
		</div>
	);
};

export default Filters;
