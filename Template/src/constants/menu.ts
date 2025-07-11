export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'menu',
    label: 'Menu',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    isTitle: false,
    icon: 'mgc_home_3_line',
    url: '/dashboard'
  },
  {
    key: 'apps',
    label: 'Apps',
    isTitle: true,
  },
  {
    key: 'apps-calendar',
    label: 'Calendar',
    isTitle: false,
    icon: 'mgc_calendar_line',
    url: '/apps/calendar',
  },
  {
    key: 'apps-tickets',
    label: 'Tickets',
    isTitle: false,
    icon: 'mgc_coupon_line',
    url: '/apps/tickets',
  },
  {
    key: 'apps-file-manager',
    label: 'File Manager',
    isTitle: false,
    icon: 'mgc_folder_2_line',
    url: '/apps/file-manager',
  },
  {
    key: 'apps-kanban',
    label: 'Kanban Board',
    isTitle: false,
    icon: 'mgc_task_2_line',
    url: '/apps/kanban',
  },
  {
    key: 'apps-project',
    label: 'Project',
    isTitle: false,
    icon: 'mgc_building_2_line',
    children: [
      {
        key: 'project-list',
        label: 'List',
        url: '/apps/project/list',
        parentKey: 'apps-project',
      },
      {
        key: 'project-detail',
        label: 'Detail',
        url: '/apps/project/detail',
        parentKey: 'apps-project',
      },
      {
        key: 'project-create',
        label: 'Create',
        url: '/apps/project/create',
        parentKey: 'apps-project',
      },
    ]
  },
  {
    key: 'custom',
    label: 'Custom',
    isTitle: true,
  },
  {
    key: 'auth',
    label: 'Auth Pages',
    isTitle: false,
    icon: 'mgc_user_3_line',
    children: [
      {
        key: 'auth-login',
        label: 'Login',
        url: '/auth/login',
        parentKey: 'auth',
      },
      {
        key: 'auth-register',
        label: 'Register',
        url: '/auth/register',
        parentKey: 'auth',
      },
      {
        key: 'auth-recover-password',
        label: 'Recover Password',
        url: '/auth/recover-password',
        parentKey: 'auth',
      },
      {
        key: 'auth-lock-screen',
        label: 'Lock Screen',
        url: '/auth/lock-screen',
        parentKey: 'auth',
      },
    ]
  },
  {
    key: 'pages',
    label: 'Extra Pages',
    isTitle: false,
    icon: 'mgc_box_3_line',
    children: [
      {
        key: 'pages-starter',
        label: 'Starter Page',
        url: '/pages/starter',
        parentKey: 'pages',
      },
      {
        key: 'pages-timeline',
        label: 'Timeline',
        url: '/pages/timeline',
        parentKey: 'pages',
      },
      {
        key: 'pages-invoice',
        label: 'Invoice',
        url: '/pages/invoice',
        parentKey: 'pages',
      },
      {
        key: 'pages-gallery',
        label: 'Gallery',
        url: '/pages/gallery',
        parentKey: 'pages',
      },
      {
        key: 'pages-faq',
        label: 'FAQs',
        url: '/pages/faqs',
        parentKey: 'pages',
      },
      {
        key: 'pages-pricing',
        label: 'Pricing',
        url: '/pages/pricing',
        parentKey: 'pages',
      },
      {
        key: 'pages-maintenance',
        label: 'Maintenance',
        url: '/maintenance',
        parentKey: 'pages',
      },
      {
        key: 'pages-comingsoon',
        label: 'Coming Soon',
        url: '/coming-soon',
        parentKey: 'pages',
      },
      {
        key: 'error-404',
        label: 'Error 404',
        url: '/error-404',
        parentKey: 'pages',
      },
      {
        key: 'error-404-alt',
        label: 'Error 404-alt',
        url: '/error-404-alt',
        parentKey: 'pages',
      },
      {
        key: 'error-500',
        label: 'Error 500',
        url: '/error-500',
        parentKey: 'pages',
      },
    ]
  },
  {
    key: 'elements',
    label: 'Elements',
    isTitle: true,
  },
  {
    key: 'components',
    label: 'Components',
    isTitle: false,
    icon: 'mgc_classify_2_line',
    children: [
      {
        key: 'ui-accordions',
        label: 'Accordions',
        url: '/ui/accordions',
        parentKey: 'components',
      },
      {
        key: 'ui-alerts',
        label: 'Alerts',
        url: '/ui/alerts',
        parentKey: 'components',
      },
      {
        key: 'ui-avatars',
        label: 'Avatars',
        url: '/ui/avatars',
        parentKey: 'components',
      },
      {
        key: 'ui-buttons',
        label: 'Buttons',
        url: '/ui/buttons',
        parentKey: 'components',
      },
      {
        key: 'ui-badges',
        label: 'Badges',
        url: '/ui/badges',
        parentKey: 'components',
      },
      {
        key: 'ui-breadcrumb',
        label: 'Breadcrumb',
        url: '/ui/breadcrumb',
        parentKey: 'components',
      },
      {
        key: 'ui-cards',
        label: 'Cards',
        url: '/ui/cards',
        parentKey: 'components',
      },
      {
        key: 'ui-collapse',
        label: 'Collapse',
        url: '/ui/collapse',
        parentKey: 'components',
      },
      {
        key: 'ui-dismissible',
        label: 'Dismissible',
        url: '/ui/dismissible',
        parentKey: 'components',
      },
      {
        key: 'ui-dropdowns',
        label: 'Dropdowns',
        url: '/ui/dropdowns',
        parentKey: 'components',
      },
      {
        key: 'ui-progress',
        label: 'Progress',
        url: '/ui/progress',
        parentKey: 'components',
      },
      {
        key: 'ui-skeleton',
        label: 'Skeleton',
        url: '/ui/skeleton',
        parentKey: 'components',
      },
      {
        key: 'ui-spinners',
        label: 'Spinners',
        url: '/ui/spinners',
        parentKey: 'components',
      },
      {
        key: 'ui-list-group',
        label: 'List Group',
        url: '/ui/list-group',
        parentKey: 'components',
      },
      {
        key: 'ui-ratio',
        label: 'Ratio',
        url: '/ui/ratio',
        parentKey: 'components',
      },
      {
        key: 'tab',
        label: 'Tab',
        url: '/ui/tab',
        parentKey: 'components',
      },
      {
        key: 'ui-modals',
        label: 'Modals',
        url: '/ui/modals',
        parentKey: 'components',
      },
      {
        key: 'ui-offcanvas',
        label: 'Offcanvas',
        url: '/ui/offcanvas',
        parentKey: 'components',
      },
      {
        key: 'ui-popovers',
        label: 'Popovers',
        url: '/ui/popovers',
        parentKey: 'components',
      },
      {
        key: 'ui-tooltips',
        label: 'Tooltips',
        url: '/ui/tooltips',
        parentKey: 'components',
      },
      {
        key: 'ui-typography',
        label: 'Typography',
        url: '/ui/typography',
        parentKey: 'components',
      },
    ],
  },
  {
    key: 'extended',
    label: 'Extended UI',
    isTitle: false,
    icon: 'mgc_box_3_line',
    children: [
      {
        key: 'extended-swiper',
        label: 'Swiper',
        url: '/extended/swiper',
        parentKey: 'extended',
      },
      {
        key: 'extended-nestable-list',
        label: 'Nestable List',
        url: '/extended/nestable-list',
        parentKey: 'extended',
      },
      {
        key: 'extended-ratings',
        label: 'Ratings',
        url: '/extended/ratings',
        parentKey: 'extended',
      },
      {
        key: 'extended-animation',
        label: 'Animation',
        url: '/extended/animation',
        parentKey: 'extended',
      },
      {
        key: 'extended-player',
        label: 'Player',
        url: '/extended/player',
        parentKey: 'extended',
      },
      {
        key: 'extended-scrollbar',
        label: 'Scrollbar',
        url: '/extended/scrollbar',
        parentKey: 'extended',
      },
      {
        key: 'extended-sweet-alert',
        label: 'Sweet Alert',
        url: '/extended/sweet-alert',
        parentKey: 'extended',
      },
      {
        key: 'extended-tour',
        label: 'Tour',
        url: '/extended/tour',
        parentKey: 'extended',
      },
      {
        key: 'extended-tooltippy',
        label: 'Tippy Tooltip',
        url: '/extended/tooltippy',
        parentKey: 'extended',
      },
      {
        key: 'extended-lightbox',
        label: 'Lightbox',
        url: '/extended/lightbox',
        parentKey: 'extended',
      },
    ],
  },
  {
    key: 'forms',
    label: 'Forms',
    isTitle: false,
    icon: 'mgc_file_check_line',
    children: [
      {
        key: 'forms-form-elements',
        label: 'Form Elements',
        url: '/ui/forms/form-elements',
        parentKey: 'forms',
      },
      {
        key: 'forms-select',
        label: 'Select',
        url: '/ui/forms/select',
        parentKey: 'forms',
      },
      {
        key: 'forms-range',
        label: 'Range',
        url: '/ui/forms/range',
        parentKey: 'forms',
      },
      {
        key: 'forms-pickers',
        label: 'Pickers',
        url: '/ui/forms/pickers',
        parentKey: 'forms',
      },
      {
        key: 'forms-masks',
        label: 'Masks',
        url: '/ui/forms/masks',
        parentKey: 'forms',
      },
      {
        key: 'forms-editor',
        label: 'Editor',
        url: '/ui/forms/editor',
        parentKey: 'forms',
      },
      {
        key: 'forms-file-upload',
        label: 'File Uploads',
        url: '/ui/forms/file-upload',
        parentKey: 'forms',
      },
      {
        key: 'forms-validation',
        label: 'Validation',
        url: '/ui/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'forms-form-layout',
        label: 'Form Layout',
        url: '/ui/forms/form-layout',
        parentKey: 'forms',
      },
    ],
  },
  {
    key: 'tables',
    label: 'Tables',
    isTitle: false,
    icon: 'mgc_layout_grid_line',
    children: [
      {
        key: 'tables-basic',
        label: 'Basic Tables',
        url: '/ui/tables/basic-tables',
        parentKey: 'tables',
      },
      {
        key: 'tables-data',
        label: 'Data Tables',
        url: '/ui/tables/data-tables',
        parentKey: 'tables',
      },
    ],
  },
  {
    key: 'icons',
    label: 'Icons',
    isTitle: false,
    icon: 'mgc_dribbble_line',
    children: [
      {
        key: 'icons-mingcute',
        label: 'Mingcute',
        url: '/ui/icons/mingcute',
        parentKey: 'icons',
      },
      {
        key: 'icons-feather',
        label: 'Feather',
        url: '/ui/icons/feather',
        parentKey: 'icons',
      },
      {
        key: 'icons-material',
        label: 'Material Symbols',
        url: '/ui/icons/material',
        parentKey: 'icons',
      },
    ],
  },
  {
    key: 'charts',
    label: 'Chart',
    isTitle: false,
    icon: 'mgc_chart_bar_line',
    url: '/ui/chart',
  },
  {
    key: 'maps',
    label: 'Maps',
    isTitle: false,
    icon: 'mgc_location_line',
    children: [
      {
        key: 'maps-vector-maps',
        label: 'Vector maps',
        url: '/ui/maps/vector-maps',
        parentKey: 'maps',
      },
      {
        key: 'maps-google-maps',
        label: 'Google maps',
        url: '/ui/maps/google-maps',
        parentKey: 'maps',
      },
    ],
  },
];

export { MENU_ITEMS };
