import React from "react";
import { Sidebar, sidebarSections } from "../navigation";
import Header from "./Header";
import { UpdateNotification } from "../updates";
import { useUpdates } from "../../hooks/useUpdates";

interface LayoutProps {
  children: React.ReactNode;
  toggleFloatingWindow?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleFloatingWindow }) => {
  const { showNotification, dismissNotification } = useUpdates();

  return (
    <div className="">
      <div className=" flex ">
        <Sidebar sections={sidebarSections} />

        <div className="bg-white  w-full dark:bg-darkblack-500">
          <Header toggleFloatingWindow={toggleFloatingWindow} />

          <main className="w-full dark:bg-darkblack-500">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>

      {/* Update Notification */}
      {showNotification && (
        <UpdateNotification
          onClose={dismissNotification}
          // mockUpdateInfo={{
          //   updateAvailable: true,
          //   updateDownloaded: false,
          //   version: "2.3.1",
          //   releaseNotes: "🚀 What's New in v2.3.1",
          // }}
          // debugMode
        />
      )}
    </div>
  );
};

export default Layout;
