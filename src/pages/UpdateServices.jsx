import React from 'react';
import { useForm } from 'react-hook-form';
import UpdateServiceForm from '../components/servicesComponents/updateService/UpdateServiceForm';
import { useParams } from 'react-router';

const UpdateServices = () => {
    const { serviceId } = useParams();  
    return (
        <div>
            <UpdateServiceForm serviceId={serviceId}/>
        </div>
    );
};

export default UpdateServices;