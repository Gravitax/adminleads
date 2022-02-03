import { Routes, Route } from "react-router-dom";

import RequireAuth from "../components/RequireAuth"

import Login from "../pages/Login/Login";


const	PublicRoutes = () => {
	return (
		<Routes>
			{/* public routes */}
			<Route path="/*" element={<RequireAuth auth={false} />}>
				<Route index	element={<Login />} />

				{/* catch all */}
				<Route path="*" element={<Login />} />
			</Route>
		</Routes>
	);
};


export default PublicRoutes;
