import React, { useState } from 'react';
import Filters from './Filters';
import { BsFilterSquareFill } from 'react-icons/bs';
import MyFilters from './MyFilters';

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
    if (!categories) return;
	return (
		<div>
			{/* Search bar */}
			
			{/* filtering */}
			{/* <div className="fixed inset-x-0 right-0 z-40 top-0 group">
				<div className="absolute right-0 top-0 h-16 w-fit"></div>
				<aside
					className={`menu w-fit h-fit p-4 text-base-content transform transition-transform duration-800 ease-in-out  bg-black/20 rounded-sm ${open ? "translate-y-0" : "-translate-y-full"}
        lg:group-hover:translate-y-0 lg:-translate-y-full `}>
					
				</aside>
			</div> */}

			<MyFilters
				priceRange={priceRange}
				handlePriceChange={handlePriceChange}
				selectedCategory={selectedCategory}
				handleCategoryChange={handleCategoryChange}
				sortOrder={sortOrder}
				categories={categories}
				handleSorting={handleSorting}
				searchQuery={searchQuery}
				handleSearchQuery={handleSearchQuery}
			/>
		</div>
	);
};

export default MyFilterSection;