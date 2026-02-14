import React, { useState } from 'react';
import ServiceForm from '../components/servicesComponents/addService/ServiceForm';

const AddServices = () => {
    const [serviceId, setServiceId] = useState(null); 
    const [loading, setLoading] = useState(false); 
    return (
        <div>
            <ServiceForm /> 
        </div>
    );
};

export default AddServices;