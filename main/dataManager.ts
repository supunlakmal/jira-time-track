// main/dataManager.ts - NEW FILE
import Store from "electron-store";

interface AppData {
  sessions: { [ticketNumber: string]: any };
  jiraData: any[];
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, jiraData: [] },
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

  // Jira data methods
  setJiraData(data: any[]) {
    this.store.set("jiraData", data);
    this.broadcast("jira-data-updated", data);
  }

  getJiraData() {
    return this.store.get("jiraData");
  }
}

export const dataManager = new DataManager();
