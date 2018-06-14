const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	let { name, email, password, password2 } = data;
	let errors = {};

	// Assign empty strings if no value
	// name = !isEmpty(name) ? name : '';
	email = !isEmpty(email) ? email : '';
	password = !isEmpty(password) ? password : '';
	password2 = !isEmpty(password2) ? password2 : '';
	// if( !Validator.isLength(name, { min: 2, max: 30 }) ) {
	// 	errors.name = "Name must be between 2 and 30 characters";
	// }

	// if(Validator.isEmpty(name)) {
	// 	errors.name = "Name must be between 2 and 30 characters";
	// }

	if(Validator.isEmpty(email)) {
		errors.email = "Email isrequired";
	}
	if(!Validator.isEmail(email)) {
		errors.email = "Invalid email";
	}

	if(Validator.isEmpty(password)) {
		errors.password = "Password is required";
	}

	if( !Validator.isLength(password, { min: 6 }) ) {
		errors.password = "Password must be between 6 and 30 characters";
	}

	if(!Validator.equals(password, password2)) {
		errors.password2 = "Passwords must match";
	}

	if(Validator.isEmpty(password2)) {
		errors.password2 = "Confirm Password is required";
	}


	return { errors, isValid: isEmpty(errors) };
};