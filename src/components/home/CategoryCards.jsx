import React, { useEffect, useState } from 'react';
import GlassIcons from '../common/GlassIcons';
import { FiBarChart2, FiBook, FiCloud, FiEdit, FiFileText, FiHeart } from 'react-icons/fi';
import { GrTechnology } from 'react-icons/gr';
import { SiAltiumdesigner } from 'react-icons/si';
import { TbWriting } from 'react-icons/tb';
import { MdOutlineMonitorHeart, MdOutlineVideoSettings } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import authAPIClient from '../../services/auth-api-client';
import useCategories from '../../hooks/useCategories';

const CategoryCards = () => {
	const [fiveCategories, setFiveCategories] = useState([]); 
	const { categories, fetchCategories} = useCategories(); 
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
		<div style={{ position: "relative" }} className="">
			<GlassIcons className="custom-class" colorful categories={fiveCategories} categoryServices={categoryServices} />
		</div>
	);
};

export default CategoryCards;