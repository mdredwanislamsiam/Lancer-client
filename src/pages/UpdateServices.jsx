import React from 'react';
import { useForm } from 'react-hook-form';
import UpdateServiceForm from '../components/servicesComponents/updateService/UpdateServiceForm';
import { useParams } from 'react-router';

const UpdateServices = () => {
    const { serviceId } = useParams();  
    return (
		<div>
			<h1 className="text-xl lg:text-3xl font-bold headTitle text-center my-10">Update Service</h1>
			<UpdateServiceForm serviceId={serviceId} />
		</div>
	);
};

export default UpdateServices;