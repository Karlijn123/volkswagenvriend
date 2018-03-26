/* -- SETUP -- */
/*
Code for the setup of the Volkswagenfriend Server
Handles custom actions for a Google Home bot, through webhooks to Dialogflow
*/

// Enabling ES6 support and defining global variables
(function(globals){
    "use strict";
    globals.currentAction = {
        action: ""
    };
}( (1, eval)('this') ));

// Import Express for routing, etc.
const express = require('express');
// Import filesystem
const fs = require("fs");
// Import Path
const path = require('path');
// Import BodyParser for parsing data
const bodyParser = require('body-parser');
// Import Request for HTTP requests
const request = require('request');

const app = express();

// Import HTTP server
const http = require('http').Server(app);

// Import socket.io
const io = require('socket.io')(http);

const WatchJS = require("melanke-watchjs")
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

app.use(bodyParser.json());

}