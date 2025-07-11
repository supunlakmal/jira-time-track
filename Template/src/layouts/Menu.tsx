import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// import { Collapse } from 'react-bootstrap';

// helpers
import { findAllParent, findMenuItem } from '../helpers/menu';

// constants
import { MenuItemTypes } from '../constants/menu'
import { SimpleCollapse } from '../components/FrostUI';

interface SubMenus {
  item: MenuItemTypes;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  className?: string;
}

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu, }: SubMenus) => {

  const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className='menu-item'>
      <Link
        to='#'
        className={`${linkClassName} ${(activeMenuItems!.includes(item.key) && open) ? 'open' : ''}`}
        aria-expanded={open}
        data-menu-key={item.key}
        onClick={toggleMenuItem}
      >
        {item.icon && (
          <span className='menu-icon'>
            <i className={item.icon} />
          </span>
        )}
        <span className='menu-text'> {item.label} </span>
        <span className='menu-arrow' />
      </Link>
      <SimpleCollapse open={open} as="ul" classNames={subMenuClassNames}>
        {(item.children || []).map((child, idx) => {
          return (
            <React.Fragment key={idx}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  linkClassName={activeMenuItems!.includes(child.key) ? " active" : ""}
                  activeMenuItems={activeMenuItems}
                  subMenuClassNames=''
                  toggleMenu={toggleMenu}
                />
              ) : (
                <MenuItem
                  item={child}
                  className='menu-item'
                  linkClassName={`menu-link ${(activeMenuItems!.includes(child.key)) ? " active" : ""}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </SimpleCollapse>
    </li>
  );
};

const MenuItem = ({ item, linkClassName }: SubMenus) => {
  return (
    <li className={'menu-item'}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      to={item.url!}
      target={item.target}
      className={`side-nav-link-ref ${className}`}
      data-menu-key={item.key}
    >
      {item.icon && (
        <span className='menu-icon'>
          <i className={item.icon} />
        </span>
      )}
      <span className='menu-text'>{item.label}</span>
    </Link>
  )
}

/**
 * Renders the application menu
 */
interface AppMenuProps {
  menuItems: MenuItemTypes[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation();

  const menuRef = useRef(null);

  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  /**
   * toggle the menus
   */
  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) {
      setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem),]);
    }
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById("main-side-menu");
    let matchingMenuItem: HTMLElement | null = null;

    if (div) {
      const items: any = div.getElementsByClassName("side-nav-link-ref");
      for (let i = 0; i < items.length; ++i) {
        let trimmedURL = location?.pathname?.replaceAll(process.env.PUBLIC_URL || '', '');
        const url = items[i].pathname;
        if (trimmedURL === process.env.PUBLIC_URL + "/") {
          trimmedURL += "dashboard"
        }
        if (trimmedURL === url?.replaceAll(process.env.PUBLIC_URL, "")) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key");
        const activeMt = findMenuItem(menuItems, mid as any);
        if (activeMt) {
          setActiveMenuItems([activeMt["key"], ...findAllParent(menuItems, activeMt),]);
        }

        setTimeout(function () {
          const activatedItem = matchingMenuItem!;
          if (activatedItem != null) {
            const simplebarContent = document.querySelector('#leftside-menu-container .simplebar-content-wrapper');
            const offset = activatedItem!.offsetTop - 300;
            if (simplebarContent && offset > 100) {
              scrollTo(simplebarContent, offset, 600);
            }
          }
        }, 200);

        // scrollTo (Left Side Bar Active Menu)
        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        const scrollTo = (element: any, to: any, duration: any) => {
          const start = element.scrollTop, change = to - start, increment = 20;
          let currentTime = 0;
          const animateScroll = function () {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
          };
          animateScroll();
        }
      }
    }
  }, [location, menuItems]);

  useEffect(() => {
    activeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul
        className='menu'
        ref={menuRef}
        id='main-side-menu'
      >
        {(menuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item.isTitle ? (<li className='menu-title'>
                {item.label}
              </li>) : (<>
                {item.children ? (
                  <MenuItemWithChildren
                    item={item}
                    toggleMenu={toggleMenu}
                    subMenuClassNames='sub-menu'
                    activeMenuItems={activeMenuItems}
                    linkClassName={`menu-link ${(activeMenuItems!.includes(item.key)) ? 'active' : ''}`}
                  />
                ) : (
                  <MenuItem
                    item={item}
                    linkClassName={`menu-link ${(activeMenuItems!.includes(item.key)) ? 'active' : ''}`}
                  />
                )}
              </>)}
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}

export default AppMenu
