import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { ServiceProvider } from './context/ServiceContext.jsx'
import { CategoriesProvider } from './context/CategoriesContext.jsx'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<ServiceProvider>
				<CategoriesProvider>
					<BrowserRouter>
						<AppRoutes />
					</BrowserRouter>
				</CategoriesProvider>
			</ServiceProvider>
		</AuthProvider>
	</StrictMode>,
);
