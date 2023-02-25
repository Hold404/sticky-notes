const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("get-text");
  ipcRenderer.on("send-text", (e, text) => {
    if (typeof text !== "undefined" && text.replace(" ", "") !== "") {
      console.log(text)
      document.querySelector(".note__body").value = text;
    }
  });

  document.querySelector(".note__body").addEventListener("input", (e) => {
    ipcRenderer.send("set-text", e.target.value);
  })
});