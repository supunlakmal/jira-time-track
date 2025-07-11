import React, { useState, useEffect } from 'react';
import { useJiraApi, JiraCredentials, JiraIssue } from './useJiraApi';

interface JiraSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImportIssues?: (issues: JiraIssue[]) => void;
}

export const JiraSettingsDialog: React.FC<JiraSettingsDialogProps> = ({
  isOpen,
  onClose,
  onImportIssues
}) => {
  const { credentials, issues, projects } = useJiraApi();
  
  // Form state
  const [formData, setFormData] = useState<JiraCredentials>({
    domain: '',
    email: '',
    apiToken: ''
  });
  
  // UI state
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // JQL and fetching state
  const [jqlQuery, setJqlQuery] = useState('issuetype=Task');
  const [previewIssues, setPreviewIssues] = useState<JiraIssue[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ domain: '', email: '', apiToken: '' });
      setConnectionStatus(null);
      setPreviewIssues([]);
      setShowPreview(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear connection status when credentials change
    if (connectionStatus) {
      setConnectionStatus(null);
    }
  };

  const handleTestConnection = async () => {
    if (!formData.domain || !formData.email || !formData.apiToken) {
      setConnectionStatus({
        success: false,
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus(null);

    const result = await credentials.testConnection(formData);
    
    setConnectionStatus({
      success: result.success,
      message: result.success ? 'Connection successful!' : result.error || 'Connection failed'
    });
    
    setIsTestingConnection(false);
  };

  const handleStoreCredentials = async () => {
    if (!connectionStatus?.success) {
      setConnectionStatus({
        success: false,
        message: 'Please test the connection first'
      });
      return;
    }

    const result = await credentials.storeCredentials(formData);
    
    if (result.success) {
      setConnectionStatus({
        success: true,
        message: 'Credentials stored securely!'
      });
    } else {
      setConnectionStatus({
        success: false,
        message: result.error || 'Failed to store credentials'
      });
    }
  };

  const handleClearCredentials = async () => {
    const result = await credentials.clearCredentials();
    
    if (result.success) {
      setConnectionStatus({
        success: true,
        message: 'Credentials cleared successfully'
      });
    } else {
      setConnectionStatus({
        success: false,
        message: result.error || 'Failed to clear credentials'
      });
    }
  };

  const handleFetchPreview = async () => {
    if (!credentials.hasCredentials) {
      setConnectionStatus({
        success: false,
        message: 'Please store credentials first'
      });
      return;
    }

    const result = await issues.fetchIssues({
      jql: jqlQuery,
      maxResults: 10
    });

    if (result.success && result.data) {
      setPreviewIssues(result.data.issues);
      setShowPreview(true);
    } else {
      setConnectionStatus({
        success: false,
        message: result.error || 'Failed to fetch issues'
      });
    }
  };

  const handleImportAllIssues = async () => {
    if (!credentials.hasCredentials) {
      setConnectionStatus({
        success: false,
        message: 'Please store credentials first'
      });
      return;
    }

    const result = await issues.fetchIssues({
      jql: jqlQuery,
      fetchAll: true
    });

    if (result.success && result.data) {
      if (onImportIssues) {
        onImportIssues(result.data.issues);
      }
      setConnectionStatus({
        success: true,
        message: `Successfully imported ${result.data.issues.length} issues`
      });
    } else {
      setConnectionStatus({
        success: false,
        message: result.error || 'Failed to import issues'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jira Integration Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Secure Storage Status */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              credentials.isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Secure Storage: {credentials.isAvailable ? 'Available' : 'Not Available'}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-3 h-3 rounded-full ${
              credentials.hasCredentials ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Stored Credentials: {credentials.hasCredentials ? 'Found' : 'None'}
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jira Domain
            </label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              placeholder="your-domain.atlassian.net"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Token
            </label>
            <input
              type="password"
              name="apiToken"
              value={formData.apiToken}
              onChange={handleInputChange}
              placeholder="Your Jira API Token"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Connection Status */}
        {connectionStatus && (
          <div className={`mb-4 p-3 rounded-md ${
            connectionStatus.success
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {connectionStatus.message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={handleTestConnection}
            disabled={isTestingConnection || credentials.loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isTestingConnection ? 'Testing...' : 'Test Connection'}
          </button>

          <button
            onClick={handleStoreCredentials}
            disabled={credentials.loading || !connectionStatus?.success}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            Store Credentials
          </button>

          {credentials.hasCredentials && (
            <button
              onClick={handleClearCredentials}
              disabled={credentials.loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              Clear Credentials
            </button>
          )}
        </div>

        {/* JQL Query and Issue Fetching */}
        {credentials.hasCredentials && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Import Issues
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  JQL Query
                </label>
                <input
                  type="text"
                  value={jqlQuery}
                  onChange={(e) => setJqlQuery(e.target.value)}
                  placeholder="issuetype=Task"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleFetchPreview}
                  disabled={issues.loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {issues.loading ? 'Loading...' : 'Preview Issues'}
                </button>

                <button
                  onClick={handleImportAllIssues}
                  disabled={issues.loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {issues.loading ? 'Loading...' : 'Import All Issues'}
                </button>
              </div>
            </div>

            {/* Preview Issues */}
            {showPreview && previewIssues.length > 0 && (
              <div className="mt-4 max-h-60 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview ({previewIssues.length} issues)
                </h4>
                <div className="space-y-2">
                  {previewIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {issue.key}: {issue.summary}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Status: {issue.status} | Type: {issue.issueType}
                        {issue.storyPoints && ` | SP: ${issue.storyPoints}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JiraSettingsDialog;