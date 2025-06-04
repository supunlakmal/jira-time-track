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

// Store for project paths
const projectPathsStore = new Store<Record<string, string>>({
  name: "project-paths",
  defaults: {},
});

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

  if (isProd) {
    await floatingWindow.loadURL("app://./float");
  } else {
    const port = process.argv[2];
    await floatingWindow.loadURL(`http://localhost:${port}/float`);
    // floatingWindow.webContents.openDevTools(); // Keep this commented out for default behavior
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

  // Remove the automatic showing and dev tools opening for floatingWindow
  // It will be controlled by the toggle button or other interactions
  // setTimeout(() => {
  //   if (floatingWindow) {
  //     floatingWindow.show();
  //     floatingWindow.focus();
  //     if (!isProd) {
  //       floatingWindow.webContents.openDevTools();
  //     }
  //   }
  // }, 2000);

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

// This IPC channel seems unused for now, but kept for potential future use.
ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.on("window-control", (_, command) => {
  if (!floatingWindow) return;

  switch (command) {
    case "minimize": // This will now be handled by the resize logic in float.tsx
      // floatingWindow.minimize(); // Actual minimize might not be desired
      // Instead, float.tsx will send a resize command
      break;
    case "maximize": // Standard maximize/unmaximize
      if (floatingWindow.isMaximized()) {
        floatingWindow.unmaximize();
      } else {
        floatingWindow.maximize();
      }
      break;
    case "close": // This actually means 'hide' for the float window
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

ipcMain.handle("load-jira-data", async () => {
  try {
    const dataPath = path.join(__dirname, "../json/data.json"); // Adjusted path
    const rawData = await fs.promises.readFile(dataPath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
});

// Project paths storage handlers
ipcMain.handle("get-project-paths", async () => {
  try {
    return projectPathsStore.store;
  } catch (error) {
    console.error("Error getting project paths:", error);
    return {};
  }
});

ipcMain.on("save-project-paths", (event, paths: Record<string, string>) => {
  try {
    projectPathsStore.store = paths;
    console.log("Project paths saved:", paths);
  } catch (error) {
    console.error("Error saving project paths:", error);
  }
});

// Directory selection handler
ipcMain.handle(
  "select-project-directory",
  async (event, projectName: string) => {
    try {
      const result = await dialog.showOpenDialog({
        title: `Select directory for ${projectName}`,
        properties: ["openDirectory"],
        message: `Choose the local directory for project: ${projectName}`,
      });

      if (result.canceled) {
        return { canceled: true };
      }

      if (result.filePaths && result.filePaths.length > 0) {
        return { filePath: result.filePaths[0] };
      }

      return { error: "No directory selected" };
    } catch (error) {
      console.error("Error in select-project-directory:", error);
      return { error: error.message };
    }
  }
);

// Git current branch handler
ipcMain.handle(
  "get-current-branch",
  async (event, { projectName, projectPath }) => {
    return new Promise((resolve) => {
      try {
        const gitProcess = spawn("git", ["branch", "--show-current"], {
          cwd: projectPath,
          stdio: ["ignore", "pipe", "pipe"],
        });

        let stdout = "";
        let stderr = "";

        gitProcess.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        gitProcess.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        gitProcess.on("close", (code) => {
          if (code === 0) {
            const branch = stdout.trim();
            if (branch) {
              console.log(`Current branch for ${projectName}: ${branch}`);
              resolve({ branch });
            } else {
              console.warn(`No branch found for ${projectName}`);
              resolve({ error: "No branch found" });
            }
          } else {
            console.error(`Git command failed for ${projectName}:`, stderr);
            resolve({
              error: `Git command failed: ${stderr.trim() || "Unknown error"}`,
            });
          }
        });

        gitProcess.on("error", (error) => {
          console.error(`Error running git command for ${projectName}:`, error);
          resolve({ error: `Failed to run git: ${error.message}` });
        });

        // Timeout after 5 seconds
        setTimeout(() => {
          gitProcess.kill();
          resolve({ error: "Git command timeout" });
        }, 5000);
      } catch (error) {
        console.error(
          `Exception in get-current-branch for ${projectName}:`,
          error
        );
        resolve({ error: error.message });
      }
    });
  }
);

// GitHub Action trigger handler (kept for future use)
ipcMain.on("run-github-action", (event, { projectName, projectPath }) => {
  console.log(
    `Attempting to run GitHub Action for ${projectName} at ${projectPath}`
  );
  // You can implement the actual GitHub Action triggering logic here
  // This might involve:
  // 1. Running git commands in the project directory
  // 2. Making API calls to GitHub Actions
  // 3. Running local scripts that trigger actions

  // For now, just log the attempt
  console.log("GitHub Action trigger requested but not implemented yet");

  // Example implementation (uncomment and modify as needed):
  /*
  const gitProcess = spawn('git', ['status'], { 
    cwd: projectPath,
    stdio: 'inherit'
  });
  
  gitProcess.on('close', (code) => {
    console.log(`Git command exited with code ${code}`);
  });
  
  gitProcess.on('error', (error) => {
    console.error(`Error running git command: ${error}`);
  });
  */
});

// Timer event handlers
ipcMain.on("start-task", (event, { ticket, name, storyPoints }) => {
  // Added storyPoints
  if (floatingWindow) {
    console.log(
      `Main: Received start-task for ${ticket} - ${name} (SP: ${storyPoints}). Forwarding to float.`
    );
    floatingWindow.webContents.send("task-started", {
      ticketNumber: ticket,
      ticketName: name,
      storyPoints: storyPoints, // Forward storyPoints
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
