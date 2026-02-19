import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../components/alerts/SuccessAlert';
import useCategoriesContext from '../hooks/useCategoriesContext';


const AddCategory = () => {
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { addCategory } = useCategoriesContext();
	const [sMsg, setSMsg] = useState(""); 

	useEffect(() => {
			if (sMsg) {
				const timer = setTimeout(() => {
					setSMsg(null);
				}, 3000);
	
				return () => clearTimeout(timer);
			}
		}, [sMsg]);

    const handleAddService = async (data) => {
        console.log(data)
		try {
			const res = await addCategory(data);
			if (res) {
				setSMsg("Category Added Successfully! ")
			}
		} catch (error) {
			console.log(error);
		}
	};
	
	
    

    return (
		<div className="w-full lg:w-1/2 mx-auto">
			<h1 className="text:xl lg:text-3xl font-bold my-10 headTitle  text-center">Category Form</h1>
			{sMsg && <SuccessAlert err={sMsg} /> }
			<form onSubmit={handleSubmit(handleAddService)} className="space-y-4">
				{/* Name */}
				<div>
					<label className="block text-xs lg:text-sm  font-medium"> Category Name</label>
					<input
						{...register("name", { required: true })}
						className="input input-bordered w-full text-xs lg:text-sm outline-none"
						placeholder="Category Name"
					/>
					{errors.name && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Description */}
				<div>
					<label className="block text-xs lg:text-sm font-medium">Description</label>
					<textarea
						{...register("description", { required: true })}
						className="textarea textarea-bordered text-xs lg:text-sm  w-full outline-none"
						placeholder="Description"></textarea>
					{errors.description && <p className="text-red-500 text-xs">This field is required</p>}
				</div>

				<button type="submit" className="btn btn-xs lg:btn-md btn-primary w-full">
					Add Category
				</button>
			</form>
		</div>
	);
};

export default AddCategory;