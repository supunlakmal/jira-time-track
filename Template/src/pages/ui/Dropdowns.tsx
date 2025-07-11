import { PopoverLayout } from "../../components/HeadlessUI";
import { PageBreadcrumb } from "../../components";
import type { Placement } from '@floating-ui/dom';

const colors = ["primary", "secondary", "success", "warning", "danger"];
const alignments: Placement[] = ["right", "left", "top", "bottom"];

const DropdownItem = ({ text }: { text: string }) => {
  return (
    <span className="flex items-center w-40 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer">
      {text}
    </span>
  )
}

const DropdownOptions = () => {
  return (
    <>
      <DropdownItem text="Action" />
      <DropdownItem text="Another action" />
      <DropdownItem text="Something else here" />
    </>
  )
}

const DefaultDropdown = () => {

  const PopoverToggle = () => {
    return (
      <>
        Actions <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Default</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">

          <PopoverLayout placement="bottom-start" toggler={<PopoverToggle />} togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
            <div className="z-50 mt-1 w-44 transition-all duration-300 bg-white border shadow-md rounded-lg p-2 dark:bg-slate-800 dark:border-slate-700">
              <DropdownOptions />
            </div>
          </PopoverLayout>

        </div>
      </div>
    </div>
  )
}

const ColorVariantDropdown = () => {

  const PopoverToggle = ({ name }: { name: string }) => {
    return (
      <>
        {name.charAt(0).toUpperCase() + name.slice(1)}  <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Dropdown Color Variant</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {(colors || []).map((color, idx) => {
            return (
              <div key={idx}>
                <PopoverLayout toggler={<PopoverToggle name={color} />} togglerClass={`py-2 px-3 inline-flex bg-${color} text-white justify-center items-center text-sm gap-2 rounded-md font-medium shadow-sm align-middle transition-all`}>
                  <div className="w-44 z-50 transition-all duration-300 bg-white border shadow-md rounded-lg p-2 dark:bg-slate-800 dark:border-slate-700">
                    <DropdownOptions />
                  </div>
                </PopoverLayout>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

const DropdownWithDivider = () => {

  const PopoverToggle = () => {
    return (
      <>
        Actions <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Dividers</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          <PopoverLayout toggler={<PopoverToggle />} togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
            <div className="z-50 w-44 transition-all duration-300 bg-white border shadow-md rounded-lg p-2 dark:bg-slate-800 dark:border-slate-700">
              <DropdownItem text="Action" />
              <DropdownItem text="Another action" />
              <div className="h-px bg-black/10 dark:bg-gray-700 my-2 -mx-2"></div>
              <DropdownItem text="Something else here" />
            </div>
          </PopoverLayout>
        </div>
      </div>
    </div>
  )
}

const CustomAlignmentDropdown = () => {

  const PopoverToggleStart = () => {
    return (
      <>
        Top Start <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  const PopoverToggleEnd = () => {
    return (
      <>
        Top End <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  const CustomPopoverToggle = ({ align }: { align: string }) => {
    return (
      <>
        Dropdown {align} <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Alignment options</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">

          {(alignments || []).map((align, idx) => (
            <div key={idx}>
              <PopoverLayout placement={align} toggler={<CustomPopoverToggle align={align} />} togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
                <div className="w-44 min-w-[120px] p-2 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                  <DropdownOptions />
                </div>
              </PopoverLayout>
            </div>
          ))}

          <div>
            <PopoverLayout toggler={<PopoverToggleStart />} placement="top-start" togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              <div className="w-44 min-w-[120px] p-2 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                <DropdownOptions />
              </div>
            </PopoverLayout>
          </div>
          <div>
            <PopoverLayout toggler={<PopoverToggleEnd />} placement="top-end" togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              <div className="w-44 min-w-[120px] p-2 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                <DropdownOptions />
              </div>
            </PopoverLayout>
          </div>
        </div>

      </div>
    </div>
  )
}

const DropdownWithForm = () => {

  const PopoverToggle = () => {
    return (
      <>
        Radio <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  const PopoverToggle2 = () => {
    return (
      <>
        CheckBox <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  const PopoverToggle3 = () => {
    return (
      <>
        Login Form <i className="mgc_down_line text-base ms-1" ></i>
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Dropdown With Form Components</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          <div>
            <PopoverLayout toggler={<PopoverToggle />} togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              <div className="w-44 min-w-[120px] p-2 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                <div className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <div className="flex">
                    <input type="radio" name="default-radio" className="shrink-0 form-radio rounded" id="default-radio" />
                    <label htmlFor="default-radio" className="text-sm text-gray-500 ms-2 dark:text-gray-400">Default
                      radio</label>
                  </div>
                </div>
                <div className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <div className="flex">
                    <input type="radio" name="default-radio" className="shrink-0 form-radio rounded" id="checked-radio" defaultChecked />
                    <label htmlFor="checked-radio" className="text-sm text-gray-500 ms-2 dark:text-gray-400">Checked
                      radio</label>
                  </div>
                </div>
              </div>
            </PopoverLayout>
          </div>

          <div>
            <PopoverLayout toggler={<PopoverToggle2 />} togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              <div className="w-52 min-w-[120px] p-2 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                <div className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <div className="flex">
                    <input type="checkbox" className="shrink-0 form-checkbox rounded" id="default-checkbox" />
                    <label htmlFor="default-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">Default
                      checkbox</label>
                  </div>
                </div>
                <div className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <div className="flex">
                    <input type="checkbox" className="shrink-0 form-checkbox rounded" id="checked-checkbox" defaultChecked />
                    <label htmlFor="checked-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">Checked
                      checkbox</label>
                  </div>
                </div>
              </div>
            </PopoverLayout>
          </div>

          <div>
            <PopoverLayout toggler={<PopoverToggle3 />} placement="top" togglerClass="py-2 px-3 inline-flex justify-center items-center rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
              <div className="w-72 p-4 shadow-md rounded-lg z-50 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="text-gray-800 text-sm font-medium inline-block mb-2">Email
                      address</label>
                    <input type="email" className="form-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-sm text-slate-700 dark:text-slate-400">We'll
                      never share your email
                      with anyone else.</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="text-gray-800 text-sm font-medium inline-block mb-2">Password</label>
                    <input type="password" className="form-input" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <input type="checkbox" className="form-checkbox rounded border border-gray-200" id="checkmeout0" />
                    <label className="text-gray-800 text-sm font-medium inline-block" htmlFor="checkmeout0">Check me out !</label>
                  </div>
                  <button type="submit" className="btn bg-primary text-white">Submit</button>
                </form>
              </div>
            </PopoverLayout>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dropdowns = () => {
  return (
    <>
      <PageBreadcrumb title="Dropdown" name="Dropdown" breadCrumbItems={["Konrix", "Components", "Dropdown"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <DefaultDropdown />
        <ColorVariantDropdown />
        <DropdownWithDivider />
        <CustomAlignmentDropdown />
        <DropdownWithForm />
      </div>
    </>
  )
};

export default Dropdowns