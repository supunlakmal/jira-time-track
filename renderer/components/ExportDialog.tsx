import React, { useState, useEffect } from 'react';
import { ExportSummary } from '../../types';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projects: string[];
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose, projects }) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterProject, setFilterProject] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSummary, setExportSummary] = useState<ExportSummary | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadExportSummary();
    }
  }, [isOpen]);

  const loadExportSummary = async () => {
    try {
      const summary = await window.ipc.invoke('get-export-summary');
      setExportSummary(summary);
    } catch (error) {
      console.error('Failed to load export summary:', error);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await window.ipc.invoke('export-time-data', {
        format,
        dateRange: dateRange.start || dateRange.end ? dateRange : undefined,
        filterProject: filterProject || undefined
      });

      if (result.success) {
        alert(`Export successful! ${result.recordCount} records exported to ${result.filePath}`);
        onClose();
      } else if (result.canceled) {
        // User canceled, do nothing
      } else if (result.error) {
        alert(`Export failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Export Time Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {exportSummary && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Data Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Total Sessions: <span className="font-medium">{exportSummary.totalSessions}</span></div>
              <div>Total Time: <span className="font-medium">{formatTime(exportSummary.totalTime)}</span></div>
              <div>Projects: <span className="font-medium">{exportSummary.totalProjects}</span></div>
              <div>Tickets: <span className="font-medium">{exportSummary.totalTickets}</span></div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={(e) => setFormat(e.target.value as 'csv')}
                  className="mr-2"
                />
                CSV (Excel compatible)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="json"
                  checked={format === 'json'}
                  onChange={(e) => setFormat(e.target.value as 'json')}
                  className="mr-2"
                />
                JSON (structured data)
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range (optional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Start date"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="End date"
              />
            </div>
          </div>

          {/* Project Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Project (optional)
            </label>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
};