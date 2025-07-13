import React, { Suspense, useEffect, useState } from 'react';
import PrivateRoute from './PrivateRoute';
import { publicRoutes, authProtectedRoutes } from './index';

// lazy load all the views from src/routes/index.tsx
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

const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  '/auth/login': Login,
  '/auth/register': Register,
  '/auth/recover-password': RecoverPassword,
  '/auth/lock-screen': LockScreen,
  '/dashboard': Dashboard,
  '/': Dashboard, // Assuming '/' also maps to Dashboard
  '/apps/calendar': CalendarApp,
  '/apps/file-manager': FileManagerApp,
  '/apps/kanban': KanbanApp,
  '/apps/project/create': ProjectCreate,
  '/apps/project/detail': ProjectDetail,
  '/apps/project/list': ProjectList,
  '/pages/starter': Starter,
  '/pages/timeline': Timeline,
  '/pages/invoice': Invoice,
  '/pages/gallery': Gallery,
  '/pages/faqs': FAQs,
  '/pages/pricing': Pricing,
  '/maintenance': Maintenance,
  '/coming-soon': ComingSoon,
  '/error-404': Error404,
  '/error-404-alt': Error404Alt,
  '/error-500': Error500,
  // UI components
  '/ui/accordions': Accordions,
  '/ui/alerts': Alerts,
  '/ui/avatars': Avatars,
  '/ui/buttons': Buttons,
  '/ui/badges': Badges,
  '/ui/breadcrumb': Breadcrumb,
  '/ui/cards': Cards,
  '/ui/collapse': Collapse,
  '/ui/dismissible': Dismissible,
  '/ui/dropdowns': Dropdowns,
  '/ui/progress': Progress,
  '/ui/skeleton': Skeleton,
  '/ui/spinners': Spinners,
  '/ui/list-group': ListGroup,
  '/ui/ratio': Ratio,
  '/ui/tab': Tabs,
  '/ui/modals': Modals,
  '/ui/offcanvas': Offcanvas,
  '/ui/popovers': Popovers,
  '/ui/tooltips': Tooltips,
  '/ui/typography': Typography,
  // Extended UI
  '/extended/swiper': Swiper,
  '/extended/nestable-list': NestableList,
  '/extended/ratings': Ratings,
  '/extended/animation': Animation,
  '/extended/player': Player,
  '/extended/scrollbar': Scrollbar,
  '/extended/sweet-alert': SweetAlert,
  '/extended/tour': TourPage,
  '/extended/tooltippy': TippyTooltip,
  '/extended/lightbox': Lightbox,
  // Forms
  '/ui/forms/form-elements': FormElements,
  '/ui/forms/select': FormSelect,
  '/ui/forms/range': Range,
  '/ui/forms/pickers': Pickers,
  '/ui/forms/masks': Masks,
  '/ui/forms/editor': Editor,
  '/ui/forms/file-upload': FileUploads,
  '/ui/forms/validation': Validation,
  '/ui/forms/form-layout': FormLayout,
  // Tables
  '/ui/tables/basic-tables': BasicTables,
  '/ui/tables/data-tables': DataTables,
  // Icons
  '/ui/icons/mingcute': MingCuteIcons,
  '/ui/icons/feather': FeatherIcons,
  '/ui/icons/material': MaterialSymbolIcons,
  // Chart
  '/ui/chart': Chart,
  // Maps
  '/ui/maps/vector-maps': VectorMaps,
  '/ui/maps/google-maps': GoogleMaps,
};

const AllRoutes = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const allRoutes = [...publicRoutes, ...authProtectedRoutes];

  let MatchedComponent: React.LazyExoticComponent<React.ComponentType<any>> | undefined;
  let isProtectedRoute = false;

  for (const route of allRoutes) {
    if (route.path === currentPath) {
      MatchedComponent = componentMap[route.path];
      isProtectedRoute = authProtectedRoutes.some(r => r.path === route.path);
      break;
    } else if ('children' in route && route.children) {
      for (const childRoute of route.children) {
        if (childRoute.path === currentPath) {
          MatchedComponent = componentMap[childRoute.path];
          isProtectedRoute = authProtectedRoutes.some(r => r.path === route.path || (r.children && r.children.some(c => c.path === childRoute.path)));
          break;
        }
      }
    }
    if (MatchedComponent) break;
  }

  if (!MatchedComponent) {
    // If no route matches, render 404 page
    MatchedComponent = Error404;
    isProtectedRoute = false; // 404 page is generally not protected
  }

  const ComponentToRender = MatchedComponent;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isProtectedRoute ? (
        <PrivateRoute>
          <ComponentToRender />
        </PrivateRoute>
      ) : (
        <ComponentToRender />
      )}
    </Suspense>
  );
};

export default AllRoutes;