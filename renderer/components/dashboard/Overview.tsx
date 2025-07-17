// renderer/components/dashboard/Overview.tsx
import React from "react";
import { DashboardStats, ProjectSummary } from "../../types/dashboard";
import StatsCard from "./StatsCard";

interface OverviewProps {
  dashboardStats: DashboardStats;
  projectSummaryData: ProjectSummary[];
  formatTime: (ms: number) => string;
  billingData?: any;
  sessions?: any;
}

const Overview: React.FC<OverviewProps> = ({
  dashboardStats,
  projectSummaryData,
  formatTime,
  billingData,
  sessions,
}) => {
  const calculateBillingStats = () => {
    if (!billingData?.settings || !sessions) return null;

    let totalRevenue = 0;
    let totalBillableTime = 0;
    let billedTickets = 0;

    Object.keys(sessions).forEach((ticketNumber) => {
      const session = sessions[ticketNumber];
      if (!session?.totalElapsed) return;

      // Find project for this ticket
      const projectName = getProjectFromTicket(ticketNumber);
      const hourlyRate =
        billingData.settings.projectRates?.[projectName] ||
        billingData.settings.globalHourlyRate;

      if (hourlyRate) {
        const timeSpentHours = session.totalElapsed / (1000 * 60 * 60);
        totalRevenue += timeSpentHours * hourlyRate;
        totalBillableTime += session.totalElapsed;
        billedTickets++;
      }
    });

    const averageRate =
      totalBillableTime > 0
        ? totalRevenue / (totalBillableTime / (1000 * 60 * 60))
        : 0;

    return {
      totalRevenue,
      totalBillableTime,
      billedTickets,
      averageRate,
      currency: billingData.settings.currency || "USD",
    };
  };

  const getProjectFromTicket = (ticketNumber: string) => {
    return ticketNumber.split("-")[0] || "Unknown";
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const billingStats = calculateBillingStats();
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Overview
        </h2>

        {/* New OVERVIEW */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            data={{
              id: "total-tickets",
              title: "Total Tickets",
              value: dashboardStats.totalTickets,
              change: `${dashboardStats.completedTickets} completed`,
              changeType: "positive",
              icon: "tickets",
              chartId: "ticketsChart",
              category: "number",
              rawValue: dashboardStats.totalTickets,
              unit: "tickets"
            }}
          />
          <StatsCard
            data={{
              id: "story-points",
              title: "Story Points",
              value: dashboardStats.totalStoryPoints,
              change: `Avg: ${dashboardStats.averageStoryPoints.toFixed(1)} pts/ticket`,
              changeType: "positive",
              icon: "points",
              chartId: "pointsChart",
              category: "number",
              rawValue: dashboardStats.totalStoryPoints,
              unit: "points"
            }}
          />
          <StatsCard
            data={{
              id: "time-tracked",
              title: "Time Tracked",
              value: dashboardStats.totalTimeTracked,
              change: `Avg: ${formatTime(dashboardStats.productivity.averageTimePerTicket)}/ticket`,
              changeType: "positive",
              icon: "time",
              chartId: "timeChart",
              category: "time",
              rawValue: dashboardStats.totalTimeTracked,
              unit: "time"
            }}
          />
          <StatsCard
            data={{
              id: "active-projects",
              title: "Active Projects",
              value: dashboardStats.totalProjects,
              change: `${projectSummaryData.filter((p) => p.location).length} with local paths`,
              changeType: "positive",
              icon: "projects",
              chartId: "projectsChart",
              category: "number",
              rawValue: dashboardStats.totalProjects,
              unit: "projects"
            }}
          />
        </section>

        {/* Billing Overview */}
        {billingStats && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg shadow-sm border border-green-200 dark:border-green-600/30 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Billing Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(
                    billingStats.totalRevenue,
                    billingStats.currency
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Revenue
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(billingStats.totalBillableTime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Billable Time
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    billingStats.averageRate,
                    billingStats.currency
                  )}
                  /h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Rate
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {billingStats.billedTickets}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Billed Tickets
                </p>
              </div>
            </div>
          </div>
        )}

        {/* END New OVERVIEW */}

        {/* Productivity Metrics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Productivity Metrics (30 days)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {dashboardStats.productivity.ticketsPerDay.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tickets/Day
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {dashboardStats.productivity.pointsPerDay.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Points/Day
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {formatTime(dashboardStats.productivity.averageTimePerTicket)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Time/Ticket
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {formatTime(dashboardStats.productivity.averageTimePerPoint)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Time/Point
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Overview;
