import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { shouldShowNavItem } from "./navigationUtils";

export interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  subMenu?: React.ReactNode;
  extras?: React.ReactNode;
  visibleOnPaths?: string[];
  hiddenOnPaths?: string[];
  visibilityCondition?: (currentPath: string) => boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  icon, 
  label, 
  subMenu, 
  extras, 
  visibleOnPaths, 
  hiddenOnPaths, 
  visibilityCondition 
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  
  // Check if item should be visible based on path rules
  const isVisible = shouldShowNavItem(
    router.pathname,
    visibleOnPaths,
    hiddenOnPaths,
    visibilityCondition
  );

  // Don't render if item should be hidden
  if (!isVisible) {
    return null;
  }

  return (
    <li className="item py-[11px] text-bgray-900 dark:text-white">
      <Link href={href}>
        <div className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 hover:bg-bgray-100 dark:hover:bg-darkblack-500 ${
          isActive 
            ? 'bg-success-50 border-l-4 border-success-300 text-success-700 dark:bg-success-900/20 dark:border-success-500 dark:text-success-400' 
            : ''
        }`}>
          <div className="flex items-center space-x-2.5">
            <span className={`item-ico transition-colors duration-200 ${
              isActive 
                ? 'text-success-600 dark:text-success-400' 
                : 'text-bgray-600 dark:text-bgray-300'
            }`}>
              {icon}
            </span>
            <span className={`item-text text-lg font-medium leading-none transition-colors duration-200 ${
              isActive 
                ? 'text-success-700 dark:text-success-400' 
                : ''
            }`}>
              {label}
            </span>
          </div>
          {extras && <>{extras}</>}
        </div>
      </Link>
    </li>
  );
};

export default NavItem;