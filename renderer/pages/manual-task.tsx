import Head from "next/head";
import React from "react";
import Layout from "../components/layout/Layout";

export default function ManualTaskPage() {
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Add Manual Task - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add Manual Task
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">
            This page will contain the manual task creation form.
          </p>
        </div>
      </div>
    </Layout>
  );
}