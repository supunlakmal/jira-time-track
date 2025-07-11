import { handleDismiss } from "../../components";
import { PageBreadcrumb } from "../../components";

const colors: string[] = [
  "primary",
  "secondary",
  "info",
  "success",
  "danger",
  "warning",
  "dark",
];

const BasicAlerts = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Basic Alert</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {(colors || []).map((color, idx) => {
            return (
              <div key={idx} className={`bg-${color} text-sm text-white rounded-md p-4`} role="alert">
                <span className="font-bold">{color.charAt(0).toUpperCase() + color.slice(1)}</span> alert! You should check in on some of those
                fields below.
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const SoftColorAlerts = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Soft color variants Alert</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {(colors || []).slice(0, 6).map((color, idx) => {
            return (
              <div key={idx} className={`bg-${color}/25 text-${color} text-sm rounded-md p-4`} role="alert">
                <span className="font-bold">{color.charAt(0).toUpperCase() + color.slice(1)}</span> alert! You should check in on some of those
                fields below.
              </div>
            )
          })}
          <div className="bg-dark/25 text-slate-900 dark:text-slate-200 text-sm rounded-md p-4"
            role="alert">
            <span className="font-bold">Dark</span> alert! You should check in on some of those
            fields below.
          </div>
        </div>
      </div>
    </div>
  )
}

const DescriptionAlert = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">With description Alert</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="mgc_information_line text-xl"></i>
              </div>
              <div className="ms-4">
                <h3 className="text-sm text-yellow-800 font-semibold">
                  Cannot connect to the database
                </h3>
                <div className="mt-1 text-sm text-yellow-700">
                  We are unable to save any progress at this time.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ActionsAlert = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Actions</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-sky-50 border border-sky-200 rounded-md p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="mgc_information_line text-xl"></i>
            </div>
            <div className="ms-4">
              <h3 className="text-gray-800 font-semibold">
                YouTube would like you to send notifications
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                Notifications may include alerts, sounds and icon badges. These can be
                configured in Settings.
              </div>
              <div className="mt-4">
                <div className="flex space-x-3">
                  <button type="button"
                    className="inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm">
                    Don't allow
                  </button>
                  <button type="button"
                    className="inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm">
                    Allow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LinkAlert = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Link on right</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="mgc_information_line text-xl"></i>
            </div>
            <div className="flex-1 md:flex md:justify-between ms-4">
              <p className="text-sm text-gray-700">
                A new software update is available. See what's new in version 3.0.7
              </p>
              <p className="text-sm mt-3 md:mt-0 md:ms-6">
                <a className="text-gray-700 hover:text-gray-500 font-medium whitespace-nowrap" href="">Details</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DismissibleAlert = () => {

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Dismiss button</h4>
        </div>
      </div>
      <div className="p-6">
        <div id="dismiss-alert" className='transition duration-300 bg-teal-50 border border-teal-200 rounded-md p-4' role="alert">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <i className="mgc_-badge-check text-xl"></i>
            </div>
            <div className="flex-grow">
              <div className="text-sm text-teal-800 font-medium">
                File has been successfully uploaded.
              </div>
            </div>
            <button type="button" onClick={() => (handleDismiss('dismiss-alert'))} className="ms-auto h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
              <i className="mgc_close_line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
const Alerts = () => {
  return (
    <>
      <PageBreadcrumb title="Alerts" name="Alerts" breadCrumbItems={["Konrix", "Components", "Alerts"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <BasicAlerts />
        <SoftColorAlerts />
        <DescriptionAlert />
        <ActionsAlert />
        <LinkAlert />
        <DismissibleAlert />
      </div>
    </>
  )
}

export default Alerts