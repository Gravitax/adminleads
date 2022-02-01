import { Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";
import Navbar from "./components/Navbar/Navbar";
import RequireAuth from "./components/RequireAuth"

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Leads from "./pages/Leads/Leads";
import Users from "./pages/Users/Users";
import Register from "./pages/Users/Register/Register";

import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";


const	roles = {
	"Admin"		: 0,
	"Markus"	: 1,
	"Media"		: 2,
	"Client"	: 3,
};

function	App() {
	const	{ user } = useContext(AuthContext);

	return (
		<>
			{user?.username && <Navbar />}
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* public routes */}
					<Route path="/public/login"	element={<Login />} />

					{/* log required routes */}
					<Route element={<RequireAuth />}>
						<Route path="/private/home"		element={<Home />} />
						<Route path="/private/leads"	element={<Leads />} />
						<Route path="/private/account"	element={<Account />} />

						{/* auth required routes */}
						<Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Markus]} />}>
							<Route path="/private/users"			element={<Users />} />
							<Route path="/private/users/register"	element={<Register />} />
						</Route>
					</Route>

					{/* catch all */}
					<Route path="*" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
}


export default App;
	