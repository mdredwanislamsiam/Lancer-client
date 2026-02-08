import React, { useState } from "react";
import { BsFilterSquareFill } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { useOutletContext } from "react-router";

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
}) => {
	
	const [open, setOpen] = useState(false); 

	if (!categories) return;
	return (
		<div>
			{/* Search bar */}
			<div className="bg-gradient-to-br from-[#1B262C] to-[#236589] p-4 rounded-lg shadow flex justify-between items-center gap-10">
				<div className="lg:hidden">
					<button
						className="btn bg-[#86c2e3] border-0 text-black/60 hover:text-black"
						onClick={() => setOpen((prev) => !prev)}>
						<span className="text-md ">Filter </span>
						<BsFilterSquareFill size={20} color="black" cla />
					</button>
				</div>
				<div className="w-full flex items-center gap-2 my-auto">
					<p className="text-md mt-2 font-medium text-white/80 mb-2 text-center"> Search</p>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => handleSearchQuery(e.target.value)}
						placeholder="Search..."
						className="focus:ring-1 focus:ring-[#74adcc] focus:outline-none text-white/80 focus:border-[#74adcc] w-full p-2 border rounded-md"
					/>
				</div>
			</div>
			{/* filtering */}
			<div className="fixed inset-y-0 left-0 z-40 top-64 group">
				<div className="absolute left-0 top-0 h-fit w-16"></div>
				<aside
					className={`menu bg-base-200 w-64 h-fit p-4 text-base-content transform transition-transform duration-800 ease-in-out  bg-black/20 rounded-sm ${open ? "translate-x-0" : "-translate-x-full"}
				lg:group-hover:translate-x-0 lg:-translate-x-full `}>
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
							{categories.map((category) => (
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
							<option value="price" className="text-black">Price: Low to High</option>
							<option value="-price" className="text-black">Price: High to Low</option>
						</select>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default FilteringSection;
