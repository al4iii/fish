
let buildUrl = "https://al4iii.github.io/fish/Build";
let loaderUrl = buildUrl + "/Biba.loader.js";
let config = {
  dataUrl: buildUrl + "/Biba.data.unityweb",
  frameworkUrl: buildUrl + "/Biba.framework.js.unityweb",
  codeUrl: buildUrl + "/Biba.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "Envision.Space",
  productName: "Biba",
  productVersion: "1.0",
};

let container = document.querySelector("#unity-container");
let canvas = document.querySelector("#unity-canvas");
let loadingBar = document.querySelector("#unity-loading-bar");
let progressBarFull = document.querySelector("#unity-progress-bar-full");
let fullscreenButton = document.querySelector("#unity-fullscreen-button");
let mobileWarning = document.querySelector("#unity-mobile-warning");

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  container.className = "unity-mobile";
  config.devicePixelRatio = 1;
  mobileWarning.style.display = "block";
  setTimeout(() => {
    mobileWarning.style.display = "none";
  }, 5000);
} else {
  canvas.style.width = "960px";
  canvas.style.height = "600px";
}
loadingBar.style.display = "block";

let script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  })
    .then((unityInstance) => {
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    })
    .catch((message) => {
      alert(message);
    });
};
document.body.appendChild(script);
