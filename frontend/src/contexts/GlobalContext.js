import { createContext } from "react";

import { AuthProvider } from "./AuthContext";


const	GlobalContext = createContext({});

export const	GlobalProvider = ({ children }) => {
	return (
		<GlobalContext.Provider value={{}}>
			<AuthProvider>
				{children}
			</AuthProvider>
		</GlobalContext.Provider>
	);
};


export default GlobalContext;
