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
  "load-jira-data",
];

const handler = {
  send(channel: string, value: unknown) {
    if (validChannels.includes(channel)) {
      if (channel === "load-jira-data") {
        return ipcRenderer.invoke(channel);
      }
      ipcRenderer.send(channel, value);
    }
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    if (validChannels.includes(channel)) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        callback(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
    return () => {};
  },
  window: {
    minimize: () => ipcRenderer.send("window-control", "minimize"),
    maximize: () => ipcRenderer.send("window-control", "maximize"),
    close: () => ipcRenderer.send("window-control", "close"),
    hide: () => ipcRenderer.send("window-control", "hide"),
    show: () => ipcRenderer.send("window-control", "show"),
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
