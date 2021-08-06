import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
import { useForm, useController } from "react-hook-form";

import { check_page_access } from "../../modules/functions";
import { extractParamsUrl } from "../../modules/functions";
import { regex_username } from "../../modules/functions";

import "./Account.css";


function	Account(props) {
	const	history 	= useHistory();
	const	token		= localStorage.getItem("auth_token");
	let		dToken		= jwt_decode(token);
	
	if (!dToken || check_page_access(true) === false)
		history.push("/");

	const	get_params	= extractParamsUrl(props.location.search);
	const	username	= get_params["username"] || dToken.username;

	if (get_params["username"] && check_page_access(true, 1) === false
			&& get_params["username"] !== dToken.username)
		history.push(`/account?username=${dToken.username}`);

	const	{ register, handleSubmit, setError, control, formState, }	= useForm();
	const	{ isSubmitting, errors, }	= formState;

	const	update_user	= (data, user) => {
		Axios.put(`api/users/update`, { token: token, data: { ...data, username, role : dToken.role, }, })
			.then((response) => {
				if (response.data.token) {
					if (user.username === dToken.username) {
						// on renew le token si c'est l'user actuel qui est update
						localStorage.setItem("auth_token", response.data.token);
						dToken = jwt_decode(response.data.token);
					}
					if (data.new_username)
						history.push(`/account?username=${data.new_username}`);
					else
						history.push(`/account?username=${user.username}`);
				}
			});

	};

	const	user_already_in_use = (data, user) => {
		return (
			Axios.get(`/api/users/readOne/${data.new_username}`, { params : { token } })
				.then((response) => {
					if (response.data.length > 0 || data.new_username === user.username) {
						setError("new_username", { type	: "manual", message	: "new username is already in use", });
						return (true);
					}
					return (false);
				})
				.catch(() => { return (true); })
		);
	}

	const	check_input	= async (data, user) => {
		let	error	= false;
		
		if (!data || !user)
			return (!error);
		if (data.new_username) {
			// on verifie que le new_username n'est pas déjà présent en DB et qu'il a une syntaxe correcte
			error = await user_already_in_use(data, user);
			if (!regex_username(data.new_username)) {
				setError("new_username", { type	: "manual", message	: "new username got invalid syntax", });
				error = true;
			}
		}
		if (data.new_role && (parseInt(data.new_role, 10) === user.role)) {
			setError("new_role", { type	: "manual", message	: "new role must be different", });
			error = true;
		}
		if (data.new_password && (data.new_password.length < 4)) {
			setError("new_password", { type	: "manual", message	: "new password is too short", });
			error = true;
		}
		return (!error);
	};

	const	wait		= (duration = 500) => {
		return (new Promise((resolve) => { window.setTimeout(resolve, duration); }));
	};

	const	onSubmit	= async (data) => {

		await wait();

		if (!data.new_username && !data.new_role && !data.new_password)
			return ;
		if (data.password) {
			Axios.get(`/api/users/readOne/${username}`, { params : { token } })
				.then((response) => {
					let	user	= jwt_decode(response.data);

					// on verifie que l'user qui update rentre le bon mdp
					bcrypt.compare(data.password, dToken.password)
						.then(async (response) => {
							let	tmp = await check_input(data, user).then((v) => { return (v); })

							if (tmp === true && response === true) {
								// le pwd est en clair donc on le hash
								data.password = dToken.password;
								update_user(data, user);
							}
							else if (response === false) {
								setError("password", { type	: "manual", message	: "wrong password", });
							}
						});
				});
		}
		else
			setError("password", { type	: "manual", message	: "password is required", });
	};

	const	Input = ({ ...data }) => {		
		const	{
			field		: { ref, ...inputProps },
			// fieldState	: { invalid, isTouched, isDirty },
			// formState	: { touchedFields, dirtyFields },
		} = useController({
			name		: data.name,
			control,
			// rules		: { required: false },
			defaultValue: data.defaultValue || "",
		});

		return (
			<div className={data.className}>
				<label htmlFor={data.name}> {data.children} </label>
				<input {...inputProps} id={data.name} type={data.type} placeholder={data.placeholder} />
			</div>
		);
	}

	useEffect(() => {
		// au chargement on vérifie que l'username existe
		Axios.get(`/api/users/readOne/${username}`, { params : { token } })
			.then((response) => {
				if (!response.data || response.data.length < 1)
					history.push(`/account?username=${dToken.username}`);
			});
	}, [username, token, history, dToken]);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>{username}</h3>

				<Input control={control} className="my_input" name="new_username" type="text" placeholder="new username"></Input>
				{errors.new_username && <b className="error_message">{errors.new_username.message}</b>}

				{ dToken.role === 1 &&
					<div className="my_input">
						<select {...register("new_role")}>
							<option value=""> Role </option>
							<option value="0"> Default </option>
							<option value="1"> Admin </option>
						</select>
					</div>
				}
				{errors.new_role && <b className="error_message">{errors.new_role.message}</b>}

				<Input control={control} className="my_input" name="new_password" type="password" placeholder="new password"></Input>
				{errors.new_password && <b className="error_message">{errors.new_password.message}</b>}

				<Input control={control} className="my_input" name="password" type="password" placeholder="password"></Input>
				{errors.password && <b className="error_message">{errors.password.message}</b>}

				<button disabled={isSubmitting}>UPDATE</button>

			</form>
		</div>
	);
}

	
export default Account;
	