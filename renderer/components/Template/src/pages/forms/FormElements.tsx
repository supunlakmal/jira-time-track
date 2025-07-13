import { FormInput } from "../../components";
import { useForm } from 'react-hook-form'
import { PageBreadcrumb } from "../../components";

interface Colors {
  variant: string;
  name: string;
}

const colors: Colors[] = [
  {
    variant: "primary",
    name: "Primary"
  },
  {
    variant: "success",
    name: "Success",
  },
  {
    variant: "danger",
    name: "Danger",
  },
  {
    variant: "warning",
    name: "Warning",
  },
  {
    variant: "pink-500",
    name: "Pink",
  },
  {
    variant: "blue",
    name: "Blue",
  },
  {
    variant: "info",
    name: "Info",
  },
  {
    variant: "dark",
    name: "Dark",
  },
]

const switchColors: string[] = ["primary", "warning", "danger", "success", "danger"]
const BasicInputElements = () => {

  const methods = useForm({
    defaultValues: {
      password: "password",
      statictext: "email@example.com",
      color: "#727cf5",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Input</h4>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-400 mb-4">
            Most common form control, text-based input fields. Includes support for all HTML5
            types: <code className="text-primary">text</code>, <code className="text-primary">password</code>, <code className="text-primary">datetime</code>,
            <code className="text-primary">datetime-local</code>, <code className="text-primary">date</code>, <code className="text-primary">month</code>,
            <code className="text-primary">time</code>, <code className="text-primary">week</code>, <code className="text-primary">number</code>, <code className="text-primary">email</code>,
            <code className="text-primary">url</code>, <code className="text-primary">search</code>, <code className="text-primary">tel</code>, and <code className="text-primary">color</code>.
          </p>

          <form className="grid lg:grid-cols-3 gap-6" onSubmit={handleSubmit(() => { return true; })}>

            <FormInput
              label="Text"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              type="text"
              name="text"
              className="form-input"
              register={register}
              key="text"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Email"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              register={register}
              key="email"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Password"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              type="password"
              name="password"
              className="form-input"
              register={register}
              key="password"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Placeholder"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              type="text"
              name="placeholder"
              placeholder="Placeholder"
              className="form-input"
              register={register}
              key="placeholder"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Readonly"
              type="text"
              name="text1"
              id="text1"
              placeholder="Readonly value"
              readOnly
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              register={register}
              className="form-input"
              key="text1"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Disabled"
              type="text"
              name="text2"
              id="text2"
              placeholder="Disabled value"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              disabled
              className="form-input"
              register={register}
              key="text2"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Date"
              type="date"
              name="date"
              id="date"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input"
              register={register}
              key="text3"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Month"
              type="month"
              name="month"
              id="month"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input"
              register={register}
              key="month"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Time"
              type="time"
              name="time"
              id="time"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input"
              register={register}
              key="time"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Week"
              type="week"
              name="week"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input"
              register={register}
              key="week"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Number"
              type="number"
              name="number"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input"
              register={register}
              key="number"
              errors={errors}
              control={control}
            />

            <FormInput
              label="Color"
              type="color"
              name="color"
              labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
              className="form-input h-10"
              register={register}
              key="color"
              errors={errors}
              control={control}
            />

            <div>
              <label htmlFor="example-select" className="text-gray-800 text-sm font-medium inline-block mb-2">Input Select</label>
              <select className="form-select" id="example-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div>
              <label htmlFor="example-multiselect" className="text-gray-800 text-sm font-medium inline-block mb-2">Multiple
                Select</label>
              <select id="example-multiselect" multiple className="form-input">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const InputGroups = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Input Group</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">
          Easily extend form controls by adding text, buttons, or button groups on either side
          of textual inputs, custom selects, and custom file inputs
        </p>

        <div className="grid lg:grid-cols-3 gap-6">

          <div>
            <div className="flex">
              <div className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                @
              </div>
              <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
            </div>
          </div>
          <div>
            <div className="flex">
              <input type="text" placeholder="Recipient's username" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
              <div className="inline-flex items-center px-4 rounded-e border border-s-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                @example.com
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <div className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                $
              </div>
              <input type="text" placeholder="" className="form-input rounded-none" />
              <div className="inline-flex items-center px-4 rounded-e border border-s-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                .00
              </div>
            </div>
          </div>

          <div>
            <div className="flex rounded-md shadow-sm -space-x-px">
              <span className="px-4 inline-flex items-center rounded-s border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Default</span>
              <input type="text" className="form-input rounded-s-none" />
            </div>
          </div>

          <div>
            <div className="sm:flex rounded-md shadow-sm">
              <input type="text" className="form-input rounded-e-none" />
              <input type="text" className="form-input rounded-s-none" />
              <span className="inline-flex items-center whitespace-nowrap px-4 rounded-e border border-s-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">First and last name</span>
            </div>
          </div>

          <div>
            <div className="relative">
              <input type="email" id="leading-icon" name="leading-icon" className="form-input ps-11" placeholder="you@site.com" />
              <div className="absolute inset-y-0 start-4 flex items-center z-20">
                <i className="mgc_mail_line text-lg text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <input type="text" id="input-with-leading-and-trailing-icon" name="input-with-leading-and-trailing-icon" className="form-input ps-11 pe-14" placeholder="0.00" />
              <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none z-20">
                <span className="text-gray-500">$</span>
              </div>
              <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none z-20">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex rounded-md shadow-sm">
              <div className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">$</span>
              </div>
              <div className="px-4 inline-flex items-center min-w-fit border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">0.00</span>
              </div>
              <input type="text" id="leading-multiple-add-on" name="inline-add-on" className="form-input rounded-s-none" placeholder="www.example.com" />
            </div>
          </div>
          <div>
            <div className="flex rounded-md shadow-sm">
              <button type="button" className="btn btn-sm bg-primary text-white rounded-e-none">
                Button
              </button>
              <input type="text" id="leading-button-add-on" name="leading-button-add-on" className="form-input" />
            </div>
          </div>

          <div>
            <div className="flex rounded-md shadow-sm">
              <button type="button" className="btn btn-sm bg-primary text-white rounded-e-none">
                Button
              </button>
              <button type="button" className="-me-px py-2.5 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white">
                Button
              </button>
              <input type="text" id="leading-button-add-on-multiple-add-ons" name="leading-button-add-on-multiple-add-ons" className="form-input" />
            </div>
          </div>

          <div>
            <div className="flex">
              <div className="inline-flex items-center whitespace-nowrap px-3 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                With textarea
              </div>
              <textarea rows={4} className="form-textarea ltr:rounded-s-none rtl:rounded-e-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Checkboxes = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Checkbox</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h6 className="text-sm mb-2">Default</h6>
            <div className="flex flex-col gap-2">
              <div className="form-check">
                <input type="checkbox" className="form-checkbox rounded text-primary" id="customCheck1" />
                <label className="ms-1.5" htmlFor="customCheck1">Check this checkbox</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-checkbox rounded text-primary" id="customCheck2" />
                <label className="ms-1.5" htmlFor="customCheck2">Check this checkbox</label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="text-sm mb-2">Disabled</h6>

            <div className="flex flex-col gap-2">
              <div className="opacity-75">
                <input type="checkbox" className="form-checkbox rounded text-primary" id="customCheck5" defaultChecked disabled />
                <label className="ms-1.5" htmlFor="customCheck5">Check this checkbox</label>
              </div>
              <div className="opacity-75">
                <input type="checkbox" className="form-checkbox rounded text-primary" id="customCheck6" disabled />
                <label className="ms-1.5" htmlFor="customCheck6">Check this checkbox</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {(colors || []).map((color, idx) => {
              return (
                <div key={idx}>
                  <input className={`form-checkbox rounded text-${color.variant}`} type="checkbox" id={`customckeck${idx + 1}`} defaultChecked />
                  <label className="ms-1.5" htmlFor={`customckeck${idx + 1}`}>{color.name}</label>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            {(colors || []).map((color, idx) => {
              return (
                <div key={idx}>
                  <input className={`form-checkbox rounded-full text-${color.variant}`} type="checkbox" id={`checkBox${idx + 1}`} defaultChecked />
                  <label className="ms-1.5" htmlFor={`checkBox${idx + 1}`}>{color.name}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const Radios = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Radio Button</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h6 className="text-sm mb-2">Default</h6>
            <div className="flex flex-col gap-2">
              <div className="form-check">
                <input type="radio" className="form-radio text-primary" name="formRadio" id="formRadio01" defaultChecked />
                <label className="ms-1.5" htmlFor="formRadio01">Check this radio</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-radio text-primary" name="formRadio" id="formRadio02" />
                <label className="ms-1.5" htmlFor="formRadio02">Check this radio</label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="text-sm mb-2">Disabled</h6>

            <div className="flex flex-col gap-2">
              <div className="opacity-75">
                <input type="radio" className="form-radio text-primary" id="formRadio04" defaultChecked disabled />
                <label className="ms-1.5" htmlFor="formRadio04">Check this radio</label>
              </div>

              <div className="opacity-75">
                <input type="radio" className="form-radio text-primary" id="formRadio05" disabled />
                <label className="ms-1.5" htmlFor="formRadio05">Check this radio</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {(colors || []).map((color, idx) => {
              return (
                <div key={idx}>
                  <input className={`form-radio text-${color.variant}`} type="radio" id={`"formRadio${idx + 1}`} defaultChecked />
                  <label className="ms-1.5" htmlFor={`formRadio${idx + 1}`}>{color.name}</label>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            {(colors || []).map((color, idx) => {
              return (
                <div key={idx}>
                  <input className={`form-radio rounded text-${color.variant}`} type="radio" id={`formRadio${idx + 1}`} defaultChecked />
                  <label className="ms-1.5" htmlFor="formRadio1">{color.name}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const Switches = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Switch</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="grid xl:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2">Default</h6>
            <div className="flex items-center">
              <input className="form-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="ms-1.5" htmlFor="flexSwitchCheckDefault">Default switch checkbox</label>
            </div>
            <div className="flex items-center">
              <input className="form-switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
              <label className="ms-1.5" htmlFor="flexSwitchCheckChecked">Checked switch checkbox</label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2">Disabled</h6>
            <div className="flex items-center opacity-60">
              <input className="form-switch" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />
              <label className="ms-1.5" htmlFor="flexSwitchCheckDisabled">Disabled Switch</label>
            </div>
            <div className="flex items-center opacity-60">
              <input className="form-switch" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" defaultChecked disabled />
              <label className="ms-1.5" htmlFor="flexSwitchCheckCheckedDisabled">Disabled checked Switch</label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2">Colored</h6>
            {(switchColors || []).map((color, idx) => {
              return (
                <div className="flex items-center" key={idx}>
                  <input type="checkbox" id={`formSwitch${idx + 1}`} className={`form-switch text-${color}`} defaultChecked />
                  <label htmlFor={`formSwitch${idx + 1}`} className="ms-1.5">{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2">Square</h6>
            {(switchColors || []).map((color, idx) => {
              return (
                <div className="flex items-center" key={idx}>
                  <input type="checkbox" id={`formSwitch${idx + 1}`} className={`form-switch square text-${color}`} defaultChecked />
                  <label htmlFor={`formSwitch${idx + 1}`} className="ms-2">{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
const FormElements = () => {

  return (
    <>
      <PageBreadcrumb name="Elements" title="Elements" breadCrumbItems={["Konrix", "Forms", "Elements"]} />
      <div className="flex flex-col gap-6">
        <BasicInputElements />
        <InputGroups />

        <div className="grid lg:grid-cols-2 gap-6">
          <Checkboxes />
          <Radios />
          <Switches />
        </div>
      </div>
    </>
  )
};

export default FormElements