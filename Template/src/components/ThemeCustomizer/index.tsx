
// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { changeLayoutDirection, changeLayoutPosition, changeLayoutTheme, changeLayoutWidth, changeSideBarTheme, changeSideBarType, changeTopBarTheme } from "../../redux/actions";

// constants
import * as layoutConstants from "../../constants/layout";
import LayoutTheme from "./LayoutTheme";
import LayoutDirection from "./LayoutDirection";
import LayoutWidth from "./LayoutWidth";
import SideBarType from "./SideBarType";
import SideBarTheme from "./SideBarTheme";
import TopBarTheme from "./TopBarTheme";
import LayoutPosition from "./LayoutPosition";
import SimpleBar from "simplebar-react";

interface ThemeCustomizerProps {
  handleRightSideBar: () => void;
}

const ThemeCustomizer = ({ handleRightSideBar }: ThemeCustomizerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    layoutTheme,
    layoutDirection,
    layoutWidth,
    topBarTheme,
    sideBarTheme,
    sideBarType,
    layoutPosition,
  } = useSelector((state: RootState) => ({
    layoutTheme: state.Layout.layoutTheme,
    layoutDirection: state.Layout.layoutDirection,
    layoutWidth: state.Layout.layoutWidth,
    topBarTheme: state.Layout.topBarTheme,
    sideBarTheme: state.Layout.sideBarTheme,
    sideBarType: state.Layout.sideBarType,
    layoutPosition: state.Layout.layoutPosition,
    isOpenRightSideBar: state.Layout.isOpenRightSideBar,
  }));

  /**
   * Changes the layout theme
   */
  const handleChangeLayoutTheme = (value: string) => {
    switch (value) {
      case 'dark':
        dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_DARK));
        break;
      default: dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_LIGHT));
        break;
    }
  }

  /**
   * Changes the layout direction
   */
  const handleChangeLayoutDirection = (value: string) => {
    switch (value) {
      case 'rtl':
        dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.RIGHT_TO_LEFT));
        break;
      default: dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.LEFT_TO_RIGHT));
        break;
    }
  }

  /**
   * Changes the layout width
   */
  const handleChangeLayoutWidth = (value: string) => {
    switch (value) {
      case 'boxed':
        dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_BOXED));
        break;
      default:
        dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID));
        break;
    }
  }

  /**
   * Changes the topbar theme
   */
  const handleChangeTopBarTheme = (value: string) => {
    switch (value) {
      case 'dark':
        dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_DARK));
        break;
      case 'brand':
        dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_BRAND));
        break;
      case 'gradient':
        dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_GRADIENT));
        break;
      default:
        dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_LIGHT));
        break;
    }
  }

  /**
   * Changes the left sidebar theme
   */
  const handleChangeSideBarTheme = (value: string) => {
    switch (value) {
      case 'dark':
        dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK));
        break;
      case 'brand':
        dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_BRAND));
        break;
      case 'gradient':
        dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT));
        break;
      default:
        dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT));
        break;
    }
  };

  /**
   * Changes the left sidebar type
   */
  const handleChangeSideBarType = (value: string) => {
    switch (value) {
      case 'hover':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVER));
        break;
      case 'hover-active':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE));
        break;
      case 'sm':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_SMALL));
        break;
      case 'md':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_COMPACT));
        break;
      case 'mobile':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_MOBILE));
        break;
      case 'hidden':
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN));
        break;
      default:
        dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT));
        break;
    }
  };

  /**
   * Changes the layout position
   */
  const handleChangeLayoutPosition = (value: string) => {
    switch (value) {
      case 'scrollable':
        dispatch(changeLayoutPosition(layoutConstants.LayoutPosition.POSITION_SCROLLABLE));
        break;
      default:
        dispatch(changeLayoutPosition(layoutConstants.LayoutPosition.POSITION_FIXED));
        break;
    }
  };

  /**
   * Reset Layout
   */
  const reset = () => {
    handleChangeLayoutTheme(layoutConstants.LayoutTheme.THEME_LIGHT);
    handleChangeLayoutDirection(layoutConstants.LayoutDirection.LEFT_TO_RIGHT)
    handleChangeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID);
    handleChangeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_LIGHT);
    handleChangeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
    handleChangeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT);
    handleChangeLayoutPosition(layoutConstants.LayoutPosition.POSITION_FIXED);
  };

  return (
    <>
      <div>

        <div className="h-16 flex items-center text-gray-800 dark:text-white border-b border-dashed border-gray-900/10 dark:border-white/10 px-6 gap-3">
          <h5 className="text-base grow">Theme Settings</h5>
          <button type="button" className="p-2" onClick={reset}><i className="mgc_refresh_1_line text-xl"></i></button>
          <button type="button" onClick={handleRightSideBar}><i className="mgc_close_line text-xl"></i></button>
        </div>

        <SimpleBar className="h-[calc(100vh-64px)]">
          <div className="divide-y divide-dashed divide-slate-900/10  dark:divide-white/10">

            {/* theme */}
            <LayoutTheme
              handleChangeLayoutTheme={handleChangeLayoutTheme}
              layoutTheme={layoutTheme}
              layoutConstants={layoutConstants.LayoutTheme}
            />

            {/* direction */}
            <LayoutDirection
              handleChangeLayoutDirection={handleChangeLayoutDirection}
              layoutDirection={layoutDirection}
              layoutConstants={layoutConstants.LayoutDirection}
            />

            {/* content width */}
            <LayoutWidth
              handleChangeLayoutWidth={handleChangeLayoutWidth}
              layoutWidth={layoutWidth}
              layoutConstants={layoutConstants.LayoutWidth}
            />

            {/* sidenav type */}
            <SideBarType
              handleChangeSideBarType={handleChangeSideBarType}
              sideBarType={sideBarType}
              layoutConstants={layoutConstants.SideBarType}
            />

            {/* menu color */}
            <SideBarTheme
              handleChangeSideBarTheme={handleChangeSideBarTheme}
              sideBarTheme={sideBarTheme}
              layoutConstants={layoutConstants.SideBarTheme}
            />

            {/* topbar color */}
            <TopBarTheme
              handleChangeTopBarTheme={handleChangeTopBarTheme}
              topBarTheme={topBarTheme}
              layoutConstants={layoutConstants.TopBarTheme}
            />

            {/* layout position */}
            <LayoutPosition
              handleChangeLayoutPosition={handleChangeLayoutPosition}
              layoutPosition={layoutPosition}
              layoutConstants={layoutConstants.LayoutPosition}
            />

          </div>
        </SimpleBar>
      </div>
    </>
  )
}

export default ThemeCustomizer