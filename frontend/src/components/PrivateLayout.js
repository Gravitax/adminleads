import { Routes, Route } from "react-router-dom";

import AuthMiddleware from "../components/AuthMiddleware"
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Leads from "../pages/Leads/Leads";
import Manager from "../pages/Manager/Manager";

import Account from "../pages/Account/Account";

import Medias from "../pages/Manager/Medias/Medias";
import CreateMedias from "../pages/Manager/Medias/Create/CreateMedias";

import Clients from "../pages/Manager/Clients/Clients";
import CreateClients from "../pages/Manager/Clients/Create/CreateClients";

import Services from "../pages/Manager/Services/Services";
import CreateServices from "../pages/Manager/Services/Create/CreateServices";

import Users from "../pages/Manager/Users/Users";
import CreateUsers from "../pages/Manager/Users/Create/CreateUsers";

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
							<Route path="create"	element={<CreateUsers />} />
							<Route path="*"			element={<Users />} />
						</Route>
						<Route path="medias/*">
							<Route path="create"	element={<CreateMedias />} />
							<Route path="*"			element={<Medias />} />
						</Route>
						<Route path="clients/*">
							<Route path="create"	element={<CreateClients />} />
							<Route path="*"			element={<Clients />} />
						</Route>
						<Route path="services/*">
							<Route path="create"	element={<CreateServices />} />
							<Route path="*"			element={<Services />} />
						</Route>
						<Route path="*"			element={<Manager />} />
					</Route>

					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
		</>
	);
};


export default PrivateLayout;
