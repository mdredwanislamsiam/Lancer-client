import React, { useEffect, useState } from "react";
import useService from "../hooks/useService";
import useCategories from "../hooks/useCategories";
import ServiceList from "../components/servicesComponents/ServiceList";
import ServicePagination from "../components/servicesComponents/ServicePagination";
import FilteringSection from "../components/servicesComponents/FilteringSection";
import { useOutletContext } from "react-router";

const Services = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [sortOrder, setSortOrder] = useState("");
	const { fetchServices, services, loading, totalPages } = useService();
	const { categories } = useCategories();

	useEffect(() => {
        fetchServices(currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder);
	}, [currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder]);

	
   
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1);
		}, 2000);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const handlePriceChange = (index, value) => {
		setPriceRange((prev) => {
			const newRange = [...prev];
			newRange[index] = value;
			return newRange;
		});
		setCurrentPage(1);
	};
	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
	// console.log(services);
	// console.log(categories);
	if (!categories || !services) return;

	return (
		<div className="container mx-auto py-8 flex flex-col justify-between">
			<div>
				<FilteringSection
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
				<ServiceList services={services} loading={loading} />
			</div>
			<ServicePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
		</div>
	);
};

export default Services;
