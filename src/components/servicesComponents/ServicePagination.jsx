const ServicePagination = ({ totalPages, handlePageChange, currentPage }) => {
	return (
		<div className="text-center p-5">
			{Array.from({ length: totalPages }, (_, i) => (
				<button
					key={i}
					onClick={() => handlePageChange(i + 1)}
					className={`mx-1 px-3 py-1 rounded-xl hover:scale-120 shadow-xl focus:scale-90 focus:drop-shadow-lg transition-all cursor-pointer duration-300 ease-in-out ${currentPage === i + 1 ? "bg-[#3282B8] text-white" : "bg-gray-200"}`}>
					{i + 1}
				</button>
			))}
		</div>
	);
};

export default ServicePagination;
