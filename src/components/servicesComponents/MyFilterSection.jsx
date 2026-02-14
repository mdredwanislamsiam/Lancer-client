import React, { useState } from 'react';
import Filters from './Filters';
import { BsFilterSquareFill } from 'react-icons/bs';

const MyFilterSection = ({
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
						<BsFilterSquareFill size={20} color="black" />
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
			<div className="fixed inset-y-0 right-0 z-40 top-64 group">
				<div className="absolute right-0 top-0 h-fit w-16"></div>
				<aside
					className={`menu w-64 h-fit p-4 text-base-content transform transition-transform duration-800 ease-in-out  bg-black/20 rounded-sm ${open ? "translate-x-0" : "translate-x-full"}
        lg:group-hover:translate-x-0 lg:translate-x-full `}>
					<Filters
						priceRange={priceRange}
						handlePriceChange={handlePriceChange}
						selectedCategory={selectedCategory}
						handleCategoryChange={handleCategoryChange}
                        sortOrder={sortOrder}
                        categories={categories}
						handleSorting={handleSorting}
						open={open}
					/>
				</aside>
			</div>
		</div>
	);
};

export default MyFilterSection;