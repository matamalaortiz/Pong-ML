"use strict";

let socket;
let startPredicting = false;
let times = 0;
let keyPressed = 0;
let urls = ["https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156", "https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach2.mp4?alt=media&token=da8f633e-d0bf-4e8c-bcac-9d788a3d07ea", "https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156"];
let emojis = ["🙂", "😎", "😛", "✌", "✋", "☝", "🤘", "🖕", "👉", "👌", "👍", "👋", "🖖"]
var trainings = urls.length - 1;
let modelSign = document.getElementById('model');
let logText = document.getElementById('log');
let video = document.getElementById('my-video');
let videoText = document.getElementById('videoText');
let videoShow = document.getElementById('video');
let renderList =   document.getElementById('renderList');
let loading = document.getElementById('loading');



// Videos Pre-Trainned
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


// socket = io.connect("https://am7673.itp.io:3000/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  socket.on('clients_from_server', clientsConnected);
  socket.on('clients_from_server_disconnected', clientsDisconnected);
// "https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156",

let knn = new p5ml.KNNImageClassifier(loopURls);
let index = 0;
let trainingTime = 5;

var startPred = false;

function loopURls(){
    if(!startPred){
      let times = 0;
      videoTeach.src = urls[index];
      videoTeach.onloadeddata = function() {
        let emoji = emojis[index]
        let liEmoji = document.getElementById(emoji).children[1];
        liEmoji.innerHTML =  " ↝ Training"
        let trainThisVideo = setInterval(function(){
          // console.log('training on',videoTeach.src);
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
            // console.log('index is', index, urls.length);
            if(index < urls.length){
              // console.log('looping for new video');
              loopURls();
            } else {
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
                // console.log(data);
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




//   // trainings with keyboard
//   window.onkeyup = function(e) {
//    var key = e.keyCode ? e.keyCode : e.which;
//    // Training Self Video
//    if (key == 65) {
//      keyPressed++
//      console.log("A preesed", keyPressed, "times");
//     if(keyPressed < 2 ){
//       trainings++
//     }
//     knn.addImage(video, trainings);
//
//     if(keyPressed === 10 ){
//      modelSign.style.display = "block";
//      modelSign.innerHTML = "Model Trained as: " + trainings;
//
//      setTimeout(function(){ modelSign.style.display = "none"; }, 1500);
//      keyPressed = 0;
//      console.log("position trained as:", trainings );
//      let position = trainings;
//      socket.emit('position', position);
//      }
//    }
//
// }

// Camera Us
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


function addVideo(obj, index) {
  let videoRef = document.getElementById('videoRef');
  // videoShowRef.style.display = 'block';
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
  // console.log(data.size);
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
