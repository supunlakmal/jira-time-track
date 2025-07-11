import Tippy from "@tippyjs/react"
import { Placement } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { PageBreadcrumb } from "../../components"

const DefaultPopover = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Default Popover</h4>
        </div>
      </div>
      <div className="p-6">
        <Tippy content="Believe me! I'm Popover 😀" placement="bottom" trigger="click">
          <button className="btn bg-primary text-white">
            Click me
          </button>
        </Tippy>
      </div>
    </div>
  )
}

const AutoTargetingPopover = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Auto Targeting Popover</h4>
        </div>
      </div>
      <div className="p-6">
        <Tippy content="It's magic" placement="bottom" trigger="click">
          <button className="btn bg-primary text-white">
            Click me
          </button>
        </Tippy>
      </div>
    </div>
  )
}

const CustomPositionPopovers = () => {
  const directions: Placement[] = ["top", "bottom", "left", "right"];
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Four directions Popovers</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          {(directions || []).map((direction, idx) => {
            return (
              <div key={idx}>
                <Tippy content={`Popover on ${direction.charAt(0).toUpperCase() + direction.slice(1)}`} trigger="click" placement={direction}>
                  <button type="button" className="btn bg-primary/10 text-primary">
                    Popover on {direction.charAt(0).toUpperCase() + direction.slice(1)}
                  </button>
                </Tippy>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const PopoverWithContent = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">With content Popover</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          <div>
            <Tippy className="!bg-transparent tipcolor" trigger="click" content={
              <div className="bg-white border border-gray-100 shadow-md rounded-md dark:bg-gray-800 dark:border-gray-700" >
                <div className="px-4 py-3 border-b dark:border-gray-700 text-dark dark:text-gray-300">Popover title</div>
                <div className="p-4 text-dark dark:text-gray-400">
                  And here's some amazing content. It's very engaging. Right?
                </div>
              </div>
            }>

              <button type="button" className="btn bg-primary text-white">
                Popover With Text
              </button>
            </Tippy>

          </div>

          <div>
            <Tippy className="!bg-transparent tipcolor" trigger="click" content={
              <div className="z-50">
                <div className="max-w-xs bg-white border border-gray-100 text-left rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" role="tooltip">
                  <span className="pt-3 px-4 block text-lg font-bold text-gray-800 dark:text-white">Overview</span>
                  <div className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    <img src="https://placehold.co/600x400" className="mb-3 rounded" alt="images" />
                    <p>This is a popover body with supporting text below as a natural lead-in to additional content.</p>
                    <dl className="mt-3">
                      <dt className="font-bold pt-3 first:pt-0 dark:text-white">Assigned to:</dt>
                      <dd className="text-gray-600 dark:text-gray-400">Mark Welson</dd>
                      <dt className="font-bold pt-3 first:pt-0 dark:text-white">Due:</dt>
                      <dd className="text-gray-600 dark:text-gray-400">December 21, 2021</dd>
                    </dl>
                  </div>
                </div>
              </div>
            }>
              <button type="button" className="btn bg-primary text-white">
                Popover with Images
              </button>
            </Tippy>
          </div>
        </div>
      </div >
    </div >
  )
}

const Popovers = () => {
  return (
    <>
      <PageBreadcrumb title="Popover" name="Popover" breadCrumbItems={["Konrix", "Components", "Popover"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <DefaultPopover />
        <AutoTargetingPopover />
        <CustomPositionPopovers />
        <PopoverWithContent />
      </div>
    </>
  )
};

export default Popovers