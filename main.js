const { app, shell, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const { setup: setupPushReceiver } = require("electron-push-receiver");
const path = require("path");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, "aegix.ico"),
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      webSecurity: true,
      enableRemoteModule: true,
      contextIsolation: false,
      contentSecurityPolicy: "default-src 'self'",
      backgroundThrottling: true, // Run in background with throttling
    },
    autoHideMenuBar: true, // Hide the default menu bar
  });

  mainWindow.loadURL("http://localhost:4201/");

  setupPushReceiver(mainWindow.webContents);

  mainWindow.webContents.openDevTools();

  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.on("ready", () => {
  createWindow();

  tray = new Tray(path.join(__dirname, "aegix.ico"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("My Electron App");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.show();
  });
});

app.on("window-all-closed", () => {
  // Do not quit the application when all windows are closed
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

if (process.platform === "win32" || process.platform === "win64") {
  app.setAppUserModelId(app.name);
}

ipcMain.on("focus-window", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
