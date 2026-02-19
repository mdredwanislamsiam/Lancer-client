import { Link } from 'react-router';
import useCategoriesContext from '../../hooks/useCategoriesContext';
import useAuthContext from '../../hooks/useAuthContext';

const CategoryCard = ({ category, onDelete }) => {
    
	const { deleteCategory } = useCategoriesContext();
	const { user } = useAuthContext(); 
    // console.log(category);
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this Category?")) {
			await deleteCategory(category.id);
			if (onDelete) onDelete(category.id);
		}
    };

    if (!category) return;
    return (
		<div className="card shadow-sm bg-linear-to-b from-[#011e53e3] to-[#dfd6b958] hover:to-[#af8c02] transition-colors rounded-xl h-full p-5">
			<div className="card-body ">
				<h1 className="card-title text-black text-sm lg:text-lg">{category.name}</h1>
				<p className="text-base-300 text-xs lg:text-sm">{category.description}</p>
			</div>
			<div className="mt-3 flex justify-between gap-2">
				<Link to={user?.is_staff && `/dashboard/categories/update/${category.id}`}>
					<button
						className={`px-3 py-2 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-md ${!user?.is_staff && "hidden"}`}>
						Edit Category
					</button>
				</Link>
				<button
					disabled={!user?.is_staff}
					onClick={() => handleDelete(category.id)}
					className={`px-3 py-2 font-bold text-white rounded-full bg-gradient-to-r from-[#32435a] to-[#678b9d] hover:from-[#072e4c] hover:to-[#4a7ca3] shadow-lg shadow-[#32435a]/40 transform transition-transform duration-300 hover:scale-105 ring-1 ring-[#678b9d]/50 hover:ring-[#072e4c]/70 text-xs lg:text-md ${!user?.is_staff && "hidden"}`}>
					Delete category
				</button>
			</div>
		</div>
	);
};

export default CategoryCard;