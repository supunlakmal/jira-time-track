// main/dataManager.ts - NEW FILE
import csvParser from "csv-parser";
import Store from "electron-store";

interface AppData {
  sessions: { [ticketNumber: string]: any };
  projectData: any[];
  manualTasks: any[];
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, projectData: [], manualTasks: [] },
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

  // CSV Import methods
  async importFromCsv(
    csvData: any[]
  ): Promise<{ success: boolean; error?: string; importedCount?: number }> {
    try {
      // Validate CSV data structure
      const validatedData = csvData.map((row, index) => {
        if (!row.ticket_number || !row.ticket_name) {
          throw new Error(
            `Row ${
              index + 1
            }: Missing required fields (ticket_number, ticket_name)`
          );
        }
        return {
          ticket_number: row.ticket_number,
          ticket_name: row.ticket_name,
          story_points: row.story_points || null,
          isImported: true,
          importedAt: new Date().toISOString(),
        };
      });

      // Replace current project data with CSV data
      this.setProjectData(validatedData);

      return { success: true, importedCount: validatedData.length };
    } catch (error) {
      console.error("CSV import error:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  async importFromCsvFile(
    filePath: string
  ): Promise<{ success: boolean; error?: string; importedCount?: number }> {
    try {
      const csvData = await this.parseCsvFile(filePath);
      return await this.importFromCsv(csvData);
    } catch (error) {
      console.error("CSV file import error:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  private async parseCsvFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = require("fs").createReadStream(filePath);

      stream
        .pipe(csvParser())
        .on("data", (data: any) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error: Error) => reject(error));
    });
  }

  // Manual task methods
  getManualTasks() {
    return this.store.get("manualTasks", []);
  }

  setManualTasks(tasks: any[]) {
    this.store.set("manualTasks", tasks);
    this.broadcast("manual-tasks-updated", tasks);
  }

  addManualTask(task: any) {
    const manualTasks = this.getManualTasks();
    const newTask = {
      ...task,
      isManual: true,
      createdAt: new Date().toISOString(),
    };
    manualTasks.push(newTask);
    this.setManualTasks(manualTasks);
    return newTask;
  }

  updateManualTask(taskId: string, updates: any) {
    const manualTasks = this.getManualTasks();
    const index = manualTasks.findIndex((t) => t.ticket_number === taskId);
    if (index !== -1) {
      manualTasks[index] = { ...manualTasks[index], ...updates };
      this.setManualTasks(manualTasks);
      return manualTasks[index];
    }
    return null;
  }

  deleteManualTask(taskId: string) {
    const manualTasks = this.getManualTasks();
    const filtered = manualTasks.filter((t) => t.ticket_number !== taskId);
    this.setManualTasks(filtered);
    return filtered;
  }

  // Combined data method (Project + Manual)
  getAllTasks() {
    const projectData = this.getProjectData();
    const manualTasks = this.getManualTasks();
    return [...projectData, ...manualTasks];
  }

  // Get data source info
  getDataSourceInfo() {
    const projectData = this.getProjectData();
    const manualTasks = this.getManualTasks();
    return {
      projectDataCount: projectData.length,
      manualTasksCount: manualTasks.length,
      totalTasksCount: this.getAllTasks().length,
      hasImportedData: projectData.some((task) => task.isImported),
      lastImportDate:
        projectData.find((task) => task.importedAt)?.importedAt || null,
    };
  }
}

export const dataManager = new DataManager();
