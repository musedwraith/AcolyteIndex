console.log("=== Starting Test Electron ===");

const { app, BrowserWindow } = require("electron");

let testWin;

function createTestWindow() {
  console.log("Creating test overlay window...");

  testWin = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    backgroundColor: "#00000000",
  });

  console.log("Loading purple overlay HTML...");

  testWin.loadURL(`data:text/html,
    <body style="margin:0;background:rgba(100,0,200,0.4);color:white;display:flex;align-items:center;justify-content:center;height:100%;">
      <h1>Overlay Test</h1>
    </body>`).catch(err => {
      console.error("Failed to load overlay HTML:", err);
    });

  testWin.once("ready-to-show", () => {
    console.log("Test window ready, showing...");
    testWin.show();
  });

  testWin.on("closed", () => {
    console.log("Test window closed.");
    testWin = null;
  });
}

app.whenReady().then(() => {
  console.log("App is ready, launching window...");
  createTestWindow();
});

app.on("window-all-closed", () => {
  console.log("All windows closed, quitting.");
  app.quit();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
