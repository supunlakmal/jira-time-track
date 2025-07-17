import Link from "next/link";
import React from "react";

export interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  subMenu?: React.ReactNode;
  extras?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, subMenu, extras }) => (
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

export default NavItem;