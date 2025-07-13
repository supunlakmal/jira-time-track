import { PageBreadcrumb } from "../../components";

const Skeleton = () => {
  return (
    <>
      <PageBreadcrumb title="Skeleton" name="Skeleton" breadCrumbItems={["Konrix", "Components", "Skeleton"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Example</h4>
            </div>
          </div>
          <div className="p-6">
            <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-2/5"></h3>
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Complex combination</h4>
            </div>
          </div>
          <div className="p-6">
            <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 mb-3" style={{ width: "40%" }}></h3>
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <div className="ms-4 mt-2 w-full">
                <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style={{ width: "40%" }}></h3>
                <ul className="mt-5 space-y-3">
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Active animation</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="flex animate-pulse">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <div className="ms-4 mt-2 w-full">
                <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style={{ width: "40%" }}></h3>
                <ul className="mt-5 space-y-3">
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                  <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default Skeleton