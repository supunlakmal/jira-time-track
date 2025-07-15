import React from "react";
import { Sidebar, sidebarSections } from "../components/navigation";
import HeaderNew from "../components/layout/HeaderNew";

interface DashboardProps {
  children: React.ReactNode;
  toggleFloatingWindow?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  toggleFloatingWindow,
}) => {
  return (
    <div className="">
      <div className=" flex ">
        <Sidebar sections={sidebarSections} />

        <div className=" w-full dark:bg-darkblack-500">
          <HeaderNew toggleFloatingWindow={toggleFloatingWindow} />

          <main className="w-full dark:bg-darkblack-500">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
