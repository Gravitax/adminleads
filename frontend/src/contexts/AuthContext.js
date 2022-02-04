import { createContext, useState } from "react";
import Axios from "axios";

import { auth } from "../modules/global_data";


const	AuthContext = createContext({});

const	auth_init = () => {
	const	{ token, dToken, isExp } = auth.data();

	Axios.defaults.baseURL = "https://api.admin-lead.agence-markus.com";
	if (isExp === true) {
		auth.remove();
	}
	else if (dToken) {
		auth.set(token);
	}
};

export const	AuthProvider = ({ children }) => {
	auth_init();
	const	token = auth.get();
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
