import Link from "next/link";
import React from "react";

/**
 * Navigation Item Component
 */
const NavItem = ({ href, icon, children, isActive }) => {
  const activeClasses =
    "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  const inactiveClasses =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";
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

export default NavItem;
