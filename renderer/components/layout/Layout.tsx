import React from "react";
import { Sidebar, sidebarSections } from "../navigation";
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  toggleFloatingWindow?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  toggleFloatingWindow,
}) => {
  return (
    <div className="">
      <div className=" flex ">
        <Sidebar sections={sidebarSections} />

        <div className=" w-full dark:bg-darkblack-500">
          <Header toggleFloatingWindow={toggleFloatingWindow} />

          <main className="w-full dark:bg-darkblack-500">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;