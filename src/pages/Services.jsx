import { useEffect, useState } from "react";
import ServiceList from "../components/servicesComponents/ServiceList";
import ServicePagination from "../components/servicesComponents/ServicePagination";
import FilteringSection from "../components/servicesComponents/FilteringSection";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useServiceContext from "../hooks/useServiceContext";
import useCategoriesContext from "../hooks/useCategoriesContext";

const Services = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [sortOrder, setSortOrder] = useState("");
	const { fetchServices, services, loading, totalPages } = useServiceContext();
	const { categories } = useCategoriesContext();

	useEffect(() => {
        fetchServices(currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder);
	}, [currentPage, priceRange, selectedCategory, debouncedSearch, sortOrder]);

	const onReset = () => {
		setCurrentPage(1); 
		setPriceRange([0, 10000]); 
		setSelectedCategory("");
		setSearchQuery(""); 
		setDebouncedSearch(""); 
		setSortOrder(""); 
	}
	
   
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
			<LoadingSpinner /> 
		);
	// console.log(services);
	// console.log(categories);
	if (!categories || !services) return;

	return (
		<div className="lg:px-10 bg-linear-to-t from-[#c0e3f9] mx-auto py-8 flex flex-col justify-between">
			<div className="container mx-auto px-5">
				<div className=" grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2 ">
					<div className="flex items-center gap-2.5 min-w-0 shadow-sm w-fit px-5 py-5 md:py-0 rounded-2xl">
						<span className="w-px h-5 bg-[#15495e] flex-shrink-0" />
						<div className="min-w-0">
							<h1 className="text-sm font-bold text-[#0d0d0d] tracking-tight leading-none">
								All Services
							</h1>
							{!loading && (
								<p className="text-[11px] text-[#888] mt-0.5 truncate">
									{services.length > 0 ?
										`${services.length} result${services.length !== 1 ? "s" : ""}${debouncedSearch ? ` for "${debouncedSearch}"` : ""}`
									:	"No results"}
								</p>
							)}
						</div>
					</div>
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
						onReset={onReset}
					/>
				</div>
				<ServiceList services={services} loading={loading} />
			</div>
			<ServicePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
		</div>
	);
};

export default Services;
