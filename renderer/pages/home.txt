// renderer/pages/home.tsx
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import Overview from "../components/dashboard/Overview";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useSharedData } from "../hooks/useSharedData";
import { TimerSession } from "../store/sessionsSlice";
import { DashboardStats, ProjectSummary } from "../types/dashboard";
import Dashboard from "./dashboard";

export default function HomePage() {
  const { projectData: data, sessions, billingData, loading } = useSharedData();

  // Signal app ready when all data is loaded
  useEffect(() => {
    console.log(
      "HomePage: Checking app ready conditions - loading:",
      loading,
      "data:",
      !!data,
      "sessions:",
      !!sessions
    );

    if (!loading && typeof window !== "undefined" && window.ipc) {
      console.log("HomePage: Sending app-ready signal");
      // Add a small delay to ensure smooth loading
      const timer = setTimeout(() => {
        window.ipc.send("app-ready");
        console.log("HomePage: app-ready signal sent");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, data, sessions]);

  // Fallback: Send app-ready signal after component mounts (regardless of data state)
  useEffect(() => {
    if (typeof window !== "undefined" && window.ipc) {
      const fallbackTimer = setTimeout(() => {
        console.log("HomePage: Sending fallback app-ready signal");
        window.ipc.send("app-ready");
      }, 3000); // 3 second fallback

      return () => clearTimeout(fallbackTimer);
    }
  }, []); // Run once on mount


  const getProjectName = (ticketNumber: string): string => {
    if (!ticketNumber || !ticketNumber.includes("-")) return "N/A";
    return ticketNumber.split("-")[0];
  };

  // Helper function to format time
  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Calculate dashboard statistics
  const dashboardStats = useMemo((): DashboardStats => {
    if (!data || data.length === 0) {
      return {
        totalTickets: 0,
        totalStoryPoints: 0,
        averageStoryPoints: 0,
        totalProjects: 0,
        completedTickets: 0,
        inProgressTickets: 0,
        totalTimeTracked: 0,
        productivity: {
          ticketsPerDay: 0,
          pointsPerDay: 0,
          averageTimePerTicket: 0,
          averageTimePerPoint: 0,
        },
      };
    }

    const totalStoryPoints = data.reduce(
      (sum, ticket) => sum + (ticket.story_points || 0),
      0
    );
    const totalTimeTracked: number = Object.values(
      sessions as { [key: string]: TimerSession }
    ).reduce((sum, session) => sum + (session.totalElapsed || 0), 0);

    const completedTickets = Object.values(
      sessions as { [key: string]: TimerSession }
    ).filter((session) =>
      session.sessions.some((s) => s.status === "completed")
    ).length;

    const inProgressTickets = Object.values(
      sessions as { [key: string]: TimerSession }
    ).filter((session) =>
      session.sessions.some(
        (s) => s.status === "running" || s.status === "paused"
      )
    ).length;

    const uniqueProjects = new Set(
      data.map((ticket) => getProjectName(ticket.ticket_number))
    ).size;

    // Calculate productivity metrics (assuming 30 days)
    const days = 30;
    const ticketsPerDay = data.length / days;
    const pointsPerDay = totalStoryPoints / days;
    const averageTimePerTicket =
      data.length > 0 ? totalTimeTracked / data.length : 0;
    const averageTimePerPoint =
      totalStoryPoints > 0 ? totalTimeTracked / totalStoryPoints : 0;

    return {
      totalTickets: data.length,
      totalStoryPoints,
      averageStoryPoints: data.length > 0 ? totalStoryPoints / data.length : 0,
      totalProjects: uniqueProjects,
      completedTickets,
      inProgressTickets,
      totalTimeTracked,
      productivity: {
        ticketsPerDay,
        pointsPerDay,
        averageTimePerTicket,
        averageTimePerPoint,
      },
    };
  }, [data, sessions]);

  // Enhanced project summary with time tracking data
  const projectSummaryData = useMemo((): ProjectSummary[] => {
    if (!data || data.length === 0) return [];

    const summary: Record<
      string,
      {
        count: number;
        totalStoryPoints: number;
        completedTickets: number;
        inProgressTickets: number;
        totalTimeSpent: number;
      }
    > = {};

    data.forEach((ticket) => {
      const projectName = getProjectName(ticket.ticket_number);
      if (projectName === "N/A") return;

      if (!summary[projectName]) {
        summary[projectName] = {
          count: 0,
          totalStoryPoints: 0,
          completedTickets: 0,
          inProgressTickets: 0,
          totalTimeSpent: 0,
        };
      }

      summary[projectName].count++;
      summary[projectName].totalStoryPoints += ticket.story_points || 0;

      // Check if ticket has time tracking data
      const ticketSession = sessions[ticket.ticket_number];
      if (ticketSession) {
        summary[projectName].totalTimeSpent += ticketSession.totalElapsed || 0;

        if (ticketSession.sessions.some((s) => s.status === "completed")) {
          summary[projectName].completedTickets++;
        } else if (
          ticketSession.sessions.some(
            (s) => s.status === "running" || s.status === "paused"
          )
        ) {
          summary[projectName].inProgressTickets++;
        }
      }
    });

    return Object.entries(summary)
      .map(([name, projectData]) => ({
        name,
        ticketCount: projectData.count,
        location: undefined,
        currentBranch: undefined,
        totalStoryPoints: projectData.totalStoryPoints,
        averageStoryPoints:
          projectData.count > 0
            ? projectData.totalStoryPoints / projectData.count
            : 0,
        completedTickets: projectData.completedTickets,
        inProgressTickets: projectData.inProgressTickets,
        totalTimeSpent: projectData.totalTimeSpent,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, sessions]);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);


  return (
    <React.Fragment>
      <Dashboard toggleFloatingWindow={toggleFloatingWindow}>
        <Head>
          <title>Overview - Project Time Tracker</title>
        </Head>
        <div className="">
          <div
            className="
          "
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Overview
                dashboardStats={dashboardStats}
                projectSummaryData={projectSummaryData}
                formatTime={formatTime}
                billingData={billingData}
                sessions={sessions}
              />
            )}
          </div>
        </div>
      </Dashboard>
    </React.Fragment>
  );
}
