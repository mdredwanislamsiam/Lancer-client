import React from 'react';
import useCategories from '../../hooks/useCategories';
import { Link } from 'react-router';

const CategoryCard = ({ category, onDelete }) => {
    
    const { deleteCategory } = useCategories();
    // console.log(category);
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this Category?")) {
			await deleteCategory(category.id);
			if (onDelete) onDelete(category.id);
		}
    };

    if (!category) return;
    return (
		<div className="card shadow-sm bg-amber-800 rounded-xl h-full p-5">
			<div className="card-body ">
				<h1 className="card-title">{category.name}</h1>
				<p className="text-base-300">{category.description}</p>
			</div>
			<div className="mt-3 flex justify-between gap-2">
				<Link to={`/dashboard/categories/update/${category.id}`}>
					<button className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] ">Edit Service</button>
				</Link>
				<button
					onClick={() => handleDelete(category.id)}
					className="btn bg-[#BBE1FA] border-0 hover:bg-[#62afe3] ">
					Delete Service
				</button>
			</div>
		</div>
	);
};

export default CategoryCard;