import { Routes, Route } from "react-router-dom";

import RequireAuth from "../components/RequireAuth"
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Account from "../pages/Account/Account";
import Leads from "../pages/Leads/Leads";
import Users from "../pages/Users/Users";
import Register from "../pages/Users/Register/Register";

import { roles } from "../config";


const	PrivateRoutes = () => {
	return (
		<>
			<Navbar />
			<Routes>
				{/* private routes */}
				<Route path="/*" element={<RequireAuth />}>
					<Route index			element={<Home />} />
					<Route path="leads"		element={<Leads />} />
					<Route path="account"	element={<Account />} />

					{/* auth required routes */}
					<Route path="users/*" element={<RequireAuth allowedRoles={[roles.Admin, roles.Markus]} />}>
						<Route index			element={<Users />} />
						<Route path="register"	element={<Register />} />

						<Route path="*" element={<Users />} />
					</Route>

					{/* catch all */}
					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
		</>
	);
};


export default PrivateRoutes;
