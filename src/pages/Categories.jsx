import React from "react";
import useCategories from "../hooks/useCategories";
import CategoryCard from "../components/categories/CategoryCard";

const Categories = () => {
	const { categories, setCategories, loading} = useCategories();


    
    const handleDelete = (id) => {
        setCategories(categories.filter((c) => c.id !== id)); 
    }   

    if (!categories) return;
    return (
		<div>
			<h1 className="text-3xl font-bold text-center my-10">All Categories</h1>
			{loading && (
				<div className="flex justify-center items-center min-h-screen pb-40">
					<span className="loading loading-spinner loading-xl  text-secondary"></span>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{categories.map((category) => (
					<div key={category.id}>
						<CategoryCard category={category} onDelete={handleDelete} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
