import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import Leads from "./pages/Leads/Leads";
import Profil from "./pages/Profil/Profil";

import Navbar from "./components/Navbar";


function	App(props) {
	return (
		<div className="App">
			<Router forceRefresh={true}>
				<Navbar />
				
				<Switch>
					<Route path="/"			exact component={Home} />
					<Route path="/login"	exact component={Login} />
					<Route path="/register"	exact component={Register} />
					<Route path="/account"	exact component={Account} />
					<Route path="/leads"	exact component={Leads} />
					<Route path="/profil"	exact component={Profil} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	);
}


export default App;
	