import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from "react-router";
import { AuthProvider } from './context/AuthContext.jsx'
import { ServiceProvider } from './context/ServiceContext.jsx'
import { CategoriesProvider } from './context/CategoriesContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<ServiceProvider>
				<CategoriesProvider>
					<OrderProvider>
						<BrowserRouter>
							<AppRoutes />
						</BrowserRouter>
					</OrderProvider>
				</CategoriesProvider>
			</ServiceProvider>
		</AuthProvider>
	</StrictMode>,
);
