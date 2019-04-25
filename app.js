// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSave = document.querySelector("#camera--save"),
    cameraOpen = document.querySelector("#camera--open");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Save a picture when cameraSave is tapped

cameraSave.onclick = function() {
  var xmlHttp = getNewHTTPObject();
  chargeURLPut('https://storagelpp.blob.core.windows.net/imageslpp/myblob');

  function chargeURLPut(url) { 
      var savedImage = cameraSensor.getContext("2d").getImageData(0, 0, cameraSensor.width, cameraSensor.height);
      var mimeType = "image/webp";  
      xmlHttp.open('PUT', url, true);  // true : asynchrone false: synchrone
      xmlHttp.setRequestHeader('Content-Type', mimeType);  
      xmlHttp.setRequestHeader('x-ms-blob-content-disposition', 'attachment; filename="fname.ext"');  
      xmlHttp.setRequestHeader('x-ms-blob-type', 'BlockBlob' );  
      xmlHttp.setRequestHeader('x-ms-meta-m1', 'v1' );  
      xmlHttp.setRequestHeader('x-ms-meta-m2', 'v2' );  
      xmlHttp.setRequestHeader('Authorization', 'SharedKey storagelpp:PVyBSdVxj955/H7bVfAT26jSAtDHwsKrJC+eyte/C7R/+FEoiEmkD5Ueo9OBaRAxTMWpkan0GIPOmnOyP0fyXg==');  
      xmlHttp.send(savedImage); 
  }
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( 'sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

