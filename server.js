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
const tickers = require(path.join(__rootdir, 'routes', 'api', 'tickers'));
const details = require(path.join(__rootdir, 'routes', 'api', 'coinDetails'));

/******************************
 | Configure server
 ******************************/
// Connect to database
mongoose.connect('mongodb://192.168.0.102/crypto-dashboard')
    .then(() => console.log('Connected to Mongodb'))
    .catch((err) => console.error(err));

app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__rootdir, 'public')));
// Create profile API routes
app.use('/', index);
app.use('/profile', profile);
// Create route for Coinmarketcap tickers API
app.use('/tickers', tickers);
// Create route for Cryptocompare coin details API
app.use('/details', details);

// Start server and return server instance for socket
const server = app.listen(port, function() {
    console.log('Come with me to port 3000 if you want to live');
});

/******************************
 | Initialize websockets
 ******************************/
// Create websocket & get broadcasting helper
const io = require('socket.io')(server);
const broadcastTickers = require('./lib/broadcastTickers').broadcastTickers;

// Broadcast tickers immediately on initial connection
io.on('connection', function(socket) {
    broadcastTickers(io);
});

// Then broadcast tickers every 10 seconds
setInterval(function() {
    broadcastTickers(io);
}, 10000);
