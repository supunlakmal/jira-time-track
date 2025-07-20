import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

export default function ExportDataPage() {
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterProject, setFilterProject] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSummary, setExportSummary] = useState<any>(null);
  const [projects, setProjects] = useState<string[]>([]);
  const [exportStatus, setExportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    loadExportSummary();
    loadProjects();
  }, []);

  const loadExportSummary = async () => {
    try {
      const summary = await window.ipc.invoke("get-export-summary");
      setExportSummary(summary);
    } catch (error) {
      console.error("Failed to load export summary:", error);
    }
  };

  const loadProjects = async () => {
    try {
      const projectData = await window.ipc.invoke("get-projects");
      setProjects(projectData || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus({ type: null, message: "" });
    
    try {
      const result = await window.ipc.invoke("export-time-data", {
        format,
        dateRange: dateRange.start || dateRange.end ? dateRange : undefined,
        filterProject: filterProject || undefined,
      });

      if (result.success) {
        setExportStatus({
          type: 'success',
          message: `Export successful! ${result.recordCount} records exported to ${result.filePath}`
        });
      } else if (result.canceled) {
        setExportStatus({
          type: null,
          message: ""
        });
      } else if (result.error) {
        setExportStatus({
          type: 'error',
          message: `Export failed: ${result.error}`
        });
      }
    } catch (error) {
      setExportStatus({
        type: 'error',
        message: `Export failed: ${error.message}`
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setFormat("csv");
    setDateRange({ start: "", end: "" });
    setFilterProject("");
    setExportStatus({ type: null, message: "" });
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Export Data - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Export Time Data
          </h1>
          <Button
            onClick={handleReset}
            variant="gray"
            size="sm"
          >
            Reset
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          {exportSummary && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Data Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-900 dark:text-gray-100">
                <div>
                  Total Sessions:{" "}
                  <span className="font-medium">
                    {exportSummary.totalSessions}
                  </span>
                </div>
                <div>
                  Total Time:{" "}
                  <span className="font-medium">
                    {formatTime(exportSummary.totalTime)}
                  </span>
                </div>
                <div>
                  Projects:{" "}
                  <span className="font-medium">
                    {exportSummary.totalProjects}
                  </span>
                </div>
                <div>
                  Tickets:{" "}
                  <span className="font-medium">
                    {exportSummary.totalTickets}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Export Format
              </label>
              <div className="flex space-x-4 text-gray-900 dark:text-gray-100">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="csv"
                    checked={format === "csv"}
                    onChange={(e) => setFormat(e.target.value as "csv")}
                    className="mr-2"
                  />
                  CSV (Excel compatible)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="json"
                    checked={format === "json"}
                    onChange={(e) => setFormat(e.target.value as "json")}
                    className="mr-2"
                  />
                  JSON (structured data)
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range (optional)
              </label>
              <div className="grid grid-cols-2 gap-2 text-gray-900 dark:text-gray-100">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                  placeholder="End date"
                />
              </div>
            </div>

            {/* Project Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Project (optional)
              </label>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700"
              >
                <option value="">All Projects</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Status */}
            {exportStatus.type && (
              <div className={`p-4 rounded-lg ${
                exportStatus.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center">
                  {exportStatus.type === 'success' ? (
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  <span className={`text-sm font-medium ${
                    exportStatus.type === 'success' 
                      ? 'text-green-900 dark:text-green-300' 
                      : 'text-red-900 dark:text-red-300'
                  }`}>
                    {exportStatus.message}
                  </span>
                </div>
              </div>
            )}

            {/* Export Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                variant="primary"
                size="md"
                loading={isExporting}
                className="px-6"
              >
                {isExporting ? "Exporting..." : "Export Data"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}