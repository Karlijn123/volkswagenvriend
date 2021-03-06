/******************
 * SETUP
 *
 * Code for the setup of the Katrien Server
 * Handles custom actions for a Google Home bot, through webhooks to API.ai
 ******************/
//test

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

app.post('/webhook', function (req, res) {

    console.log('Request from API.ai received');

    try {
        if (req.body && req.body.result) {
            var body = req.body;

            if (body.result.fulfillment) {
                console.log(body.result.fulfillment.speech);
            }

            if (body.result.action && currentAction.action != body.result.action) {
                console.log("Updating action to: " + body.result.action);
                currentAction.action = body.result.action;
                res.sendStatus(200);
            } else {
                return res.status(400).json({
                    status: {
                        code: 400,
                        failedAction: body.result.action
                    }
                });
            }
        }


    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

io.on('connection', function(socket){
      console.log('a user connected');

    //defining a 'watcher' for an attribute
    watch(currentAction, "action", function(){

        if(!!currentAction.action) {

            switch (currentAction.action) {
                case "start":
                    console.log("start action triggered");
                    socket.emit('start', { description: currentAction.action});
                    break;
                case "intro":
                    console.log("intro action trigggerd!");
                    socket.emit('intro', { description: currentAction.action});
                    break;  
                case "agenda":
                    console.log("agenda action trigggerd!");
                    socket.emit('agenda', { description: currentAction.action});
                    break;
                case "temperatuur":
                    console.log("temperatuur action trigggerd!");
                    socket.emit('temperatuur', { description: currentAction.action});
                    break;  
                case "music":
                    console.log("music action trigggerd!");
                    socket.emit('music', { description: currentAction.action});
                    break;
               
                default:
                    console.log(currentAction.action);
            }
        }
    });



    //     try {
    //         if (req.body && req.body.result && req.body.result.action) {

    //             var action = req.body.result.action

    //             switch (action){
    //                 case "cookie":
    //                  socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
    //             }
    //         }

    //         return res.json(
    //         {

    //         });

    // } catch (err) {
    //     console.error("Can't process request", err);

    //     return res.status(400).json({
    //         status: {
    //             code: 400,
    //             errorType: err.message
    //         }
    //     });
    // }
    });

// Defining a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/frontend/index.html');
});



http.listen((process.env.PORT || 5000), function () {
    console.log("Server started");
});