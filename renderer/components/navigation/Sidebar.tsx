import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavSection, { NavSectionProps } from "./NavSection";

export interface SidebarProps {
  sections: NavSectionProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  return (
    <aside className="block h-full w-[308px] bg-white dark:bg-darkblack-600">
      {/* Sidebar Header */}
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <Link href="/">
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
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full pb-[200px] pl-[48px] pt-[14px]">
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

export default Sidebar;