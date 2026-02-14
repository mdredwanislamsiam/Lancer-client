import React from 'react';

const NotificationPagination = ({totalPages, currentPage, handlePageChange}) => {
    return (
		<div className="text-center p-5">
			{Array.from({ length: totalPages }, (_, i) => (
				<button
					key={i}
					onClick={() => handlePageChange(i + 1)}
					className={`mx-1 px-3 py-1 rounded-xl shadow-xl focus:scale-120 focus:drop-shadow-lg transition-all delay-200 ${currentPage === i + 1 ? "bg-[#3282B8] text-white" : "bg-gray-200"}`}>
					{i + 1}
				</button>
			))}
		</div>
	);
};

export default NotificationPagination;