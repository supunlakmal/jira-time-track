import Head from "next/head";
import React from "react";
import Layout from "../components/layout/Layout";

export default function ImportCsvPage() {
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Import CSV - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Import CSV
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">
            This page will contain CSV import functionality for tasks and tickets.
          </p>
        </div>
      </div>
    </Layout>
  );
}