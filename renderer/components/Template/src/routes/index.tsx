/* eslint-disable react-refresh/only-export-components */
import React from "react";

// lazy load all the views

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const RecoverPassword = React.lazy(() => import("../pages/auth/RecoverPassword"));
const LockScreen = React.lazy(() => import("../pages/auth/LockScreen"));

// dashboard
const Dashboard = React.lazy(() => import("../pages/dashboard/"));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const FileManagerApp = React.lazy(() => import('../pages/apps/FileManager'));
const KanbanApp = React.lazy(() => import('../pages/apps/Kanban'));
const ProjectCreate = React.lazy(() => import('../pages/apps/Project/Create'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));

// extra pages
const Starter = React.lazy(() => import('../pages/extra/Starter'));
const Timeline = React.lazy(() => import('../pages/extra/TimeLine'));
const Invoice = React.lazy(() => import('../pages/extra/Invoice'));
const Gallery = React.lazy(() => import('../pages/extra/Gallery'));
const FAQs = React.lazy(() => import('../pages/extra/FAQs'));
const Pricing = React.lazy(() => import('../pages/extra/Pricing'));

// error pages
const Maintenance = React.lazy(() => import('../pages/error/Maintenance'));
const ComingSoon = React.lazy(() => import('../pages/error/ComingSoon'));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));

// base ui
const Accordions = React.lazy(() => import('../pages/ui/Accordions'));
const Alerts = React.lazy(() => import('../pages/ui/Alerts'));
const Avatars = React.lazy(() => import('../pages/ui/Avatars'));
const Buttons = React.lazy(() => import('../pages/ui/Buttons'));
const Badges = React.lazy(() => import('../pages/ui/Badges'));
const Breadcrumb = React.lazy(() => import('../pages/ui/Breadcrumb'));
const Cards = React.lazy(() => import('../pages/ui/Cards'));
const Collapse = React.lazy(() => import('../pages/ui/Collapse'));
const Dismissible = React.lazy(() => import('../pages/ui/Dismissible'));
const Dropdowns = React.lazy(() => import('../pages/ui/Dropdowns'));
const Progress = React.lazy(() => import('../pages/ui/Progress'));
const Skeleton = React.lazy(() => import('../pages/ui/Skeleton'));
const Spinners = React.lazy(() => import('../pages/ui/Spinners'));
const ListGroup = React.lazy(() => import('../pages/ui/ListGroup'));
const Ratio = React.lazy(() => import('../pages/ui/Ratio'));
const Tabs = React.lazy(() => import('../pages/ui/Tabs'));
const Modals = React.lazy(() => import('../pages/ui/Modals'));
const Offcanvas = React.lazy(() => import('../pages/ui/Offcanvas'));
const Popovers = React.lazy(() => import('../pages/ui/Popovers'));
const Tooltips = React.lazy(() => import('../pages/ui/Tooltips'));
const Typography = React.lazy(() => import('../pages/ui/Typography'));

// extended ui
const Swiper = React.lazy(() => import('../pages/extended/Swiper'));
const NestableList = React.lazy(() => import('../pages/extended/NestableList'));
const Ratings = React.lazy(() => import('../pages/extended/Ratings'));
const Animation = React.lazy(() => import('../pages/extended/Animation'));
const Player = React.lazy(() => import('../pages/extended/Player'));
const Scrollbar = React.lazy(() => import('../pages/extended/Scrollbar'));
const SweetAlert = React.lazy(() => import('../pages/extended/SweetAlert'));
const TourPage = React.lazy(() => import('../pages/extended/TourPage'));
const TippyTooltip = React.lazy(() => import('../pages/extended/TippyTooltip'));
const Lightbox = React.lazy(() => import('../pages/extended/Lightbox'));

// forms
const FormElements = React.lazy(() => import('../pages/forms/FormElements'));
const FormSelect = React.lazy(() => import('../pages/forms/Select'));
const Range = React.lazy(() => import('../pages/forms/Range'));
const Pickers = React.lazy(() => import('../pages/forms/Pickers'));
const Masks = React.lazy(() => import('../pages/forms/Masks'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));
const FileUploads = React.lazy(() => import('../pages/forms/FileUploads'));
const Validation = React.lazy(() => import('../pages/forms/Validation'));
const FormLayout = React.lazy(() => import('../pages/forms/FormLayout'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/BasicTables'));
const DataTables = React.lazy(() => import('../pages/tables/DataTables'));

// icons
const MingCuteIcons = React.lazy(() => import('../pages/ui/icons/MingCuteIcons'));
const FeatherIcons = React.lazy(() => import('../pages/ui/icons/FeatherIcons'));
const MaterialSymbolIcons = React.lazy(() => import('../pages/ui/icons/MaterialSymbolIcons'));

// chart
const Chart = React.lazy(() => import('../pages/ui/Chart'));

// maps
const VectorMaps = React.lazy(() => import('../pages/ui/maps/VectorMaps'));
const GoogleMaps = React.lazy(() => import('../pages/ui/maps/GoogleMaps'));

export interface RoutesProps {
  path: string;
  name?: string;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards
const dashboardRoutes: RoutesProps = {
  path: "/home",
  name: "Dashboards",
  icon: "home",
  header: "Navigation",
  children: [
    {
      path: "/",
      name: "Root",
    },
    {
      path: '/dashboard',
      name: "Dashboard",
    },
  ],
};

// Apps
const calendarAppRoutes: RoutesProps = {
  path: "/apps/calendar",
  name: "Calendar",
  roles: ["Admin"],
  icon: "calendar",
  header: "Apps",
};

const ticketsAppRoutes: RoutesProps = {
  path: "/apps/tickets",
  name: "Tickets",
  roles: ["Admin"],
  icon: "tickets",
  header: "Apps",
};

const fileAppRoutes: RoutesProps = {
  path: "/apps/file-manager",
  name: "File Manager",
  roles: ["Admin"],
  icon: "filemanager",
  header: "Apps",
};

const kanbanAppRoutes: RoutesProps = {
  path: "/apps/kanban",
  name: "Kanban Board",
  roles: ["Admin"],
  icon: "kanban",
  header: "Apps",
};

const projectAppRoutes: RoutesProps = {
  path: "/apps/project",
  name: "Project",
  roles: ["Admin"],
  icon: "project",
  children: [
    {
      path: '/apps/project/list',
      name: 'ProjectList',
    },
    {
      path: '/apps/project/detail',
      name: 'ProjectDetail',
    },
    {
      path: '/apps/project/create',
      name: 'ProjectCreate',
    },
  ]
};

const appRoutes = [calendarAppRoutes, ticketsAppRoutes, projectAppRoutes, kanbanAppRoutes, fileAppRoutes];

// pages
const customPagesRoutes = {
  path: "/pages",
  name: "Pages",
  icon: "pages",
  header: "Custom",
  children: [
    {
      path: "/pages/starter",
      name: "Starter",
    },
    {
      path: "/pages/timeline",
      name: "Timeline",
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
    },
    {
      path: "/pages/gallery",
      name: "Gallery",
    },
    {
      path: "/pages/faqs",
      name: "FAQs",
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
    },
    {
      path: "/error-404-alt",
      name: "Error - 404-alt",
    },
  ],
};

// tables
const tableRoutes = {
  path: "/tables",
  name: "Tables",
  icon: "table",
  header: "Elements",
  children: [
    {
      path: "/ui/tables/basic-tables",
      name: "Basic Tables",
    },
    {
      path: "/ui/tables/data-tables",
      name: "Data Tables",
    },
  ]
}

// ui
const uiRoutes: RoutesProps = {
  path: "/ui",
  name: "Components",
  icon: "pocket",
  header: "Elements",
  children: [
    {
      path: "/ui/components",
      name: "Components",
      children: [
        {
          path: "/ui/accordions",
          name: "Accordions",
        },
        {
          path: "/ui/alerts",
          name: "Alerts",
        },
        {
          path: "/ui/avatars",
          name: "Avatars",
        },
        {
          path: "/ui/buttons",
          name: "Buttons",
        },
        {
          path: "/ui/badges",
          name: "Badges",
        },
        {
          path: "/ui/breadcrumb",
          name: "Breadcrumb",
        },
        {
          path: "/ui/cards",
          name: "Cards",
        },
        {
          path: "/ui/collapse",
          name: "Collapse",
        },
        {
          path: "/ui/dismissible",
          name: "Dismissible",
        },
        {
          path: "/ui/dropdowns",
          name: "Dropdowns",
        },
        {
          path: "/ui/progress",
          name: "Progress",
        },
        {
          path: "/ui/skeleton",
          name: "Skeleton",
        },
        {
          path: "/ui/spinners",
          name: "Spinners",
        },
        {
          path: "/ui/list-group",
          name: "List Group",
        },
        {
          path: "/ui/ratio",
          name: "Ratio",
        },
        {
          path: "/ui/tab",
          name: "Tab",
        },
        {
          path: "/ui/modals",
          name: "Modals",
        },
        {
          path: "/ui/offcanvas",
          name: "Offcanvas",
        },
        {
          path: "/ui/popovers",
          name: "Popovers",
        },
        {
          path: "/ui/tooltips",
          name: "Tooltips",
        },
        {
          path: "/ui/typography",
          name: "Typography",
        },
      ],
    },
    {
      path: '/extended',
      name: 'Extended',
      children: [
        {
          path: "/extended/swiper",
          name: "Swiper",
        },
        {
          path: "/extended/nestable-list",
          name: "Nestable List",
        },
        {
          path: "/extended/ratings",
          name: "Ratings",
        },
        {
          path: "/extended/animation",
          name: "Animation",
        },
        {
          path: "/extended/player",
          name: "Player",
        },
        {
          path: "/extended/scrollbar",
          name: "Scrollbar",
        },
        {
          path: "/extended/sweet-alert",
          name: "Sweet Alert",
        },
        {
          path: "/extended/tour",
          name: "Tourpage",
        },
        {
          path: "/extended/tooltippy",
          name: "Tippy Tooltip",
        },
        {
          path: "/extended/lightbox",
          name: "Lightbox",
        },
      ],
    },
    {
      path: '/ui/forms',
      name: 'Forms',
      children: [
        {
          path: "/ui/forms/form-elements",
          name: "Form Elements",
        },
        {
          path: "/ui/forms/select",
          name: "Select",
        },
        {
          path: "/ui/forms/range",
          name: "Range",
        },
        {
          path: "/ui/forms/pickers",
          name: "Pickers",
        },
        {
          path: "/ui/forms/masks",
          name: "Masks",
        },
        {
          path: "/ui/forms/editor",
          name: "Editor",
        },
        {
          path: "/ui/forms/file-upload",
          name: "File Uploads",
        },
        {
          path: "/ui/forms/validation",
          name: "Validation",
        },
        {
          path: "/ui/forms/form-layout",
          name: "Form Layout",
        },
      ],
    },
    {
      path: '/ui/icons',
      name: 'Icons',
      children: [
        {
          path: "/ui/icons/mingcute",
          name: "Mingcute",
        },
        {
          path: "/ui/icons/feather",
          name: "Feather",
        },
        {
          path: "/ui/icons/material",
          name: "Material Symbols",
        },
      ],
    },
    {
      path: '/ui/maps',
      name: 'Maps',
      children: [
        {
          path: "/ui/maps/vector-maps",
          name: "Vector Maps",
        },
        {
          path: "/ui/maps/google-maps",
          name: "Google Maps",
        },
      ],
    },
  ],
};

const chartRoutes: RoutesProps = {
  path: "/ui/chart",
  name: "Chart",
  roles: ["Admin"],
  icon: "Chart",
  header: "Elements",
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
  },
  {
    path: "/auth/register",
    name: "Register",
  },
  {
    path: "/auth/recover-password",
    name: "Recover Password",
  },
  {
    path: "/auth/lock-screen",
    name: "Lock Screen",
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: "*",
    name: "Error - 404",
  },
  {
    path: "/maintenance",
    name: "Maintenance",
  },
  {
    path: "/coming-soon",
    name: "Coming Soon",
  },
  {
    path: "/error-404",
    name: "Error - 404",
  },
  {
    path: "/error-500",
    name: "Error - 500",
  },
];

// All routes
const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  customPagesRoutes,
  tableRoutes,
  uiRoutes,
  chartRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

export {
  publicRoutes,
  authProtectedRoutes,
};
