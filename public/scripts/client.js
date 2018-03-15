"use strict";

let socket;
let startPredicting = false;
let times = 0;
let keyPressed = 0;


let emojis =["🙂", "😛", "☝", "✋", "✌", "✊"];
let logText = document.getElementById('log');
let video = document.getElementById('my-video');
let videoText = document.getElementById('videoText');
let videoShow = document.getElementById('video');
let renderList =   document.getElementById('renderList');
let loading = document.getElementById('loading');

let ry = 251;
let gy = 213;
let by = 28;
let black = 0;
let changeColor = false;
let reset = false;


var gameStart = false;
var paddleL = {
  x: 40,
  y: 400,
  w: 25,
  h: 120,
};
var paddleR = {
  x: 740,
  y: 100,
  w: 25,
  h: 120,
};
var ball = {
  x: 50,
  y: 20,
  diam: 22,
  speedX: 5,
  speedY: 5,
};
var speedX = 4;
var speedY = 4;
var paddleSpeed = 8;


let lU = 0;
let lD = 0;
let rU = 0;
let rD = 0;


logText.innerHTML = "🙃";



document.addEventListener('DOMContentLoaded', function() {


// LOAD MODEL
let knn = new p5ml.KNNImageClassifier(loopURls);
let index = 0;
let trainingTime = 5;
let startPred = false;


// TRAIN NEW EMOJIS
emojis.forEach(trainNewEmojis);

function trainNewEmojis(element, index){
  let liNotTrained = document.getElementById(element);

  liNotTrained.addEventListener("click", function(){
    console.log("Click" + liNotTrained.id );
    liNotTrained.children[1].innerHTML =  " ↝ Training " + keyPressed + " / 10";

    keyPressed++

    console.log("A preesed", keyPressed, "times");


   let position = index;

   knn.addImage(video, index);

   if(keyPressed === 12 ){

    liNotTrained.children[1].innerHTML =  " ↝ Trained as " + liNotTrained.children[1].getAttribute("data-trained") + " √";
    liNotTrained.children[1].style.color = "#bdb4b4";

    setTimeout(function(){ modelSign.style.display = "none"; }, 1500);

    keyPressed = 0;

    console.log("position trained" );
    console.log(index);
    // socket.emit('position', position);

    }

  });

}


function loopURls(){

  //START PREDICTING
  console.log('start predicting');

  loading.style.backgroundColor = "purple";
  loading.style.color = "white";
  loading.innerHTML = "LOADING ";

  setTimeout(function(){
    loading.style.display = "none";
  },3000)

  startPred = true;
  window.startPred = startPred;

  setInterval(function() {
    knn.predict(video, function(data) {

    console.log(data);

    let position = data.classIndex;
    let emoji = emojis[data.classIndex];


    if (emoji == "🙂") {
      console.log(emoji);
      logText.innerHTML = emoji;
    }

    // console.log(data);
    if (emoji == "☝") {
      lU = 1;
      logText.innerHTML = emoji;
    } else {
      lU = 0;
    }

    if (emoji == "✋") {
      console.log(emoji);
      lD = 1;
      logText.innerHTML = emoji;
    } else {
      lD = 0;
    }

    if (emoji == "✌") {
      rU = 1;
      logText.innerHTML = emoji;
    } else {
      rU = 0;
    }

    if (emoji == "✊") {
      rD = 1;
      logText.innerHTML = emoji;
    } else {
      rD = 0;
    }


    if (emoji == "😛") {
      ball.x = 0;
      ball.y = 20;
      paddleL.y = 300;
      logText.innerHTML = emoji;
    }




    })
  }, 250);
}



// CAMERA
  navigator.getUserMedia = navigator.getUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: false, video: true },
      function(stream) {
        video.srcObject = stream;
        videoShow.srcObject = stream;

        video.onloadedmetadata = function(e) {
          video.play();
          videoShow.play();

        };
      },
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
})


function setup() {
  createCanvas(800, 600);
  smooth();
}

function draw() {

  gameStart === true;

  background(ry,gy,by);
  noStroke();

  createLeftPaddle();
  createRightPaddle();
  createBall();
  ballBounceTopAndBottom();
  ballBounceRight();
  ballBounceLeft();
}


  function createBall() {
    //Create ball
    if (changeColor == false) {
      fill(black, black, black);
    } else {
      fill(245, 224, 2);
    }
      ellipse(ball.x, ball.y, ball.diam+5, ball.diam+10);

      ball.x = ball.x + speedX;
      ball.y = ball.y + speedY;

  }


  function createLeftPaddle() {
    //Create the left paddle
    if (changeColor == false) {
      fill(black, black, black);
    } else {
      fill(245, 224, 2);
    }
    rect(paddleL.x, paddleL.y, paddleL.w, paddleL.h);
    //Control the left paddle
    if (lD === 1) {
      if (paddleL.y + paddleL.h < height - 5) {
        paddleL.y = paddleL.y + paddleSpeed;
      }
    }
    if (lU === 1) {
      if (paddleL.y > 5) {
        paddleL.y = paddleL.y - paddleSpeed;
      }
    }
  }

  function createRightPaddle() {
    //Create the right paddle
    if (changeColor == false) {
      fill(black, black, black);
    } else {
      fill(245, 224, 2);
    }
    rect(paddleR.x, paddleR.y, paddleR.w, paddleR.h);
    //Control the right paddle

    if (rD === 1) { //move paddle down
      if (paddleR.y + paddleR.h < height - 5) {
        paddleR.y = paddleR.y + paddleSpeed;
      }
    }
    if (rU === 1) { //move paddle up
      if (paddleR.y > 5) {
        paddleR.y = paddleR.y - paddleSpeed;
      }
    }

  }

function ballBounceTopAndBottom() {

  //If if the ball hits the top or bottom of the court it bounces
  if (ball.y + 12.5 > height || ball.y < 12.5 && ball.x > 0 && ball.x < width && ball.y > 0 && ball.y < height) {
    speedY = speedY * -1; //reverse the direction of the motion
    ball.y = ball.y + speedY; //keeps things moving
  }

}

function ballBounceRight() {
    //if the x of the edge ball is more than the x of the right paddle and
    //the y of the ball is greater than the y of the rectangle and
    //less than the y of the rectangle plus the height
    if (ball.x + 12.5 > paddleR.x && ball.y + 12.5 > paddleR.y && ball.y + 12.5 < paddleR.y + paddleR.h && ball.x > 0 && ball.x < width && ball.y > 0 && ball.y < height) {
      speedX = speedX * -1; //This reverses the direction, I think
      ball.x = ball.x + speedX; //This keeps the ball moving
    }
    //if the edge of the ball is lower than rect y and
    //the x of the ball is greater than the x of the rect and less than the width
    else if (ball.y + 12.5 > paddleR.y && ball.y < paddleR.y + paddleR.y + paddleR.h && ball.x + 12.5 > paddleR.x && ball.x < paddleR.x + paddleR.x && ball.x > 0 && ball.x < width && ball.y > 0 && ball.y < height) {
      speedY = speedY * -1; //reverse the direction of the motion
      ball.y = ball.y + speedY; //keeps things moving
    }

    //if the edge of the ball is higher than rect y plus height and
    //the x of the ball is greater than the x of the rect and less than the width
    else if (ball.y + 12.5 < paddleR.y + paddleR.h && ball.y > paddleR.y && ball.x > paddleR.x && ball.x < paddleR.x + paddleR.h && ball.x > 0 && ball.x < width && ball.y > 0 && ball.y < height) {
      speedY = speedY * -1; //reverse the direction of the motion
      ball.y = ball.y + speedY; //keeps things moving
    }
  }

function ballBounceLeft() {
    //if the ball hits the left wall
    /* if (ball.x < 0) {
       speedX = speedX * -1; //This reverses the direction, I think
       ball.x = ball.x + speedX; //This keeps the ball moving
       print("pow");*/

    //if the ball hits the front of the left paddle
    if (ball.x - 12.5 < paddleL.x + paddleL.w && ball.y + 12.5 > paddleL.y && ball.y + 12.5 < paddleL.y + paddleL.h && ball.x > 0 && ball.x < width && ball.y > 0 && ball.y < height) {
      speedX = speedX * -1; //This reverses the direction, I think
      ball.x = ball.x + speedX; //This keeps the ball moving
    }
  }
