import { Navigate, Outlet } from "react-router-dom";

import * as config from "../config"


const	RequireAuth = ({ allowedRoles = [], auth = true }) => {
	const	token		= config.Auth.get();
	let		access		= !allowedRoles.length ? true : false;

	if (!auth)
		return (token ? <Navigate to={config.path_routes.home} /> : <Outlet />);
	if (!token)
		access = false;
	else if (allowedRoles.length > 0) {
		for (let i = 0; i < allowedRoles.length; i++) {
			if (`${allowedRoles[i]}` === `${token.role}`) {
				access = true;
				break ;
			}
		}
	}
	return (access ? <Outlet /> : <Navigate to={config.path_routes.login} />);
};


export default RequireAuth;
