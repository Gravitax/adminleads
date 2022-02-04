import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { GlobalProvider } from "./contexts/GlobalContext"


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalProvider>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</GlobalProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
