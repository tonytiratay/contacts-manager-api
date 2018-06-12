const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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



app.get('/', (req, res) => {
	res.send('Hello World, the server is running. Good to know uh !')
})

// Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on ${port}`)
})