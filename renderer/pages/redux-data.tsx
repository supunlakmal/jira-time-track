import Head from "next/head";
import React from "react";
import { ReduxDataViewer } from "../components/debug";
import Dashboard from "./dashboard";

export default function ReduxDataPage() {
  return (
    <>
      <Head>
        <title>Redux Data Viewer - Time Tracker</title>
      </Head>
      <Dashboard>
        <div className="p-6">
          <ReduxDataViewer />
        </div>
      </Dashboard>
    </>
  );
}