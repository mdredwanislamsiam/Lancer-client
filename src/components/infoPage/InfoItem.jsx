import React from 'react';

const InfoItem = ({icon: Icon, label, value}) => {
    return (
		<div className="flex items-center gap-4 group p-3 rounded-xl hover:bg-black/15 transition-colors duration-300 cursor-default">
			<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/40 flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform duration-300">
				<Icon size={20} />
			</div>
			<div>
				<p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
				<p className="text-black font-medium text-lg">{value}</p>
			</div>
		</div>
	);
};

export default InfoItem;