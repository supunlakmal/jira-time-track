import {
  DataObject,
  Download,
  FolderOpen,
  Receipt,
  RestartAlt,
  Settings,
  Storage,
  Upload,
} from "@mui/icons-material";
import { ReactElement } from "react";

// Example configurations for path-based visibility:
// - visibleOnPaths: ['/', '/home'] - Only show on these exact paths
// - hiddenOnPaths: ['/login'] - Hide on these paths
// - visibilityCondition: (path) => path.startsWith('/admin') - Custom logic

export const sidebarSections: {
  label: string;
  href: string;
  icon: ReactElement;
}[] = [
  {
    label: "Projects",
    href: "/home",
    icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    label: "Billing",
    href: "/billing",
    icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    label: "Import CSV",
    href: "/import-csv",
    icon: <Upload className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    label: "Export Data",
    href: "/export-data",
    icon: <Download className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    label: "Jira Settings",
    href: "/jira-settings",
    icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    label: "Redux Data",
    href: "/redux-data",
    icon: <DataObject className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    label: "Store Data",
    href: "/store-data",
    icon: <Storage className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    label: "Reset Data",
    href: "/reset-data",
    icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
  },
];
