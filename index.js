const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

const storage = require("electron-json-storage");

const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");

let win;
let storageText;

const createApp = () => {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, "preloader.js"),
    }
  });

  win.loadFile("./web/index.html");

  require("@electron/remote/main").enable(win.webContents);

  app.on("window-all-wiil-close", () => {
    app.quit();
  });
}

app.on("ready", () => {
  createApp();
});

ipcMain.on("get-text", (e) => {
  storage.get("text", (error, data) => {
    storageText = JSON.stringify(data) === '{}' ? [] : data;
    e.reply("send-text", storageText[0]);
  });
});

ipcMain.on("set-text", (e, text) => {
  storageText[0] = text

  storage.set("text", storageText, (error) => {});
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
}