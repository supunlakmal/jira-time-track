// main/background.ts
import path from "path";
import { app, ipcMain, BrowserWindow, screen, dialog, Tray, Menu, nativeImage } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";
import Store from "electron-store";
import { spawn } from "child_process";
import * as packageInfo from "../package.json";
import { initializeJiraModule, shutdownJiraModule, getJiraModuleStatus } from "./modules/jira";

const isProd = process.env.NODE_ENV === "production";
let floatingWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

// Store for project paths
const projectPathsStore = new Store<Record<string, string>>({
  name: "project-paths",
  defaults: {},
});

// Store for zoom levels
const zoomStore = new Store<Record<string, number>>({
  name: "zoom-levels",
  defaults: { main: 0, float: 0 },
});

// ==================== CENTRALIZED DATA MANAGER ====================
interface BillingData {
  settings: {
    globalHourlyRate?: number;
    projectRates: Record<string, number>;
    currency: string;
    taxRate?: number;
    companyName?: string;
    companyAddress?: string;
    invoicePrefix: string;
  };
  invoices: any[];
}

interface AppData {
  sessions: { [ticketNumber: string]: any };
  projectData: any[];
  manualTasks: any[];
  billing: BillingData;
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { 
      sessions: {}, 
      projectData: [], 
      manualTasks: [],
      billing: {
        settings: {
          projectRates: {},
          currency: "USD",
          invoicePrefix: "INV"
        },
        invoices: []
      }
    },
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

  // Public method for broadcasting theme changes
  broadcastThemeChange(theme: string) {
    this.broadcast("theme-changed", theme);
    console.log(`DataManager: Theme change broadcast to all windows: ${theme}`);
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

  // Project data methods
  setProjectData(data: any[]) {
    this.store.set("projectData", data);
    this.broadcast("project-data-updated", data);
    console.log(`DataManager: Project data updated with ${data.length} tickets`);
  }

  getProjectData() {
    return this.store.get("projectData");
  }


  // Manual task methods
  getManualTasks() {
    return this.store.get("manualTasks", []);
  }

  setManualTasks(tasks: any[]) {
    this.store.set("manualTasks", tasks);
    this.broadcast("manual-tasks-updated", tasks);
    console.log(`DataManager: Manual tasks updated with ${tasks.length} tasks`);
  }

  addManualTask(task: any) {
    const manualTasks = this.getManualTasks();
    const newTask = { ...task, isManual: true, createdAt: new Date().toISOString() };
    manualTasks.push(newTask);
    this.setManualTasks(manualTasks);
    return newTask;
  }

  updateManualTask(taskId: string, updates: any) {
    const manualTasks = this.getManualTasks();
    const index = manualTasks.findIndex(t => t.ticket_number === taskId);
    if (index !== -1) {
      manualTasks[index] = { ...manualTasks[index], ...updates };
      this.setManualTasks(manualTasks);
      return manualTasks[index];
    }
    return null;
  }

  deleteManualTask(taskId: string) {
    const manualTasks = this.getManualTasks();
    const filtered = manualTasks.filter(t => t.ticket_number !== taskId);
    this.setManualTasks(filtered);
    return filtered;
  }

  // Combined data method (Project + Manual)
  getAllTasks() {
    const projectData = this.getProjectData();
    const manualTasks = this.getManualTasks();
    return [...projectData, ...manualTasks];
  }

  // Reset methods
  getResetPreview() {
    const sessions = this.getSessions();
    const projectData = this.getProjectData();
    const manualTasks = this.getManualTasks();
    
    // Get project paths from separate store
    const projectPaths = projectPathsStore.store;
    
    return {
      totalSessions: Object.keys(sessions).length,
      totalProjectData: projectData.length,
      totalManualTasks: manualTasks.length,
      totalProjectPaths: Object.keys(projectPaths).length,
    };
  }

  resetData(options: {
    sessions?: boolean;
    projectData?: boolean;
    manualTasks?: boolean;
    projectPaths?: boolean;
  }) {
    if (options.sessions) {
      this.store.set("sessions", {});
      this.broadcast("sessions-updated", {});
    }
    if (options.projectData) {
      this.store.set("projectData", []);
      this.broadcast("project-data-updated", []);
    }
    if (options.manualTasks) {
      this.store.set("manualTasks", []);
      this.broadcast("manual-tasks-updated", []);
    }
    if (options.projectPaths) {
      projectPathsStore.clear();
    }
  }

  // Billing methods
  getBillingData() {
    try {
      const billing = this.store.get("billing");
      console.log("DataManager: getBillingData called, returning:", billing);
      return billing;
    } catch (error) {
      console.error("DataManager: Error in getBillingData:", error);
      // Return default billing data on error
      return {
        settings: {
          projectRates: {},
          currency: "USD",
          invoicePrefix: "INV"
        },
        invoices: []
      };
    }
  }

  setBillingSettings(settings: any) {
    const billing = this.getBillingData();
    billing.settings = { ...billing.settings, ...settings };
    this.store.set("billing", billing);
    this.broadcast("billing-updated", billing);
    console.log("DataManager: Billing settings updated");
  }

  getBillingSettings() {
    return this.getBillingData().settings;
  }

  addInvoice(invoice: any) {
    const billing = this.getBillingData();
    billing.invoices.push(invoice);
    this.store.set("billing", billing);
    this.broadcast("billing-updated", billing);
    console.log(`DataManager: Invoice ${invoice.invoiceNumber} added`);
    return invoice;
  }

  getInvoices() {
    return this.getBillingData().invoices;
  }

  deleteInvoice(invoiceId: string) {
    const billing = this.getBillingData();
    billing.invoices = billing.invoices.filter(inv => inv.id !== invoiceId);
    this.store.set("billing", billing);
    this.broadcast("billing-updated", billing);
    console.log(`DataManager: Invoice ${invoiceId} deleted`);
  }

  calculateTicketCost(ticketNumber: string) {
    const sessions = this.getSessions();
    const billing = this.getBillingSettings();
    const sessionData = sessions[ticketNumber];

    if (!sessionData) return null;

    const projectData = this.getAllTasks();
    const ticket = projectData.find(t => t.ticket_number === ticketNumber);
    
    if (!ticket) return null;

    const projectName = ticket.project_name;
    const hourlyRate = billing.projectRates[projectName] || billing.globalHourlyRate || 0;
    const timeSpentMs = sessionData.totalElapsed || 0;
    const timeSpentHours = timeSpentMs / (1000 * 60 * 60);
    const totalCost = timeSpentHours * hourlyRate;

    return {
      ticketNumber,
      ticketName: ticket.ticket_name,
      projectName,
      timeSpent: timeSpentMs,
      timeSpentHours,
      hourlyRate,
      totalCost,
      currency: billing.currency || "USD"
    };
  }

  calculateProjectCosts() {
    const sessions = this.getSessions();
    const billing = this.getBillingSettings();
    const projectData = this.getAllTasks();
    const projectCosts = new Map();

    Object.keys(sessions).forEach(ticketNumber => {
      const cost = this.calculateTicketCost(ticketNumber);
      if (cost && cost.projectName) {
        const existing = projectCosts.get(cost.projectName) || {
          projectName: cost.projectName,
          totalTimeSpent: 0,
          totalCost: 0,
          ticketCount: 0,
          currency: cost.currency
        };

        existing.totalTimeSpent += cost.timeSpent;
        existing.totalCost += cost.totalCost;
        existing.ticketCount += 1;
        projectCosts.set(cost.projectName, existing);
      }
    });

    return Array.from(projectCosts.values()).map(project => ({
      ...project,
      averageHourlyRate: project.totalTimeSpent > 0 
        ? project.totalCost / (project.totalTimeSpent / (1000 * 60 * 60))
        : 0
    }));
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
      // Restore zoom level
      const savedZoom = zoomStore.get('float', 0);
      floatingWindow.webContents.setZoomLevel(savedZoom);
      
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

  // Initialize Jira module (if enabled)
  try {
    await initializeJiraModule();
    const jiraStatus = getJiraModuleStatus();
    console.log('Jira module status:', jiraStatus);
  } catch (error) {
    console.error('Failed to initialize Jira module:', error);
  }

  // Create splash screen first
  createSplashWindow();

  // Create system tray
  createTray();

  // Create main window (hidden initially)
  mainWindow = createMainWindow();

  // Application starts with empty task list until CSV import

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
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS, re-create windows when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

function createTray() {
  // Create tray icon from app icon or use a default
  const iconPath = path.join(__dirname, "../resources/icon.png");
  let trayIcon;
  
  try {
    // Try to use the app icon, fallback to creating a simple icon
    if (fs.existsSync(iconPath)) {
      trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
    } else {
      // Create a simple icon programmatically
      trayIcon = nativeImage.createEmpty();
    }
  } catch (error) {
    console.log("Could not load tray icon, using empty icon");
    trayIcon = nativeImage.createEmpty();
  }

  tray = new Tray(trayIcon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Main Window',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          createMainWindow();
        }
      }
    },
    {
      label: 'Toggle Floating Timer',
      click: () => {
        if (floatingWindow?.isVisible()) {
          floatingWindow.hide();
        } else if (floatingWindow) {
          floatingWindow.show();
          floatingWindow.focus();
        } else {
          createFloatingWindow();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quick Actions',
      submenu: [
        {
          label: 'Start New Timer',
          click: () => {
            // Show floating window for timer selection
            if (!floatingWindow) {
              createFloatingWindow();
            } else {
              floatingWindow.show();
              floatingWindow.focus();
            }
          }
        },
        {
          label: 'View Today\'s Summary',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
            } else {
              createMainWindow();
            }
          }
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Zoom',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              const currentZoom = focusedWindow.webContents.getZoomLevel();
              const newZoom = Math.min(currentZoom + 0.5, 3);
              focusedWindow.webContents.setZoomLevel(newZoom);
              
              const windowType = focusedWindow === mainWindow ? 'main' : 'float';
              zoomStore.set(windowType, newZoom);
            }
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              const currentZoom = focusedWindow.webContents.getZoomLevel();
              const newZoom = Math.max(currentZoom - 0.5, -3);
              focusedWindow.webContents.setZoomLevel(newZoom);
              
              const windowType = focusedWindow === mainWindow ? 'main' : 'float';
              zoomStore.set(windowType, newZoom);
            }
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.webContents.setZoomLevel(0);
              
              const windowType = focusedWindow === mainWindow ? 'main' : 'float';
              zoomStore.set(windowType, 0);
            }
          }
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Project Time Tracker');
  
  // Click on tray icon shows/hides floating window
  tray.on('click', () => {
    if (floatingWindow?.isVisible()) {
      floatingWindow.hide();
    } else if (floatingWindow) {
      floatingWindow.show();
      floatingWindow.focus();
    } else {
      createFloatingWindow();
    }
  });
  
  // Double-click shows main window
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    } else {
      createMainWindow();
    }
  });
}

function updateTrayTitle(activeTimers: number = 0) {
  if (tray) {
    if (activeTimers > 0) {
      tray.setToolTip(`Project Time Tracker - ${activeTimers} active timer${activeTimers > 1 ? 's' : ''}`);
    } else {
      tray.setToolTip('Project Time Tracker - No active timers');
    }
  }
}

function createSplashWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: Math.round((width - 400) / 2),
    y: Math.round((height - 300) / 2),
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "splash-preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load splash screen HTML
  let splashPath;
  if (isProd) {
    // In production, the app directory structure is different
    splashPath = path.join(__dirname, "..", "renderer", "pages", "splash.html");
  } else {
    // In development, we need to go up from main directory
    splashPath = path.join(__dirname, "..", "renderer", "pages", "splash.html");
  }
  
  console.log("Main: Loading splash screen from:", splashPath);
  console.log("Main: __dirname is:", __dirname);
  console.log("Main: isProd is:", isProd);
  
  // Check if file exists
  try {
    if (fs.existsSync(splashPath)) {
      console.log("Main: Splash file exists at:", splashPath);
      splashWindow.loadFile(splashPath);
    } else {
      console.error("Main: Splash file does not exist at:", splashPath);
      // Try alternative path
      const altPath = path.join(__dirname, "..", "..", "renderer", "pages", "splash.html");
      console.log("Main: Trying alternative path:", altPath);
      if (fs.existsSync(altPath)) {
        console.log("Main: Alternative path exists, loading from:", altPath);
        splashWindow.loadFile(altPath);
      } else {
        console.error("Main: Alternative path also does not exist");
      }
    }
  } catch (error) {
    console.error("Main: Error checking splash file:", error);
  }

  splashWindow.once('ready-to-show', () => {
    console.log("Main: Splash screen ready to show");
    if (splashWindow) {
      splashWindow.show();
      
      // Send app information to splash screen
      try {
        const appVersion = app.getVersion();
        const appName = packageInfo.name || 'Project Time Tracker';
        
        splashWindow.webContents.send('app-info', {
          version: appVersion,
          name: appName
        });
        
        console.log(`Main: Sent app info - version: ${appVersion}, name: ${appName}`);
      } catch (error) {
        console.error('Main: Error sending app info to splash screen:', error);
        
        // Send fallback values
        splashWindow.webContents.send('app-info', {
          version: '1.0.0',
          name: 'Project Time Tracker'
        });
      }
    }
  });

  splashWindow.on("closed", () => {
    console.log("Main: Splash window closed");
    splashWindow = null;
  });

  // Fallback timeout to ensure splash closes after 10 seconds
  setTimeout(() => {
    if (splashWindow) {
      console.log("Main: Fallback timeout - closing splash screen");
      splashWindow.close();
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  }, 10000);

  return splashWindow;
}

function createMainWindow() {
  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    show: false, // Don't show initially
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Register main window with data manager
  dataManager.registerWindow(mainWindow);

  // Restore zoom level
  const savedZoom = zoomStore.get('main', 0);
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.webContents.setZoomLevel(savedZoom);
    }
  });

  return mainWindow;
}

// ==================== SPLASH SCREEN IPC ====================
ipcMain.on("app-ready", () => {
  console.log("Main: Received app-ready signal");
  
  // Smooth transition: fade out splash, then show main window
  if (splashWindow && mainWindow) {
    console.log("Main: Both splash and main windows exist, starting transition");
    
    // Add fade-out effect to splash
    splashWindow.webContents.executeJavaScript(`
      console.log('Splash: Starting fade-out');
      document.body.style.transition = 'opacity 0.3s ease-out';
      document.body.style.opacity = '0';
    `);
    
    // Close splash and show main window after fade-out
    setTimeout(() => {
      console.log("Main: Closing splash and showing main window");
      if (splashWindow) {
        splashWindow.close();
      }
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    }, 300);
  } else {
    console.log("Main: Missing windows - splash:", !!splashWindow, "main:", !!mainWindow);
  }
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
// Get all tasks (project + manual)
ipcMain.handle("load-project-data", async () => {
  return dataManager.getAllTasks();
});

// New centralized data handlers
ipcMain.handle("get-sessions", () => {
  return dataManager.getSessions();
});

ipcMain.on("save-session", (_, sessionData) => {
  dataManager.saveSession(sessionData);
});


// Manual task IPC handlers
ipcMain.handle("get-manual-tasks", () => {
  return dataManager.getManualTasks();
});

ipcMain.handle("get-all-tasks", () => {
  return dataManager.getAllTasks();
});

ipcMain.handle("add-manual-task", (_, taskData) => {
  try {
    // Validate task data
    if (!taskData.ticket_number || !taskData.ticket_name) {
      throw new Error("Ticket number and name are required");
    }
    
    // Check if ticket number already exists
    const allTasks = dataManager.getAllTasks();
    const exists = allTasks.some(t => t.ticket_number === taskData.ticket_number);
    if (exists) {
      throw new Error("Ticket number already exists");
    }
    
    const newTask = dataManager.addManualTask(taskData);
    return { success: true, task: newTask };
  } catch (error) {
    console.error("Error adding manual task:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("update-manual-task", (_, { taskId, updates }) => {
  try {
    const updatedTask = dataManager.updateManualTask(taskId, updates);
    if (updatedTask) {
      return { success: true, task: updatedTask };
    } else {
      return { success: false, error: "Task not found" };
    }
  } catch (error) {
    console.error("Error updating manual task:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("delete-manual-task", (_, taskId) => {
  try {
    dataManager.deleteManualTask(taskId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting manual task:", error);
    return { success: false, error: error.message };
  }
});

// ==================== BILLING IPC HANDLERS ====================
ipcMain.handle("get-billing-data", () => {
  try {
    const billingData = dataManager.getBillingData();
    console.log("Main: get-billing-data called, returning:", billingData);
    return billingData;
  } catch (error) {
    console.error("Main: Error in get-billing-data:", error);
    throw error;
  }
});

ipcMain.handle("get-billing-settings", () => {
  return dataManager.getBillingSettings();
});

ipcMain.handle("save-billing-settings", (_, settings) => {
  try {
    dataManager.setBillingSettings(settings);
    return { success: true };
  } catch (error) {
    console.error("Error saving billing settings:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("calculate-ticket-cost", (_, ticketNumber) => {
  try {
    const cost = dataManager.calculateTicketCost(ticketNumber);
    return { success: true, cost };
  } catch (error) {
    console.error("Error calculating ticket cost:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("calculate-project-costs", () => {
  try {
    const costs = dataManager.calculateProjectCosts();
    return { success: true, costs };
  } catch (error) {
    console.error("Error calculating project costs:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("add-invoice", (_, invoiceData) => {
  try {
    const invoice = dataManager.addInvoice(invoiceData);
    return { success: true, invoice };
  } catch (error) {
    console.error("Error adding invoice:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-invoices", () => {
  try {
    const invoices = dataManager.getInvoices();
    return { success: true, invoices };
  } catch (error) {
    console.error("Error getting invoices:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("delete-invoice", (_, invoiceId) => {
  try {
    dataManager.deleteInvoice(invoiceId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { success: false, error: error.message };
  }
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

ipcMain.handle("create-git-branch", async (_, { branchName, projectPath }) => {
  if (!branchName || !projectPath) {
    return { success: false, error: "Branch name and project path are required" };
  }

  // Check if the project directory exists
  if (!fs.existsSync(projectPath)) {
    return { success: false, error: "Project path does not exist" };
  }

  console.log(`Attempting to switch to or create git branch '${branchName}' in path: ${projectPath}`);

  try {
    return new Promise((resolve) => {
      // First, try to switch to existing branch
      console.log(`Trying to switch to existing branch '${branchName}'`);
      const switchProcess = spawn("git", ["checkout", branchName], {
        cwd: projectPath,
        stdio: ["ignore", "pipe", "pipe"],
      });

      let switchOutput = "";
      let switchError = "";

      switchProcess.stdout.on("data", (data) => {
        switchOutput += data.toString();
      });

      switchProcess.stderr.on("data", (data) => {
        switchError += data.toString();
      });

      switchProcess.on("close", (switchCode) => {
        if (switchCode === 0) {
          // Successfully switched to existing branch
          console.log(`Successfully switched to existing branch '${branchName}'`);
          resolve({ success: true, message: `Switched to existing branch '${branchName}'`, action: "switched" });
        } else {
          // Switch failed, try to create new branch
          console.log(`Switch failed, attempting to create new branch '${branchName}'`);
          
          const createProcess = spawn("git", ["checkout", "-b", branchName], {
            cwd: projectPath,
            stdio: ["ignore", "pipe", "pipe"],
          });

          let createOutput = "";
          let createError = "";

          createProcess.stdout.on("data", (data) => {
            createOutput += data.toString();
          });

          createProcess.stderr.on("data", (data) => {
            createError += data.toString();
          });

          createProcess.on("close", (createCode) => {
            if (createCode === 0) {
              console.log(`Successfully created and switched to new branch '${branchName}'`);
              resolve({ success: true, message: `Created and switched to new branch '${branchName}'`, action: "created" });
            } else {
              console.error(`Failed to create branch:`, createError.trim());
              const errorMessage = createError.trim() || "Failed to create branch";
              
              // Handle common errors with user-friendly messages
              if (errorMessage.includes("not a git repository")) {
                resolve({ success: false, error: "Not a git repository" });
              } else if (errorMessage.includes("already exists")) {
                resolve({ success: false, error: `Branch '${branchName}' already exists but cannot switch to it` });
              } else {
                resolve({ success: false, error: errorMessage });
              }
            }
          });

          createProcess.on("error", (err) => {
            console.error(`Error running git create command:`, err.message);
            resolve({ success: false, error: `Failed to run git create: ${err.message}` });
          });

          // Timeout for create process
          setTimeout(() => {
            createProcess.kill();
            console.warn(`Git create command timeout`);
            resolve({ success: false, error: "Git create command timeout" });
          }, 10000);
        }
      });

      switchProcess.on("error", (err) => {
        console.error(`Error running git switch command:`, err.message);
        resolve({ success: false, error: `Failed to run git switch: ${err.message}` });
      });

      // Timeout for switch process
      setTimeout(() => {
        switchProcess.kill();
        console.warn(`Git switch command timeout`);
        resolve({ success: false, error: "Git switch command timeout" });
      }, 10000);
    });
  } catch (error) {
    console.error(`Exception in create-git-branch:`, error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("check-git-branch-exists", async (_, { branchName, projectPath }) => {
  if (!branchName || !projectPath) {
    return { success: false, error: "Branch name and project path are required" };
  }

  // Check if the project directory exists
  if (!fs.existsSync(projectPath)) {
    return { success: false, error: "Project path does not exist" };
  }

  console.log(`Checking if git branch '${branchName}' exists in path: ${projectPath}`);

  try {
    return new Promise((resolve) => {
      const gitProcess = spawn("git", ["branch", "--list", branchName], {
        cwd: projectPath,
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
          // Check if output contains the branch name (means branch exists)
          const branchExists = output.trim().includes(branchName);
          console.log(`Branch '${branchName}' exists: ${branchExists}`);
          resolve({ success: true, exists: branchExists });
        } else {
          console.error(`Git branch check failed:`, error.trim());
          const errorMessage = error.trim() || "Git branch check failed";
          
          // Handle common errors
          if (errorMessage.includes("not a git repository")) {
            resolve({ success: false, error: "Not a git repository" });
          } else {
            resolve({ success: false, error: errorMessage });
          }
        }
      });

      gitProcess.on("error", (err) => {
        console.error(`Error running git branch check:`, err.message);
        resolve({ success: false, error: `Failed to run git: ${err.message}` });
      });

      // Timeout after 5 seconds (shorter for branch check)
      setTimeout(() => {
        gitProcess.kill();
        console.warn(`Git branch check timeout`);
        resolve({ success: false, error: "Git branch check timeout" });
      }, 5000);
    });
  } catch (error) {
    console.error(`Exception in check-git-branch-exists:`, error);
    return { success: false, error: error.message };
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
  
  // Update tray to show no active timers (simplified)
  updateTrayTitle(0);
});

// ==================== TRAY MANAGEMENT IPC ====================
ipcMain.handle("update-tray-status", (_, { activeTimers }) => {
  updateTrayTitle(activeTimers);
  return { success: true };
});

ipcMain.on("show-main-window", () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    createMainWindow();
  }
});

// ==================== EXPORT FUNCTIONALITY ====================
ipcMain.handle("export-time-data", async (_, { format, dateRange, filterProject }) => {
  try {
    const sessions = dataManager.getSessions();
    const projectData = dataManager.getProjectData();
    
    // Prepare export data
    const exportData = [];
    
    for (const [ticketNumber, sessionData] of Object.entries(sessions)) {
// const ticketInfo = projectData.find(t => t.ticket_number === ticketNumber);
      
      for (const session of sessionData.sessions) {
        if (session.endTime) {
          const sessionDate = new Date(session.startTime);
          
          // Apply date filter if specified
          if (dateRange) {
            if (dateRange.start && sessionDate < new Date(dateRange.start)) continue;
            if (dateRange.end && sessionDate > new Date(dateRange.end)) continue;
          }
          
          // Apply project filter if specified
          if (filterProject) {
            const projectName = ticketNumber.split('-')[0];
            if (projectName !== filterProject) continue;
          }
          
          exportData.push({
            ticketNumber,
            ticketName: sessionData.ticketName,
            projectName: ticketNumber.split('-')[0],
            storyPoints: sessionData.storyPoints || 0,
            sessionStart: new Date(session.startTime).toISOString(),
            sessionEnd: new Date(session.endTime).toISOString(),
            duration: session.duration,
            durationHours: (session.duration / (1000 * 60 * 60)).toFixed(2),
            status: session.status,
            date: sessionDate.toISOString().split('T')[0]
          });
        }
      }
    }
    
    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Ticket Number',
        'Ticket Name', 
        'Project',
        'Story Points',
        'Date',
        'Session Start',
        'Session End',
        'Duration (ms)',
        'Duration (hours)',
        'Status'
      ];
      
      const csvRows = [headers.join(',')];
      
      exportData.forEach(row => {
        const csvRow = [
          `"${row.ticketNumber}"`,
          `"${row.ticketName.replace(/"/g, '""')}"`,
          `"${row.projectName}"`,
          row.storyPoints,
          `"${row.date}"`,
          `"${row.sessionStart}"`,
          `"${row.sessionEnd}"`,
          row.duration,
          row.durationHours,
          `"${row.status}"`
        ];
        csvRows.push(csvRow.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      
      // Show save dialog
      const result = await dialog.showSaveDialog({
        filters: [{ name: 'CSV Files', extensions: ['csv'] }],
        defaultPath: `time-tracking-export-${new Date().toISOString().split('T')[0]}.csv`
      });
      
      if (!result.canceled && result.filePath) {
        await fs.promises.writeFile(result.filePath, csvContent, 'utf8');
        return { success: true, filePath: result.filePath, recordCount: exportData.length };
      } else {
        return { canceled: true };
      }
      
    } else if (format === 'json') {
      // Generate JSON
      const jsonContent = JSON.stringify({
        exportDate: new Date().toISOString(),
        filters: { dateRange, filterProject },
        totalRecords: exportData.length,
        data: exportData
      }, null, 2);
      
      const result = await dialog.showSaveDialog({
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
        defaultPath: `time-tracking-export-${new Date().toISOString().split('T')[0]}.json`
      });
      
      if (!result.canceled && result.filePath) {
        await fs.promises.writeFile(result.filePath, jsonContent, 'utf8');
        return { success: true, filePath: result.filePath, recordCount: exportData.length };
      } else {
        return { canceled: true };
      }
    }
    
    return { error: 'Unsupported format' };
    
  } catch (error) {
    console.error('Export error:', error);
    return { error: error.message };
  }
});

ipcMain.handle("get-export-summary", () => {
  try {
    const sessions = dataManager.getSessions();
// const projectData = dataManager.getProjectData();
    
    let totalSessions = 0;
    let totalTime = 0;
    const projects = new Set();
    
    for (const [ticketNumber, sessionData] of Object.entries(sessions)) {
      projects.add(ticketNumber.split('-')[0]);
      totalSessions += sessionData.sessions.length;
      totalTime += sessionData.totalElapsed || 0;
    }
    
    return {
      totalSessions,
      totalTime,
      totalProjects: projects.size,
      totalTickets: Object.keys(sessions).length
    };
  } catch (error) {
    return { error: error.message };
  }
});

// Optional: Handle task deletion if you want main process to be aware or do something
ipcMain.on("delete-task", (event, { ticket }) => {
  console.log(`Main: Received delete-task for ${ticket}.`);
  // Potentially log this or update some other state if needed in main
});

// ==================== CSV IMPORT IPC HANDLERS ====================
ipcMain.handle("import-csv-data", async (_, csvData) => {
  try {
    console.log(`Main: Importing ${csvData.length} tasks from CSV data`);
    
    // Validate CSV data structure
    const validatedData = csvData.map((row, index) => {
      if (!row.ticket_number || !row.ticket_name) {
        throw new Error(`Row ${index + 1}: Missing required fields (ticket_number, ticket_name)`);
      }
      return {
        ticket_number: row.ticket_number,
        ticket_name: row.ticket_name,
        story_points: row.story_points || null,
        isImported: true,
        importedAt: new Date().toISOString()
      };
    });

    // Replace current project data with CSV data
    dataManager.setProjectData(validatedData);
    
    return { success: true, importedCount: validatedData.length };
  } catch (error) {
    console.error("CSV import error:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("import-csv-file", async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (result.canceled || !result.filePaths[0]) {
      return { canceled: true };
    }

    const filePath = result.filePaths[0];
    console.log(`Main: Importing CSV file: ${filePath}`);

    // Read and parse CSV file
    const csvContent = await fs.promises.readFile(filePath, 'utf8');
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 2) {
      return { success: false, error: 'CSV file must contain at least a header row and one data row' };
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredColumns = ['ticket_number', 'ticket_name', 'story_points'];
    const missingColumns = requiredColumns.filter(col => !headers.includes(col.toLowerCase()));
    
    if (missingColumns.length > 0) {
      return { success: false, error: `Missing required columns: ${missingColumns.join(', ')}` };
    }

    const csvData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      
      if (values.length !== headers.length) {
        return { success: false, error: `Row ${i + 1}: Column count mismatch` };
      }

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      if (!row.ticket_number || !row.ticket_name) {
        return { success: false, error: `Row ${i + 1}: Missing required fields` };
      }

      const storyPoints = row.story_points && row.story_points.trim() !== '' 
        ? parseFloat(row.story_points) 
        : null;

      if (row.story_points && row.story_points.trim() !== '' && isNaN(storyPoints)) {
        return { success: false, error: `Row ${i + 1}: Invalid story points value` };
      }

      csvData.push({
        ticket_number: row.ticket_number,
        ticket_name: row.ticket_name,
        story_points: storyPoints
      });
    }

    // Import the parsed data
    const validatedData = csvData.map((row, index) => {
      return {
        ticket_number: row.ticket_number,
        ticket_name: row.ticket_name,
        story_points: row.story_points || null,
        isImported: true,
        importedAt: new Date().toISOString()
      };
    });

    // Replace current project data with CSV data
    dataManager.setProjectData(validatedData);
    
    return { success: true, importedCount: validatedData.length };
  } catch (error) {
    console.error("CSV file import error:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-data-source-info", () => {
  try {
    const projectData = dataManager.getProjectData();
    const manualTasks = dataManager.getManualTasks();
    const allTasks = dataManager.getAllTasks();
    
    return {
      projectDataCount: projectData.length,
      manualTasksCount: manualTasks.length,
      totalTasksCount: allTasks.length,
      hasImportedData: projectData.some(task => task.isImported),
      lastImportDate: projectData.find(task => task.importedAt)?.importedAt || null
    };
  } catch (error) {
    console.error("Error getting data source info:", error);
    return { error: error.message };
  }
});

// Reset data handlers
ipcMain.handle("get-reset-preview", () => {
  try {
    return dataManager.getResetPreview();
  } catch (error) {
    console.error("Error getting reset preview:", error);
    return { error: error.message };
  }
});

ipcMain.handle("reset-data", (event, options) => {
  try {
    dataManager.resetData(options);
    return { success: true };
  } catch (error) {
    console.error("Error resetting data:", error);
    return { success: false, error: error.message };
  }
});

// ==================== ZOOM IPC HANDLERS ====================
ipcMain.handle("zoom-in", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    const currentZoom = focusedWindow.webContents.getZoomLevel();
    const newZoom = Math.min(currentZoom + 0.5, 3); // Max zoom level 3
    focusedWindow.webContents.setZoomLevel(newZoom);
    
    // Save zoom level
    const windowType = focusedWindow === mainWindow ? 'main' : 'float';
    zoomStore.set(windowType, newZoom);
    
    return { success: true, zoomLevel: newZoom };
  }
  return { success: false, error: "No focused window" };
});

ipcMain.handle("zoom-out", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    const currentZoom = focusedWindow.webContents.getZoomLevel();
    const newZoom = Math.max(currentZoom - 0.5, -3); // Min zoom level -3
    focusedWindow.webContents.setZoomLevel(newZoom);
    
    // Save zoom level
    const windowType = focusedWindow === mainWindow ? 'main' : 'float';
    zoomStore.set(windowType, newZoom);
    
    return { success: true, zoomLevel: newZoom };
  }
  return { success: false, error: "No focused window" };
});

ipcMain.handle("zoom-reset", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.setZoomLevel(0);
    
    // Save zoom level
    const windowType = focusedWindow === mainWindow ? 'main' : 'float';
    zoomStore.set(windowType, 0);
    
    return { success: true, zoomLevel: 0 };
  }
  return { success: false, error: "No focused window" };
});

ipcMain.handle("get-zoom-level", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    const zoomLevel = focusedWindow.webContents.getZoomLevel();
    return { success: true, zoomLevel };
  }
  return { success: false, error: "No focused window" };
});

// ==================== THEME SYNCHRONIZATION IPC ====================
ipcMain.on("theme-changed", (event, theme) => {
  console.log(`Theme changed to: ${theme}`);
  // Broadcast theme change to all windows
  dataManager.broadcastThemeChange(theme);
});

ipcMain.handle("get-current-theme", () => {
  // This will be used by newly opened windows to get the current theme
  // For now, we'll rely on localStorage in each window
  return { success: true };
});

// Legacy IPC channel (kept for compatibility)
ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

// Cleanup on app quit
app.on("before-quit", async () => {
  if (tray) {
    tray.destroy();
  }
  
  // Shutdown Jira module
  try {
    await shutdownJiraModule();
  } catch (error) {
    console.error('Failed to shutdown Jira module:', error);
  }
});
