// /components/Header.js

"use client";

import {
  DarkMode,
  KeyboardArrowDown,
  LightMode,
  PictureInPicture,
  Search,
  ZoomIn,
  ZoomOut,
  ZoomInMap,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef } from "react";

interface HeaderProps {
  toggleFloatingWindow?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleFloatingWindow }) => {
  // Ref to the main wrapper for handling "click outside"
  const quickAccessRef = useRef(null);

  // Placeholder for theme toggle functionality
  // In a real app, you'd use a library like next-themes
  const handleThemeToggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className=" z-30 w-full block ">
      <div className=" flex h-[108px] w-full items-center justify-between bg-white px-10 dark:bg-darkblack-600 2xl:px-[76px]">
        {/* Page Title */}
        <div>
          <h3 className="text-xl font-bold text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
            Dashboard
          </h3>
          <p className="text-xs font-medium text-bgray-600 dark:text-bgray-50 lg:text-sm lg:leading-[25.2px]">
            Let’s check your update today
          </p>
        </div>

        {/* Search Bar */}
        {/* <div className="searchbar-wrapper">
          <div className="px flex h-[56px] w-[300px] items-center justify-between rounded-lg border border-transparent bg-bgray-50 px-4 focus-within:border-success-300 dark:bg-darkblack-500 lg:w-[400px]">
            <div className="flex w-full items-center space-x-3.5">
              <span>
                <Search
                  className="text-bgray-900 dark:text-bgray-50"
                  fontSize="small"
                />
              </span>
              <label htmlFor="search" className="w-full">
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  className="search-input w-full border-none bg-bgray-50 bg-none px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-semibold focus:outline-none focus:ring-0 dark:bg-darkblack-500 dark:placeholder:text-bgray-500"
                />
              </label>
            </div>
          </div>
        </div> */}

        {/* Quick Access Buttons and Profile */}
        <div className="quick-access-wrapper relative" ref={quickAccessRef}>
          <div className="flex items-center space-x-[43px]">
            <div className=" items-center space-x-5 flex">
              {/* Floating Timer Toggle */}
              {toggleFloatingWindow && (
                <button
                  onClick={toggleFloatingWindow}
                  type="button"
                  className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-success-300 dark:border-darkblack-400 hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                  title="Toggle Floating Timer"
                >
                  <PictureInPicture className="text-bgray-900 dark:text-bgray-50" />
                </button>
              )}

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 border border-success-300 dark:border-darkblack-400 rounded-[12px] p-1 bg-white dark:bg-darkblack-600">
                <button
                  onClick={() => window.ipc?.zoom?.out()}
                  type="button"
                  className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[8px] hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                  title="Zoom out (Ctrl+-)"
                >
                  <ZoomOut
                    className="text-bgray-900 dark:text-bgray-50"
                    fontSize="small"
                  />
                </button>
                <button
                  onClick={() => window.ipc?.zoom?.reset()}
                  type="button"
                  className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[8px] hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                  title="Reset zoom (Ctrl+0)"
                >
                  <ZoomInMap
                    className="text-bgray-900 dark:text-bgray-50"
                    fontSize="small"
                  />
                </button>
                <button
                  onClick={() => window.ipc?.zoom?.in()}
                  type="button"
                  className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[8px] hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                  title="Zoom in (Ctrl+=)"
                >
                  <ZoomIn
                    className="text-bgray-900 dark:text-bgray-50"
                    fontSize="small"
                  />
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                type="button"
                className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-success-300 dark:border-darkblack-400 hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                title="Toggle Theme"
              >
                <span className="block dark:hidden">
                  <DarkMode className="text-bgray-900" />
                </span>
                <span className="hidden dark:block">
                  <LightMode className="text-bgray-50" />
                </span>
              </button>
            </div>
            {/* <div className="hidden h-[48px] w-[1px] bg-bgray-300 dark:bg-darkblack-400 xl:block"></div> */}

            {/* Author/Profile Area */}
            <div className="flex cursor-pointer items-center space-x-0 lg:space-x-3">
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  border: "1px solid",
                  borderColor: "var(--tw-colors-bgray-300)",
                  borderRadius: "12px",
                }}
                alt="avatar"
              />
              <div className="hidden 2xl:block">
                <div className="flex items-center space-x-2.5">
                  <h3 className="text-base font-bold leading-[28px] text-bgray-900 dark:text-white">
                    Free User 3.0
                  </h3>
                  <span>
                    <KeyboardArrowDown className="text-bgray-900 dark:text-white" />
                  </span>
                </div>
                <p className="text-sm font-medium leading-[20px] text-bgray-600 dark:text-bgray-50">
                  Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
