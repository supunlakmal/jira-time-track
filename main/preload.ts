import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// Whitelist of safe channels that can be used
const validChannels = [
  "window-control",
  "window-move",
  "window-resize",
  "start-task",
  "pause-task",
  "resume-task",
  "stop-task",
  "toggle-float-window",
  "load-project-data",
  "get-project-paths",
  "save-project-paths",
  "select-project-directory",
  "get-current-branch",
  "create-git-branch",
  "check-git-branch-exists",
  "run-github-action",
  // Add any other channels your application might use between renderer and main
  "task-started", // For main-to-renderer
  "task-paused", // For main-to-renderer
  "task-resumed", // For main-to-renderer
  "task-stopped", // For main-to-renderer
  "get-sessions",
  "save-session",
  "sessions-updated",
  "project-data-updated",
  // Manual task channels
  "get-all-tasks",
  "get-manual-tasks",
  "add-manual-task",
  "update-manual-task",
  "delete-manual-task",
  "manual-tasks-updated",
  // Export functionality
  "export-time-data",
  "get-export-summary",
  // CSV Import functionality
  "import-csv-data",
  "import-csv-file",
  "get-data-source-info",
  "get-all-store-data",
  // Billing functionality
  "get-billing-data",
  "get-billing-settings",
  "save-billing-settings",
  "billing-updated",
  // Projects functionality
  "get-projects",
  "add-project",
  "update-project",
  "delete-project",
  "projects-updated",
  // Reset functionality
  "get-reset-preview",
  "reset-data",
  // Tray and window management
  "update-tray-status",
  "show-main-window",
  "delete-task",
  // Zoom functionality
  "zoom-in",
  "zoom-out",
  "zoom-reset",
  "get-zoom-level",
  // Theme synchronization
  "theme-changed",
  // Jira integration channels
  "jira-check-secure-storage",
  "jira-store-credentials",
  "jira-get-credentials-status",
  "jira-test-connection",
  "jira-fetch-issues",
  "jira-convert-to-tickets",
  "jira-clear-credentials",
  "jira-get-projects",
];

const originalIpcRendererSend = ipcRenderer.send;
const originalIpcRendererInvoke = ipcRenderer.invoke;
const originalIpcRendererOn = ipcRenderer.on;
const originalIpcRendererRemoveListener = ipcRenderer.removeListener;

const handler = {
  send(channel: string, ...args: any[]) {
    if (validChannels.includes(channel)) {
      console.log(`[IPC PRELOAD SEND] Channel: "${channel}"`, "Args:", args);
      // For regular send
      return originalIpcRendererSend.apply(ipcRenderer, [channel, ...args]);
    } else {
      console.warn(`[IPC PRELOAD SEND BLOCKED] Invalid channel: "${channel}"`);
    }
  },

  invoke(channel: string, ...args: any[]) {
    if (validChannels.includes(channel)) {
      console.log(`[IPC PRELOAD INVOKE] Channel: "${channel}"`, "Args:", args);
      const promise = originalIpcRendererInvoke.apply(ipcRenderer, [
        channel,
        ...args,
      ]);
      promise.then(
        (result) =>
          console.log(
            `[IPC PRELOAD INVOKE SUCCESS] Channel: "${channel}"`,
            "Result:",
            result
          ),
        (error) =>
          console.error(
            `[IPC PRELOAD INVOKE ERROR] Channel: "${channel}"`,
            "Error:",
            error
          )
      );
      return promise;
    } else {
      console.warn(
        `[IPC PRELOAD INVOKE BLOCKED] Invalid channel: "${channel}"`
      );
      return Promise.reject(new Error(`Invalid channel: ${channel}`));
    }
  },

  on(channel: string, callback: (...args: any[]) => void) {
    if (validChannels.includes(channel)) {
      console.log(
        `[IPC PRELOAD ON] Registering listener for channel: "${channel}"`
      );

      // Wrap the callback to log when it's invoked
      const wrappedCallback = (...eventArgs: any[]) => {
        console.log(
          `[IPC PRELOAD ON CALLBACK] Channel: "${channel}"`,
          "Callback invoked with args:",
          eventArgs
        );
        callback(...eventArgs);
      };

      // The original ipcRenderer.on expects the event object as the first arg to the listener
      const subscription = (event: IpcRendererEvent, ...listenerArgs: any[]) =>
        wrappedCallback(...listenerArgs);

      originalIpcRendererOn.apply(ipcRenderer, [channel, subscription]);

      return () => {
        console.log(
          `[IPC PRELOAD ON CLEANUP] Removing listener for channel: "${channel}"`
        );
        originalIpcRendererRemoveListener.apply(ipcRenderer, [
          channel,
          subscription,
        ]);
      };
    } else {
      console.warn(
        `[IPC PRELOAD ON BLOCKED] Invalid channel for listener: "${channel}"`
      );
      return () => {};
    }
  },
  window: {
    minimize: () => {
      console.log("[IPC PRELOAD WINDOW] Minimize");
      ipcRenderer.send("window-control", "minimize");
    },
    maximize: () => {
      console.log("[IPC PRELOAD WINDOW] Maximize");
      ipcRenderer.send("window-control", "maximize");
    },
    close: () => {
      console.log("[IPC PRELOAD WINDOW] Close");
      ipcRenderer.send("window-control", "close");
    },
    hide: () => {
      console.log("[IPC PRELOAD WINDOW] Hide");
      ipcRenderer.send("window-control", "hide");
    },
    show: () => {
      console.log("[IPC PRELOAD WINDOW] Show");
      ipcRenderer.send("window-control", "show");
    },
  },
  zoom: {
    in: async () => {
      console.log("[IPC PRELOAD ZOOM] Zoom In");
      return await ipcRenderer.invoke("zoom-in");
    },
    out: async () => {
      console.log("[IPC PRELOAD ZOOM] Zoom Out");
      return await ipcRenderer.invoke("zoom-out");
    },
    reset: async () => {
      console.log("[IPC PRELOAD ZOOM] Reset Zoom");
      return await ipcRenderer.invoke("zoom-reset");
    },
    getLevel: async () => {
      console.log("[IPC PRELOAD ZOOM] Get Zoom Level");
      return await ipcRenderer.invoke("get-zoom-level");
    },
  },
  git: {
    createBranch: async (branchName: string, projectPath: string) => {
      console.log("[IPC PRELOAD GIT] Create Branch", branchName, projectPath);
      return await ipcRenderer.invoke("create-git-branch", { branchName, projectPath });
    },
    checkBranchExists: async (branchName: string, projectPath: string) => {
      console.log("[IPC PRELOAD GIT] Check Branch Exists", branchName, projectPath);
      return await ipcRenderer.invoke("check-git-branch-exists", { branchName, projectPath });
    },
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
