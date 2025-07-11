// constants
import {
  LayoutTheme,
  LayoutDirection,
  LayoutWidth,
  TopBarTheme,
  SideBarTheme,
  SideBarType,
  LayoutPosition,
} from "../../constants/layout";

enum LayoutActionTypes {
  CHANGE_LAYOUT_THEME = "@@layout/CHANGE_LAYOUT_THEME",
  CHANGE_LAYOUT_DIRECTION = "@@layout/CHANGE_LAYOUT_DIRECTION",
  CHANGE_LAYOUT_WIDTH = "@@layout/CHANGE_LAYOUT_WIDTH",
  CHANGE_TOPBAR_THEME = "@@layout/CHANGE_TOPBAR_THEME",
  CHANGE_SIDEBAR_THEME = "@@layout/CHANGE_SIDEBAR_THEME",
  CHANGE_SIDEBAR_TYPE = "@@layout/CHANGE_SIDEBAR_TYPE",
  CHANGE_LAYOUT_POSITION = "@@layout/CHANGE_LAYOUT_POSITION",
  SHOW_RIGHT_SIDEBAR = "@@layout/SHOW_RIGHT_SIDEBAR",
  HIDE_RIGHT_SIDEBAR = "@@layout/HIDE_RIGHT_SIDEBAR",
}

export interface LayoutStateTypes {
  layoutTheme:
  | LayoutTheme.THEME_LIGHT
  | LayoutTheme.THEME_DARK;
  layoutDirection:
  | LayoutDirection.LEFT_TO_RIGHT
  | LayoutDirection.RIGHT_TO_LEFT;
  layoutWidth:
  | LayoutWidth.LAYOUT_WIDTH_FLUID
  | LayoutWidth.LAYOUT_WIDTH_BOXED;
  topBarTheme:
  | TopBarTheme.TOPBAR_LIGHT
  | TopBarTheme.TOPBAR_DARK
  | TopBarTheme.TOPBAR_BRAND
  | TopBarTheme.TOPBAR_GRADIENT;
  sideBarTheme:
  | SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT
  | SideBarTheme.LEFT_SIDEBAR_THEME_DARK
  | SideBarTheme.LEFT_SIDEBAR_THEME_BRAND
  | SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT;
  sideBarType:
  | SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT
  | SideBarType.LEFT_SIDEBAR_TYPE_HOVER
  | SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE
  | SideBarType.LEFT_SIDEBAR_TYPE_SMALL
  | SideBarType.LEFT_SIDEBAR_TYPE_COMPACT
  | SideBarType.LEFT_SIDEBAR_TYPE_MOBILE
  | SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN;
  layoutPosition:
  | LayoutPosition.POSITION_FIXED
  | LayoutPosition.POSITION_SCROLLABLE;
  isOpenRightSideBar: boolean;
}

export { LayoutActionTypes };
