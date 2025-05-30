import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useJiraData } from "../hooks/useJiraData";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function HomePage() {
  const { data, loading, error, refreshData } = useJiraData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((ticket) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ticket.ticket_number.toLowerCase().includes(searchLower) ||
      ticket.ticket_name.toLowerCase().includes(searchLower)
    );
  });

  const toggleFloatingWindow = () => {
    window.ipc.send("toggle-float-window", true);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Jira Time Tracker</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Image
              className="mx-auto mb-4"
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Jira Time Tracker
            </h1>
            <button
              onClick={toggleFloatingWindow}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Toggle Floating Timer
            </button>
          </div>

          {/* Search and Refresh */}
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={refreshData}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              ↻ Refresh
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={refreshData}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {searchTerm
                            ? "No tickets match your search"
                            : "No tickets available"}
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((ticket) => (
                        <tr
                          key={ticket.ticket_number}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {ticket.ticket_number}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {ticket.ticket_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => {
                                window.ipc.send("start-task", {
                                  ticket: ticket.ticket_number, // Renamed for consistency with float.tsx
                                  name: ticket.ticket_name, // Send the name
                                });
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Start Timer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
