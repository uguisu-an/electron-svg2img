const { BrowserWindow, app } = require("electron");
const DataURI = require("datauri");

function captureImage(url) {
  return new Promise(resolve => {
    const w = new BrowserWindow({
      width: 640,
      height: 180,
      opacity: 0,
      useContentSize: true
    });
    w.webContents.on("did-finish-load", () => {
      // Wait for loading svg
      setTimeout(() => {
        w.webContents.capturePage(image => {
          resolve(image);
        });
      }, 100);
    });
    w.loadURL(url);
  });
}

let win;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 800,
    height: 640,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.webContents.on("new-window", (e, url) => {
    if (/^blob:/.test(url)) {
      e.preventDefault();
      captureImage(url).then(image => {
        const datauri = new DataURI();
        datauri.format(".png", image.toPNG());
        win.send("put-image", datauri.content);
      });
    }
  });
  win.webContents.openDevTools();
  win.loadFile(`${__dirname}/index.html`);
});
