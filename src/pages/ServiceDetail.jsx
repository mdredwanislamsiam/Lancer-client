import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import authAPIClient from "../services/auth-api-client";
import ServiceImages from "../components/servicesComponents/serviceDetails/ServiceImages";
import { FaArrowLeft } from "react-icons/fa6";
import HireService from "../components/servicesComponents/serviceDetails/HireService";
import ReviewSection from "../components/reviews/ReviewSection";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import defaultImg from "../assets/images/DefaultImage.jpg"
import useAuthContext from "../hooks/useAuthContext";

const ServiceDetail = () => {
	const [service, setService] = useState(null);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const { user } = useAuthContext(); 

	const fetchService = async () => {
		setLoading(true);
		try {
			const res = await authAPIClient.get(`/services/${id}/`);
			// console.log(res);
			setService(res.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchService();
	}, [id]);

	if (loading) {
		return <LoadingSpinner />;
	}
	if (!service) return;
	return (
		<div className="px-10 lg:px-50 mx-auto py-8 bg-linear-to-t from-[#c0e3f9] ">
			<div className="mb-6 w-fit">
				<Link
					to="/services"
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
							<div className="badge badge-sm lg:badge-md badge-outline mb-2 lg:mb-5">
								Category - {service.category_detail?.name || "N/A"}
							</div>
							<h1 className="text-xl lg:text-3xl px-5 font-bold ">{service.title}</h1>
							<div className="flex my-2">
								<label htmlFor="" className="label font-semibold text-center px-5 text-sm lg:text-lg">
									<BiUser className="w-4 h-4 lg:w-8 lg:h-8" />
									<span>Seller</span>
								</label>
								<Link
									to={user ? `/infoPage/${service.seller.id}` : `/login`}
									className="flex justify-center items-center gap-3 bg-white rounded-xl hover:scale-102 transition-all duration-300  hover:shadow-lg text-xs lg:text-sm px-3 py-1 w-fit">
									<img
										src={service.seller.image ? service.seller.image : defaultImg}
										alt="seller profile image"
										className="w-5 h-5 lg:w-8 lg:h-8 rounded-full drop-shadow-xl"
									/>
									<h1 className="font-semibold text-xs lg:text-sm">{service.seller.username}</h1>
								</Link>
							</div>
							<h1 className="text:lg lg:text-xl px-5  font-semibold text-gray-700">
								{service.delivery_time}
							</h1>
						</div>
						<div className="mb-6 px-5 ">
							<div className="flex items-center">
								<HiMiniCurrencyDollar className="w-5 h-5 lg:w-10 lg:h-10" />
								<span className="text-xl  lg:text-3xl font-bold">{service.price}</span>
							</div>
						</div>
					</div>

					<div className="">
						<HireService service={service} />
					</div>
				</div>
			</div>
			<div className="mt-8">
				<h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-3">Service Description</h3>

				<div
					className="bg-white border border-slate-200 rounded-xl 
                  p-5 lg:p-6 
                  text-slate-700 text-xs  lg:text-sm
                  leading-relaxed tracking-normal
                  shadow-sm">
					{service.description}
				</div>
			</div>
			<div className="mt-8">
				<h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-3">Service Requirements</h3>

				<div
					className="bg-white border border-slate-200 rounded-xl 
                  p-5 lg:p-6 
                  text-slate-700 text-xs  lg:text-sm
                  leading-relaxed tracking-normal
                  shadow-sm">
					{service.service_requirements}
				</div>
			</div>

			{/* Review Section */}

			<div>
				<ReviewSection />
			</div>
		</div>
	);
};

export default ServiceDetail;
