/* Layout types and other constants */

export enum LayoutTheme {
  THEME_LIGHT = "light",
  THEME_DARK = "dark",
}

export enum LayoutDirection {
  LEFT_TO_RIGHT = 'ltr',
  RIGHT_TO_LEFT = 'rtl'
}

export enum LayoutWidth {
  LAYOUT_WIDTH_FLUID = "default",
  LAYOUT_WIDTH_BOXED = "boxed",
}

export enum SideBarType {
  LEFT_SIDEBAR_TYPE_DEFAULT = "default",
  LEFT_SIDEBAR_TYPE_HOVER = "hover",
  LEFT_SIDEBAR_TYPE_HOVERACTIVE = "hover-active",
  LEFT_SIDEBAR_TYPE_SMALL = "sm",
  LEFT_SIDEBAR_TYPE_COMPACT = "md",
  LEFT_SIDEBAR_TYPE_MOBILE = "mobile",
  LEFT_SIDEBAR_TYPE_HIDDEN = "hidden",
}

export enum SideBarTheme {
  LEFT_SIDEBAR_THEME_LIGHT = "light",
  LEFT_SIDEBAR_THEME_DARK = "dark",
  LEFT_SIDEBAR_THEME_BRAND = "brand",
  LEFT_SIDEBAR_THEME_GRADIENT = "gradient",
}

export enum TopBarTheme {
  TOPBAR_LIGHT = "light",
  TOPBAR_DARK = "dark",
  TOPBAR_BRAND = "brand",
  TOPBAR_GRADIENT = "gradient",
}

export enum LayoutPosition {
  POSITION_FIXED = "fixed",
  POSITION_SCROLLABLE = "scrollable",
}
