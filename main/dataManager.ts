// main/dataManager.ts - NEW FILE
import Store from "electron-store";

interface AppData {
  sessions: { [ticketNumber: string]: any };
  projectData: any[];
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, projectData: [] },
  });

  private windows: Set<Electron.BrowserWindow> = new Set();

  registerWindow(window: Electron.BrowserWindow) {
    this.windows.add(window);
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
  }

  getSessions() {
    return this.store.get("sessions");
  }

  // Project data methods
  setProjectData(data: any[]) {
    this.store.set("projectData", data);
    this.broadcast("project-data-updated", data);
  }

  getProjectData() {
    return this.store.get("projectData");
  }
}

export const dataManager = new DataManager();
