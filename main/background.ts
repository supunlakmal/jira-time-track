// main/background.ts
import path from "path";
import { app, ipcMain, BrowserWindow, screen, dialog } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";
import Store from "electron-store";
import { spawn } from "child_process";

const isProd = process.env.NODE_ENV === "production";
let floatingWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

// Store for project paths
const projectPathsStore = new Store<Record<string, string>>({
  name: "project-paths",
  defaults: {},
});

// ==================== CENTRALIZED DATA MANAGER ====================
interface AppData {
  sessions: { [ticketNumber: string]: any };
  jiraData: any[];
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, jiraData: [] },
  });

  private windows: Set<BrowserWindow> = new Set();

  registerWindow(window: BrowserWindow) {
    this.windows.add(window);

    // Clean up when window is closed
    window.on("closed", () => {
      this.windows.delete(window);
    });
  }

  // Sync data to all windows
  private broadcast(channel: string, data: any) {
    this.windows.forEach((window) => {
      if (!window.isDestroyed()) {
        window.webContents.send(channel, data);
      }
    });
  }

  // Session methods
  saveSession(sessionData: any) {
    const sessions = this.store.get("sessions");
    sessions[sessionData.ticketNumber] = sessionData;
    this.store.set("sessions", sessions);
    this.broadcast("sessions-updated", sessions);
    console.log(`DataManager: Session saved for ${sessionData.ticketNumber}`);
  }

  getSessions() {
    return this.store.get("sessions");
  }

  // Jira data methods
  setJiraData(data: any[]) {
    this.store.set("jiraData", data);
    this.broadcast("jira-data-updated", data);
    console.log(`DataManager: Jira data updated with ${data.length} tickets`);
  }

  getJiraData() {
    return this.store.get("jiraData");
  }

  // Load initial Jira data from file
  async loadInitialJiraData() {
    try {
      const dataPath = path.join(__dirname, "../json/data.json");
      const rawData = await fs.promises.readFile(dataPath, "utf8");
      const jiraData = JSON.parse(rawData);
      this.setJiraData(jiraData);
      return jiraData;
    } catch (error) {
      console.error("Error loading initial Jira data:", error);
      return [];
    }
  }
}

const dataManager = new DataManager();

// ==================== ELECTRON SETUP ====================
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
    height: 400, // Initial height, can be adjusted by handleMinimize
    x: width - 350, // Position to the right
    y: height - 450, // Position towards the bottom
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false, // Resizing is handled by minimize/expand logic
    skipTaskbar: false, // Show in taskbar
    show: false, // Don't show immediately
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Register with data manager
  dataManager.registerWindow(floatingWindow);

  if (isProd) {
    await floatingWindow.loadURL("app://./float");
  } else {
    const port = process.argv[2];
    await floatingWindow.loadURL(`http://localhost:${port}/float`);
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

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Register main window with data manager
  dataManager.registerWindow(mainWindow);

  // Load initial data
  await dataManager.loadInitialJiraData();

  await createFloatingWindow();

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools(); // Main window dev tools can still open
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

// ==================== WINDOW CONTROL IPC ====================
ipcMain.on("toggle-float-window", () => {
  if (floatingWindow?.isVisible()) {
    floatingWindow.hide();
  } else if (floatingWindow) {
    floatingWindow.show();
    floatingWindow.focus(); // Focus when showing
  } else {
    createFloatingWindow().then(() => {
      // Ensure window is created before trying to show/focus
      if (floatingWindow) {
        floatingWindow.show();
        floatingWindow.focus();
      }
    });
  }
});

ipcMain.on("window-control", (_, command) => {
  if (!floatingWindow) return;

  switch (command) {
    case "minimize":
      // This will now be handled by the resize logic in float.tsx
      break;
    case "maximize":
      if (floatingWindow.isMaximized()) {
        floatingWindow.unmaximize();
      } else {
        floatingWindow.maximize();
      }
      break;
    case "close":
    case "hide":
      floatingWindow.hide();
      break;
    case "show":
      floatingWindow.show();
      floatingWindow.focus();
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
    const [currentWidth] = floatingWindow.getSize();
    // Only allow height changes, keep width constant for simplicity with minimize
    floatingWindow.setSize(currentWidth, height);
  }
});

// ==================== CENTRALIZED DATA IPC HANDLERS ====================
// Replace old load-jira-data handler
ipcMain.handle("load-jira-data", async () => {
  return dataManager.getJiraData();
});

// New centralized data handlers
ipcMain.handle("get-sessions", () => {
  return dataManager.getSessions();
});

ipcMain.on("save-session", (_, sessionData) => {
  dataManager.saveSession(sessionData);
});

ipcMain.handle("refresh-jira-data", async () => {
  return await dataManager.loadInitialJiraData();
});

// ==================== PROJECT PATHS IPC ====================
ipcMain.handle("get-project-paths", () => {
  return projectPathsStore.store;
});

ipcMain.on("save-project-paths", (_, paths) => {
  if (paths && typeof paths === "object") {
    Object.entries(paths).forEach(([key, value]) => {
      projectPathsStore.set(key, value as string);
    });
  }
});

ipcMain.handle("select-project-directory", async (_, projectName) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: `Select directory for ${projectName}`,
    });

    if (result.canceled || !result.filePaths.length) {
      return { canceled: true };
    }

    const filePath = result.filePaths[0];
    projectPathsStore.set(projectName, filePath);

    return { filePath };
  } catch (error) {
    console.error("Error in select-project-directory:", error);
    return { error: error.message };
  }
});

// ==================== FIXED GET-CURRENT-BRANCH HANDLER ====================
ipcMain.handle("get-current-branch", async (_, data) => {
  // Handle both old format (just string) and new format (object)
  let projectPath: string;
  let projectName: string;

  if (typeof data === "string") {
    // Legacy format: just projectPath
    projectPath = data;
    projectName = "Unknown";
  } else if (data && typeof data === "object") {
    // New format: { projectName, projectPath }
    projectPath = data.projectPath;
    projectName = data.projectName || "Unknown";
  } else {
    return { error: "Invalid parameters provided" };
  }

  if (!projectPath || typeof projectPath !== "string") {
    console.error(`Invalid project path for ${projectName}:`, projectPath);
    return { error: "No project path provided" };
  }

  // Check if the directory exists
  if (!fs.existsSync(projectPath)) {
    console.error(
      `Project path does not exist for ${projectName}: ${projectPath}`
    );
    return { error: "Project path does not exist" };
  }

  console.log(
    `Getting current branch for ${projectName} at path: ${projectPath}`
  );

  try {
    return new Promise((resolve) => {
      const gitProcess = spawn("git", ["branch", "--show-current"], {
        cwd: projectPath, // Now correctly passing the string path
        stdio: ["ignore", "pipe", "pipe"],
      });

      let output = "";
      let error = "";

      gitProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      gitProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      gitProcess.on("close", (code) => {
        if (code === 0) {
          const branch = output.trim();
          if (branch) {
            console.log(`Current branch for ${projectName}: ${branch}`);
            resolve({ branch });
          } else {
            console.warn(`No branch found for ${projectName}`);
            resolve({ error: "No branch found or not a git repository" });
          }
        } else {
          console.error(`Git command failed for ${projectName}:`, error.trim());
          resolve({ error: error.trim() || "Git command failed" });
        }
      });

      gitProcess.on("error", (err) => {
        console.error(
          `Error running git command for ${projectName}:`,
          err.message
        );
        resolve({ error: `Failed to run git: ${err.message}` });
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        gitProcess.kill();
        console.warn(`Git command timeout for ${projectName}`);
        resolve({ error: "Git command timeout" });
      }, 10000);
    });
  } catch (error) {
    console.error(`Exception in get-current-branch for ${projectName}:`, error);
    return { error: error.message };
  }
});

ipcMain.handle("run-github-action", async (_, { projectPath, actionName }) => {
  if (!projectPath || !actionName) {
    return { error: "Missing project path or action name" };
  }

  try {
    return new Promise((resolve) => {
      const ghProcess = spawn("gh", ["workflow", "run", actionName], {
        cwd: projectPath,
        stdio: ["ignore", "pipe", "pipe"],
      });

      let output = "";
      let error = "";

      ghProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      ghProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      ghProcess.on("close", (code) => {
        if (code === 0) {
          resolve({ success: true, output: output.trim() });
        } else {
          resolve({ error: error.trim() || "GitHub CLI command failed" });
        }
      });

      ghProcess.on("error", (err) => {
        resolve({ error: err.message });
      });
    });
  } catch (error) {
    return { error: error.message };
  }
});

// ==================== TASK MANAGEMENT IPC ====================
ipcMain.on("start-task", (event, { ticket, name, storyPoints }) => {
  console.log(
    `Main: Received start-task for ${ticket} (${name}) with ${storyPoints} SP. Forwarding to float.`
  );
  if (floatingWindow) {
    floatingWindow.webContents.send("task-started", {
      ticketNumber: ticket,
      ticketName: name,
      storyPoints: storyPoints,
    });
  }
});

ipcMain.on("pause-task", (event, { ticket }) => {
  if (floatingWindow) {
    floatingWindow.webContents.send("task-paused", ticket);
  }
});

ipcMain.on("resume-task", (event, { ticket }) => {
  if (floatingWindow) {
    floatingWindow.webContents.send("task-resumed", ticket);
  }
});

ipcMain.on("stop-task", (event, { ticket }) => {
  // Covers "complete" and "stop" from float
  if (floatingWindow) {
    floatingWindow.webContents.send("task-stopped", ticket);
  }
});

// Optional: Handle task deletion if you want main process to be aware or do something
ipcMain.on("delete-task", (event, { ticket }) => {
  console.log(`Main: Received delete-task for ${ticket}.`);
  // Potentially log this or update some other state if needed in main
});

// Legacy IPC channel (kept for compatibility)
ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
