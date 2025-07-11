/**
 * Configuration for Jira module
 * Controls whether the Jira integration is enabled
 */

export interface JiraModuleConfig {
  enabled: boolean;
  autoRegisterIpcHandlers: boolean;
  debugMode: boolean;
  maxIssuesPerRequest: number;
  connectionTimeout: number;
}

// Default configuration
const DEFAULT_CONFIG: JiraModuleConfig = {
  enabled: true, // Set to false to completely disable Jira module
  autoRegisterIpcHandlers: true, // Whether to automatically register IPC handlers
  debugMode: false, // Enable debug logging
  maxIssuesPerRequest: 100, // Max issues to fetch per API request
  connectionTimeout: 10000, // Connection timeout in milliseconds
};

class JiraConfigManager {
  private static instance: JiraConfigManager;
  private config: JiraModuleConfig;

  private constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.loadConfig();
  }

  static getInstance(): JiraConfigManager {
    if (!JiraConfigManager.instance) {
      JiraConfigManager.instance = new JiraConfigManager();
    }
    return JiraConfigManager.instance;
  }

  /**
   * Load configuration from environment variables and process.env
   */
  private loadConfig(): void {
    // Check environment variables
    if (process.env.JIRA_MODULE_ENABLED !== undefined) {
      this.config.enabled = process.env.JIRA_MODULE_ENABLED === 'true';
    }

    if (process.env.JIRA_DEBUG_MODE !== undefined) {
      this.config.debugMode = process.env.JIRA_DEBUG_MODE === 'true';
    }

    if (process.env.JIRA_MAX_ISSUES !== undefined) {
      const maxIssues = parseInt(process.env.JIRA_MAX_ISSUES, 10);
      if (!isNaN(maxIssues) && maxIssues > 0) {
        this.config.maxIssuesPerRequest = maxIssues;
      }
    }

    if (process.env.JIRA_CONNECTION_TIMEOUT !== undefined) {
      const timeout = parseInt(process.env.JIRA_CONNECTION_TIMEOUT, 10);
      if (!isNaN(timeout) && timeout > 0) {
        this.config.connectionTimeout = timeout;
      }
    }

    // Check for config file (optional)
    try {
      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const configPath = path.join(app.getPath('userData'), 'jira-config.json');
      
      if (fs.existsSync(configPath)) {
        const configFile = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.config = { ...this.config, ...configFile };
      }
    } catch (error) {
      // Config file is optional, ignore errors
      if (this.config.debugMode) {
        console.log('No Jira config file found, using defaults');
      }
    }

    if (this.config.debugMode) {
      console.log('Jira module config loaded:', this.config);
    }
  }

  /**
   * Get the current configuration
   */
  getConfig(): JiraModuleConfig {
    return { ...this.config };
  }

  /**
   * Check if the Jira module is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Check if IPC handlers should be auto-registered
   */
  shouldAutoRegisterIpcHandlers(): boolean {
    return this.config.enabled && this.config.autoRegisterIpcHandlers;
  }

  /**
   * Check if debug mode is enabled
   */
  isDebugMode(): boolean {
    return this.config.debugMode;
  }

  /**
   * Get the maximum number of issues per request
   */
  getMaxIssuesPerRequest(): number {
    return this.config.maxIssuesPerRequest;
  }

  /**
   * Get the connection timeout
   */
  getConnectionTimeout(): number {
    return this.config.connectionTimeout;
  }

  /**
   * Update configuration (runtime only)
   */
  updateConfig(updates: Partial<JiraModuleConfig>): void {
    this.config = { ...this.config, ...updates };
    
    if (this.config.debugMode) {
      console.log('Jira module config updated:', this.config);
    }
  }

  /**
   * Save configuration to file
   */
  async saveConfig(): Promise<void> {
    try {
      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const configPath = path.join(app.getPath('userData'), 'jira-config.json');
      
      await fs.promises.writeFile(
        configPath,
        JSON.stringify(this.config, null, 2),
        'utf8'
      );
      
      if (this.config.debugMode) {
        console.log('Jira config saved to:', configPath);
      }
    } catch (error) {
      console.error('Error saving Jira config:', error);
      throw error;
    }
  }

  /**
   * Reset configuration to defaults
   */
  resetToDefaults(): void {
    this.config = { ...DEFAULT_CONFIG };
    
    if (this.config.debugMode) {
      console.log('Jira module config reset to defaults');
    }
  }
}

// Export the singleton instance
export const jiraConfig = JiraConfigManager.getInstance();

// Export for easy access
export const isJiraModuleEnabled = (): boolean => jiraConfig.isEnabled();
export const shouldAutoRegisterJiraIpcHandlers = (): boolean => jiraConfig.shouldAutoRegisterIpcHandlers();

export default JiraConfigManager;