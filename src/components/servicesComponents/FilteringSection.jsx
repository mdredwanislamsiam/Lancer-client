import React, { useState } from "react";
import { BsFilterSquareFill } from "react-icons/bs";
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
}) => {
	
	const [open, setOpen] = useState(false); 

	if (!categories) return;
	return (
		<div>
			{/* Search bar */}
			<div className="bg-gradient-to-br scale-90 lg:scale-100 from-[#1B262C] to-[#236589] p-4 rounded-lg shadow flex justify-between items-center mx-5 lg:mx-0 gap-10">
				<div className="">
					<button
						className="btn btn-xs lg:btn-md bg-[#86c2e3] border-0 text-black/60 hover:text-black"
						onClick={() => setOpen((prev) => !prev)}>
						<span className="text-md ">Filter </span>
						<BsFilterSquareFill size={20} color="black" className="w-4 lg:w-8" />
					</button>
				</div>
				<div className="w-full flex items-center gap-2 my-auto">
					<p className="text-xs lg:text-lg mt-2 font-medium text-white/80 mb-2 text-center"> Search</p>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => handleSearchQuery(e.target.value)}
						placeholder="Search..."
						className="focus:ring-1 focus:ring-[#74adcc] focus:outline-none text-white/80 focus:border-[#74adcc] w-full text-xs lg:text-lg p-2 border rounded-md"
					/>
				</div>
			</div>
			{/* filtering */}
			<div className={`fixed -left-10 top-20 scale-70 lg:scale-100 lg:top-64 lg:left-0 z-40 group ${open ? "pointer-events-auto" : "pointer-events-none"}  `}>
				<aside
					className={`menu h-fit p-4 text-base-content transform transition-transform duration-800 ease-in-out  bg-black/20 rounded-sm ${open ? "translate-x-0" : "-translate-x-full"}
				 `}>
					<Filters
						priceRange={priceRange}
						handlePriceChange={handlePriceChange}
						selectedCategory={selectedCategory}
						handleCategoryChange={handleCategoryChange}
						sortOrder={sortOrder}
						handleSorting={handleSorting}
						categories={categories}
						open={open}
					/>
				</aside>
			</div>
		</div>
	);
};

export default FilteringSection;
