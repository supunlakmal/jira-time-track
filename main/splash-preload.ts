import { contextBridge, ipcRenderer } from 'electron';

// Expose safe IPC channels to the splash renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Receive app information
  onAppInfo: (callback: (data: { version: string; name: string }) => void) => {
    ipcRenderer.on('app-info', (_, data) => callback(data));
  },
  
  // Clean up listeners
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('app-info');
  }
});