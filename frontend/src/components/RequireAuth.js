import { Navigate, Outlet } from "react-router-dom";

import * as Auth from "../modules/auth"


const	RequireAuth = ({ allowedRoles = [] }) => {
	const	token	= Auth.get();
	let		access	= allowedRoles.length === 0 ? true : false;

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
	return (access ? <Outlet /> : <Navigate to="/login" />);
};


export default RequireAuth;
