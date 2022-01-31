import { createContext, useState } from "react";
import Axios from "axios";

import * as Auth from "../modules/auth";


const	AuthContext = createContext({});

const	auth_init = () => {
	const	[token, dToken, isExp] = Auth.data();

	Axios.defaults.baseURL = "https://api.admin-lead.agence-markus.com";
	if (isExp === true) {
		Auth.remove();
	}
	else if (dToken) {
		Auth.set(token);
	}
};

export const	AuthProvider = ({ children }) => {
	auth_init();
	const	token = Auth.get();
	const	[user, setUser] = useState(token);

	return (
		<AuthContext.Provider value={{
			user, setUser
		}}>
			{
				user?.username && 
				<p>
					[[ user logged : {user.username}&nbsp;-&nbsp;role : {user.role} ]]
				</p>
			}
			{children}
		</AuthContext.Provider>
	);
};


export default AuthContext;
