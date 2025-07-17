import {
  Dashboard,
  Download,
  Receipt,
  RestartAlt,
  Settings,
  Upload,
  AddTask,
  FolderOpen,
} from "@mui/icons-material";
import { NavSectionProps } from "./NavSection";

export const sidebarSections: NavSectionProps[] = [
  {
    title: "Core",
    items: [
      {
        label: "Overview",
        href: "/home",
        icon: <Dashboard className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
      },

      {
        label: "Projects View",
        href: "/project-dashboard",
        icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Add Manual Task",
        href: "/manual-task",
        icon: <AddTask className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Billing",
        href: "/billing",
        icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
  {
    title: "Data Management",
    items: [
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
        label: "Reset Data",
        href: "/reset-data",
        icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Jira Settings",
        href: "/jira-settings",
        icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
];
