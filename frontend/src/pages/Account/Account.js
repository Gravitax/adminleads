import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";

import { extractParamsUrl } from "../../modules/functions";
import AuthContext from "../../contexts/AuthContext";
import * as gd from "../../modules/global_data";
import { Input, check_input } from "./Input";

import "./Account.css";


function	Account() {
	const	token		= gd.auth.get();
	const	location	= useLocation();
	// const	navigate	= useNavigate();
	const	get_params	= extractParamsUrl(location?.search);
	
	let		[email, setEmail]	= useState(get_params["email"] || token.email);
	const	[update, setUpdate] = useState("");

	// si on arrive sur cet page sans être admin
	// on dit que l'user à modifier est celui qui est connecté
	if (!gd.auth.isAllowed([0, 1]) && get_params["email"] !== token.email)
		email = token.email;

	const	{ register, handleSubmit, setError, control, formState, } = useForm();
	const	{ isSubmitting, errors, } = formState;
	const	{ setUser } = useContext(AuthContext);

	const	update_user	= (data, user_to_update) => {
		Axios.put(`/users/update`, { data: { ...data, email, role : token.role, }, })
			.then((response) => {
				setUpdate(response.data.message);
				if (response.data.token) {
					// si l'user à modifier est celui connecté alors on actualise son token
					if (user_to_update.email === token.email) {
						gd.auth.set(response.data.token);
						setUser(jwt_decode(response.data.token));
					}
					// si un nouveau email est enregistré on actualise celui reçu de base
					if (data.new_email)
						setEmail(data.new_email);
				}
			});

	};

	const	onSubmit = (data) => {
		setUpdate("");
		if (!data.new_email && !data.new_role && !data.new_password)
			return ;
		if (data.password) {
			Axios.get(`/users/findOne/${email}`)
				.then((response) => {
					let	user_to_update = jwt_decode(response.data);

					// on verifie que l'user qui update rentre le bon mdp
					bcrypt.compare(data.password, token.password)
						.then(async (response) => {
							let	clean_input = await check_input(data, user_to_update, setError).then((v) => { return (v); })

							if (clean_input === true && response === true) {
								// le pwd est en clair donc on le hash
								data.password = token.password;
								update_user(data, user_to_update);
							}
							else if (response === false) {
								setError("password", { type	: "manual", message	: "wrong password", });
							}
						});
				});
		}
		else
			setError("password", { type : "manual", message : "password is required", });
	};

	useEffect(() => {
		// au chargement on vérifie que l'email existe
		// sinon on dit que l'user à modifier est celui qui est connecté
		Axios.get(`/users/findOne/${email}`)
			.then((response) => {
				if (!response.data || response.data.length < 1)
					setEmail(token.email);
			});
	}, []);

	return (
		<div className="account">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>{email}</h3>

				<Input control={control} className="my_input" name="new_email" type="text" placeholder="new email"></Input>
				{errors.new_email && <b className="error_message">{errors.new_email.message}</b>}

				{ gd.auth.isAllowed([0, 1]) &&
					<div className="my_input">
						<select {...register("new_role")}>
							<option value=""> Role </option>
							{
								Object.entries(gd.roles).map(([key, value]) => {
									return (
										<option value={value}> {key} </option>
									);
								})
							}
						</select>
					</div>
				}
				{errors.new_role && <b className="error_message">{errors.new_role.message}</b>}

				<Input control={control} className="my_input" name="new_password" type="password" placeholder="new password"></Input>
				{errors.new_password && <b className="error_message">{errors.new_password.message}</b>}

				<Input control={control} className="my_input" name="password" type="password" placeholder="password"></Input>
				{errors.password && <b className="error_message">{errors.password.message}</b>}

				<button disabled={isSubmitting}>UPDATE</button>

				<p> { update } </p>

			</form>
		</div>
	);
}

	
export default Account;
	