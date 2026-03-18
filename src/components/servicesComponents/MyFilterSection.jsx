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