import { JiraSecureStorage, JiraCredentials } from './secureStorage';

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description?: string;
  status: string;
  assignee?: {
    displayName: string;
    emailAddress: string;
  };
  created: string;
  updated: string;
  storyPoints?: number;
  issueType: string;
  priority: string;
  project: {
    key: string;
    name: string;
  };
}

export interface JiraSearchResponse {
  issues: JiraIssue[];
  total: number;
  maxResults: number;
  startAt: number;
}

export interface JiraApiResponse {
  success: boolean;
  data?: JiraSearchResponse;
  error?: string;
}

export class JiraService {
  private static instance: JiraService;
  private secureStorage: JiraSecureStorage;

  private constructor() {
    this.secureStorage = JiraSecureStorage.getInstance();
  }

  static getInstance(): JiraService {
    if (!JiraService.instance) {
      JiraService.instance = new JiraService();
    }
    return JiraService.instance;
  }

  /**
   * Test connection to Jira API
   */
  async testConnection(credentials: JiraCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `https://${credentials.domain}/rest/api/3/myself`;
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
        console.error('Jira API test failed:', response.status, errorText);
        
        if (response.status === 401) {
          return { success: false, error: 'Invalid credentials or API token' };
        } else if (response.status === 403) {
          return { success: false, error: 'Access denied. Check your permissions.' };
        } else if (response.status === 404) {
          return { success: false, error: 'Invalid Jira domain or endpoint not found' };
        } else {
          return { success: false, error: `HTTP ${response.status}: ${errorText}` };
        }
      }

      const userData = await response.json();
      console.log('Jira connection test successful for user:', userData.displayName);
      return { success: true };
    } catch (error) {
      console.error('Jira connection test error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Fetch issues from Jira
   */
  async fetchIssues(
    jql: string = 'issuetype=Task',
    maxResults: number = 100,
    startAt: number = 0
  ): Promise<JiraApiResponse> {
    try {
      const credentialResult = await this.secureStorage.getCredentials();
      if (!credentialResult.success || !credentialResult.credentials) {
        return { success: false, error: 'No stored credentials found' };
      }

      const credentials = credentialResult.credentials;
      const url = `https://${credentials.domain}/rest/api/3/search?jql=${encodeURIComponent(jql)}&maxResults=${maxResults}&startAt=${startAt}`;
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
        console.error('Jira API fetch failed:', response.status, errorText);
        
        if (response.status === 401) {
          return { success: false, error: 'Invalid credentials. Please check your API token.' };
        } else if (response.status === 400) {
          return { success: false, error: 'Invalid JQL query' };
        } else {
          return { success: false, error: `HTTP ${response.status}: ${errorText}` };
        }
      }

      const searchResponse = await response.json();
      
      // Transform the response to match our interface
      const transformedIssues: JiraIssue[] = searchResponse.issues.map((issue: any) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description,
        status: issue.fields.status?.name || 'Unknown',
        assignee: issue.fields.assignee ? {
          displayName: issue.fields.assignee.displayName,
          emailAddress: issue.fields.assignee.emailAddress
        } : undefined,
        created: issue.fields.created,
        updated: issue.fields.updated,
        storyPoints: issue.fields.customfield_10016 || issue.fields.storypoints, // Common story points field
        issueType: issue.fields.issuetype?.name || 'Unknown',
        priority: issue.fields.priority?.name || 'Unknown',
        project: {
          key: issue.fields.project.key,
          name: issue.fields.project.name
        }
      }));

      const data: JiraSearchResponse = {
        issues: transformedIssues,
        total: searchResponse.total,
        maxResults: searchResponse.maxResults,
        startAt: searchResponse.startAt
      };

      console.log(`Jira API fetch successful: ${transformedIssues.length} issues retrieved`);
      return { success: true, data };
    } catch (error) {
      console.error('Jira API fetch error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Fetch issues with pagination
   */
  async fetchAllIssues(
    jql: string = 'issuetype=Task',
    maxResults: number = 100
  ): Promise<JiraApiResponse> {
    try {
      const allIssues: JiraIssue[] = [];
      let startAt = 0;
      let totalFetched = 0;
      let totalAvailable = 0;

      do {
        const response = await this.fetchIssues(jql, maxResults, startAt);
        
        if (!response.success) {
          return response;
        }

        if (response.data) {
          allIssues.push(...response.data.issues);
          totalFetched += response.data.issues.length;
          totalAvailable = response.data.total;
          startAt += maxResults;
        }
      } while (totalFetched < totalAvailable && totalFetched < 1000); // Limit to 1000 issues for performance

      const data: JiraSearchResponse = {
        issues: allIssues,
        total: totalAvailable,
        maxResults: allIssues.length,
        startAt: 0
      };

      console.log(`Jira API fetch all successful: ${allIssues.length} total issues retrieved`);
      return { success: true, data };
    } catch (error) {
      console.error('Jira API fetch all error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Convert Jira issues to project ticket format
   */
  convertToProjectTickets(issues: JiraIssue[]): any[] {
    return issues.map(issue => ({
      ticket_number: issue.key,
      ticket_name: issue.summary,
      story_points: issue.storyPoints || null,
      isJiraImported: true,
      jiraId: issue.id,
      status: issue.status,
      issueType: issue.issueType,
      priority: issue.priority,
      project: issue.project.key,
      assignee: issue.assignee?.displayName,
      created: issue.created,
      updated: issue.updated,
      importedAt: new Date().toISOString()
    }));
  }

  /**
   * Get stored credentials status
   */
  async getCredentialsStatus(): Promise<{ hasCredentials: boolean; isAvailable: boolean }> {
    const isAvailable = this.secureStorage.isAvailable();
    const hasCredentials = await this.secureStorage.hasCredentials();
    
    return { hasCredentials, isAvailable };
  }
}

export default JiraService;