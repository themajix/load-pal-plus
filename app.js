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
    cameraGallery = document.querySelector("#camera--gallery")

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
  chargeURLPut('https://storagelpp.blob.core.windows.net/imageslpp/someblob.webp?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-04-25T22:09:47Z&st=2019-04-25T14:09:47Z&spr=https&sig=50irU0UcN20fi1F1GSV4QvHGwCUP6CRtxUnXHH0OfWI%3D');

  function chargeURLPut(url) { 
      // var savedImage = cameraSensor.getContext("2d").getImageData(0, 0, cameraSensor.width, cameraSensor.height);
      var mimeType = "image/webp";  
      xmlHttp.open('PUT', url, true);  // true : asynchrone false: synchrone
      xmlHttp.setRequestHeader('Content-Type', mimeType);  
      xmlHttp.setRequestHeader('x-ms-blob-content-disposition', 'attachment; filename="fname.webp"');  
      xmlHttp.setRequestHeader('x-ms-blob-type', 'BlockBlob' );  
      // xmlHttp.setRequestHeader('x-ms-meta-m1', 'v1' );  
      // xmlHttp.setRequestHeader('x-ms-meta-m2', 'v2' );  
      // xmlHttp.setRequestHeader('Authorization', 'SharedKey');
      // xmlHttp.setRequestHeader('storagelpp', 'PVyBSdVxj955/H7bVfAT26jSAtDHwsKrJC+eyte/C7R/+FEoiEmkD5Ueo9OBaRAxTMWpkan0GIPOmnOyP0fyXg==');  
      xmlHttp.send(cameraSensor.toDataURL("image/webp")); 
  }
};

cameraOpen.onclick = function() { 
  var xmlHttp = getNewHTTPObject();
  chargeURLGet('https://storagelpp.blob.core.windows.net/imageslpp/someblob.webp?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-04-25T22:09:47Z&st=2019-04-25T14:09:47Z&spr=https&sig=50irU0UcN20fi1F1GSV4QvHGwCUP6CRtxUnXHH0OfWI%3D', setImageToGallery);

  function chargeURLGet(url, callback) {
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
        callback(xmlHttp.responseText); 
    }
    xmlHttp.open('GET', url);
    xmlHttp.send(null);
  }

  function setImageToGallery(response) {
    cameraGallery.src = response;

    cameraGallery.classList.add("loaded");

  }

}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

function getNewHTTPObject()
{
        var xmlhttp;

        /** Special IE only code ... */
        /*@cc_on
          @if (@_jscript_version >= 5)
              try
              {
                  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
              }
              catch (e)
              {
                  try
                  {
                      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                  }
                  catch (E)
                  {
                      xmlhttp = false;
                  }
             }
          @else
             xmlhttp = false;
        @end @*/

        /** Every other browser on the planet */
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined')
        {
            try
            {
                xmlhttp = new XMLHttpRequest();
            }
            catch (e)
            {
                xmlhttp = false;
            }
        }

        return xmlhttp;
}

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

