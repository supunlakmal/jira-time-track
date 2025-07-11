// app constants
import { SideBarType, LayoutWidth } from "../constants/layout";

interface ConfigTypes {
  leftSideBarTypes:
  | SideBarType.LEFT_SIDEBAR_TYPE_COMPACT
  | SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT
  | SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN
  | SideBarType.LEFT_SIDEBAR_TYPE_HOVER
  | SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE
  | SideBarType.LEFT_SIDEBAR_TYPE_MOBILE
  | SideBarType.LEFT_SIDEBAR_TYPE_SMALL
}

const getLayoutConfigs = (layoutWidth: string) => {
  // add property to change in particular layoutWidth
  const config: ConfigTypes = {
    leftSideBarTypes: SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT,
  };

  switch (layoutWidth) {
    case LayoutWidth.LAYOUT_WIDTH_FLUID:
      config.leftSideBarTypes = SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT;
      break;
    case LayoutWidth.LAYOUT_WIDTH_BOXED:
      config.leftSideBarTypes = SideBarType.LEFT_SIDEBAR_TYPE_SMALL
      break;
    default:
      return config;
  }
  return config;
};

/**
 * Changes the HTML attributes
 */
const changeHTMLAttribute = (attribute: string, value: string): void => {
  if (document.body)
    document.getElementsByTagName("html")[0].setAttribute(attribute, value);
};

export { getLayoutConfigs, changeHTMLAttribute };
