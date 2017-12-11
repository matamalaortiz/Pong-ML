"use strict";

let socket;
let startPredicting = false;
let times = 0;
let y = 0;
let imageTrained = document.getElementById('imgTrained');
let emojis =["🙂", "😎", "😛", "✌", "✋", "☝", "🤘", "🖕", "👉", "👌", "👍", "👋", "🖖"]


// socket = io.connect("https://am7673.itp.io/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  // socket.on('clients_from_server', clientsConnected);
  // socket.on('clients_from_server_disconnected', clientsDisconnected);
  socket.on('position_from_server', positionServer);


  function positionServer(data) {
    if (data == "🙂") {
      console.log("Position from Server:" + " " + data);
      // imageTrained.src = "./images/peace.jpg"
    } else if ( data == "😎" ){
      emj.innerHTML = data;
    } else if ( data == "😛" ){
      emj.innerHTML = data;
    } else if ( data == "✌" ){
      emj.innerHTML = data;
    } else if ( data == "✋" ){
      emj.innerHTML = data;
    } else if ( data == "☝" ){
      emj.innerHTML = data;
    } else if ( data == "🤘" ){
      emj.innerHTML = data;
    } else if ( data == "🖕" ){
      emj.innerHTML = data;
    } else if ( data == "👌" ){
      emj.innerHTML = data;
    } else if ( data == "👍" ){
      emj.innerHTML = data;
    } else if ( data == "👋" ){
      emj.innerHTML = data;
    } else if ( data == "🖖" ){
      emj.innerHTML = data;
    } else {
      emj.innerHTML = "";
    }

  }


});
