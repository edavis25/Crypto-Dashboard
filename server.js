/*******************************
 | Dependencies
 *******************************/
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/******************************
 | Configuration variables
 ******************************/
global.__rootdir = __dirname;   // Global for app's root directory
const port = 3000;
// Routes
const index = require(path.join(__rootdir, 'routes', 'index'));
const profile = require(path.join(__rootdir, 'routes', 'api', 'profile'));

/******************************
 | Configure server
 ******************************/
// Connect to database
mongoose.connect('mongodb://localhost/crypto-dashboard')
    .then(() => console.log('Connected to Mongodb'))
    .catch((err) => console.error(err));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__rootdir, 'public')));
// Create API routes
app.use('/', index);
app.use('/profile', profile);

// Start server
app.listen(port, function() {
    console.log('Come with me to port 3000 if you want to live');
});
