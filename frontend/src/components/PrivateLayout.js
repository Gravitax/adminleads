import { Routes, Route } from "react-router-dom";

import AuthMiddleware from "../components/AuthMiddleware"
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Leads from "../pages/Leads/Leads";
import Manager from "../pages/Manager/Manager";

import Medias from "../pages/Manager/Medias/Medias";
import CreateMedias from "../pages/Manager/Medias/Create/CreateMedias";
import InfoMedias from "../pages/Manager/Medias/Info/InfoMedias";

import Clients from "../pages/Manager/Clients/Clients";
import CreateClients from "../pages/Manager/Clients/Create/CreateClients";
import InfoClients from "../pages/Manager/Clients/Info/InfoClients";

import Services from "../pages/Manager/Services/Services";
import CreateServices from "../pages/Manager/Services/Create/CreateServices";
import InfoServices from "../pages/Manager/Services/Info/InfoServices";

import Users from "../pages/Manager/Users/Users";
import CreateUsers from "../pages/Manager/Users/Create/CreateUsers";
import UpdateUsers from "../pages/Manager/Users/Update/UpdateUsers";

import { roles } from "../modules/global_data";


const	PrivateLayout = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/*" element={<AuthMiddleware />}>
					<Route path="leads"		element={<Leads />} />

					{/* auth required routes */}
					<Route path="manager/*" element={<AuthMiddleware allowedRoles={[roles.Admin, roles.Markus]} />}>
						<Route path="users/*">
							<Route path="create"	element={<CreateUsers />} />
							<Route path="update"	element={<UpdateUsers />} />
							<Route path="*"			element={<Users />} />
						</Route>
						<Route path="medias/*">
							<Route path="create"	element={<CreateMedias />} />
							<Route path="info"		element={<InfoMedias />} />
							<Route path="*"			element={<Medias />} />
						</Route>
						<Route path="clients/*">
							<Route path="create"	element={<CreateClients />} />
							<Route path="info"		element={<InfoClients />} />
							<Route path="*"			element={<Clients />} />
						</Route>
						<Route path="services/*">
							<Route path="create"	element={<CreateServices />} />
							<Route path="info"		element={<InfoServices />} />
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
