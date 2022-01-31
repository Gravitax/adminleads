import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout";
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
					<Route path="/"			element={<Login />} />
					<Route path="/login"	element={<Login />} />

					{/* logged routes */}
					<Route element={<RequireAuth />}>
						<Route path="/home"		element={<Home />} />
						<Route path="/leads"	element={<Leads />} />
						<Route path="/account"	element={<Account />} />

						{/* protected routes */}
						<Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Markus]} />}>
							<Route path="/users" element={<Users />} />
							<Route path="/users/register"	element={<Register />} />
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
	