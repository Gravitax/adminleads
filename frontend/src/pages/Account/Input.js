import Axios from "axios";
import { useController } from "react-hook-form";

import { regex_username } from "../../modules/functions";


const	user_already_in_use = (data, user, setError) => {
	return (
		Axios.get(`/users/readOne/${data.new_email}`)
			.then((response) => {
				if (response.data.length > 0 || data.new_email === user.email) {
					setError("new_email", { type : "manual", message : "new email is already in use", });
					return (true);
				}
				return (false);
			})
			.catch(() => { return (true); })
	);
}

const	check_input	= async (data, user, setError) => {
	let	error = false;
	
	if (!data || !user)
		return (!error);
	if (data.new_email) {
		// on verifie que le new_email n'est pas déjà présent en DB et qu'il a une syntaxe correcte
		error = await user_already_in_use(data, user, setError);
		if (!regex_username(data.new_email)) {
			setError("new_email", { type : "manual", message : "new email got invalid syntax", });
			error = true;
		}
	}
	if (data.new_role && (parseInt(data.new_role, 10) === user.role)) {
		setError("new_role", { type : "manual", message : "new role must be different", });
		error = true;
	}
	if (data.new_password && (data.new_password.length < 4)) {
		setError("new_password", { type : "manual", message : "new password is too short", });
		error = true;
	}
	return (!error);
};

const	Input = ({ ...data }) => {
	const	{
		field		: { ref, ...inputProps },
		// fieldState	: { invalid, isTouched, isDirty },
		// formState	: { touchedFields, dirtyFields },
	} = useController({
		name		: data.name,
		control		: data.control,
		// rules		: { required: false },
		defaultValue: data.defaultValue || "",
	});

	return (
		<div className={data.className}>
			<label htmlFor={data.name}> {data.children} </label>
			<input {...inputProps} autoComplete="off"
				id={data.name} type={data.type} placeholder={data.placeholder}
			/>
		</div>
	);
}


export {
	Input,
	check_input
};
