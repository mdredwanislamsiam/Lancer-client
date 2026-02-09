import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import authAPIClient from '../services/auth-api-client';
import ServiceImages from '../components/servicesComponents/serviceDetails/ServiceImages';
import { FaArrowLeft } from 'react-icons/fa6';
import HireService from '../components/servicesComponents/serviceDetails/HireService';

const ServiceDetail = () => {
    const [service, setService] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const { id } = useParams(); 

    const fetchProduct = async () => {
        setLoading(true); 
        try {
            const res = await authAPIClient.get(`/services/${id}/`);
            console.log(res);
            setService(res.data); 
        }
        catch (error) {
            console.log(error); 
        }
        finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchProduct(); 
    }, [id])

    if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
    }
    if (!service) return; 
    return (
		<div className="w-3/4 mx-auto px-10 py-8 bg-base-200">
			<div className="mb-6">
				<Link
					to="/shop"
					className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors">
					<FaArrowLeft className="mr-2 h-4 w-4" />
					Back to shop
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 ">
                <ServiceImages images={service.images} serviceName={service.title} />
				
				<div className=" flex flex-col justify-between">
					<div>
						<div className="mb-6">
							<div className="badge badge-outline mb-2">Category - {service.category.name}</div>
							<h1 className="text-3xl font-bold">{service.title}</h1>
						</div>

						<div className="prose prose-sm mb-6">
							<p>{service.description}</p>
                        </div>
                        
						<div className="mb-6">
							<div className="flex items-baseline">
								<span className="text-3xl font-bold">${service.price}</span>
							</div>
						</div>
					</div>

					<div className="">
						<HireService service={service} /> 
					</div>
				</div>
			</div>

			{/* Review Section */}

			{/* <div>
				<ReviewSection />
			</div> */}
		</div>
	);
};

export default ServiceDetail;