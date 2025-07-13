import { FormInput, PageBreadcrumb, VerticalForm } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const Validation = () => {

  interface UserData {
    email: string
    password: string
    address: string
    address2: string
    city: string
    state: string
    zip: number
  }

  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().required("Please Enter Email"),
      password: yup.string().required("Please Enter Password"),
      address: yup.string().required("Please Enter Address line 1"),
      address2: yup.string().required("Please Enter Address line 2"),
      city: yup.string().required("Please Enter City"),
      state: yup.string().required("Please Select State"),
      zip: yup.number().required("Please Enter ZIP"),
    })
  );

  const handleFormData = () => {
    ''
  };

  return (
    <>
      <PageBreadcrumb title='Form Validation' name='Validation' breadCrumbItems={["Konrix", "Form", "Validation"]} />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Browser defaults</h4>
            </div>
          </div>
          <div className="p-6">
            <form>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="validationDefault01" className="text-gray-800 text-sm font-medium inline-block mb-2">First name</label>
                  <input type="text" className="form-input" id="validationDefault01" defaultValue="Mark" required />
                </div>
                <div>
                  <label htmlFor="validationDefault02" className="text-gray-800 text-sm font-medium inline-block mb-2">Last name</label>
                  <input type="text" className="form-input" id="validationDefault02" defaultValue="Otto" required />
                </div>
                <div>
                  <label htmlFor="validationDefaultUsername" className="text-gray-800 text-sm font-medium inline-block mb-2">Username</label>
                  <div className="flex items-center">
                    <span className="py-2 px-3 bg-light rounded-l" id="inputGroupPrepend2">@</span>
                    <input type="text" className="form-input rounded-l-none" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="validationDefault03" className="text-gray-800 text-sm font-medium inline-block mb-2">City</label>
                  <input type="text" className="form-input" id="validationDefault03" required />
                </div>
                <div>
                  <label htmlFor="validationDefault04" className="text-gray-800 text-sm font-medium inline-block mb-2">State</label>
                  <select className="form-select" id="validationDefault04" required>
                    <option defaultChecked disabled defaultValue="">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="validationDefault05" className="text-gray-800 text-sm font-medium inline-block mb-2">Zip</label>
                  <input type="text" className="form-input" id="validationDefault05" required />
                </div>
                <div className="lg:col-span-3 sm:col-span-2 col-span-1">
                  <div className="form-check">
                    <input className="form-checkbox rounded" type="checkbox" defaultValue="" id="invalidCheck2" required />
                    <label className="ms-1.5" htmlFor="invalidCheck2">
                      Agree to terms and conditions
                    </label>
                  </div>
                </div>
                <div className="lg:col-span-3 sm:col-span-2 col-span-1">
                  <button className="btn bg-primary text-white" type="submit">Submit form</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">React Hook Form Validation</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-400 text-sm mb-4">More details about React-hook-form please read <a target="_blank" href="https://www.react-hook-form.com/" className="text-primary">on here</a></p>
            <VerticalForm<UserData>
              onSubmit={handleFormData}
              resolver={schemaResolver}
              formClass="valid-form grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6"
            >

                <FormInput
                  name='email'
                  type='email'
                  label='Email'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                />

                <FormInput
                  name='password'
                  type='password'
                  label='Password'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                />

                <FormInput
                  name='address'
                  type='text'
                  label='Address'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                  placeholder="1234 Main St"
                />

                <FormInput
                  name='address2'
                  type='text'
                  label='Address2'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                  placeholder="Apartment, studio, or floor"
                />

                <FormInput
                  name='city'
                  type='text'
                  label='City'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                />

                <FormInput
                  name='state'
                  type='select'
                  label='State'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className="form-input"
                >
                  <option>Choose...</option>
                  <option>...</option>
                </FormInput>

                <FormInput
                  name='zip'
                  type='text'
                  label='Zip'
                  labelClassName='text-gray-800 text-sm font-medium inline-block mb-2'
                  className='form-input'
                />

              <div className="form-group lg:col-span-3 sm:col-span-2 col-span-1">
                <div className="form-check flex items-center">

                  <FormInput
                    name='checkbox'
                    type='checkbox'
                    className='form-checkbox rounded'
                    id='checked-demo'
                    defaultChecked
                    required
                  />

                  <label className="ms-1.5" htmlFor="checked-demo">
                    I agree to the Terms of Use
                  </label>
                </div>
              </div>

              <div className="form-group lg:col-span-3 sm:col-span-2 col-span-1">
                <button type="submit" className="btn bg-primary text-white">Register Now</button>
              </div>
            </VerticalForm>
          </div>
        </div>
      </div>

    </>
  )
};

export default Validation