import React from 'react';
import { Route, Routes } from "react-router";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ActivateAccount from '../components/registration/ActivationAccount';
import ResendActivation from '../components/registration/ResendActivation';
import ForgotPassword from '../components/registration/ForgotPassword';
import ForgotPasswordConfirm from '../components/registration/ForgotPasswordConfirm';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Profile from '../pages/Profile';
import ServiceDetail from '../pages/ServiceDetail';
import Orders from '../pages/Orders';

const AppRoutes = () => {
    return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="login" element={<Login />} />
				<Route path="activate/:uid/:token" element={<ActivateAccount />} />
				<Route path="register" element={<Register />} />
				<Route path="resend_activation" element={<ResendActivation />} />
				<Route path="reset_password" element={<ForgotPassword />} />
				<Route path="password/reset/confirm/:uid/:token" element={<ForgotPasswordConfirm />} />
				<Route path='services' element={<Services />} /> 
				<Route path='services/:id' element={<ServiceDetail/> } /> 
			</Route>
			<Route path='dashboard' element={<DashboardLayout />} >
				<Route index element={<Dashboard />} /> 
				<Route path='profile' element={<Profile/>} /> 
				<Route path='orders' element={<Orders/>} /> 
				
			</Route>
		</Routes>
	);
};

export default AppRoutes;