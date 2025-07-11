import { PageBreadcrumb } from "../../components"

const BasicSpinner = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Example</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}
const ColoredSpinners = () => {

  const colors: string[] = [
    "text-gray-800 dark:text-white",
    "text-gray-400",
    "text-red-600",
    "text-yellow-600",
    "text-green-600",
    "text-primary",
    "text-indigo-600",
    "text-purple-600",
    "text-pink-600",
    "text-orange-600",
  ]
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Color variants</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          {(colors || []).map((color, idx) => {
            return (
              <div key={idx} className={`${color} animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full`} role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const SpinnerSizes = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Sizes</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="space-x-2">
          <div className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>

          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>

          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpinnerWithDescription = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Customized description</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="relative">
          <div className="bg-sky-50 border border-sky-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="mgc_safe_alert_line text-lg text-sky-400"></i>
              </div>
              <div className="ms-3">
                <h3 className="text-sm text-sky-800 font-medium">
                  Attention needed
                </h3>
                <div className="text-sm text-sky-700 mt-2">
                  <span className="font-semibold">Holy guacamole!</span> You should check in on some of those fields below.
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 start-0 w-full h-full bg-white/[.5] rounded-md dark:bg-gray-800/[.4]"></div>

          <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpinnerInsideACard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Inside a card</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div className="flex justify-center">
              <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Spinners = () => {
  return (
    <>
      <PageBreadcrumb title="Spinners" name="Spinners" breadCrumbItems={["Konrix", "Components", "Spinners"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <BasicSpinner />
        <ColoredSpinners />
        <SpinnerSizes />
        <SpinnerWithDescription />
        <SpinnerInsideACard />
      </div>
    </>
  )
};

export default Spinners