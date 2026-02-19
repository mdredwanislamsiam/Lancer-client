import React from 'react';
import ErrorAlert from '../alerts/ErrorAlert';
import MyServiceCard from './MyServiceCard';
import LoadingSpinner from '../common/LoadingSpinner';

const MyServiceList = ({ error, loading, services, onDelete }) => {
	if (loading) return <LoadingSpinner/>;
	return (
		<div>
			<section className="my-20">
				{/* Loading Spinner */}
				{loading && (
					<LoadingSpinner /> 
				)}
				{error && <ErrorAlert err={error} />}
				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
						{services.map((service) => (
							<MyServiceCard onDelete={onDelete} key={service.id} service={service} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default MyServiceList;