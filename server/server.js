
/*

Alejandro Matamala
@matamalaortiz

2017
*/

"use strict";

// DEPENDENCIES

const fs = require('fs');
// const credentials = {
//   key: fs.readFileSync('./private/localhost-key.pem'),
//   cert: fs.readFileSync('./private/localhost.pem')
// };

const credentials = {
  key: fs.readFileSync('./private/my-key.pem'),
  cert: fs.readFileSync('./private/my-cert.pem')
};

const express = require('express');
const app = express();
// const server = require('http').Server(app);
const server = require('https').Server(credentials, app);
// const io = require('socket.io').listen(server);
const path = require('path');
const  mustacheExpress = require('mustache-express');



const  bodyParser = require('body-parser');
const  PORT = process.env.PORT || 3000;
// const  PORT = process.env.PORT || 443;


// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// ENGINE AND PATH
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', '../views');
app.use(express.static(path.join('../public')));

// ROUTES
app.get('/', function(req, res) {
  res.render("index.mustache")
});

app.get('/client', function(req, res) {
  res.render("client.mustache")
});

app.get('/pong', function(req, res) {
  res.render("pong.mustache")
});

// io.sockets.on('connection',
// 	// We are given a websocket object in our function
// 	function (socket) {
//
// 		console.log("We have a new client: " + socket.id);
//
// 		// When this user emits, client side: socket.emit('otherevent',some data);
// 		socket.on('position', function(data) {
// 			console.log("Received: 'position' " + data);
// 			io.sockets.emit('position_from_server', data);
// 		});
//
//     socket.on('controller_button', function(data) {
//       console.log("From Controller: 'Button Pressed : ' " + data);
//       io.sockets.emit('controller_from_server', data);
//     });
//
// 	}
// );


// SERVER OPEN IN PORT 3000
server.listen(PORT, () => {
  var port = server.address().port;
  console.log('running at ' + port);
});
