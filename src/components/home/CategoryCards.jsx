import React from 'react';
import GlassIcons from '../common/GlassIcons';
import { FiBarChart2, FiBook, FiCloud, FiEdit, FiFileText, FiHeart } from 'react-icons/fi';
import { GrTechnology } from 'react-icons/gr';
import { SiAltiumdesigner } from 'react-icons/si';
import { TbWriting } from 'react-icons/tb';
import { MdOutlineMonitorHeart, MdOutlineVideoSettings } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';

const CategoryCards = () => {
    const items = [
		{ icon: <GrTechnology size={50} />, color: "gray", label: "Programming & Tech" },
		{ icon: <SiAltiumdesigner size={50} />, color: "gray", label: "Graphics & Desing" },
		{ icon: <MdOutlineMonitorHeart size={50} />, color: "gray", label: "Degital Marketing" },
		{ icon: <TbWriting size={50} />, color: "gray", label: "Writing" },
		{ icon: <MdOutlineVideoSettings size={50} />, color: "gray", label: "Video Animation" },
		{ icon: <FaPeopleGroup size={50}/>, color: "gray", label: "Bussiness" },
	];
    return (
		<div style={{ position: "relative" }} className="">
			<GlassIcons items={items} className="custom-class" colorful />
		</div>
	);
};

export default CategoryCards;