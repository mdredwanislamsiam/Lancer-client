import { useEffect } from 'react';
import NotificationList from './NotificationList';
import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router';
import useNotificationContext from '../../hooks/useNotificationContext';

const HoverNotificationList = ({openNoti}) => {
    const { fetchNotifications, notifications, markNotification } = useNotificationContext(); 

    useEffect(() => {
        fetchNotifications(1); 
    }, [openNoti])

    return (
		<div className="w-100 h-200 rounded-xl">
			{notifications.length > 0 ?
				notifications.slice(0, 5).map((notification) => (
					<button
						key={notification.id}
						onClick={() => markNotification(notification.id, 1)}
						className="w-full scale-100">
						<NotificationList notification={notification} openNoti={openNoti} />
					</button>
				))
			:	<div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
					<FiBell className="w-16 h-16 text-base-300 mx-auto mb-4" />
					<h3 className="text-xl font-bold text-base-content/50">No notifications</h3>
					<p className="text-base-content/40 text-sm">You're all caught up!</p>
				</div>
			}
			<div className="flex">
				<Link to={"/dashboard/notifications"} className='w-fit mx-auto'>
					<button className="text-center font-bold hover:scale-105 transition-all text-yellow-500 bg-black/60 px-5 rounded-full mx-auto">View All</button>
				</Link>
			</div>
		</div>
	);
};

export default HoverNotificationList;