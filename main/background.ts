import path from "path";
import { app, ipcMain, BrowserWindow, screen } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";

const isProd = process.env.NODE_ENV === "production";
let floatingWindow: BrowserWindow | null = null;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const createFloatingWindow = async () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  floatingWindow = new BrowserWindow({
    width: 300,
    height: 400,
    x: width - 350,
    y: height - 450,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isProd) {
    await floatingWindow.loadURL("app://./float");
  } else {
    const port = process.argv[2];
    await floatingWindow.loadURL(`http://localhost:${port}/float`);
    floatingWindow.webContents.openDevTools();
  }

  floatingWindow.once("ready-to-show", () => {
    if (floatingWindow) {
      floatingWindow.show();
      floatingWindow.focus();
    }
  });

  floatingWindow.on("closed", () => {
    floatingWindow = null;
  });
};

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  await createFloatingWindow();

  setTimeout(() => {
    if (floatingWindow) {
      floatingWindow.show();
      floatingWindow.focus();
      if (!isProd) {
        floatingWindow.webContents.openDevTools();
      }
    }
  }, 2000);

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("toggle-float-window", () => {
  if (floatingWindow?.isVisible()) {
    floatingWindow.hide();
  } else if (floatingWindow) {
    floatingWindow.show();
  } else {
    createFloatingWindow();
  }
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.on("window-control", (_, command) => {
  switch (command) {
    case "minimize":
      floatingWindow?.minimize();
      break;
    case "maximize":
      if (floatingWindow?.isMaximized()) {
        floatingWindow.unmaximize();
      } else {
        floatingWindow?.maximize();
      }
      break;
    case "close":
    case "hide":
      floatingWindow?.hide();
      break;
    case "show":
      floatingWindow?.show();
      break;
  }
});

ipcMain.on("window-move", (_, { movementX, movementY }) => {
  if (floatingWindow) {
    const [x, y] = floatingWindow.getPosition();
    floatingWindow.setPosition(x + movementX, y + movementY);
  }
});

ipcMain.on("window-resize", (_, { height }) => {
  if (floatingWindow) {
    const [width] = floatingWindow.getSize();
    floatingWindow.setSize(width, height);
  }
});

ipcMain.handle("load-jira-data", async () => {
  try {
    const dataPath = path.join(__dirname, "../json/data.json");
    const rawData = await fs.promises.readFile(dataPath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error loading data:", error);
    return []; // Return empty array or throw, depending on desired error handling
  }
});

// Timer event handlers
ipcMain.on("start-task", (event, { ticket, name }) => {
  // Receive both ticket and name
  if (floatingWindow) {
    console.log(
      `Main: Received start-task for ${ticket} - ${name}. Forwarding to float.`
    );
    floatingWindow.webContents.send("task-started", {
      ticketNumber: ticket,
      ticketName: name,
    }); // Send both
  }
});

ipcMain.on("pause-task", (event, { ticket }) => {
  if (floatingWindow) {
    floatingWindow.webContents.send("task-paused", ticket); // Only ticket number is needed
  }
});

ipcMain.on("resume-task", (event, { ticket }) => {
  if (floatingWindow) {
    floatingWindow.webContents.send("task-resumed", ticket); // Only ticket number is needed
  }
});

ipcMain.on("stop-task", (event, { ticket }) => {
  if (floatingWindow) {
    floatingWindow.webContents.send("task-stopped", ticket); // Only ticket number is needed
  }
});
