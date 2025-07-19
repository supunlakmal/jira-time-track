import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { ContentCopy, Refresh, Storage } from "@mui/icons-material";

interface StoreDataViewerProps {
  className?: string;
}

const StoreDataViewer: React.FC<StoreDataViewerProps> = ({ className = "" }) => {
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (typeof window !== "undefined" && window.ipc) {
        const data = await window.ipc.invoke("get-all-store-data");
        setStoreData(data);
        setLastUpdated(new Date());
      } else {
        throw new Error("IPC not available");
      }
    } catch (err) {
      console.error("Failed to fetch store data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch store data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();

    // Listen for data updates and automatically refresh
    const cleanupSessions = window.ipc.on("sessions-updated", () => {
      fetchStoreData();
    });
    const cleanupProjectData = window.ipc.on("project-data-updated", () => {
      fetchStoreData();
    });
    const cleanupManualTasks = window.ipc.on("manual-tasks-updated", () => {
      fetchStoreData();
    });
    const cleanupBilling = window.ipc.on("billing-updated", () => {
      fetchStoreData();
    });
    const cleanupProjects = window.ipc.on("projects-updated", () => {
      fetchStoreData();
    });

    // Cleanup event listeners on unmount
    return () => {
      cleanupSessions();
      cleanupProjectData();
      cleanupManualTasks();
      cleanupBilling();
      cleanupProjects();
    };
  }, []);

  const formatJson = (data: any) => {
    return JSON.stringify(data, null, 2);
  };

  const handleRefresh = () => {
    fetchStoreData();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatJson(storeData));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  if (loading) {
    return (
      <div className={`store-data-viewer ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-600 dark:text-gray-300">Loading store data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`store-data-viewer ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`store-data-viewer ${className}`}>
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 dark:bg-darkblack-500 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            App Store Data
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 text-sm"
            variant="gray"
          >
            <Refresh className="w-4 h-4" />
            Refresh
          </Button>
          <Button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm"
            variant="gray"
          >
            <ContentCopy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Store Summary */}
      {storeData?.summary && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="text-sm font-medium text-green-900 dark:text-green-200 mb-2 flex items-center gap-2">
            <Storage className="w-4 h-4" />
            Store Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-green-700 dark:text-green-300">Sessions:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.totalSessions} total
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Active:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.activeSessions}
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Projects:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.totalProjects}
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Project Data:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.totalProjectData}
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Manual:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.totalManualTasks}
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Paths:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {storeData.summary.totalProjectPaths}
              </span>
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Size:</span>
              <span className="ml-2 text-green-900 dark:text-green-100">
                {(storeData.summary.storeSize / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Store Data Display */}
      <div className="bg-white dark:bg-darkblack-600 border border-gray-200 dark:border-darkblack-400 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-darkblack-400">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">
            Complete Store Data
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Includes main store, project paths, zoom levels, and metadata
          </p>
        </div>
        
        <div className="max-h-[600px] overflow-auto">
          <pre className="p-4 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
            {formatJson(storeData)}
          </pre>
        </div>
      </div>

      {/* Metadata */}
      {storeData?.metadata && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
            Store Metadata
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 dark:text-blue-300">Version:</span>
              <span className="ml-2 text-blue-900 dark:text-blue-100">
                {storeData.metadata.storeVersion}
              </span>
            </div>
            <div>
              <span className="text-blue-700 dark:text-blue-300">Last Updated:</span>
              <span className="ml-2 text-blue-900 dark:text-blue-100">
                {new Date(storeData.metadata.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDataViewer;