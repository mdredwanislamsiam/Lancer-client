import CategoryCard from "../components/categories/CategoryCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useCategoriesContext from "../hooks/useCategoriesContext";

const Categories = () => {
	const { categories, setCategories, loading} = useCategoriesContext();


    
    const handleDelete = (id) => {
        setCategories(categories.filter((c) => c.id !== id)); 
    }   

    if (!categories) return;
    return (
		<div className="">
			<h1 className=" text-xl lg:text-3xl font-bold text-center headTitle my-10">All Categories</h1>
			{loading && <LoadingSpinner />}

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
