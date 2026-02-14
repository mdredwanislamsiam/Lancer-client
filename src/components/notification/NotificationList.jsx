import React from 'react';
import { FiClock } from 'react-icons/fi';

const NotificationList = ({ notification, openNoti }) => {
    const getTime = () => {
		const createdTime = new Date(notification.created_at).getTime();
		const diff = Date.now() - createdTime;

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);

		if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
		if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
		if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	};
    
    
    return (
		<div
			key={notification.id}
			className={`relative group p-2 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${
				openNoti ?
					notification.is_read ?
						"bg-linear-to-br from-[#0f1115] to-[#b2d5e3] text-white opacity-100 my-1"
					:	"bg-linear-to-br from-[#b2d5e3] to-[#0f1115] opacity-90 hover:opacity-100 shadow-sm my-1 text-white"
				:	""
			} ${
				notification.is_read ?
					"bg-base-100 border-base-200 opacity-80 hover:opacity-100"
				:	"bg-base-200 opacity-90 hover:opacity-100 border-primary/20 shadow-sm"
			}`}>
			<div className="flex gap-4">
				{/* Icon Container */}
				<div
					className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center ${
						notification.is_read ? "bg-base-200 " : "bg-white shadow-sm"
					}`}>
					{/* {getIcon(notification.type)} */}
				</div>

				{/* Content */}
				<div className="flex-1">
					<div className="flex justify-between items-start">
						<h3
							className={`${openNoti ? "text-sm" : "text-lg"} font-semibold mb-1 ${!notification.is_read && "text-yellow-400"}`}>
							{notification.title}
						</h3>
						<span className="flex items-center gap-1 text-xs whitespace-nowrap">
							<FiClock className="w-3 h-3" />
							{getTime()}
						</span>
					</div>
					<p className={`${openNoti ? "text-xs" : "text- xs"} text-black-300 leading-relaxed`}>
						{notification.message}
					</p>
				</div>
			</div>

			{/* Unread Indicator */}
			{!notification.is_read && !openNoti && (
				<div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-primary rounded-full transform -translate-y-1/2"></div>
			)}
		</div>
	);
};

export default NotificationList;