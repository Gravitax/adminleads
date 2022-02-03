import { Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";

import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";


function	App() {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Layout />}>

					<Route path="public/*" element={<PublicRoutes />} />

					<Route path="private/*" element={<PrivateRoutes />} />

					{/* catch all */}
					<Route path="*" element={<PublicRoutes />} />
				</Route>
			</Routes>
		</>
	);
}


export default App;
	