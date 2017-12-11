"use strict";

let socket;
let startPredicting = false;
let times = 0;
let keyPressed = 0;
// let urls = ["https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156", "https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach2.mp4?alt=media&token=da8f633e-d0bf-4e8c-bcac-9d788a3d07ea", "https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156"];
let urls = ["./videos/teach1.mp4", "./videos/teach2.mp4"];

let emojis = ["🙂", "😎", "😛", "✌", "✋", "☝", "🤘", "🖕", "👉", "👌", "👍", "👋", "🖖"]
var trainings = urls.length - 1;
let modelSign = document.getElementById('model');
let logText = document.getElementById('log');
let video = document.getElementById('my-video');
let videoText = document.getElementById('videoText');
let videoShow = document.getElementById('video');
let renderList =   document.getElementById('renderList');
let loading = document.getElementById('loading');



// Create and Play Videos Pre-Trainned
let videoTeach = document.createElement("video");
videoTeach.setAttribute('crossorigin', 'anonymous');
videoTeach.setAttribute("width", "227");
videoTeach.setAttribute("height", "227");
videoTeach.setAttribute("loop", "loop");
videoTeach.setAttribute("id", "tranning");
videoTeach.setAttribute("muted", "true");
videoTeach.setAttribute("autoplay", "autoplay");
document.body.appendChild(videoTeach);

// Create List of Emojis in side bar
var ul = document.createElement('ul');
ul.setAttribute('id','proList');

renderList.appendChild(ul);
emojis.forEach(renderProductList);

function renderProductList(element, index, emojis) {
  // console.log(element, index);
  var li = document.createElement('li');
  li.setAttribute('id', element);
  li.setAttribute("onmouseover", "addVideo(this," + index + ")")
  li.setAttribute("onmouseleave", "removeVideo(this," + index + ")")
  // li.innerHTML = "• Not trainned yet"
  ul.appendChild(li);
  // document.createTextNode(element);
  var span = document.createElement('span');
  span.setAttribute('id', "emoji");
  span.innerHTML = element;
  li.appendChild(span);
  var p = document.createElement('p');
  p.setAttribute('id', "emojiStatus");
  p.innerHTML = " ↝  Not trained yet";
  li.appendChild(p);

}

// SOCKET CONNECTION
// socket = io.connect("https://am7673.itp.io:/"); // Listen for sockets
socket = io.connect(); // Listen for sockets


document.addEventListener('DOMContentLoaded', function() {

// RECEIVE DATA FROM SERVER
  socket.on('clients_from_server', clientsConnected);
  socket.on('clients_from_server_disconnected', clientsDisconnected);

// LOAD MODEL
let knn = new p5ml.KNNImageClassifier(loopURls);
let index = 0;
let trainingTime = 5;
let startPred = false;


// TRAIN WITH VIDEOS THEN STOP TRAINING AND START PREDICTING
function loopURls(){

    if(!startPred){
      let times = 0;
      videoTeach.src = urls[index];

      videoTeach.onloadeddata = function() {

        let emoji = emojis[index]
        let liEmoji = document.getElementById(emoji).children[1];
        liEmoji.innerHTML =  " ↝ Training"

        let trainThisVideo = setInterval(function(){
          // TRAIN VIDEO
          //console.log(index, times);
          knn.addImage(videoTeach, index);
          liEmoji.innerHTML =  " ↝ Trained √"
          liEmoji.style.color = "#bdb4b4";

          times++;
          stopTraining()

        }, 150);

        function stopTraining(){

          if(times === trainingTime){

            console.log('stop the training');
            clearInterval(trainThisVideo);

            index++;

            if(index < urls.length){
              // LOOP FOR A NEW VIDEO

              loopURls();

            } else {
              //START PREDICTING
              console.log('start predicting');

              loading.style.backgroundColor = "purple";
              loading.style.color = "white";
              loading.innerHTML = "READY √ ";

              setTimeout(function(){

              loading.style.display = "none";

            },3000)

              startPred = true;
              window.startPred = startPred;

              setInterval(function() {
                knn.predict(video, function(data) {

                let position = data.classIndex;
                let emoji = emojis[data.classIndex];

                logText.innerHTML = emojis[data.classIndex];
                socket.emit('position', emoji);

                console.log('Position', emoji );
                })
              }, 250);
            }
          }
        }
      };
    }
}


// TRAIN NEW EMOJIS
emojis.forEach(trainNewEmojis);

function trainNewEmojis(element, index){
  let liNotTrained = document.getElementById(element);

  liNotTrained.addEventListener("click", function(){
    console.log("Click" + liNotTrained.id );
    liNotTrained.children[1].innerHTML =  " ↝ Training " + keyPressed + " / 10";

    keyPressed++

    console.log("A preesed", keyPressed, "times");

   if(keyPressed < 2 ){
     trainings++
   }

   let position = index;

   knn.addImage(video, index);

   if(keyPressed === 12 ){

    modelSign.style.display = "block";
    modelSign.innerHTML = "Model Trained as: " + trainings;
    liNotTrained.children[1].innerHTML =  " ↝ Trained √"
    liNotTrained.children[1].style.color = "#bdb4b4";

    setTimeout(function(){ modelSign.style.display = "none"; }, 1500);

    keyPressed = 0;

    console.log("position trained as:", trainings );
    console.log(index);
    socket.emit('position', position);

    }

  });

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

// VIDEO AND TRAINING REFERENCE
function addVideo(obj, index) {

  let videoRef = document.getElementById('videoRef');

  videoShowRef.style.animation = "fadeIN linear 1s 1";
  videoShowRef.style.opacity = "1";
  videoShowRef.src = urls[index];

  let liEmoji = document.getElementById(emojis[index]);

  liEmoji.style.transform = "scale(1.025)";
  liEmoji.style.backgroundColor = "#f5e8cb";
  videoText.style.opacity = "0";

}

function removeVideo(obj, index) {

  let videoRef = document.getElementById('videoRef');

  videoShowRef.style.animation = "fadeOUT linear 1s 1"
  videoShowRef.style.opacity = "0";

  let liEmoji = document.getElementById(emojis[index]);

  liEmoji.style.transform = "scale(1)";
  liEmoji.style.backgroundColor = "#f7f1e3";
  videoText.style.opacity = "1";

}

function clientsConnected(data) {
  let domHeading = document.getElementById('users')
}

function clientsDisconnected(data) {
  // console.log(data.size);
  let domHeading = document.getElementById('users')
  domHeading.innerHTML = data +  " users connected";
}

function positionServer(data) {
  // console.log("Position from Server:" + " " + data);
}
