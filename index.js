const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

// Body Parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
	.then(() => console.log('Connected to Mongo'))
	.catch((err) => console.log(err));

// Add passport to handle users

app.use(passport.initialize());

// Config passport

const jwtStrategy = require('./config/passport.js');
jwtStrategy(passport);

// Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.get('/api/hook', (req, res)=>{
	console.log(req)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on ${port}`)
})