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
        label: "Add Manual Task",
        href: "/a-2",
        icon: <AddTask className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Billing",
        href: "/a-3",
        icon: <Receipt className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Jira Setting",
        href: "/a-4",
        icon: <Settings className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Import CSV",
        href: "/a-5",
        icon: <Upload className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Export Data",
        href: "/a-6",
        icon: <Download className="text-bgray-600 dark:text-bgray-300" />,
      },
      {
        label: "Reset Data",
        href: "/a-7",
        icon: <RestartAlt className="text-bgray-600 dark:text-bgray-300" />,
      },
    ],
  },
];
