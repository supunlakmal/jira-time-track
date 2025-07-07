// renderer/components/Overview.tsx
import React from "react";
import { DashboardStats, ProjectSummary } from "../types/dashboard";

interface OverviewProps {
  dashboardStats: DashboardStats;
  projectSummaryData: ProjectSummary[];
  formatTime: (ms: number) => string;
}

const Overview: React.FC<OverviewProps> = ({
  dashboardStats,
  projectSummaryData,
  formatTime,
}) => {
  return (
    <div className="mb-8">
      {/* START OVERVIEW */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Tickets */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Tickets
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardStats.totalTickets}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="text-green-600 font-medium">
              {dashboardStats.completedTickets} completed
            </span>
            <span className="mx-2">•</span>
            <span className="text-blue-600 font-medium">
              {dashboardStats.inProgressTickets} in progress
            </span>
          </div>
        </div>

        {/* Story Points */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Story Points
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardStats.totalStoryPoints.toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Avg: {dashboardStats.averageStoryPoints.toFixed(1)} pts/ticket
          </div>
        </div>

        {/* Time Tracked */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Time Tracked
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatTime(dashboardStats.totalTimeTracked)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Avg: {formatTime(dashboardStats.productivity.averageTimePerTicket)}
            /ticket
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardStats.totalProjects}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {projectSummaryData.filter((p) => p.location).length} with local
            paths
          </div>
        </div>
      </div>
      {/* END OVERVIEW */}
      {/* Productivity Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Productivity Metrics (30 days)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {dashboardStats.productivity.ticketsPerDay.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Tickets/Day</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {dashboardStats.productivity.pointsPerDay.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Points/Day</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {formatTime(dashboardStats.productivity.averageTimePerTicket)}
            </p>
            <p className="text-sm text-gray-600">Time/Ticket</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {formatTime(dashboardStats.productivity.averageTimePerPoint)}
            </p>
            <p className="text-sm text-gray-600">Time/Point</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
