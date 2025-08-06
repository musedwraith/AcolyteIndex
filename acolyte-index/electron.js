console.log("=== Electron Overlay Starting ===");

const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  console.log("Creating overlay window...");

  win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,                  // Borderless overlay
    transparent: true,             // Allows see-through background
    alwaysOnTop: true,             // Stays above all windows (game overlay)
    resizable: true,               // Allow resizing
    skipTaskbar: true,             // Don’t show in taskbar
    backgroundColor: "#00000000",  // Fully transparent
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Use dev server during development, build for packaged app
  const buildPath = path.join(__dirname, "build", "index.html");
  const startUrl =
    process.env.ELECTRON_START_URL || `file:///${buildPath.replace(/\\/g, "/")}`;

  console.log("Loading URL:", startUrl);

  win.loadURL(startUrl).catch((err) => {
    console.error("Failed to load app:", err);
    win.loadURL(`data:text/html,<h1>Overlay Failed</h1><p>${err}</p>`);
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) createWindow();
});
