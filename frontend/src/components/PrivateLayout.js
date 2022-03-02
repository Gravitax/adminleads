import { Routes, Route } from "react-router-dom";

import AuthMiddleware from "../components/AuthMiddleware"
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Leads from "../pages/Leads/Leads";
import Manager from "../pages/Manager/Manager";
import Account from "../pages/Account/Account";
import Medias from "../pages/Manager/Medias/Medias";
import Clients from "../pages/Manager/Clients/Clients";
import Services from "../pages/Manager/Services/Services";
import Users from "../pages/Manager/Users/Users";
import Register from "../pages/Manager/Users/Register/Register";

import { roles } from "../modules/global_data";


const	PrivateLayout = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/*" element={<AuthMiddleware />}>
					<Route path="leads"		element={<Leads />} />
					<Route path="account"	element={<Account />} />

					{/* auth required routes */}
					<Route path="manager/*" element={<AuthMiddleware allowedRoles={[roles.Admin, roles.Markus]} />}>
						<Route path="users/*">
							<Route path="register"	element={<Register />} />
							<Route path="*"			element={<Users />} />
						</Route>
						<Route path="medias"	element={<Medias />} />
						<Route path="clients"	element={<Clients />} />
						<Route path="services"	element={<Services />} />
						<Route path="*"			element={<Manager />} />
					</Route>

					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
		</>
	);
};


export default PrivateLayout;
