import { createContext, useState } from "react";
import Axios from "axios";

import { get_role } from "../modules/functions";
import { auth } from "../modules/global_data";


const	AuthContext = createContext({});

const	auth_init = async () => {
	// console.log("auth init");
	const	{ token, dToken, isExp } = auth.data();

	Axios.defaults.baseURL = "https://api.admin-lead.agence-markus.com";
	if (isExp === true) {
		auth.remove();
	}
	else if (dToken) {
		// const	refreshToken = await Axios.get(`/users/findOne/${dToken.email}`)
		// 	.then((response) => response?.data);

		auth.set(token);
	}
};

export const	AuthProvider = ({ children }) => {
	auth_init();
	const	token			= auth.get();
	const	[user, setUser]	= useState(token);

	return (
		<AuthContext.Provider value={{
			user, setUser,
		}}>
			{
				user?.email && 
				<p>
					[ {get_role(user.role)} ] - {user.email}
				</p>
			}
			{children}
		</AuthContext.Provider>
	);
};


export default AuthContext;
