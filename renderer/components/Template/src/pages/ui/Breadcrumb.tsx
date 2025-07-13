import { PageBreadcrumb } from "../../components";

const Breadcrumb = () => {
  return (
    <>
      <PageBreadcrumb title="Breadcrumb" name="Breadcrumb" breadCrumbItems={["Konrix", "Components", "Breadcrumb"]} />

      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Simple</h4>

            </div>
          </div>
          <div className="p-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center text-sm font-semibold space-x-4">
                <li>
                  <div className="flex items-center">
                    <a href="" className="text-gray-400 hover:text-gray-500">
                      <i className="mgc_home_4_line text-lg flex-shrink-0 align-middle"></i>
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <i className="mgc_right_line text-lg flex-shrink-0 text-gray-400"></i>
                    <a href="" className="ms-4 text-sm font-medium text-gray-500 hover:text-gray-700">Apps</a>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <i className="mgc_right_line text-lg flex-shrink-0 text-gray-400"></i>
                    <a href="" className="ms-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Calendar</a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Example</h4>
            </div>
          </div>
          <div className="p-6">
            <ol className="flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <a className="flex items-center hover:text-primary" href="">
                  Home
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                </a>
              </li>

              <li className="text-sm text-gray-600 dark:text-gray-400">
                <a className="flex items-center hover:text-primary" href="">
                  App Center
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                </a>
              </li>

              <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-200" aria-current="page">
                Application
              </li>
            </ol>

          </div>
        </div>

      </div>
    </>
  )
};

export default Breadcrumb