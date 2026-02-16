import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useCategories from '../hooks/useCategories';
import { useParams } from 'react-router';
import DescriptionPart from '../components/servicesComponents/updateService/formParts/DescriptionPart';
import NamePart from '../components/servicesComponents/updateService/formParts/NamePart';

const UpdateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const { categoryId } = useParams(); 
    const { fetchCategory, category, updateCategory } = useCategories(); 

    useEffect(() => { fetchCategory(categoryId) }, [categoryId]); 

    const handleUpdateCategory = async (data) => {
        console.log(data); 
        try {
            await updateCategory(categoryId, data); 
        }
        catch (error) {
            console.log(error); 
        }
    } 

    if (!category) return;
    return (
        <div className='w-1/2 mx-auto'>
            <h1 className='text-3xl font-bold text-center my-10'>Update Category</h1>
			<form onSubmit={handleSubmit(handleUpdateCategory)} className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
				<label className="block text-sm font-medium text-center">Name</label>
				<div className="flex justify-between items-center gap-5">
					<NamePart defValue={category.name} register={register} errors={errors} />
					<button className="btn btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
			<form onSubmit={handleSubmit(handleUpdateCategory)} className="bg-amber-200 p-3 rounded-xl shadow-lg mt-2">
				<label className="block text-sm font-medium text-center">Description</label>
				<div className="flex justify-between items-center gap-5">
					<DescriptionPart defValue={category.description} register={register} errors={errors} />
					<button className="btn btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateCategory;