const { BrowserWindow, app } = require("electron");

let win;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 800,
    height: 640
  });
  win.loadFile(`${__dirname}/index.html`);
});
