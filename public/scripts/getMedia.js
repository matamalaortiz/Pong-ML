navigator.webkitGetUserMedia({ audio: true, video: true }, function() {
  console.log('ok');
}, function(e) {
  console.log('webcam not ok');
});