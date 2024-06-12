// preload.js
window.electron = require("electron");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  focusWindow: () => ipcRenderer.send("focus-window"),
});
