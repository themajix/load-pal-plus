// const apiKey = 'd473fbb2fe9547a19b3d51e31d246441';
// const defaultSource = 'the-washington-post';
// const sourceSelector = document.querySelector('#sources');
// const newsArticles = document.querySelector('main');

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () =>
//     navigator.serviceWorker.register('sw.js')
//       .then(registration => console.log('Service Worker registered'))
//       .catch(err => 'SW registration failed'));
// }

// window.addEventListener('load', e => {
//   sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
//   updateNewsSources().then(() => {
//     sourceSelector.value = defaultSource;
//     updateNews();
//   });
// });

// window.addEventListener('online', () => updateNews(sourceSelector.value));

// async function updateNewsSources() {
//   const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
//   const json = await response.json();
//   sourceSelector.innerHTML =
//     json.sources
//       .map(source => `<option value="${source.id}">${source.name}</option>`)
//       .join('\n');
// }

// async function updateNews(source = defaultSource) {
//   newsArticles.innerHTML = '';
//   const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
//   const json = await response.json();
//   newsArticles.innerHTML =
//     json.articles.map(createArticle).join('\n');
// }

// function createArticle(article) {
//   return `
//     <div class="article">
//       <a href="${article.url}">
//         <h2>${article.title}</h2>
//         <img src="${article.urlToImage}" alt="${article.title}">
//         <p>${article.description}</p>
//       </a>
//     </div>
//   `;
// }

var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")

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

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);

// Install ServiceWorker
if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register( '/camera-app/part-2/sw.js' , { scope : ' ' } ).then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
  