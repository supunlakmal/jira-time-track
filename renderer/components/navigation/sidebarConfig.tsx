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

export const sidebarSections: {
  label: string;
  href: string;
  icon: ReactElement;
  isActive: boolean;
}[] = [
  {
    isActive: true,
    label: "Projects",
    href: "/home",
    icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    isActive: false,
    label: "Billing",
    href: "/billing",
    icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    isActive: false,
    label: "Import CSV",
    href: "/import-csv",
    icon: <Upload className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    isActive: false,
    label: "Export Data",
    href: "/export-data",
    icon: <Download className="text-bgray-600 dark:text-bgray-300" />,
  },

  {
    isActive: false,
    label: "Jira Settings",
    href: "/jira-settings",
    icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    isActive: false,
    label: "Redux Data",
    href: "/redux-data",
    icon: <DataObject className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    isActive: false,
    label: "Store Data",
    href: "/store-data",
    icon: <Storage className="text-bgray-600 dark:text-bgray-300" />,
  },
  {
    isActive: false,
    label: "Reset Data",
    href: "/reset-data",
    icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
  },
];
