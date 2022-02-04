import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";

import "./App.css";


const	App = () => {
	return (
		<Routes>
			<Route path="private/*" element={<PrivateLayout />} />
			<Route path="*" element={<PublicLayout />} />
		</Routes>
	);
}


export default App;
	