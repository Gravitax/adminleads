import { Routes, Route } from "react-router-dom";

import AuthMiddleware from "../components/AuthMiddleware"

import Login from "../pages/Login/Login";


const	PublicLayout = () => {
	return (
		<Routes>
			<Route path="/*" element={<AuthMiddleware auth={false} />}>
				<Route path="*" element={<Login />} />
			</Route>
		</Routes>
	);
};


export default PublicLayout;
