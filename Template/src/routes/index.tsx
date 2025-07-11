/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
import TicketsApp from "../pages/apps/Tickets";

// lazy load all the views

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const RecoverPassword = React.lazy(
  () => import("../pages/auth/RecoverPassword")
);
const LockScreen = React.lazy(() => import("../pages/auth/LockScreen"));

// dashboard
const Dashboard = React.lazy(() => import("../pages/dashboard"));

// apps
const CalendarApp = React.lazy(() => import("../pages/apps/Calendar"));
const FileManagerApp = React.lazy(() => import("../pages/apps/FileManager"));
const KanbanApp = React.lazy(() => import("../pages/apps/Kanban"));
const ProjectCreate = React.lazy(() => import("../pages/apps/Project/Create"));
const ProjectDetail = React.lazy(() => import("../pages/apps/Project/Detail"));
const ProjectList = React.lazy(() => import("../pages/apps/Project/List"));

// extra pages
const Starter = React.lazy(() => import("../pages/extra/Starter"));
const Timeline = React.lazy(() => import("../pages/extra/TimeLine"));
const Invoice = React.lazy(() => import("../pages/extra/Invoice"));
const Gallery = React.lazy(() => import("../pages/extra/Gallery"));
const FAQs = React.lazy(() => import("../pages/extra/FAQs"));
const Pricing = React.lazy(() => import("../pages/extra/Pricing"));

// error pages
const Maintenance = React.lazy(() => import("../pages/error/Maintenance"));
const ComingSoon = React.lazy(() => import("../pages/error/ComingSoon"));
const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Error404Alt = React.lazy(() => import("../pages/error/Error404Alt"));
const Error500 = React.lazy(() => import("../pages/error/Error500"));

// base ui
const Accordions = React.lazy(() => import("../pages/ui/Accordions"));
const Alerts = React.lazy(() => import("../pages/ui/Alerts"));
const Avatars = React.lazy(() => import("../pages/ui/Avatars"));
const Buttons = React.lazy(() => import("../pages/ui/Buttons"));
const Badges = React.lazy(() => import("../pages/ui/Badges"));
const Breadcrumb = React.lazy(() => import("../pages/ui/Breadcrumb"));
const Cards = React.lazy(() => import("../pages/ui/Cards"));
const Collapse = React.lazy(() => import("../pages/ui/Collapse"));
const Dismissible = React.lazy(() => import("../pages/ui/Dismissible"));
const Dropdowns = React.lazy(() => import("../pages/ui/Dropdowns"));
const Progress = React.lazy(() => import("../pages/ui/Progress"));
const Skeleton = React.lazy(() => import("../pages/ui/Skeleton"));
const Spinners = React.lazy(() => import("../pages/ui/Spinners"));
const ListGroup = React.lazy(() => import("../pages/ui/ListGroup"));
const Ratio = React.lazy(() => import("../pages/ui/Ratio"));
const Tabs = React.lazy(() => import("../pages/ui/Tabs"));
const Modals = React.lazy(() => import("../pages/ui/Modals"));
const Offcanvas = React.lazy(() => import("../pages/ui/Offcanvas"));
const Popovers = React.lazy(() => import("../pages/ui/Popovers"));
const Tooltips = React.lazy(() => import("../pages/ui/Tooltips"));
const Typography = React.lazy(() => import("../pages/ui/Typography"));

// extended ui
const Swiper = React.lazy(() => import("../pages/extended/Swiper"));
const NestableList = React.lazy(() => import("../pages/extended/NestableList"));
const Ratings = React.lazy(() => import("../pages/extended/Ratings"));
const Animation = React.lazy(() => import("../pages/extended/Animation"));
const Player = React.lazy(() => import("../pages/extended/Player"));
const Scrollbar = React.lazy(() => import("../pages/extended/Scrollbar"));
const SweetAlert = React.lazy(() => import("../pages/extended/SweetAlert"));
const TourPage = React.lazy(() => import("../pages/extended/TourPage"));
const TippyTooltip = React.lazy(() => import("../pages/extended/TippyTooltip"));
const Lightbox = React.lazy(() => import("../pages/extended/Lightbox"));

// forms
const FormElements = React.lazy(() => import("../pages/forms/FormElements"));
const FormSelect = React.lazy(() => import("../pages/forms/Select"));
const Range = React.lazy(() => import("../pages/forms/Range"));
const Pickers = React.lazy(() => import("../pages/forms/Pickers"));
const Masks = React.lazy(() => import("../pages/forms/Masks"));
const Editor = React.lazy(() => import("../pages/forms/Editor"));
const FileUploads = React.lazy(() => import("../pages/forms/FileUploads"));
const Validation = React.lazy(() => import("../pages/forms/Validation"));
const FormLayout = React.lazy(() => import("../pages/forms/FormLayout"));

// tables
const BasicTables = React.lazy(() => import("../pages/tables/BasicTables"));
const DataTables = React.lazy(() => import("../pages/tables/DataTables"));

// icons
const MingCuteIcons = React.lazy(
  () => import("../pages/ui/icons/MingCuteIcons")
);
const FeatherIcons = React.lazy(() => import("../pages/ui/icons/FeatherIcons"));
const MaterialSymbolIcons = React.lazy(
  () => import("../pages/ui/icons/MaterialSymbolIcons")
);

// chart
const Chart = React.lazy(() => import("../pages/ui/Chart"));

// maps
const VectorMaps = React.lazy(() => import("../pages/ui/maps/VectorMaps"));
const GoogleMaps = React.lazy(() => import("../pages/ui/maps/GoogleMaps"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route?: any;
  exact?: boolean;
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
      element: <Navigate to="/dashboard" />,
      route: PrivateRoute,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      element: <Dashboard />,
      route: PrivateRoute,
    },
  ],
};

// Apps
const calendarAppRoutes: RoutesProps = {
  path: "/apps/calendar",
  name: "Calendar",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "calendar",
  element: <CalendarApp />,
  header: "Apps",
};

const ticketsAppRoutes: RoutesProps = {
  path: "/apps/tickets",
  name: "Tickets",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "tickets",
  element: <TicketsApp />,
  header: "Apps",
};

const fileAppRoutes: RoutesProps = {
  path: "/apps/file-manager",
  name: "File Manager",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "filemanager",
  element: <FileManagerApp />,
  header: "Apps",
};

const kanbanAppRoutes: RoutesProps = {
  path: "/apps/kanban",
  name: "Kanban Board",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "kanban",
  element: <KanbanApp />,
  header: "Apps",
};

const projectAppRoutes: RoutesProps = {
  path: "/apps/project",
  name: "Project",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "project",
  children: [
    {
      path: "/apps/project/list",
      name: "ProjectList",
      element: <ProjectList />,
      route: PrivateRoute,
    },
    {
      path: "/apps/project/detail",
      name: "ProjectDetail",
      element: <ProjectDetail />,
      route: PrivateRoute,
    },
    {
      path: "/apps/project/create",
      name: "ProjectCreate",
      element: <ProjectCreate />,
      route: PrivateRoute,
    },
  ],
};

const appRoutes = [
  calendarAppRoutes,
  ticketsAppRoutes,
  projectAppRoutes,
  kanbanAppRoutes,
  fileAppRoutes,
];

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
      element: <Starter />,
      route: PrivateRoute,
    },
    {
      path: "/pages/timeline",
      name: "Timeline",
      element: <Timeline />,
      route: PrivateRoute,
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      element: <Invoice />,
      route: PrivateRoute,
    },
    {
      path: "/pages/gallery",
      name: "Gallery",
      element: <Gallery />,
      route: PrivateRoute,
    },
    {
      path: "/pages/faqs",
      name: "FAQs",
      element: <FAQs />,
      route: PrivateRoute,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      element: <Pricing />,
      route: PrivateRoute,
    },
    {
      path: "/error-404-alt",
      name: "Error - 404-alt",
      element: <Error404Alt />,
      route: PrivateRoute,
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
      element: <BasicTables />,
      route: PrivateRoute,
    },
    {
      path: "/ui/tables/data-tables",
      name: "Data Tables",
      element: <DataTables />,
      route: PrivateRoute,
    },
  ],
};

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
          element: <Accordions />,
          route: PrivateRoute,
        },
        {
          path: "/ui/alerts",
          name: "Alerts",
          element: <Alerts />,
          route: PrivateRoute,
        },
        {
          path: "/ui/avatars",
          name: "Avatars",
          element: <Avatars />,
          route: PrivateRoute,
        },
        {
          path: "/ui/buttons",
          name: "Buttons",
          element: <Buttons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/badges",
          name: "Badges",
          element: <Badges />,
          route: PrivateRoute,
        },
        {
          path: "/ui/breadcrumb",
          name: "Breadcrumb",
          element: <Breadcrumb />,
          route: PrivateRoute,
        },
        {
          path: "/ui/cards",
          name: "Cards",
          element: <Cards />,
          route: PrivateRoute,
        },
        {
          path: "/ui/collapse",
          name: "Collapse",
          element: <Collapse />,
          route: PrivateRoute,
        },
        {
          path: "/ui/dismissible",
          name: "Dismissible",
          element: <Dismissible />,
          route: PrivateRoute,
        },
        {
          path: "/ui/dropdowns",
          name: "Dropdowns",
          element: <Dropdowns />,
          route: PrivateRoute,
        },
        {
          path: "/ui/progress",
          name: "Progress",
          element: <Progress />,
          route: PrivateRoute,
        },
        {
          path: "/ui/skeleton",
          name: "Skeleton",
          element: <Skeleton />,
          route: PrivateRoute,
        },
        {
          path: "/ui/spinners",
          name: "Spinners",
          element: <Spinners />,
          route: PrivateRoute,
        },
        {
          path: "/ui/list-group",
          name: "List Group",
          element: <ListGroup />,
          route: PrivateRoute,
        },
        {
          path: "/ui/ratio",
          name: "Ratio",
          element: <Ratio />,
          route: PrivateRoute,
        },
        {
          path: "/ui/tab",
          name: "Tab",
          element: <Tabs />,
          route: PrivateRoute,
        },
        {
          path: "/ui/modals",
          name: "Modals",
          element: <Modals />,
          route: PrivateRoute,
        },
        {
          path: "/ui/offcanvas",
          name: "Offcanvas",
          element: <Offcanvas />,
          route: PrivateRoute,
        },
        {
          path: "/ui/popovers",
          name: "Popovers",
          element: <Popovers />,
          route: PrivateRoute,
        },
        {
          path: "/ui/tooltips",
          name: "Tooltips",
          element: <Tooltips />,
          route: PrivateRoute,
        },
        {
          path: "/ui/typography",
          name: "Typography",
          element: <Typography />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/extended",
      name: "Extended",
      children: [
        {
          path: "/extended/swiper",
          name: "Swiper",
          element: <Swiper />,
          route: PrivateRoute,
        },
        {
          path: "/extended/nestable-list",
          name: "Nestable List",
          element: <NestableList />,
          route: PrivateRoute,
        },
        {
          path: "/extended/ratings",
          name: "Ratings",
          element: <Ratings />,
          route: PrivateRoute,
        },
        {
          path: "/extended/animation",
          name: "Animation",
          element: <Animation />,
          route: PrivateRoute,
        },
        {
          path: "/extended/player",
          name: "Player",
          element: <Player />,
          route: PrivateRoute,
        },
        {
          path: "/extended/scrollbar",
          name: "Scrollbar",
          element: <Scrollbar />,
          route: PrivateRoute,
        },
        {
          path: "/extended/sweet-alert",
          name: "Sweet Alert",
          element: <SweetAlert />,
          route: PrivateRoute,
        },
        {
          path: "/extended/tour",
          name: "Tourpage",
          element: <TourPage />,
          route: PrivateRoute,
        },
        {
          path: "/extended/tooltippy",
          name: "Tippy Tooltip",
          element: <TippyTooltip />,
          route: PrivateRoute,
        },
        {
          path: "/extended/lightbox",
          name: "Lightbox",
          element: <Lightbox />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/forms",
      name: "Forms",
      children: [
        {
          path: "/ui/forms/form-elements",
          name: "Form Elements",
          element: <FormElements />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/select",
          name: "Select",
          element: <FormSelect />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/range",
          name: "Range",
          element: <Range />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/pickers",
          name: "Pickers",
          element: <Pickers />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/masks",
          name: "Masks",
          element: <Masks />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/editor",
          name: "Editor",
          element: <Editor />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/file-upload",
          name: "File Uploads",
          element: <FileUploads />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/validation",
          name: "Validation",
          element: <Validation />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/form-layout",
          name: "Form Layout",
          element: <FormLayout />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/icons",
      name: "Icons",
      children: [
        {
          path: "/ui/icons/mingcute",
          name: "Mingcute",
          element: <MingCuteIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/feather",
          name: "Feather",
          element: <FeatherIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/material",
          name: "Material Symbols",
          element: <MaterialSymbolIcons />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/maps",
      name: "Maps",
      children: [
        {
          path: "/ui/maps/vector-maps",
          name: "Vector Maps",
          element: <VectorMaps />,
          route: PrivateRoute,
        },
        {
          path: "/ui/maps/google-maps",
          name: "Google Maps",
          element: <GoogleMaps />,
          route: PrivateRoute,
        },
      ],
    },
  ],
};

const chartRoutes: RoutesProps = {
  path: "/ui/chart",
  name: "Chart",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "Chart",
  element: <Chart />,
  header: "Elements",
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
    route: Route,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
    route: Route,
  },
  {
    path: "/auth/recover-password",
    name: "Recover Password",
    element: <RecoverPassword />,
    route: Route,
  },
  {
    path: "/auth/lock-screen",
    name: "Lock Screen",
    element: <LockScreen />,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/coming-soon",
    name: "Coming Soon",
    element: <ComingSoon />,
    route: Route,
  },
  {
    path: "/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

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

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
