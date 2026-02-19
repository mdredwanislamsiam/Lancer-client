import { useEffect, useState } from 'react';
import { FiBell, FiCheck, FiInfo, FiAlertCircle, FiMessageSquare, FiPackage } from 'react-icons/fi';
import NotificationList from '../components/notification/NotificationList';
import NotificationPagination from '../components/notification/NotificationPagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useNotificationContext from '../hooks/useNotificationContext';

const Notifications = () => {
    const [currentPage, setCurrentPage] = useState(1); 
    const {notifications, markNotification, totalPages, loading, fetchNotifications} = useNotificationContext(); 
    const unreadCount = notifications.filter(n => !n.is_read).length;

    useEffect(() => {
		fetchNotifications(currentPage);
    }, [currentPage]);
    // console.log(currentPage); 


    const markAllAsRead = async() => {
        await Promise.all(notifications.map(n => markNotification(n.id, currentPage)));
    };

    // const deleteNotification = (id) => {
    //     setNotifications(notifications.filter(n => n.id !== id));
    // };

    const getIcon = (type) => {
        switch (type) {
            case 'order': return <FiPackage className="w-6 h-6 text-blue-500" />;
            case 'alert': return <FiAlertCircle className="w-6 h-6 text-orange-500" />;
            case 'message': return <FiMessageSquare className="w-6 h-6 text-purple-500" />;
            case 'info': default: return <FiInfo className="w-6 h-6 text-teal-500" />;
        }
    };
    if (loading)
		return (
			<LoadingSpinner /> 
		);
    return (
		<div className="min-h-screen text-base-content p-4 md:p-8 flex flex-col justify-between">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="flex justify-between gap-3 items-center mb-8">
					<div className="flex items-center gap-3">
						<div className="relative">
							<FiBell className="w-6 h-6 lg:w-8 lg:h-8 text-blue-800" />
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
									{unreadCount}
								</span>
							)}
						</div>
						<h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#03293d] to-[#559aef] bg-clip-text text-transparent">
							Notifications
						</h1>
					</div>
					{unreadCount > 0 && (
						<button
							onClick={markAllAsRead}
							className="text-xs lg:text-sm font-medium text-primary hover:text-primary-focus flex items-center gap-0 lg:gap-1 transition-colors">
							<FiCheck className="w-4 h-4" />
							Mark all as read
						</button>
					)}
				</div>

				{/* Notification List */}
				<div className="space-y-4">
					{notifications.length > 0 ?
						notifications.map((notification) => (
							<button key={notification.id} onClick={() => markNotification(notification.id, currentPage)} className='w-full'>
								<NotificationList notification={notification} openNoti={false}/>
							</button>
						))
					:	<div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
							<FiBell className="w-16 h-16 text-base-300 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-base-content/50">No notifications</h3>
							<p className="text-base-content/40 text-sm">You're all caught up!</p>
						</div>
					}
				</div>
            </div>
            <NotificationPagination currentPage={currentPage} handlePageChange={setCurrentPage} totalPages={totalPages}/> 
		</div>
	);
};

export default Notifications;