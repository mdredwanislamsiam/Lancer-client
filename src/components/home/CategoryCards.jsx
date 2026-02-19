import  { useEffect, useState } from 'react';
import GlassIcons from '../common/GlassIcons';
import authAPIClient from '../../services/auth-api-client';
import useCategoriesContext from '../../hooks/useCategoriesContext';


const CategoryCards = () => {
	const [fiveCategories, setFiveCategories] = useState([]); 
	const { categories} = useCategoriesContext(); 
	const [categoryServices, setCategoryServices] = useState([])
	
	const handleSetFiveCategories = () => {
		if (!categories || categories.length === 0) return; 
		setFiveCategories(categories.slice(0, 5)); 
	}


	const fetchFiveServices = async (id) => {
		try {
			const res = await authAPIClient.get(`/categories/five_services/${id}`);
			return (res.data); 
		}	
		catch (error) {
			console.log(error); 
		}
	}

	useEffect(() => { 
		handleSetFiveCategories(); 
		const fetchServicesForFive = async () => {
			try {
				const servicesData = await Promise.all(fiveCategories.map((cat) => fetchFiveServices(cat.id)));
				// console.log(servicesData)
				setCategoryServices(servicesData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchServicesForFive();
	}, [categories])


    return (
		<div style={{ position: "relative" }} className=" ">
			<GlassIcons className="custom-class" colorful categories={fiveCategories} categoryServices={categoryServices} />
		</div>
	);
};

export default CategoryCards;