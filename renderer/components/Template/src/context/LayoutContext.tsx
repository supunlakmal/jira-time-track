
import { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  LayoutTheme,
  LayoutDirection,
  LayoutWidth,
  SideBarType,
  SideBarTheme,
  TopBarTheme,
  LayoutPosition,
} from '../constants/layout';
import { getLayoutConfigs } from '../utils/layout';

const INIT_STATE = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return {
    layoutTheme: (params['layout_theme'] === 'dark') ? LayoutTheme.THEME_DARK : LayoutTheme.THEME_LIGHT,
    layoutDirection: LayoutDirection.LEFT_TO_RIGHT,
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
    topBarTheme: TopBarTheme.TOPBAR_LIGHT,
    sideBarTheme: SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
    sideBarType: SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT,
    layoutPosition: LayoutPosition.POSITION_FIXED,
    showSideBarUserInfo: false,
    isOpenRightSideBar: false,
  };
};

type LayoutState = {
  layoutTheme: string;
  layoutDirection: string;
  layoutWidth: string;
  topBarTheme: string;
  sideBarTheme: string;
  sideBarType: string;
  layoutPosition: string;
  showSideBarUserInfo: boolean;
  isOpenRightSideBar: boolean;
};

type LayoutAction = {
  type: 'CHANGE_LAYOUT_THEME' | 'CHANGE_LAYOUT_DIRECTION' | 'CHANGE_LAYOUT_WIDTH' | 'CHANGE_TOPBAR_THEME' | 'CHANGE_SIDEBAR_THEME' | 'CHANGE_SIDEBAR_TYPE' | 'CHANGE_LAYOUT_POSITION' | 'SHOW_RIGHT_SIDEBAR' | 'HIDE_RIGHT_SIDEBAR';
  payload?: any;
};

const LayoutContext = createContext<LayoutState | any>(null);

const layoutReducer = (state: LayoutState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case 'CHANGE_LAYOUT_THEME':
      return {
        ...state,
        layoutTheme: action.payload,
      };
    case 'CHANGE_LAYOUT_DIRECTION':
      return {
        ...state,
        layoutDirection: action.payload,
      };
    case 'CHANGE_LAYOUT_WIDTH': {
      const layoutConfig = getLayoutConfigs(action.payload! && action.payload);
      return {
        ...state,
        layoutWidth: action.payload,
        ...layoutConfig,
      };
    }
    case 'CHANGE_TOPBAR_THEME':
      return {
        ...state,
        topBarTheme: action.payload,
      };
    case 'CHANGE_SIDEBAR_THEME':
      return {
        ...state,
        sideBarTheme: action.payload,
      };
    case 'CHANGE_SIDEBAR_TYPE':
      return {
        ...state,
        sideBarType: action.payload,
      };
    case 'CHANGE_LAYOUT_POSITION':
      return {
        ...state,
        layoutPosition: action.payload,
      };
    case 'SHOW_RIGHT_SIDEBAR':
      return {
        ...state,
        isOpenRightSideBar: true,
      };
    case 'HIDE_RIGHT_SIDEBAR':
      return {
        ...state,
        isOpenRightSideBar: false,
      };
    default:
      return state;
  }
};

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(layoutReducer, INIT_STATE());

  const changeLayoutTheme = (theme: string) => {
    dispatch({ type: 'CHANGE_LAYOUT_THEME', payload: theme });
  };

  const changeLayoutDirection = (dir: string) => {
    dispatch({ type: 'CHANGE_LAYOUT_DIRECTION', payload: dir });
  };

  const changeLayoutWidth = (width: string) => {
    dispatch({ type: 'CHANGE_LAYOUT_WIDTH', payload: width });
  };

  const changeTopBarTheme = (theme: string) => {
    dispatch({ type: 'CHANGE_TOPBAR_THEME', payload: theme });
  };

  const changeSideBarTheme = (theme: string) => {
    dispatch({ type: 'CHANGE_SIDEBAR_THEME', payload: theme });
  };

  const changeSideBarType = (type: string) => {
    dispatch({ type: 'CHANGE_SIDEBAR_TYPE', payload: type });
  };

  const changeLayoutPosition = (position: string) => {
    dispatch({ type: 'CHANGE_LAYOUT_POSITION', payload: position });
  };

  const showRightSidebar = () => {
    dispatch({ type: 'SHOW_RIGHT_SIDEBAR' });
  };

  const hideRightSidebar = () => {
    dispatch({ type: 'HIDE_RIGHT_SIDEBAR' });
  };

  return (
    <LayoutContext.Provider
      value={{
        ...state,
        changeLayoutTheme,
        changeLayoutDirection,
        changeLayoutWidth,
        changeTopBarTheme,
        changeSideBarTheme,
        changeSideBarType,
        changeLayoutPosition,
        showRightSidebar,
        hideRightSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
