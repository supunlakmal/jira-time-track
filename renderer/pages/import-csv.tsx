import Head from "next/head";
import React, { useState, useRef } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

interface CsvPreviewData {
  ticket_number: string;
  ticket_name: string;
  story_points: number | null;
}

export default function ImportCsvPage() {
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  const [csvData, setCsvData] = useState<CsvPreviewData[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredColumns = ['ticket_number', 'ticket_name', 'story_points'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportSuccess(false);
      validateCsvFile(file);
    }
  };

  const validateCsvFile = async (file: File) => {
    setIsValidating(true);
    setErrors([]);
    
    try {
      const text = await file.text();
      const lines = text.trim().split('\n');
      
      if (lines.length < 2) {
        setErrors(['CSV file must contain at least a header row and one data row']);
        setIsValidating(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const missingColumns = requiredColumns.filter(col => !headers.includes(col.toLowerCase()));
      
      if (missingColumns.length > 0) {
        setErrors([`Missing required columns: ${missingColumns.join(', ')}`]);
        setIsValidating(false);
        return;
      }

      const parsedData: CsvPreviewData[] = [];
      const validationErrors: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        
        if (values.length !== headers.length) {
          validationErrors.push(`Row ${i + 1}: Column count mismatch`);
          continue;
        }

        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });

        if (!row.ticket_number || !row.ticket_name) {
          validationErrors.push(`Row ${i + 1}: Missing required fields`);
          continue;
        }

        const storyPoints = row.story_points && row.story_points.trim() !== '' 
          ? parseFloat(row.story_points) 
          : null;

        if (row.story_points && row.story_points.trim() !== '' && isNaN(storyPoints!)) {
          validationErrors.push(`Row ${i + 1}: Invalid story points value`);
          continue;
        }

        parsedData.push({
          ticket_number: row.ticket_number,
          ticket_name: row.ticket_name,
          story_points: storyPoints
        });
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else {
        setCsvData(parsedData);
        setShowPreview(true);
      }
    } catch (error) {
      setErrors(['Error reading CSV file: ' + (error as Error).message]);
    }
    
    setIsValidating(false);
  };

  const handleImport = async () => {
    if (csvData.length > 0) {
      setIsImporting(true);
      try {
        // Send data to main process for import
        const result = await window.ipc?.invoke('import-csv-data', csvData);
        if (result?.success) {
          setImportSuccess(true);
          setErrors([]);
        } else {
          setErrors([result?.error || 'Import failed']);
        }
      } catch (error) {
        setErrors(['Import failed: ' + (error as Error).message]);
      } finally {
        setIsImporting(false);
      }
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCsvData([]);
    setErrors([]);
    setShowPreview(false);
    setIsValidating(false);
    setImportSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = `ticket_number,ticket_name,story_points
EXAMPLE-1,"Sample ticket description",3.5
EXAMPLE-2,"Another sample ticket",2.0
EXAMPLE-3,"Third example ticket",`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csv-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Import CSV - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Import Tasks from CSV
          </h1>
          {(selectedFile || showPreview) && (
            <Button
              onClick={handleReset}
              variant="gray"
              size="sm"
            >
              Reset
            </Button>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          {!showPreview ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Select CSV File
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Choose a CSV file containing your task data
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <label className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose File
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".csv"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                      <Button
                        onClick={downloadTemplate}
                        variant="success"
                        size="md"
                        className="inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• First row must contain headers: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">ticket_number</code>, <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">ticket_name</code>, <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">story_points</code></li>
                  <li>• ticket_number and ticket_name are required</li>
                  <li>• story_points can be empty or a decimal number</li>
                  <li>• Use comma separation and quote text containing commas</li>
                </ul>
              </div>

              {selectedFile && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      Selected: {selectedFile.name}
                    </span>
                  </div>
                </div>
              )}

              {isValidating && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Validating CSV file...</p>
                </div>
              )}

              {errors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 dark:text-red-300 mb-1">Validation Errors:</h4>
                      <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {importSuccess && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-900 dark:text-green-300">
                      Successfully imported {csvData.length} tasks!
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Preview ({csvData.length} tasks)
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowPreview(false)}
                    variant="gray"
                    size="sm"
                  >
                    ← Back to file selection
                  </Button>
                  <Button
                    onClick={handleImport}
                    variant="primary"
                    size="sm"
                    disabled={isImporting || csvData.length === 0}
                    loading={isImporting}
                  >
                    Import {csvData.length} Tasks
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ticket Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ticket Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Story Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {csvData.slice(0, 10).map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {row.ticket_number}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            <div className="max-w-xs truncate" title={row.ticket_name}>
                              {row.ticket_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {row.story_points !== null ? row.story_points.toString() : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {csvData.length > 10 && (
                  <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 text-sm text-gray-500 dark:text-gray-300">
                    Showing first 10 rows of {csvData.length} total tasks
                  </div>
                )}
              </div>

              {importSuccess && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-900 dark:text-green-300">
                      Successfully imported {csvData.length} tasks!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}