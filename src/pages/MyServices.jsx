import React, { useEffect, useState } from 'react';
import useService from '../hooks/useService';
import useCategories from '../hooks/useCategories';
import ServicePagination from '../components/servicesComponents/ServicePagination';
import MyFilterSection from '../components/servicesComponents/MyFilterSection';
import MyServiceList from '../components/servicesComponents/MyServiceList';

const MyServices = () => {
    const [currentPage, setCurrentPage] = useState(1);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [sortOrder, setSortOrder] = useState("");
	const { myServices, loading, totalPages, fetchMyServices, setMyServices } = useService();
	const { categories } = useCategories();

	useEffect(() => {
		fetchMyServices(currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder);
	}, [currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1);
		}, 2000);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const handleDelete = (id) => {
		const updated = myServices.filter((s) => s.id !== id);
		setMyServices(updated); 
	};

	const handlePriceChange = (index, value) => {
		setPriceRange((prev) => {
			const newRange = [...prev];
			newRange[index] = value;
			return newRange;
		});
		setCurrentPage(1);
    };

    if (!categories || !myServices) return;
    
    return (
		<div className="container mx-auto py-8 ">
			<MyFilterSection
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
			<MyServiceList services={myServices} loading={loading} onDelete={handleDelete}/>
			<ServicePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
		</div>
	);
};

export default MyServices;