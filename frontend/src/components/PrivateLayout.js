import { Routes, Route } from "react-router-dom";

import AuthMiddleware from "../components/AuthMiddleware"
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Account from "../pages/Account/Account";
import Leads from "../pages/Leads/Leads";
import Users from "../pages/Users/Users";
import Register from "../pages/Users/Register/Register";

import { roles } from "../modules/global_data";


const	PrivateRoutes = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/*" element={<AuthMiddleware />}>
					<Route path="leads"		element={<Leads />} />
					<Route path="account"	element={<Account />} />

					{/* auth required routes */}
					<Route path="users/*" element={<AuthMiddleware allowedRoles={[roles.Admin, roles.Markus]} />}>
						<Route path="register"	element={<Register />} />
						<Route path="*"			element={<Users />} />
					</Route>

					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
		</>
	);
};


export default PrivateRoutes;
