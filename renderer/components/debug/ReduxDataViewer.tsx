import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Button from "../ui/Button";
import { ContentCopy, Refresh } from "@mui/icons-material";

interface ReduxDataViewerProps {
  className?: string;
}

const ReduxDataViewer: React.FC<ReduxDataViewerProps> = ({ className = "" }) => {
  const reduxState = useSelector((state: RootState) => state);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [copied, setCopied] = useState(false);

  const formatJson = (data: any) => {
    return JSON.stringify(data, null, 2);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatJson(reduxState));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div className={`redux-data-viewer ${className}`}>
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 dark:bg-darkblack-500 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Redux Store Data
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

      {/* Redux State Display */}
      <div className="bg-white dark:bg-darkblack-600 border border-gray-200 dark:border-darkblack-400 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-darkblack-400">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">
            Current State
          </h3>
        </div>
        
        <div className="max-h-[600px] overflow-auto">
          <pre className="p-4 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
            {formatJson(reduxState)}
          </pre>
        </div>
      </div>

      {/* State Summary */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
          State Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 dark:text-blue-300">Sessions:</span>
            <span className="ml-2 text-blue-900 dark:text-blue-100">
              {Object.keys(reduxState.sessions.sessions).length} active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReduxDataViewer;