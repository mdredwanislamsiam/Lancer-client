import React from 'react';
import ErrorAlert from '../alerts/ErrorAlert';
import ServiceCard from './ServiceCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ServiceList = ({ error, loading, services }) => {
	// console.log(services); 
    return (
		<section className="my-20">
			{/* Loading Spinner */}
			{loading && (
				<LoadingSpinner /> 
			)}
			{error && <ErrorAlert err={error} />}
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
					
					{services.map((service) => (
						<ServiceCard key={service.id} service={service} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ServiceList;