function createImage() {
  const e1 = document.getElementById("svg");
  const svg = new XMLSerializer().serializeToString(e1);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const e2 = document.getElementById("img");
  e2.src = url;
}

document.addEventListener("DOMContentLoaded", () => {
  createImage();
});
