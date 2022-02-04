import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
import { useForm, useController } from "react-hook-form";

import { extractParamsUrl, regex_username } from "../../modules/functions";
import * as gd from "../../modules/global_data";

import "./Account.css";


function	Account() {
	const	navigate 	= useNavigate();
	const	token		= gd.auth.get();

	const	location	= useLocation();
	const	get_params	= extractParamsUrl(location?.search);
	const	username	= get_params["username"] || token.username;

	if (get_params["username"] && token?.role > 0
			&& get_params["username"] !== token.username)
		navigate(`${gd.path_routes.account}?username=${token.username}`);

	const	{ register, handleSubmit, setError, control, formState, }	= useForm();
	const	{ isSubmitting, errors, }	= formState;

	const	update_user	= (data, user) => {
		Axios.put(`/users/update`, { data: { ...data, username, role : token.role, }, })
			.then((response) => {
				if (response.data.token) {
					if (user.username === token.username) {
						gd.auth.set(response.data.token);
						token = gd.auth.get();
					}
					if (data.new_username)
						navigate(`${gd.path_routes.account}?username=${data.new_username}`);
					else
						navigate(`${gd.path_routes.account}?username=${user.username}`);
				}
			});

	};

	const	user_already_in_use = (data, user) => {
		return (
			Axios.get(`/users/readOne/${data.new_username}`)
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
			Axios.get(`/users/readOne/${username}`)
				.then((response) => {
					let	user	= jwt_decode(response.data);

					// on verifie que l'user qui update rentre le bon mdp
					bcrypt.compare(data.password, token.password)
						.then(async (response) => {
							let	tmp = await check_input(data, user).then((v) => { return (v); })

							if (tmp === true && response === true) {
								// le pwd est en clair donc on le hash
								data.password = token.password;
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
		Axios.get(`/users/readOne/${username}`)
			.then((response) => {
				if (!response.data || response.data.length < 1)
					navigate(`${gd.path_routes.account}?username=${token.username}`);
			});
	}, [username, token, navigate]);

	return (
		<div className="account">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>{username}</h3>

				<Input control={control} className="my_input" name="new_username" type="text" placeholder="new username"></Input>
				{errors.new_username && <b className="error_message">{errors.new_username.message}</b>}

				{ token.role === 0 &&
					<div className="my_input">
						<select {...register("new_role")}>
							<option value=""> Role </option>
							<option value="0"> Admin </option>
							<option value="1"> Markus </option>
							<option value="2"> Media </option>
							<option value="3"> Clients </option>
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
	