import { Link } from "react-router-dom";

import * as gd from "../../modules/global_data";

import "./Manager.css";


function	Manager() {
	return (
		<div id="container_manager">
			<Link to={gd.path_routes.medias} className="link">
				Medias
			</Link>
			<Link to={gd.path_routes.clients} className="link">
				Clients
			</Link>
			<Link to={gd.path_routes.services} className="link">
				Services
			</Link>
			<Link to={gd.path_routes.users} className="link">
				Users
			</Link>
		</div>
	);
}


export default Manager;
