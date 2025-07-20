import React from "react";
import NavItem, { NavItemProps } from "./NavItem";

export interface NavSectionProps {
  title: string;
  items: NavItemProps[];
}

const NavSection: React.FC<NavSectionProps> = ({ title, items }) => (
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

export default NavSection;