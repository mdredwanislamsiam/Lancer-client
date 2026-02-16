import React from 'react';
import ErrorAlert from '../alerts/ErrorAlert';
import MyServiceCard from './MyServiceCard';

const MyServiceList = ({ error, loading, services, onDelete }) => {
	if (loading) return <p>Loading...</p>;
	return (
		<div>
			<section className="my-20">
				{/* Loading Spinner */}
				{loading && (
					<div className="flex justify-center items-center min-h-screen">
						<span className="loading loading-spinner loading-xl  text-secondary"></span>
					</div>
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