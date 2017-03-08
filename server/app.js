'use strict';
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/techolution',function(error){
    if(error){
        return console.log('error', error);
    }
});

var customResponse = require('./common/customResponse.js').customResponse;


// Get our API routes
const make = require('./routes/make');
const made = require('./routes/made');



const app = express();

// Parsers for data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/images',express.static(path.join(__dirname, './../src/images')));


//Configure custom response
app.use(customResponse);

// Set our api routes
app.use('/make', make);
app.use('/made', made);



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

exports.closeServer = function(){
  server.close();
};


