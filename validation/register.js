const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	let { name, email, password, password2 } = data;
	let errors = {};

	// Assign empty strings if no value
	email = isEmpty(email) ? '' : email;
	password = isEmpty(password) ? '' : password;
	
	if(!Validator.isEmail(email)) {
		errors.email = "Il semble que cet email ne soit pas valide :)";
	}
	if(Validator.isEmpty(email)) {
		errors.email = "Vous devez fournir un email pour vous enregistrer";
	}

	if( !Validator.isLength(password, { min: 6 }) ) {
		errors.password = "Le mot de passe doit faire entre 6 et 30 caractères";
	}

	if(Validator.isEmpty(password)) {
		errors.password = "Merci de renseigner votre mot de passe";
	}

	return { errors, isValid: isEmpty(errors) };
};