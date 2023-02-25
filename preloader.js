const { ipcRenderer } = require("electron");
const remote = window.require("@electron/remote");
window.ipcRenderer = ipcRenderer;
window.remote = remote;