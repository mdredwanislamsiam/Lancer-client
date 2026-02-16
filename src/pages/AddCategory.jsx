import React from 'react';
import { useForm } from 'react-hook-form';
import useCategories from '../hooks/useCategories';


const AddCategory = () => {
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { addCategory } = useCategories();


    const handleAddService = async (data) => {
        console.log(data)
		try {
			const res = await addCategory(data);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
    };
    

    return (
		<div className="w-1/2 mx-auto">
			<h1 className="text-3xl font-bold my-10 text-center">Category Form</h1>
			<form onSubmit={handleSubmit(handleAddService)} className="space-y-4">
				{/* Name */}
				<div>
					<label className="block text-sm font-medium"> Category Name</label>
					<input
						{...register("name", { required: true })}
						className="input input-bordered w-full outline-none"
						placeholder="Category Name"
					/>
					{errors.name && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Description */}
				<div>
					<label className="block text-sm font-medium">Description</label>
					<textarea
						{...register("description", { required: true })}
						className="textarea textarea-bordered w-full outline-none"
						placeholder="Description"></textarea>
					{errors.description && <p className="text-red-500 text-xs">This field is required</p>}
				</div>

				<button type="submit" className="btn btn-primary w-full">
					Add Service
				</button>
			</form>
		</div>
	);
};

export default AddCategory;