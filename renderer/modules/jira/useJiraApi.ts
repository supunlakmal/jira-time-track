import { useState, useEffect, useCallback } from 'react';

// Types
export interface JiraCredentials {
  domain: string;
  email: string;
  apiToken: string;
}

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

export interface JiraProject {
  key: string;
  name: string;
  id: string;
}

export interface JiraSearchResponse {
  issues: JiraIssue[];
  total: number;
  maxResults: number;
  startAt: number;
}

// Hook for managing Jira credentials
export function useJiraCredentials() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if window.ipc exists and has jira methods
      if (!window.ipc || !window.ipc.invoke) {
        setError('IPC not available');
        return;
      }

      const result = await window.ipc.invoke('jira-check-secure-storage');
      
      if (result.success) {
        setIsAvailable(result.isAvailable);
        setHasCredentials(result.hasCredentials);
      } else {
        setError(result.error || 'Failed to check secure storage');
      }
    } catch (err) {
      console.error('Error checking Jira credentials status:', err);
      setError('Failed to check credentials status');
    } finally {
      setLoading(false);
    }
  }, []);

  const storeCredentials = useCallback(async (credentials: JiraCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const result = await window.ipc.invoke('jira-store-credentials', credentials);
      
      if (result.success) {
        setHasCredentials(true);
        return { success: true };
      } else {
        setError(result.error || 'Failed to store credentials');
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error storing Jira credentials:', err);
      const error = 'Failed to store credentials';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCredentials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await window.ipc.invoke('jira-clear-credentials');
      
      if (result.success) {
        setHasCredentials(false);
        return { success: true };
      } else {
        setError(result.error || 'Failed to clear credentials');
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error clearing Jira credentials:', err);
      const error = 'Failed to clear credentials';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const testConnection = useCallback(async (credentials?: JiraCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const result = await window.ipc.invoke('jira-test-connection', credentials);
      
      if (!result.success) {
        setError(result.error || 'Connection test failed');
      }
      
      return result;
    } catch (err) {
      console.error('Error testing Jira connection:', err);
      const error = 'Failed to test connection';
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    isAvailable,
    hasCredentials,
    loading,
    error,
    storeCredentials,
    clearCredentials,
    testConnection,
    refreshStatus: checkStatus
  };
}

// Hook for fetching Jira issues
export function useJiraIssues() {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchIssues = useCallback(async (options: {
    jql?: string;
    maxResults?: number;
    startAt?: number;
    fetchAll?: boolean;
  } = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await window.ipc.invoke('jira-fetch-issues', options);
      
      if (result.success && result.data) {
        setIssues(result.data.issues);
        setTotalCount(result.data.total);
        return { success: true, data: result.data };
      } else {
        const errorMessage = result.error || 'Failed to fetch issues';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Error fetching Jira issues:', err);
      const errorMessage = 'Failed to fetch issues';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const convertToProjectTickets = useCallback(async (issuesToConvert?: JiraIssue[]) => {
    try {
      const issueData = issuesToConvert || issues;
      
      if (issueData.length === 0) {
        return { success: false, error: 'No issues to convert' };
      }

      const result = await window.ipc.invoke('jira-convert-to-tickets', issueData);
      
      if (result.success) {
        return { success: true, tickets: result.tickets };
      } else {
        return { success: false, error: result.error || 'Failed to convert issues' };
      }
    } catch (err) {
      console.error('Error converting Jira issues to tickets:', err);
      return { success: false, error: 'Failed to convert issues' };
    }
  }, [issues]);

  const clearIssues = useCallback(() => {
    setIssues([]);
    setTotalCount(0);
    setError(null);
  }, []);

  return {
    issues,
    loading,
    error,
    totalCount,
    fetchIssues,
    convertToProjectTickets,
    clearIssues
  };
}

// Hook for fetching Jira projects
export function useJiraProjects() {
  const [projects, setProjects] = useState<JiraProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await window.ipc.invoke('jira-get-projects');
      
      if (result.success) {
        setProjects(result.projects);
        return { success: true, projects: result.projects };
      } else {
        const errorMessage = result.error || 'Failed to fetch projects';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Error fetching Jira projects:', err);
      const errorMessage = 'Failed to fetch projects';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProjects = useCallback(() => {
    setProjects([]);
    setError(null);
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    clearProjects
  };
}

// Combined hook for complete Jira functionality
export function useJiraApi() {
  const credentials = useJiraCredentials();
  const issues = useJiraIssues();
  const projects = useJiraProjects();

  const isReady = credentials.isAvailable && credentials.hasCredentials;

  return {
    credentials,
    issues,
    projects,
    isReady
  };
}