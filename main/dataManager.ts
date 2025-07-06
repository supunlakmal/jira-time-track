// main/DataManager.ts - Centralized data management with proper types
import { BrowserWindow } from "electron";
import Store from "electron-store";
import csvParser from "csv-parser";
import fs from "fs";
import { AppData, Task, TimerSession, ImportResponse, DataSourceInfo } from "../types";
import { validateTask, validateCsvData, TaskSchema, CsvRowSchema } from "../types/validation";

export class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, projectData: [], manualTasks: [] },
  });

  private windows: Set<BrowserWindow> = new Set();

  registerWindow(window: BrowserWindow): void {
    this.windows.add(window);

    // Clean up when window is closed
    window.on("closed", () => {
      this.windows.delete(window);
    });
  }

  // Sync data to all windows
  private broadcast(channel: string, data: any): void {
    this.windows.forEach((window) => {
      if (!window.isDestroyed()) {
        window.webContents.send(channel, data);
      }
    });
  }

  // ==================== SESSION METHODS ====================

  saveSession(sessionData: TimerSession): void {
    const sessions = this.store.get("sessions");
    sessions[sessionData.ticketNumber] = sessionData;
    this.store.set("sessions", sessions);
    this.broadcast("sessions-updated", sessions);
    console.log(`DataManager: Session saved for ${sessionData.ticketNumber}`);
  }

  getSessions(): { [ticketNumber: string]: TimerSession } {
    return this.store.get("sessions");
  }

  // ==================== PROJECT DATA METHODS ====================

  setProjectData(data: Task[]): void {
    this.store.set("projectData", data);
    this.broadcast("project-data-updated", data);
    console.log(`DataManager: Project data updated with ${data.length} tickets`);
  }

  getProjectData(): Task[] {
    return this.store.get("projectData");
  }

  // ==================== MANUAL TASK METHODS ====================

  getManualTasks(): Task[] {
    return this.store.get("manualTasks", []);
  }

  setManualTasks(tasks: Task[]): void {
    this.store.set("manualTasks", tasks);
    this.broadcast("manual-tasks-updated", tasks);
    console.log(`DataManager: Manual tasks updated with ${tasks.length} tasks`);
  }

  addManualTask(task: Omit<Task, 'isManual' | 'createdAt'>): Task {
    const manualTasks = this.getManualTasks();
    const newTask: Task = {
      ...task,
      isManual: true,
      createdAt: new Date().toISOString(),
    };
    manualTasks.push(newTask);
    this.setManualTasks(manualTasks);
    return newTask;
  }

  updateManualTask(taskId: string, updates: Partial<Task>): Task | null {
    const manualTasks = this.getManualTasks();
    const index = manualTasks.findIndex((t) => t.ticket_number === taskId);
    if (index !== -1) {
      manualTasks[index] = { ...manualTasks[index], ...updates };
      this.setManualTasks(manualTasks);
      return manualTasks[index];
    }
    return null;
  }

  deleteManualTask(taskId: string): Task[] {
    const manualTasks = this.getManualTasks();
    const filtered = manualTasks.filter((t) => t.ticket_number !== taskId);
    this.setManualTasks(filtered);
    return filtered;
  }

  // ==================== COMBINED DATA METHODS ====================

  getAllTasks(): Task[] {
    const projectData = this.getProjectData();
    const manualTasks = this.getManualTasks();
    return [...projectData, ...manualTasks];
  }

  // ==================== CSV IMPORT METHODS ====================

  async importFromCsv(csvData: any[]): Promise<ImportResponse> {
    try {
      // Validate CSV data structure using Zod
      const csvValidation = validateCsvData(csvData);
      if (!csvValidation.success) {
        throw new Error(`CSV validation failed: ${csvValidation.error.message}`);
      }

      const validatedData: Task[] = csvValidation.data.map((row, index): Task => {
        const taskData: Task = {
          ticket_number: row.ticket_number,
          ticket_name: row.ticket_name,
          story_points: (row.story_points === undefined ? null : row.story_points) as number | null,
          isImported: true,
          importedAt: new Date().toISOString(),
        };

        // Validate each task
        const taskValidation = validateTask(taskData);
        if (!taskValidation.success) {
          throw new Error(`Row ${index + 1}: ${taskValidation.error.message}`);
        }

        return taskData;
      });

      // Replace current project data with CSV data
      this.setProjectData(validatedData);

      return { success: true, importedCount: validatedData.length };
    } catch (error) {
      console.error("CSV import error:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  async importFromCsvFile(filePath: string): Promise<ImportResponse> {
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
      const stream = fs.createReadStream(filePath);

      stream
        .pipe(csvParser())
        .on("data", (data: any) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error: Error) => reject(error));
    });
  }

  // ==================== DATA SOURCE INFO ====================

  getDataSourceInfo(): DataSourceInfo {
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

  // ==================== VALIDATION METHODS ====================

  validateTask(task: Partial<Task>): { isValid: boolean; errors: string[] } {
    const validation = validateTask(task);
    if (validation.success) {
      return { isValid: true, errors: [] };
    } else {
      return {
        isValid: false,
        errors: validation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
  }

  taskExists(ticketNumber: string): boolean {
    const allTasks = this.getAllTasks();
    return allTasks.some((task) => task.ticket_number === ticketNumber);
  }
}