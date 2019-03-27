const { ipcRenderer } = require("electron");

function createSVGURL() {
  const svg = document.getElementById("svg");
  const xml = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([xml], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}

function createImage() {
  const img = document.getElementById("img1");
  img.src = createSVGURL();
}

function requestCaptureImage() {
  open(createSVGURL());
}

document.addEventListener("DOMContentLoaded", () => {
  createImage();
  requestCaptureImage();
});

ipcRenderer.on("put-image", (_event, src) => {
  const img = document.getElementById("img2");
  img.src = src;
});
