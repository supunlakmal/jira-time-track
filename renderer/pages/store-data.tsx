import Head from "next/head";
import React from "react";
import { StoreDataViewer } from "../components/debug";
import Dashboard from "./dashboard";

export default function StoreDataPage() {
  return (
    <>
      <Head>
        <title>Store Data Viewer - Time Tracker</title>
      </Head>
      <Dashboard>
        <div className="p-6">
          <StoreDataViewer />
        </div>
      </Dashboard>
    </>
  );
}