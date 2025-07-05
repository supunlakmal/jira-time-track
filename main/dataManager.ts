// main/dataManager.ts - NEW FILE
import Store from "electron-store";
import * as fs from "fs/promises";
import * as path from "path";
import csvParser from "csv-parser";

interface AppData {
  sessions: { [ticketNumber: string]: any };
  projectData: any[];
  csvImportedData: any[];
  dataSource: 'json' | 'csv' | 'mixed';
}

class DataManager {
  private store = new Store<AppData>({
    name: "app-data",
    defaults: { sessions: {}, projectData: [], csvImportedData: [], dataSource: 'json' },
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
  async importFromCsv(csvData: any[]): Promise<{ success: boolean; error?: string; importedCount?: number }> {
    try {
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

      // Store CSV data
      this.store.set("csvImportedData", validatedData);
      this.store.set("dataSource", "csv");

      // Broadcast update
      this.broadcast("project-data-updated", validatedData);

      return { success: true, importedCount: validatedData.length };
    } catch (error) {
      console.error("CSV import error:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  async importFromCsvFile(filePath: string): Promise<{ success: boolean; error?: string; importedCount?: number }> {
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
      const stream = require('fs').createReadStream(filePath);
      
      stream
        .pipe(csvParser())
        .on('data', (data: any) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error: Error) => reject(error));
    });
  }

  // Get combined data (JSON + CSV + manual)
  getCombinedProjectData() {
    const jsonData = this.store.get("projectData");
    const csvData = this.store.get("csvImportedData");
    const dataSource = this.store.get("dataSource");

    switch (dataSource) {
      case 'csv':
        return csvData;
      case 'json':
        return jsonData;
      case 'mixed':
        return [...jsonData, ...csvData];
      default:
        return jsonData;
    }
  }

  // Clear imported CSV data
  clearCsvData() {
    this.store.set("csvImportedData", []);
    this.store.set("dataSource", "json");
    this.broadcast("project-data-updated", this.store.get("projectData"));
  }

  // Get data source info
  getDataSourceInfo() {
    return {
      dataSource: this.store.get("dataSource"),
      jsonDataCount: this.store.get("projectData").length,
      csvDataCount: this.store.get("csvImportedData").length,
      totalCount: this.getCombinedProjectData().length
    };
  }
}

export const dataManager = new DataManager();
