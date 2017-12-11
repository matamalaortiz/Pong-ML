"use strict";


var Gpio = require('onoff').Gpio,
  btn_one = new Gpio(16, 'in', 'both'),
  btn_two = new Gpio(20, 'in', 'both'),
  btn_three = new Gpio(21, 'in', 'both'),
  btn_four = new Gpio(12, 'in', 'both'),
  btn_five = new Gpio(14, 'in', 'both'),
  btn_six = new Gpio(15, 'in', 'both');

var socket = require('socket.io-client')('https://am7673.itp.io:3000/');

console.log("started");

btn_one.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_one pressed");
    let buttonPressed = 1;
    socket.emit('controller_button', buttonPressed);
  }
});

btn_two.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_two pressed");
    let buttonPressed = 2;
    socket.emit('controller_button', buttonPressed);
  }
});

btn_three.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_three pressed");
    let buttonPressed = 3;
    socket.emit('controller_button', buttonPressed);
  }

});

btn_four.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_four pressed");
    let buttonPressed = 4;
    socket.emit('controller_button', buttonPressed);
  }

});

btn_five.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_five pressed");
    let buttonPressed = 5;
    socket.emit('controller_button', buttonPressed);
  }
});


btn_six.watch(function(err, value) {
  if (err) {
    throw err;
  }
  if (value === 1) {
    console.log("btn_six pressed");
    let buttonPressed = 6;
    socket.emit('controller_button', buttonPressed);
  }
});


process.on('SIGINT', function() {
  btn_one.unexport();
  btn_two.unexport();
  btn_three.unexport();
  btn_four.unexport();
  btn_five.unexport();
  btn_six.unexport();
});
