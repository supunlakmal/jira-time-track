
// components
import { FormInput, PageBreadcrumb } from "../../components";

const BasicForm = () => {
  return (
    <div className="lg:col-span-6 col-span-12">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Basic Example</h4>
          </div>
        </div>
        <div className="p-6">
          <form>
            <div className="mb-3">
              <FormInput
                label="Email address"
                labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-input"
                key="email"
              />
              <small id="emailHelp" className="form-text text-sm text-slate-700 dark:text-slate-400">We'll never share your email
                with anyone else.</small>
            </div>
            <div className="mb-3">
              <FormInput
                label="Password"
                labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                type="password"
                name="password1"
                placeholder="Password"
                className="form-input"
                key="password1"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <FormInput
                type="checkbox"
                name="checkbox"
                className="form-checkbox rounded border border-gray-200"
                key="checkbox"
              />
              <label className="text-gray-800 text-sm font-medium inline-block" htmlFor="checkmeout0">Check me out !</label>
            </div>
            <button type="submit" className="btn bg-primary text-white">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const HorizontalForm = () => {
  return (
    <div className="lg:col-span-6 col-span-12">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Horizontal form</h4>
          </div>
        </div>
        <div className="p-6">
          <form className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="inputEmail3" className="text-gray-800 text-sm font-medium inline-block mb-2">Email</label>
              <div className="md:col-span-3">
                <FormInput
                  type="email"
                  name="Email2"
                  placeholder="Email"
                  className="form-input"
                  key="email2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="inputPassword3" className="text-gray-800 text-sm font-medium inline-block mb-2">Password</label>
              <div className="md:col-span-3">
                <FormInput
                  type="password"
                  name="password2"
                  placeholder="Password"
                  className="form-input"
                  key="password2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="inputPassword5" className="text-gray-800 text-sm font-medium inline-block mb-2">Re Password</label>
              <div className="md:col-span-3">
                <FormInput
                  type="password"
                  name="password3"
                  placeholder="Retype Password"
                  className="form-input"
                  key="Retype-password"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <div className="md:col-start-2">
                <div className="flex items-center gap-2">
                  <FormInput
                    type="checkbox"
                    name="checkbox2"
                    className="form-checkbox rounded border border-gray-200"
                    key="checkbox2"
                  />
                  <label className="text-gray-800 text-sm font-medium inline-block" htmlFor="checkmeout">Check me out !</label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <div className="md:col-start-2">
                <button type="submit" className="btn bg-info text-white">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const SizingForm = () => {
  return (
    <div className="col-span-12">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Sizing</h4>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">
            As shown in the previous examples, our grid system allows you to place any number of a <code className="text-primary">.grid-cols-*</code> and <code className="text-primary">.flex</code>
          </p>

          <form className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <FormInput
                labelClassName="sr-only"
                type="email"
                name="email2"
                className="form-input"
                defaultValue="email@example.com"
                key="email2"
              />
            </div>
            <div>
              <FormInput
                labelClassName="sr-only"
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                key="password"
              />
            </div>
            <div>
              <button type="submit" className="btn bg-primary text-white">Confirm identity</button>
            </div>
          </form>

          <form>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <FormInput
                  labelClassName="sr-only"
                  type="text"
                  name="text"
                  className="form-input"
                  placeholder="Jane Doe"
                  key="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                <div className="flex">
                  <span className="px-4 inline-flex items-center min-w-fit rounded-l border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">@</span>
                  <input type="text" className="form-input rounded-l-none" placeholder="Username" />
                </div>
              </div>
              <div>
                <button type="submit" className="btn bg-primary text-white">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const GridForm = () => {
  return (
    <div className="col-span-12">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Grid</h4>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">More complex layouts can also be created with the grid system.</p>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              <div>
                <FormInput
                  label="Email"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="email"
                  name="email3"
                  className="form-input"
                  placeholder="Email"
                  key="email3"
                />
              </div>
              <div>
                <FormInput
                  label="Password"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="password"
                  name="password4"
                  placeholder="Password"
                  className="form-input"
                  key="password4"
                />
              </div>

              <div className="lg:col-span-2">
                <FormInput
                  label="Address"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="1234 Main St"
                  key="address"
                />
              </div>

              <div>
                <FormInput
                  label="Address 2"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="text"
                  name="address2"
                  className="form-input"
                  placeholder="Apartment, studio, or floor"
                  key="address2"
                />
              </div>

              <div>
                <FormInput
                  label="City"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="text"
                  name="city"
                  className="form-input"
                  key="city"
                />
              </div>

              <div>
                <label htmlFor="inputState" className="text-gray-800 text-sm font-medium inline-block mb-2">State</label>
                <select id="inputState" className="form-select">
                  <option>Choose</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>

              <div>
                <FormInput
                  label="Zip"
                  labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
                  type="text"
                  name="zip"
                  className="form-input"
                  key="zip"
                />
              </div>

            </div>
            <div className="flex items-center gap-2 my-3">
              <input type="checkbox" className="form-checkbox rounded border border-gray-200" id="customCheck11" />
              <label className="text-gray-800 text-sm font-medium inline-block" htmlFor="customCheck11">Check this custom checkbox !</label>
            </div>
            <button type="submit" className="btn bg-primary text-white">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  )
}
const FormLayout = () => {
  return (
    <>
      <PageBreadcrumb name="Form Layout" title="Form Layout" breadCrumbItems={["Konrix", "Form", "Form Layout"]} />
      <div className="grid grid-cols-12 gap-6">
        <BasicForm />
        <HorizontalForm />
        <SizingForm />
        <GridForm />
      </div>
    </>
  )
};

export default FormLayout