/**
 * Jira Module Entry Point
 * 
 * This module provides optional Jira integration functionality.
 * It can be completely disabled without affecting the main application.
 */

import { JiraIpcHandlers } from './jiraIpc';
import { JiraService } from './jiraService';
import { JiraSecureStorage } from './secureStorage';
import { isJiraModuleEnabled, shouldAutoRegisterJiraIpcHandlers, jiraConfig } from './config';

export interface JiraModuleInstance {
  isEnabled: boolean;
  isInitialized: boolean;
  ipcHandlers: JiraIpcHandlers | null;
  service: JiraService | null;
  secureStorage: JiraSecureStorage | null;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getStatus(): {
    enabled: boolean;
    initialized: boolean;
    secureStorageAvailable: boolean;
    hasCredentials: boolean;
  };
}

class JiraModule implements JiraModuleInstance {
  private static instance: JiraModule;
  
  public isEnabled: boolean = false;
  public isInitialized: boolean = false;
  public ipcHandlers: JiraIpcHandlers | null = null;
  public service: JiraService | null = null;
  public secureStorage: JiraSecureStorage | null = null;

  private constructor() {
    this.isEnabled = isJiraModuleEnabled();
    
    if (jiraConfig.isDebugMode()) {
      console.log('JiraModule: Constructor called, enabled:', this.isEnabled);
    }
  }

  static getInstance(): JiraModule {
    if (!JiraModule.instance) {
      JiraModule.instance = new JiraModule();
    }
    return JiraModule.instance;
  }

  /**
   * Initialize the Jira module
   */
  async initialize(): Promise<void> {
    if (!this.isEnabled) {
      if (jiraConfig.isDebugMode()) {
        console.log('JiraModule: Skipping initialization - module disabled');
      }
      return;
    }

    if (this.isInitialized) {
      if (jiraConfig.isDebugMode()) {
        console.log('JiraModule: Already initialized');
      }
      return;
    }

    try {
      if (jiraConfig.isDebugMode()) {
        console.log('JiraModule: Starting initialization...');
      }

      // Initialize secure storage
      this.secureStorage = JiraSecureStorage.getInstance();
      
      // Initialize service
      this.service = JiraService.getInstance();
      
      // Initialize and register IPC handlers if configured
      if (shouldAutoRegisterJiraIpcHandlers()) {
        this.ipcHandlers = JiraIpcHandlers.getInstance();
        this.ipcHandlers.registerHandlers();
        
        if (jiraConfig.isDebugMode()) {
          console.log('JiraModule: IPC handlers registered');
        }
      }
      
      this.isInitialized = true;
      
      console.log('JiraModule: Successfully initialized');
    } catch (error) {
      console.error('JiraModule: Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Shutdown the Jira module
   */
  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    try {
      if (jiraConfig.isDebugMode()) {
        console.log('JiraModule: Starting shutdown...');
      }

      // Unregister IPC handlers
      if (this.ipcHandlers) {
        this.ipcHandlers.unregisterHandlers();
        this.ipcHandlers = null;
      }

      // Clean up references
      this.service = null;
      this.secureStorage = null;
      this.isInitialized = false;

      if (jiraConfig.isDebugMode()) {
        console.log('JiraModule: Successfully shutdown');
      }
    } catch (error) {
      console.error('JiraModule: Shutdown failed:', error);
      throw error;
    }
  }

  /**
   * Get the current status of the Jira module
   */
  getStatus(): {
    enabled: boolean;
    initialized: boolean;
    secureStorageAvailable: boolean;
    hasCredentials: boolean;
  } {
    return {
      enabled: this.isEnabled,
      initialized: this.isInitialized,
      secureStorageAvailable: this.secureStorage?.isAvailable() || false,
      hasCredentials: false // This would need to be async to check properly
    };
  }

  /**
   * Get the current status of the Jira module (async version)
   */
  async getStatusAsync(): Promise<{
    enabled: boolean;
    initialized: boolean;
    secureStorageAvailable: boolean;
    hasCredentials: boolean;
  }> {
    let hasCredentials = false;
    
    if (this.secureStorage) {
      try {
        hasCredentials = await this.secureStorage.hasCredentials();
      } catch (error) {
        console.error('JiraModule: Error checking credentials:', error);
      }
    }

    return {
      enabled: this.isEnabled,
      initialized: this.isInitialized,
      secureStorageAvailable: this.secureStorage?.isAvailable() || false,
      hasCredentials
    };
  }

  /**
   * Enable the Jira module at runtime
   */
  async enable(): Promise<void> {
    if (this.isEnabled) {
      return;
    }

    this.isEnabled = true;
    jiraConfig.updateConfig({ enabled: true });
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (jiraConfig.isDebugMode()) {
      console.log('JiraModule: Enabled at runtime');
    }
  }

  /**
   * Disable the Jira module at runtime
   */
  async disable(): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    await this.shutdown();
    this.isEnabled = false;
    jiraConfig.updateConfig({ enabled: false });

    if (jiraConfig.isDebugMode()) {
      console.log('JiraModule: Disabled at runtime');
    }
  }
}

// Export the singleton instance
export const jiraModule = JiraModule.getInstance();

// Export types and classes for direct use if needed
export { JiraService, JiraSecureStorage, JiraIpcHandlers };
export type { JiraCredentials } from './secureStorage';
export type { JiraIssue, JiraSearchResponse, JiraApiResponse } from './jiraService';

// Export convenience functions
export const initializeJiraModule = async (): Promise<void> => {
  return jiraModule.initialize();
};

export const shutdownJiraModule = async (): Promise<void> => {
  return jiraModule.shutdown();
};

export const getJiraModuleStatus = (): {
  enabled: boolean;
  initialized: boolean;
  secureStorageAvailable: boolean;
  hasCredentials: boolean;
} => {
  return jiraModule.getStatus();
};

export const getJiraModuleStatusAsync = async (): Promise<{
  enabled: boolean;
  initialized: boolean;
  secureStorageAvailable: boolean;
  hasCredentials: boolean;
}> => {
  return jiraModule.getStatusAsync();
};

export default jiraModule;