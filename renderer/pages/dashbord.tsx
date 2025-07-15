import Link from "next/link";
import Image from "next/image";
import React from "react";
import HeaderNew from "../components/layout/HeaderNew";
import {
  Timer,
  AddTask,
  Receipt,
  Settings,
  Upload,
  Download,
  RestartAlt,
} from "@mui/icons-material";
import StatsCard from "../components/dashboard/StatsCard";

// --- Data for the Sidebar ---
// To modify the sidebar, edit this data structure.
// Icons are included as JSX elements for reusability.

// --- MODIFIED DATA FOR THE SIDEBAR ---
// This data structure now contains sidebar items with MUI icons
const sidebarSections = [
  {
    title: "Menu",
    items: [
      {
        label: "Toggle Floating Timer",
        href: "/a-1",
        icon: <Timer className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Add Manual Task",
        href: "/a-2",
        icon: <AddTask className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Billing",
        href: "/a-3",
        icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Jira Setting",
        href: "/a-4",
        icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Import CSV",
        href: "/a-5",
        icon: <Upload className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Export Data",
        href: "/a-6",
        icon: <Download className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Reset Data",
        href: "/a-7",
        icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
];

// Component for a single Navigation Item
const NavItem = ({ href, icon, label, subMenu, extras }) => (
  <li className="item py-[11px] text-bgray-900 dark:text-white">
    <Link href={href}>
      <div className="flex cursor-pointer items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="item-ico">{icon}</span>
          <span className="item-text text-lg font-medium leading-none">
            {label}
          </span>
        </div>
        {extras && <>{extras}</>}
      </div>
    </Link>
  </li>
);

// Component for a Navigation Section (e.g., "Menu", "Help")
const NavSection = ({ title, items }) => (
  <div className="item-wrapper mb-5">
    <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
      {title}
    </h4>
    <ul className="mt-2.5">
      {items.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}
    </ul>
  </div>
);

// --- The Main Sidebar Component ---
// This component orchestrates the assembly of the sidebar from smaller pieces.
const Sidebar = ({ sections }) => {
  return (
    <aside
      className="
   
    block h-full w-[308px] bg-white dark:bg-darkblack-600 "
    >
      {/* Sidebar Header */}
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <Link href="/">
          {/* NOTE: For Next.js, place your 'assets' folder in the 'public' directory */}
          <Image
            src="/images/logo.png"
            className="block dark:hidden"
            alt="logo"
            width={50}
            height={50}
          />
          <Image
            src="/images/logo.png"
            className="hidden dark:block"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>

      {/* Sidebar Body */}
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full  pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          {sections.map((section) => (
            <NavSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

// --- The Main Page Component ---
// This is the exported page component that uses the reusable Sidebar.
const Dashboard = ({ children }) => {
  return (
    <div className="">
      <div className=" flex ">
        <Sidebar sections={sidebarSections} />

        <div className=" w-full dark:bg-darkblack-500">
          <HeaderNew />

          {/* You can add the main content of your dashboard page here */}
          <main className="w-full dark:bg-darkblack-500">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
