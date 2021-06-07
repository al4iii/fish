let buildUrl = "Build";
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
let button = document.querySelector("#button");
let restart = document.querySelector("#restart");
let disabledBubble1 = document.querySelector("#disabledBubble1");
let disabledBubble2 = document.querySelector("#disabledBubble2");
let disabledBubble3 = document.querySelector("#disabledBubble3");
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
      button.onclick = () => {
        unityInstance.SendMessage("WebData", "PauseEnable");
      };
      restart.onclick = () => {
        unityInstance.SendMessage("WebData", "Restart");
      };
      disabledBubble1.onclick = () => {
        unityInstance.SendMessage("WebData", "DisabledBubble1");
      };
      disabledBubble2.onclick = () => {
        unityInstance.SendMessage("WebData", "DisabledBubble2");
      };
      disabledBubble3.onclick = () => {
        unityInstance.SendMessage("WebData", "DisabledBubble3");
      };
    })
    .catch((message) => {
      alert(message);
    });
};

document.body.appendChild(script);
