import Link from "next/link";
import Image from "next/image";
import React from "react";

// --- Data for the Sidebar ---
// To modify the sidebar, edit this data structure.
// Icons are included as JSX elements for reusability.

// A simple icon component for repeated icons
const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="11.7778"
      cy="17.5555"
      rx="7.77778"
      ry="4.44444"
      fill="#1A202C"
      className="path-1"
    />
    <circle
      cx="11.7778"
      cy="6.44444"
      r="4.44444"
      fill="#22C55E"
      className="path-2"
    />
  </svg>
);

// --- MODIFIED DATA FOR THE SIDEBAR ---
// This data structure now contains only 6 links as requested.
const sidebarSections = [
  {
    title: "Menu",
    items: [
      {
        label: "A-1",
        href: "/a-1",
        icon: <UserIcon />,
      },
      {
        label: "A-2",
        href: "/a-2",
        icon: <UserIcon />,
      },
      {
        label: "A-3",
        href: "/a-3",
        icon: <UserIcon />,
      },
      {
        label: "A-4",
        href: "/a-4",
        icon: <UserIcon />,
      },
      {
        label: "A-5",
        href: "/a-5",
        icon: <UserIcon />,
      },
      {
        label: "A-6",
        href: "/a-6",
        icon: <UserIcon />,
      },
    ],
  },
];

// --- Reusable Components ---

// Component for a single Sub-menu Item
const SubMenuItem = ({ href, label }) => (
  <li>
    <Link href={href}>
      <span className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300">
        {label}
      </span>
    </Link>
  </li>
);

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
        {/* Render right arrow if there's a submenu */}
        {subMenu && (
          <span>
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414376 10.5315C0.155618 10.855 0.208059 11.3269 0.531506 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
              />
            </svg>
          </span>
        )}
        {/* Render extra elements like avatar and notifications */}
        {extras && <>{extras}</>}
      </div>
    </Link>
    {/* Render sub-menu if it exists */}
    {subMenu && (
      <ul className="sub-menu ml-2.5 mt-[22px] border-l border-success-100 pl-5">
        {subMenu.map((item) => (
          <SubMenuItem key={item.label} href={item.href} label={item.label} />
        ))}
      </ul>
    )}
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
      className="sidebar-wrapper 
   
    block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block"
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
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          {sections.map((section) => (
            <NavSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>

        {/* <UpgradeBanner /> */}

        {/* Sidebar Footer */}
        {/* <div className="copy-write-text">
          <p className="text-sm text-[#969BA0]">© 2023 All Rights Reserved</p>
          <p className="text-sm font-medium text-bgray-700">
            Made with ❤️ by
            <a
              href="https://quomodotheme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b font-semibold hover:text-blue-600"
            >
              {" "}
              QuomodoTheme
            </a>
          </p>
        </div> */}
      </div>
    </aside>
  );
};

// --- The Main Page Component ---
// This is the exported page component that uses the reusable Sidebar.
const Dashboard = () => {
  return (
    <div className="layout-wrapper active w-full">
      <div className="relative flex w-full">
        <Sidebar sections={sidebarSections} />
        {/* You can add the main content of your dashboard page here */}
        <main className="w-full xl:ml-[308px]">
          {/* Example Content */}
          <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard Content Area</h1>
            <p>Your main page content goes here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
