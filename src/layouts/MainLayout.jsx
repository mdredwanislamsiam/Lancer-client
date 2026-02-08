import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = () => {

    return (
		<div>
			<Navbar/>
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainLayout;