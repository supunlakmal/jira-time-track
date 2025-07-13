import React from "react";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import { getMenuItems } from "../helpers/menu";

// constants
import AppMenu from "./Menu";
import * as LayoutConstants from "../constants/layout";

// store
import { useLayout } from "../context/LayoutContext";

// images
import logoLight from '../assets/images/logo-light.png'
import logoDark from '../assets/images/logo-dark.png'
import logoSm from '../assets/images/logo-sm.png'
import Image from 'next/image';

/* Sidebar content */
const SideBarContent = () => {
  return (
    <AppMenu menuItems={getMenuItems()} />
  )
}

interface LeftSideBarProps {
  isCondensed: boolean;
  isLight?: boolean;
  hideLogo?: boolean;
}

const HoverMenuToggler = () => {
  const { sideBarType, changeSideBarType } = useLayout();

  function toggleHoverMenu() {
    if (sideBarType === LayoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVER) {
      changeSideBarType(LayoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE);
    }
    else if (sideBarType === LayoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE) {
      changeSideBarType(LayoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVER);
    }
  }

  return (
    <button
      id="button-hover-toggle"
      className="absolute top-5 end-2 rounded-full p-1.5"
      onClick={toggleHoverMenu}
    >
      <span className="sr-only">Menu Toggle Button</span>
      <i className="mgc_round_line text-xl"></i>
    </button>
  )
}


const LeftSideBar = ({ isCondensed, hideLogo }: LeftSideBarProps) => {

  return (
    <React.Fragment>
      <div className="app-menu">
        <Link href="/" className="logo-box">
          <div className="logo-light">
            <Image src={logoLight} className="logo-lg h-6" alt="Light logo" />
            <Image src={logoSm} className="logo-sm" alt="Small logo" />
          </div>
          <div className="logo-dark">
            <Image src={logoDark} className="logo-lg h-6" alt="Dark logo" />
            <Image src={logoSm} className="logo-sm" alt="Small logo" />
          </div>
        </Link>

        <HoverMenuToggler />

        <SimpleBar
          className="srcollbar"
          id='leftside-menu-container'
        >
          <SideBarContent />

          <div className="my-10 mx-5">
            <div className="help-box p-6 bg-black/5 text-center rounded-md">
              <div className="flex justify-center mb-4">
                <svg width="30" height="18" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 0c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.141.285 1.957 1.113 2.86 2.03C17.08 7.271 18.782 9 22.5 9c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.141-.285-1.957-1.113-2.86-2.03C20.42 1.728 18.718 0 15 0ZM7.5 9C3.5 9 1 11 0 15c1.5-2 3.25-2.75 5.25-2.25 1.141.285 1.957 1.113 2.86 2.03C9.58 16.271 11.282 18 15 18c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.141-.285-1.957-1.113-2.86-2.03C12.92 10.729 11.218 9 7.5 9Z" fill="#38BDF8"></path>
                </svg>
              </div>
              <h5 className="mb-2">Unlimited Access</h5>
              <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
              <a href="" className="btn btn-sm bg-secondary text-white">Upgrade</a>
            </div>
          </div>
        </SimpleBar>
      </div>
    </React.Fragment>
  )
}

export default LeftSideBar;