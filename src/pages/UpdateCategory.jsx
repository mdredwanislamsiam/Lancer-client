import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import DescriptionPart from '../components/servicesComponents/updateService/formParts/DescriptionPart';
import NamePart from '../components/servicesComponents/updateService/formParts/NamePart';
import SuccessAlert from '../components/alerts/SuccessAlert';
import useCategoriesContext from '../hooks/useCategoriesContext';

const UpdateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const { categoryId } = useParams(); 
    const { fetchCategory, category, updateCategory } = useCategoriesContext(); 

    useEffect(() => { fetchCategory(categoryId) }, [categoryId]); 

	const [sMsg, setSMsg] = useState(""); 
	
		useEffect(() => {
				if (sMsg) {
					const timer = setTimeout(() => {
						setSMsg(null);
					}, 3000);
		
					return () => clearTimeout(timer);
				}
			}, [sMsg]);

    const handleUpdateCategory = async (data) => {
        console.log(data); 
        try {
			const res = await updateCategory(categoryId, data);
			if (res) {
				setSMsg("Category Updated Successfully! ");
			}
        }
        catch (error) {
            console.log(error); 
        }
    } 

    if (!category) return;
    return (
		<div className="w-full lg:w-1/2 mx-auto">
			<h1 className="text-xl lg:text-3xl font-bold headTitle text-center my-10">Update Category</h1>
			{sMsg && <SuccessAlert err={sMsg} />}
			<form
				onSubmit={handleSubmit(handleUpdateCategory)}
				className="bg-linear-to-r from-[#4678a8] to-[#cde9dd] p-3 rounded-xl shadow-lg mt-2">
				<label className="block text-sm lg:text-md font-medium text-center">Name</label>
				<div className="flex justify-between items-center gap-5">
					<NamePart defValue={category.name} register={register} errors={errors} />
					<button className="btn btn-xs lg:btn-md btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
			<form
				onSubmit={handleSubmit(handleUpdateCategory)}
				className="bg-linear-to-r from-[#4678a8] to-[#cde9dd] p-3 rounded-xl shadow-lg mt-2">
				<label className="block text-sm lg:text-md font-medium text-center">Description</label>
				<div className="flex justify-between items-center gap-5">
					<DescriptionPart defValue={category.description} register={register} errors={errors} />
					<button className="btn btn-xs lg:btn-md btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateCategory;