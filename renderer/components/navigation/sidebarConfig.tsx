import {
  AddTask,
  Download,
  Receipt,
  RestartAlt,
  Settings,
  Upload,
} from "@mui/icons-material";
import { NavSectionProps } from "./NavSection";

export const sidebarSections: NavSectionProps[] = [
  {
    title: "Menu",
    items: [
      {
        label: "Dashboard",
        href: "/home",
        icon: <AddTask className="text-bgray-600 dark:text-bgray-300" />,
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
      {
        label: "Jira Setting",
        href: "/jira-settings",
        icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
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
        label: "Reset Data",
        href: "/reset-data",
        icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
];
