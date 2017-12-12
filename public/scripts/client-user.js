"use strict";

let socket;
let startPredicting = false;
let times = 0;
let y = 0;
let imageTrained = document.getElementById('imgTrained');
let emojis =["🙂", "😎", "😛", "☝", "✋", "✌", "✊", "🖕", "👉", "🤘", "👍", "👋", "🖖"];


// socket = io.connect("https://am7673.itp.io/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  // socket.on('clients_from_server', clientsConnected);
  // socket.on('clients_from_server_disconnected', clientsDisconnected);
  socket.on('position_from_server', positionServer);


  function positionServer(data) {
    let emj = document.getElementById('emj')
    let b = document.body;

    if (data == "🙂") {
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#f8ed62";
    } else if ( data == "😎" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#fff9ae";
    } else if ( data == "😛" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#f8ed62";
    } else if ( data == "✌" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#e9d700";
    } else if ( data == "✋" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#dab600";
    } else if ( data == "☝" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#a98600";
    } else if ( data == "🤘" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#fff9ae";
    } else if ( data == "🖕" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#e9d700";
    } else if ( data == "✊" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#a98600";
    } else if ( data == "👍" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColorcolor = "#fff9ae";
    } else if ( data == "👋" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#e9d700";
    } else if ( data == "🖖" ){
      console.log("Position from Server:" + " " + data);
      emj.innerHTML = data;
      b.style.backgroundColor = "#e9d700";
    } else {
      emj.innerHTML = "";
    }

  }


});
