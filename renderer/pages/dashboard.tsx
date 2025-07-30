import React from "react";
import Layout from "../components/layout/Layout";
import { DashboardProps } from "../types/dashboard";

const Dashboard: React.FC<DashboardProps> = ({
  children,
  toggleFloatingWindow,
}) => {
  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      {children}
    </Layout>
  );
};

export default Dashboard;
