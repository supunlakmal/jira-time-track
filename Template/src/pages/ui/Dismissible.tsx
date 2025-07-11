import { handleDismiss } from "../../components";
import { PageBreadcrumb } from "../../components";

const Dismissible = () => {
  return (
    <>
      <PageBreadcrumb title="Dismissable" name="Dismissable" breadCrumbItems={["Konrix", "Components", "Dismissable"]} />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Dismissible</h4>
              </div>
            </div>
            <div className="p-6">
              <div id="dismiss-example"
                className="border bg-info/10 text-info border-info/20 rounded px-4 py-3 flex justify-between items-center">
                <p>
                  <span className="font-medium">Alert:</span>
                  You can dismiss this alert by, simply click on close button
                </p>
                <button className="flex-shrink-0" type="button">
                  <i className="mgc_close_line text-xl" onClick={() => { handleDismiss("dismiss-example") }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Card Dismissible</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="card shadow-md max-w-xs relative transition-all duration-300" id="dismiss-card">
              <div className="absolute end-2 top-2">
                <button type="button" id="dismiss-test" className="ms-auto h-8 w-8 rounded-full bg-gray-500/20 flex justify-center items-center ">
                  <i className="mgc_close_line text-xl" onClick={() => { handleDismiss("dismiss-card") }}></i>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Card title
                </h3>
                <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                  Card subtitle
                </p>
                <p className="mt-2 text-gray-800 dark:text-gray-400">
                  Some quick example text to build on the card title and make up the bulk of the
                  card's content.
                </p>
                <a className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-primary hover:text-sky-700"
                  href="">
                  Card link
                  <i className="msr text-xl">chevron_right</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dismissible