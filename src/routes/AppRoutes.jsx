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
import PaymentSuccess from '../pages/PaymentSuccess';
import Notifications from '../pages/Notifications';
import AddServices from '../pages/AddServices';
import MyServices from '../pages/MyServices';
import ServiceImages from '../components/servicesComponents/addService/ServiceImages';
import UpdateServices from '../pages/UpdateServices';
import AddCategory from '../pages/AddCategory';
import Categories from '../pages/Categories';
import UpdateCategory from '../pages/UpdateCategory';
import InfoPage from '../pages/InfoPage';
import Order from '../components/dashboard/Order';
import Clients from '../components/dashboard/Clients';
import DeliveryOrders from '../components/dashboard/orderSections/DeliveryOrders';
import ActiveOrders from '../components/dashboard/orderSections/ActiveOrders';
import PaidOrders from '../components/dashboard/orderSections/PaidOrders';
import UnpaidOrders from '../components/dashboard/orderSections/UnpaidOrders';
import CanceledOrders from '../components/dashboard/orderSections/CanceledOrders';
import PrivateRoute from './PrivateRoute';

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
				<Route path="services" element={<Services />} />
				<Route path="services/:id" element={<ServiceDetail />} />
				<Route path="infoPage/:id" element={<InfoPage />} />
			</Route>
			<Route
				path="dashboard"
				element={
					<PrivateRoute>
						<DashboardLayout />
					</PrivateRoute>
				}>
				<Route element={<Dashboard />}>
					<Route index element={<Order />} />
					<Route path="paidOrders" element={<PaidOrders />} />
					<Route path="deliveredOrders" element={<DeliveryOrders />} />
					<Route path="activeOrders" element={<ActiveOrders />} />
					<Route path="unpaidOrders" element={<UnpaidOrders />} />
					<Route path="canceledOrders" element={<CanceledOrders />} />
					<Route path="clients" element={<Clients />} />
				</Route>
				<Route path="profile" element={<Profile />} />
				<Route path="orders" element={<Orders />} />
				<Route path="payment/success" element={<PaymentSuccess />} />
				<Route path="notifications" element={<Notifications />} />
				<Route path="services/add" element={<AddServices />} />
				<Route path="services/my" element={<MyServices />} />
				<Route path="services/add/images/:serviceId" element={<ServiceImages />} />
				<Route path="services/update/:serviceId" element={<UpdateServices />} />
				<Route path="categories/update/:categoryId" element={<UpdateCategory />} />
				<Route path="categories/add" element={<AddCategory />} />
				<Route path="categories" element={<Categories />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;