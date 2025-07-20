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
import { NavSectionProps } from "./NavSection";

// Example configurations for path-based visibility:
// - visibleOnPaths: ['/', '/home'] - Only show on these exact paths
// - hiddenOnPaths: ['/login'] - Hide on these paths
// - visibilityCondition: (path) => path.startsWith('/admin') - Custom logic

export const sidebarSections: NavSectionProps[] = [
  {
    title: "Core",
    items: [
      // {
      //   label: "Overview",
      //   href: "/home",
      //   icon: <Dashboard className="text-bgray-600 dark:text-bgray-300" />,
      // },
      {
        label: "Projects",
        href: "/home",
        icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/home"],
      },

      // {
      //   label: "Projects View",
      //   href: "/project-dashboard",
      //   icon: <FolderOpen className="text-bgray-600 dark:text-bgray-300" />,
      // },
      // {
      //   label: "Add Manual Task",
      //   href: "/manual-task",
      //   icon: <AddTask className="text-bgray-600 dark:text-bgray-300" />,
      // },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        label: "Billing",
        href: "/billing",
        icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/project-overview"],
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
        visibleOnPaths: ["/project-overview"],
      },
      {
        label: "Export Data",
        href: "/export-data",
        icon: <Download className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/project-overview"],
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
        visibleOnPaths: ["/home"],
      },
      {
        label: "Redux Data",
        href: "/redux-data",
        icon: <DataObject className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/home"],
      },
      {
        label: "Store Data",
        href: "/store-data",
        icon: <Storage className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/home"],
      },
      {
        label: "Reset Data",
        href: "/reset-data",
        icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
        visibleOnPaths: ["/home"],
      },
    ],
  },
];
