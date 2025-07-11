import { PageBreadcrumb } from "../../components";

interface Variant {
  variant: string,
  isBG?: boolean,
}

const colors: Variant[] = [
  {
    variant: "gray",
  },
  {
    variant: "red",
  },
  {
    variant: "yellow",
  },
  {
    variant: "green",
  },
  {
    variant: "sky",
    isBG: true,
  },
  {
    variant: "indigo",
  },
  {
    variant: "purple",
  },
];

const DefaultBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Default Badge</h4>

        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end gap-2">
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-black text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-indigo-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-pink-500 text-white">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white text-gray-600">Badge</span>
        </div>
      </div>
    </div>
  )
}

const SoftColorVariantBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Soft color variants Badge</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end gap-2">
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary/25 text-sky-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Badge</span>
          <span
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/[.1] text-gray-600 dark:text-gray-400">Badge</span>
        </div>
      </div>
    </div>
  )
}

const RoundedBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Rounded Badge</h4>

        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end gap-2">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-red-100 text-red-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-green-100 text-green-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-primary/25 text-sky-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-purple-100 text-purple-800">Badge</span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-white/[.1] text-gray-600">Badge</span>
        </div>
      </div>
    </div>
  )
}

const IndicatorBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Badge with indicator</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end gap-2">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="w-1.5 h-1.5 inline-block bg-gray-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span className="w-1.5 h-1.5 inline-block bg-red-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <span className="w-1.5 h-1.5 inline-block bg-yellow-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-1.5 h-1.5 inline-block bg-green-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary/25 text-sky-800">
            <span className="w-1.5 h-1.5 inline-block bg-sky-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <span className="w-1.5 h-1.5 inline-block bg-purple-400 rounded-full"></span>
            Badge
          </span>
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/[.1] text-gray-600 dark:text-gray-400">
            <span
              className="w-1.5 h-1.5 inline-block bg-gray-600  rounded-full"></span>
            Badge
          </span>
        </div>
      </div>
    </div>
  )
}

const BadgeWithIcon = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Badge with Icon</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end gap-2">
          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:text-gray-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-200 focus:text-red-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-yellow-600 hover:bg-yellow-200 hover:text-yellow-600 focus:outline-none focus:bg-yellow-200 focus:text-yellow-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-green-600 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-200 focus:text-green-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-primary/25 text-sky-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-primary hover:bg-sky-200 hover:text-primary focus:outline-none focus:bg-sky-200 focus:text-primary">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-200 focus:text-indigo-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-200 hover:text-purple-500 focus:outline-none focus:bg-purple-200 focus:text-purple-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-white text-gray-500">
            Badge
            <button type="button" className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-gray-600 hover:bg-light hover:text-gray-500 focus:outline-none focus:bg-white focus:text-gray-500">
              <span className="sr-only">Remove badge</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

const MaxWidthBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Max width Badge</h4>

        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end lg:gap-5 gap-">
          {(colors || []).map((color, idx) => {
            return (
              <span key={idx} className={`${(colors[idx].isBG) ? "bg-primary/25" : ""}  max-w-[10rem] truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-md text-xs font-medium bg-${color.variant}-100 text-${color.variant}-800`}>This
                content is a little bit longer.
              </span>
            )
          })
          }
          <span className="max-w-[10rem] truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-md text-xs font-medium bg-white-100 text-gray-800">This
            content is a little bit longer.
          </span>
        </div>
      </div>
    </div>
  )
}

const BadgeWithButton = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">With button</h4>

        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-end lg:gap-5 gap-">
          <a className="relative py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="">
            Notifications
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-indigo-800 text-white">5</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const PositionedBadges = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Positioned</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-x-7 gap-y-3">
          <a className="relative inline-flex flex-shrink-0 justify-center items-center h-[3.375rem] w-[3.375rem] rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="">
            <i className="mgc_notification_line text-2xl"></i>
            <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white">99+</span>
          </a>

          <a href="" className="relative inline-flex flex-shrink-0 justify-center items-center h-[3.375rem] w-[3.375rem] rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
            <i className="mgc_notification_line text-2xl"></i>
            <span className="absolute top-0 end-0 inline-flex items-center w-3.5 h-3.5 rounded-full border-2 border-white text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-green-500 text-white"></span>
          </a>
        </div>
      </div>
    </div>
  )
}

const Badges = () => {
  return (
    <>
      <PageBreadcrumb title="Badge" name="Badge" breadCrumbItems={["Konrix", "Components", "Badge"]} />

      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <DefaultBadges />
        <SoftColorVariantBadges />
        <RoundedBadges />
        <IndicatorBadges />
        <BadgeWithIcon />
        <MaxWidthBadges />
        <BadgeWithButton />
        <PositionedBadges />
      </div>
    </>
  )
}

export default Badges