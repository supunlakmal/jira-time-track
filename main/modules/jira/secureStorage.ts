import { safeStorage } from 'electron';

export interface JiraCredentials {
  domain: string;
  email: string;
  apiToken: string;
}

const JIRA_CREDENTIALS_KEY = 'jira-credentials';

export class JiraSecureStorage {
  private static instance: JiraSecureStorage;

  private constructor() {}

  static getInstance(): JiraSecureStorage {
    if (!JiraSecureStorage.instance) {
      JiraSecureStorage.instance = new JiraSecureStorage();
    }
    return JiraSecureStorage.instance;
  }

  /**
   * Check if safeStorage is available on the current platform
   */
  isAvailable(): boolean {
    return safeStorage.isEncryptionAvailable();
  }

  /**
   * Store Jira credentials securely
   */
  async storeCredentials(credentials: JiraCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.isAvailable()) {
        return { success: false, error: 'Secure storage is not available on this platform' };
      }

      // Validate credentials
      if (!credentials.domain || !credentials.email || !credentials.apiToken) {
        return { success: false, error: 'All credential fields are required' };
      }

      // Encrypt and store
      const credentialsString = JSON.stringify(credentials);
      const encryptedData = safeStorage.encryptString(credentialsString);
      
      // Store in main app data directory
      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const userDataPath = app.getPath('userData');
      const jiraDataPath = path.join(userDataPath, 'jira-data');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(jiraDataPath)) {
        fs.mkdirSync(jiraDataPath, { recursive: true });
      }
      
      const credentialsFile = path.join(jiraDataPath, `${JIRA_CREDENTIALS_KEY}.enc`);
      fs.writeFileSync(credentialsFile, encryptedData);
      
      console.log('Jira credentials stored securely');
      return { success: true };
    } catch (error) {
      console.error('Error storing Jira credentials:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieve Jira credentials
   */
  async getCredentials(): Promise<{ success: boolean; credentials?: JiraCredentials; error?: string }> {
    try {
      if (!this.isAvailable()) {
        return { success: false, error: 'Secure storage is not available on this platform' };
      }

      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const userDataPath = app.getPath('userData');
      const credentialsFile = path.join(userDataPath, 'jira-data', `${JIRA_CREDENTIALS_KEY}.enc`);
      
      if (!fs.existsSync(credentialsFile)) {
        return { success: false, error: 'No stored credentials found' };
      }
      
      const encryptedData = fs.readFileSync(credentialsFile);
      const decryptedString = safeStorage.decryptString(encryptedData);
      const credentials = JSON.parse(decryptedString) as JiraCredentials;
      
      console.log('Jira credentials retrieved successfully');
      return { success: true, credentials };
    } catch (error) {
      console.error('Error retrieving Jira credentials:', error);
      return { success: false, error: 'Failed to decrypt credentials' };
    }
  }

  /**
   * Clear stored credentials
   */
  async clearCredentials(): Promise<{ success: boolean; error?: string }> {
    try {
      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const userDataPath = app.getPath('userData');
      const credentialsFile = path.join(userDataPath, 'jira-data', `${JIRA_CREDENTIALS_KEY}.enc`);
      
      if (fs.existsSync(credentialsFile)) {
        fs.unlinkSync(credentialsFile);
        console.log('Jira credentials cleared');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing Jira credentials:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Check if credentials are stored
   */
  async hasCredentials(): Promise<boolean> {
    try {
      const fs = require('fs');
      const path = require('path');
      const { app } = require('electron');
      
      const userDataPath = app.getPath('userData');
      const credentialsFile = path.join(userDataPath, 'jira-data', `${JIRA_CREDENTIALS_KEY}.enc`);
      
      return fs.existsSync(credentialsFile);
    } catch (error) {
      console.error('Error checking for stored credentials:', error);
      return false;
    }
  }
}

export default JiraSecureStorage;