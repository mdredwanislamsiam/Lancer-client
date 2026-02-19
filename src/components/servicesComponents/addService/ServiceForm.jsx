import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useServiceContext from '../../../hooks/useServiceContext';
import useCategoriesContext from '../../../hooks/useCategoriesContext';
import { useEffect, useState } from 'react';

const ServiceForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const { categories } = useCategoriesContext(); 
	const { addService } = useServiceContext(); 
	const navigate = useNavigate(); 
	const [sMsg, setSMsg] = useState(""); 
	

	const handleAddService = async (data) => {
		try {
			const res = await addService(data); 
			if (res) {
				setSMsg("New Service Added Successfully! ")
			} 
			if (res) {
				navigate(`images/${res.serviceId}`, {state: { sMsg: "New Service Added Successfully!" }});
			}
		}
		catch (error) {
			console.log(error); 
		}
	}

    return (
		<div className="w-5/6 lg:w-1/2 mx-auto">
			<form onSubmit={handleSubmit(handleAddService)} className="space-y-4 text-xs lg:text-sm">
				{/* Dropdown for categories */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Category</label>
					<select
						{...register("category", { required: true })}
						className="select select-bordered w-full text-xs lg:text-sm outline-none">
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
					{errors.category && <p className="text-red-500 text-xs">This field is required</p>}
				</div>

				{/* Title */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Service Title</label>
					<input
						{...register("title", { required: true })}
						className="input input-bordered w-full text-xs lg:text-sm outline-none"
						placeholder="Service Title"
					/>
					{errors.title && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Description */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Description</label>
					<textarea
						{...register("description", { required: true })}
						className="textarea textarea-bordered w-full text-xs lg:text-sm outline-none"
						placeholder="Description"></textarea>
					{errors.description && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Price */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Price</label>
					<input
						type="text"
						{...register("price", {
							required: "This Field is required",
							validate: (value) => {
								const parsedValue = parseFloat(value);
								return !isNaN(parsedValue) || "Please enter a valid number!";
							},
						})}
						className="input input-bordered text-xs lg:text-sm w-full outline-none"
						placeholder="Price"
					/>
					{errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
				</div>
				{/* Service Requirements */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Service Requirments</label>
					<textarea
						{...register("service_requirements", { required: true })}
						className="textarea textarea-bordered text-xs lg:text-sm w-full outline-none"
						placeholder="Service Requirments"></textarea>
					{errors.service_requirements && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Time  */}
				<div className="flex  gap-1 w-full justify-between">
					{/* Weeks */}
					<div>
						<label className="block text-xs lg:text-sm font-medium">Delivery Weeks</label>
						<input
							defaultValue={0}
							type="number"
							{...register("delivery_weeks", { required: true })}
							className="input input-bordered text-xs lg:text-sm w-full outline-none"
							placeholder="Weeks"
						/>
						{errors.delivery_weeks && <p className="text-red-500 text-xs">This field is required</p>}
					</div>
					{/* Days */}
					<div>
						<label className="block text-xs lg:text-sm font-medium">Delivery Weeks</label>
						<input
							defaultValue={0}
							type="number"
							{...register("delivery_days", { required: true })}
							className="input input-bordered text-xs lg:text-sm w-full outline-none"
							placeholder="Days"
						/>
						{errors.delivery_days && <p className="text-red-500 text-xs">This field is required</p>}
					</div>
					{/* Hours */}
					<div>
						<label className="block text-xs lg:text-sm font-medium">Delivery Hours</label>
						<input
							defaultValue={0}
							type="number"
							{...register("delivery_hours", { required: true })}
							className="input input-bordered text-xs lg:text-sm w-full outline-none"
							placeholder="Hours"
						/>
						{errors.delivery_hours && <p className="text-red-500 text-xs">This field is required</p>}
					</div>
				</div>

				<button type="submit" className="btn btn-xs lg:btn-md btn-primary w-full">
					Add Service
				</button>
			</form>
		</div>
	);
};

export default ServiceForm;