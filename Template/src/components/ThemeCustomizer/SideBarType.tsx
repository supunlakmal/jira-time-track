
import * as LayoutConstants from "../../constants/layout";

interface SideBarTypeProps {
  handleChangeSideBarType: (value: any) => void;
  sideBarType?: string;
  layoutConstants: typeof LayoutConstants.SideBarType;
}

const SideBarType = ({
  handleChangeSideBarType,
  sideBarType,
  layoutConstants,
}: SideBarTypeProps) => {
  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Sidenav View</h5>
        <div className="grid grid-cols-3 gap-3">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-default"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_DEFAULT}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_DEFAULT}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-default">
              <span className="flex h-16 overflow-hidden">
                <span className="block w-8 bg-gray-100 dark:bg-gray-800">
                  <span className="mt-1.5 mx-1.5 block space-y-1">
                    <span className="h-1 block rounded-sm mb-2.5 bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  </span>
                </span>
                <span className="flex flex-col flex-auto border-s border-gray-200 dark:border-gray-700">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center justify-end h-full mr-1.5">
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Default </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-hover"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_HOVER}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_HOVER}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-hover">
              <span className="flex h-16 overflow-hidden">
                <span className="w-3 bg-gray-100 dark:bg-gray-800">
                  <span className="w-1.5 h-1.5 mt-1 mx-auto rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  <span className="flex flex-col items-center w-full mt-1.5 space-y-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                  </span>
                </span>
                <span className="flex flex-col flex-auto border-s border-gray-200 dark:border-gray-700">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center justify-end h-full mr-1.5">
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Hover </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-hover-active"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_HOVERACTIVE}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_HOVERACTIVE}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-hover-active">
              <span className="flex h-16 overflow-hidden">
                <span className="w-8 bg-gray-100 dark:bg-gray-800">
                  <span className="mt-1.5 mx-1.5 block space-y-1">
                    <span className="flex mb-2.5 gap-1">
                      <span className="h-1 block w-full rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                      <span className="h-1 block w-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="h-1 block rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  </span>
                </span>
                <span className="flex flex-col flex-auto border-s border-gray-200 dark:border-gray-700">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center justify-end h-full mr-1.5">
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Hover Active </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-sm"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_SMALL}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_SMALL}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-sm">
              <span className="flex h-16 overflow-hidden">
                <span className="w-3 bg-gray-100 dark:bg-gray-800">
                  <span className="w-1.5 h-1.5 mt-1 mx-auto rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  <span className="flex flex-col items-center w-full mt-1.5 space-y-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                  </span>
                </span>
                <span className="flex flex-col flex-auto border-s border-gray-200 dark:border-gray-700">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center h-full mr-1.5">
                      <span className="grow">
                        <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      </span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Small </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-md"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_COMPACT}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_COMPACT}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-md">
              <span className="flex h-16 rounded-md overflow-hidden">
                <span className="w-4 bg-gray-100 dark:bg-gray-800">
                  <span className="w-2 h-2 mt-2 mx-auto rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  <span className="flex flex-col items-center w-full mt-2 space-y-1">
                    <span className="w-2 h-2 rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-2 h-2 rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                    <span className="w-2 h-2 rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                  </span>
                </span>
                <span className="flex flex-col flex-auto border-s border-gray-200 dark:border-gray-700">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center h-full mr-1.5">
                      <span className="grow">
                        <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      </span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ml-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Compact </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-mobile"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_MOBILE}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_MOBILE}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-mobile">
              <span className="flex h-16 overflow-hidden">
                <span className="flex flex-col flex-auto">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex items-center h-full mr-1.5">
                      <span className="w-1.5 h-1.5  ms-1 rounded-sm bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1  rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-auto rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Mobile </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-sidenav-view"
              id="sidenav-view-hidden"
              value={layoutConstants.LEFT_SIDEBAR_TYPE_HIDDEN}
              onChange={(e) => handleChangeSideBarType(e.target.value)}
              checked={sideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_HIDDEN}
            />
            <label className="form-label rounded-md" htmlFor="sidenav-view-hidden">
              <span className="flex h-16 overflow-hidden">
                <span className="flex flex-col flex-auto">
                  <span className="h-3 bg-gray-100 dark:bg-gray-800">
                    <span className="flex flex-auto items-center h-full me-1.5">
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-auto rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span className="w-1 h-1 block ms-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    </span>
                  </span>
                  <span className="flex flex-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"></span>
                </span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Hidden </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBarType