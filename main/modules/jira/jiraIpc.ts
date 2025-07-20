import { ipcMain } from 'electron';
import { JiraService } from './jiraService';
import { JiraSecureStorage, JiraCredentials } from './secureStorage';

export class JiraIpcHandlers {
  private static instance: JiraIpcHandlers;
  private jiraService: JiraService;
  private secureStorage: JiraSecureStorage;
  private isRegistered: boolean = false;

  private constructor() {
    this.jiraService = JiraService.getInstance();
    this.secureStorage = JiraSecureStorage.getInstance();
  }

  static getInstance(): JiraIpcHandlers {
    if (!JiraIpcHandlers.instance) {
      JiraIpcHandlers.instance = new JiraIpcHandlers();
    }
    return JiraIpcHandlers.instance;
  }

  /**
   * Register all Jira IPC handlers
   */
  registerHandlers(): void {
    if (this.isRegistered) {
      console.log('Jira IPC handlers already registered');
      return;
    }

    console.log('Registering Jira IPC handlers...');

    // Check if secure storage is available
    ipcMain.handle('jira-check-secure-storage', async () => {
      try {
        const isAvailable = this.secureStorage.isAvailable();
        const hasCredentials = await this.secureStorage.hasCredentials();
        
        return {
          success: true,
          isAvailable,
          hasCredentials
        };
      } catch (error) {
        console.error('Error checking secure storage:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Store Jira credentials
    ipcMain.handle('jira-store-credentials', async (_, credentials: JiraCredentials) => {
      try {
        console.log('Storing Jira credentials for domain:', credentials.domain);
        
        // Validate credentials by testing connection
        const testResult = await this.jiraService.testConnection(credentials);
        if (!testResult.success) {
          return {
            success: false,
            error: testResult.error
          };
        }

        // Store credentials securely
        const result = await this.secureStorage.storeCredentials(credentials);
        return result;
      } catch (error) {
        console.error('Error storing Jira credentials:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Get stored credentials (without returning the actual credentials for security)
    ipcMain.handle('jira-get-credentials-status', async () => {
      try {
        const result = await this.jiraService.getCredentialsStatus();
        return {
          success: true,
          ...result
        };
      } catch (error) {
        console.error('Error getting credentials status:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Test Jira connection
    ipcMain.handle('jira-test-connection', async (_, credentials?: JiraCredentials) => {
      try {
        let testCredentials: JiraCredentials;

        if (credentials) {
          // Test with provided credentials
          testCredentials = credentials;
        } else {
          // Test with stored credentials
          const credentialResult = await this.secureStorage.getCredentials();
          if (!credentialResult.success || !credentialResult.credentials) {
            return {
              success: false,
              error: 'No stored credentials found'
            };
          }
          testCredentials = credentialResult.credentials;
        }

        const result = await this.jiraService.testConnection(testCredentials);
        return result;
      } catch (error) {
        console.error('Error testing Jira connection:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Fetch Jira issues
    ipcMain.handle('jira-fetch-issues', async (_, options: {
      jql?: string;
      maxResults?: number;
      startAt?: number;
      fetchAll?: boolean;
    } = {}) => {
      try {
        const {
          jql = 'issuetype=Task',
          maxResults = 100,
          startAt = 0,
          fetchAll = false
        } = options;

        console.log('Fetching Jira issues with JQL:', jql);

        let result;
        if (fetchAll) {
          result = await this.jiraService.fetchAllIssues(jql, maxResults);
        } else {
          result = await this.jiraService.fetchIssues(jql, maxResults, startAt);
        }

        return result;
      } catch (error) {
        console.error('Error fetching Jira issues:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Convert Jira issues to project tickets format
    ipcMain.handle('jira-convert-to-tickets', async (_, issues: any[]) => {
      try {
        const projectTickets = this.jiraService.convertToProjectTickets(issues);
        return {
          success: true,
          tickets: projectTickets
        };
      } catch (error) {
        console.error('Error converting Jira issues to tickets:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Clear stored credentials
    ipcMain.handle('jira-clear-credentials', async () => {
      try {
        console.log('Clearing Jira credentials');
        const result = await this.secureStorage.clearCredentials();
        return result;
      } catch (error) {
        console.error('Error clearing Jira credentials:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    // Get Jira projects (for JQL building)
    ipcMain.handle('jira-get-projects', async () => {
      try {
        const credentialResult = await this.secureStorage.getCredentials();
        if (!credentialResult.success || !credentialResult.credentials) {
          return {
            success: false,
            error: 'No stored credentials found'
          };
        }

        const credentials = credentialResult.credentials;
        const url = `https://${credentials.domain}/rest/api/3/project`;
        const auth = Buffer.from(`${credentials.email}:${credentials.apiToken}`).toString('base64');
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Jira projects fetch failed:', response.status, errorText);
          return {
            success: false,
            error: `HTTP ${response.status}: ${errorText}`
          };
        }

        const projects = await response.json();
        return {
          success: true,
          projects: projects.map((p: any) => ({
            key: p.key,
            name: p.name,
            id: p.id
          }))
        };
      } catch (error) {
        console.error('Error fetching Jira projects:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.isRegistered = true;
    console.log('Jira IPC handlers registered successfully');
  }

  /**
   * Unregister all Jira IPC handlers
   */
  unregisterHandlers(): void {
    if (!this.isRegistered) {
      return;
    }

    console.log('Unregistering Jira IPC handlers...');

    const handlers = [
      'jira-check-secure-storage',
      'jira-store-credentials',
      'jira-get-credentials-status',
      'jira-test-connection',
      'jira-fetch-issues',
      'jira-convert-to-tickets',
      'jira-clear-credentials',
      'jira-get-projects'
    ];

    handlers.forEach(handler => {
      ipcMain.removeHandler(handler);
    });

    this.isRegistered = false;
    console.log('Jira IPC handlers unregistered successfully');
  }
}

export default JiraIpcHandlers;