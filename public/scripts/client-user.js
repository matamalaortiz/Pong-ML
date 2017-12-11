"use strict";

let socket;
let startPredicting = false;
let times = 0;
let y = 0;
let imageTrained = document.getElementById('imgTrained')

// socket = io.connect("https://am7673.itp.io:3000/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  // socket.on('clients_from_server', clientsConnected);
  // socket.on('clients_from_server_disconnected', clientsDisconnected);
  socket.on('position_from_server', positionServer);
  socket.on('controller_from_server', controllerServer);


  function positionServer(data) {
    console.log("Position from Server:" + " " + data);
    if (data == "✌") {
      imageTrained.src = "./images/peace.jpg"
    } else if (data == "✋") {
      imageTrained.src = "./images/crossed.jpg"
    } else if (data == "2") {
      imageTrained.src = "./images/fuck.png"
    } else if (data == "3") {
      imageTrained.src = "./images/ok.png"
    } else {
      imageTrained.src = "none"
    }
  }


  // Laarning from control remote
  function controllerServer(data) {
    console.log("Controller Pressed " + data);
    if (data == "1") {
      imageTrained.src = "./images/peace.jpg"
    } else if (data == "2") {
      imageTrained.src = "./images/crossed.jpg"
    } else if (data == "3") {
      imageTrained.src = "./images/fuck.png"
    } else if (data == "4") {
      imageTrained.src = "./images/ok.png"
    } else {
      imageTrained.src = "none"
    }
  }

});
