import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCategories from "../../../hooks/useCategories";
import authAPIClient from "../../../services/auth-api-client";
import { useSearchParams } from "react-router";
import useService from "../../../hooks/useService";
import CategoryPart from "./formParts/CategoryPart";
import TitlePart from "./formParts/TitlePart";
import DescriptionPart from "./formParts/DescriptionPart";
import PricePart from "./formParts/PricePart";
import ServiceRequirements from "./formParts/ServiceRequirements";
import TimePart from "./formParts/TimePart";

const UpdateServiceForm = ({ serviceId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [oldImages, setOldImages] = useState([]);
	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const { categories } = useCategories();
	const [loading, setLoading] = useState(false);
	const { updateService, fetchService, service } = useService();

	useEffect(() => {
		fetchService(serviceId);
	}, [serviceId]);

	const getImages = async () => {
		try {
			const res = await authAPIClient.get(`/services/${serviceId}/images/`);
			setOldImages(res.data.results);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getImages();
	}, [serviceId]);

	const parseDeliveryTime = (str) =>  {
		if (!str) {
			return {
				delivery_weeks: 0,
				delivery_days: 0,
				delivery_hours: 0,
			};
		}
		const match = str.match(/(\d+)\s+weeks?\s+(\d+)\s+days?\s+(\d+)\s+hours?/i);

		if (!match) {
			return {
				delivery_weeks: 0,
				delivery_days: 0,
				delivery_hours: 0,
			};
		}

		return {
			delivery_weeks: parseInt(match[1], 10),
			delivery_days: parseInt(match[2], 10),
			delivery_hours: parseInt(match[3], 10),
		};
    }
    
	const delivery_Time = parseDeliveryTime(service?.delivery_time); 

	const handleDeleteImage = async (id) => {
		try {
			const res = await authAPIClient.delete(`/services/${serviceId}/images/${id}/`);
			setOldImages((prevImages) => prevImages.filter((img) => img.id !== id));
			alert("Image deleted successfully!");
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	// console.log(service)
	// console.log(service.delivery_weeks, service.delivery_hours, service.delivery_days)

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
		setPreviewImages(files.map((file) => URL.createObjectURL(file)));
	};

	const handleUpdateService = async (formData) => {
		console.log(formData);
		try {
			const cleanData = {
				title: formData.title,
				description: formData.description,
				category: formData.category?.id || formData.category,
				price: formData.price,
				service_requirements: formData.service_requirements,
				delivery_weeks: formData.delivery_weeks ? parseInt(formData.delivery_weeks) : undefined,
				delivery_days: formData.delivery_days ? parseInt(formData.delivery_days) : undefined,
				delivery_hours: formData.delivery_hours ? parseInt(formData.delivery_hours) : undefined,
			};

			const patchData = Object.fromEntries(Object.entries(cleanData).filter(([_, value]) => value != null));
			await updateService(serviceId, patchData);
			alert("Updated Service successfully!");
		} catch (error) {
			console.log(error);
		}
	};

	const handleImageUpload = async () => {
		setLoading(true);
		if (!images.length) return alert("No image was selected!");
		try {
			for (const image of images) {
				const formData = new FormData();
				formData.append("images", image);
				await authAPIClient.post(`/services/${serviceId}/images/`, formData);
			}
			alert("Images uploaded successfully!");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (!service) return;

	return (
		<div>
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					{/* Images */}
					<div>
						<h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
						{oldImages.length > 0 && (
							<div className="flex flex-wrap gap-5 mt-2">
								{oldImages.map((image, index) => (
									<button
										key={index}
										className="cursor-pointer"
										onClick={() => handleDeleteImage(image.id)}>
										<img src={image.images} alt="Preview" className="w-30 h-30 my-2" />
									</button>
								))}
							</div>
						)}
						<input
							type="file"
							multiple
							accept="image/*"
							className="file-input file-input-bordered w-full"
							onChange={handleImageChange}
						/>
						{previewImages.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-2">
								{previewImages.map((image, index) => (
									<img key={index} src={image} alt="Preview" className="w-30 h-30 my-2" />
								))}
							</div>
						)}
						<button
							type="button"
							onClick={handleImageUpload}
							disabled={loading}
							className="btn btn-primary w-full mt-2">
							{loading ? "Uploading images..." : "Upload Images"}
						</button>
					</div>
					<div className="">
						<form
							onSubmit={handleSubmit(handleUpdateService)}
							className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
							<label className="block text-sm font-medium text-center">Category</label>
							<div className="flex justify-between items-center gap-5">
								<CategoryPart
									categories={categories}
									defValue={service.category_detail}
									register={register}
									errors={errors}
								/>
								<button className="btn btn-primary" type="submit">
									Save
								</button>
							</div>
						</form>
						<form
							onSubmit={handleSubmit(handleUpdateService)}
							className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
							<label className="block text-sm font-medium text-center">Service Title</label>
							<div className="flex justify-between items-center gap-5">
								<TitlePart defValue={service.title} register={register} errors={errors} />
								<button className="btn btn-primary" type="submit">
									Save
								</button>
							</div>
						</form>
						<form
							onSubmit={handleSubmit(handleUpdateService)}
							className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
							<label className="block text-sm font-medium text-center">Description</label>
							<div className="flex justify-between items-center gap-5">
								<DescriptionPart defValue={service.description} register={register} errors={errors} />
								<button className="btn btn-primary" type="submit">
									Save
								</button>
							</div>
						</form>
						<form
							onSubmit={handleSubmit(handleUpdateService)}
							className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
							<label className="block text-sm font-medium text-center">Price</label>
							<div className="flex justify-between items-center gap-5">
								<PricePart defValue={service.price} register={register} errors={errors} />
								<button className="btn btn-primary" type="submit">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className=" my-10">
					<form
						onSubmit={handleSubmit(handleUpdateService)}
						className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
						<label className="block text-sm font-medium text-center">Service Requiements</label>
						<div className="flex justify-between items-center gap-5">
							<ServiceRequirements
								categories={categories}
								defValue={service.service_requirements}
								register={register}
								errors={errors}
							/>
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</form>
					<form
						onSubmit={handleSubmit(handleUpdateService)}
						className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
						<label className="block text-sm font-medium text-center">Delivery Time</label>
						<div className="flex justify-between items-center gap-5">
							<TimePart
								defWeeks={delivery_Time.delivery_weeks}
								defDays={delivery_Time.delivery_days}
								defHours={delivery_Time.delivery_hours}
								register={register}
								errors={errors}
							/>
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateServiceForm;
