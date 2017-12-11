"use strict";

let socket;
let startPredicting = false;
let times = 0;
let y = 0;
let imageTrained = document.getElementById('imgTrained');
let emojis =["🙂", "😎", "😛", "✌", "✋", "☝", "🤘", "🖕", "👉", "👌", "👍", "👋", "🖖"]


// socket = io.connect("https://am7673.itp.io:3000/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  // socket.on('clients_from_server', clientsConnected);
  // socket.on('clients_from_server_disconnected', clientsDisconnected);
  socket.on('position_from_server', positionServer);


  function positionServer(data) {

    let emj = document.getElementById("emj");

    switch(data) {
      case "🙂":
        emj.innerHTML = data;
        break;
      case "😎":
        emj.innerHTML = data;
        break;
      case "😛":
        emj.innerHTML = data;
        break
      case "✌":
        emj.innerHTML = data;
        break
      case "✋":
        emj.innerHTML = data;
        break
      case "☝":
        emj.innerHTML = data;
        break
      case "🤘":
        emj.innerHTML = data;
        break
      case "🖕":
        emj.innerHTML = data;
        break
      case "👌":
        emj.innerHTML = data;
        break
      case "👍":
        emj.innerHTML = data;
        break
      case "👋":
        emj.innerHTML = data;
        break
      case "🖖":
        emj.innerHTML = data;
          break
      default:
      console.log('default');
  }

  }


});
