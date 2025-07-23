import Link from "next/link";
import React from "react";

//================================================================//
// 1. MATERIAL-UI ICON IMPORTS
//================================================================//

import Image from "next/image";
import { sidebarSections } from "./sidebarConfig";

//================================================================//
// 2. REUSABLE SUB-COMPONENTS
//================================================================//

/**
 * Navigation Item Component
 */
const NavItem = ({ href, icon, children, isActive }) => {
  const activeClasses = "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  const inactiveClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";
  const iconActiveClasses = "text-blue-700 dark:text-blue-300";
  const iconInactiveClasses = "text-gray-500 dark:text-gray-400";

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {icon &&
        React.cloneElement(icon, {
          className: `h-5 w-5 mr-3 ${
            isActive ? iconActiveClasses : iconInactiveClasses
          }`,
          "aria-hidden": "true",
        })}
      {children}
    </Link>
  );
};

//================================================================//
// 4. MAIN SIDEBAR COMPONENT
//================================================================//

const Sidebar = () => {
  return (
    <div className=" inset-y-0 left-0 z-50 w-64 bg-white dark:bg-darkblack-500 border-r border-gray-200 dark:border-gray-700 transition-transform duration-500 ease-in-out lg:translate-x-0 lg:w-64 overflow-y-auto -translate-x-full">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            className="block"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
          <nav className="space-y-1 mb-6">
            {sidebarSections.map((item) => (
              <NavItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                isActive={true}
              >
                {item.label}
              </NavItem>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
