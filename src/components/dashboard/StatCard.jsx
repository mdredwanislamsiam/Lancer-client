import React from "react";

const StatCard = ({ icon: Icon, title, value }) => {
	return (
		<div className="card bg-gradient-to-r to-[#3c6a95] shadow-sm">
			<div className="card-body p-4">
				<div className="flex items-center gap-2">
					<Icon className="h-12 w-12 text-[#3c6a95]" />
					<h3 className="text-xl font-bold">{title}</h3>
				</div>
				<p className="mt-2 text-4xl font-bold m">{value}</p>
			</div>
		</div>
	);
};

export default StatCard;
