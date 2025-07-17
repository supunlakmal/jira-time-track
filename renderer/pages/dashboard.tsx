import React from "react";
import Layout from "../components/layout/Layout";

interface DashboardProps {
  children: React.ReactNode;
  toggleFloatingWindow?: () => void;
}

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
