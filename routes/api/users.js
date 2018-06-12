const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

const keys = require('../../config/keys');

// Load User model

const User = require('../../models/User');

// @router GET api/users
// @desc Return a list of users
// @access Private

router.get('/', (req, res) => {
	res.json({
		msg: "Users route works"
	})
});

// @router POST api/users/register
// @desc Register a user
// @access Public

router.post('/register', (req, res) => {

	let { name, email, password } = req.body;

	User.findOne({ email })
		.then((user) => {
			if (user) {
				// Send error message
				res.status(400).json({
					email: "Email already exists"
				})

			} else {

				const newUser = new User({
					name,
					email,
					password
				});

				// Generate Salt for password encryption
				bcrypt.genSalt(10, (err, salt) => {
					
					if (err) throw err;

					// Generate hash from password and replace plain text password befor saving
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						
						if(err) throw err;
						newUser.password = hash;
						newUser.save()
							.then((user) => {
								console.log(user)
								res.json(user)
							})
							.catch( (err) => console.log(err) )
					})
				})
			}
		}).catch((err) => { throw err })
});

// @router POST api/users/login
// @desc Return a token
// @access Public

router.post('/login', (req, res) => {
	
	const { email, password } = req.body;
	User.findOne({ email })
		.then((user) => {

			// Check for user
			if (!user) return res.status(404).json({
				email: 'User not found'
			});

			// Check if password plain text matches hashed password
			bcrypt.compare(password, user.password)
				.then((isMatch) => {
					if (isMatch) {
						
						// User matched
						const payload = { id: user._id, name: user.name, email: user.email}
						// Sign the token
						jwt.sign(
							payload, 
							keys.secretOrKey, 
							{ expiresIn: 3600 * 24 * 7 }, 
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token,
								})
							})
						
					} else {
						return res.status(400).json({ password: 'Password did not match' })
					}
				})
		})
		.catch()
})

module.exports = router;