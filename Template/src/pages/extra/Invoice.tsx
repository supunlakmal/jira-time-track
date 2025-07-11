//images
import logoDark from '../../assets/images/logo-dark.png'
import { PageBreadcrumb } from "../../components";
const Invoice = () => {
  return (
    <>
      <PageBreadcrumb title='Invoice' name='Invoice' breadCrumbItems={["Konrix", "Extra Pages", "Invoice"]} />
      <div className="card p-6">
        <div className="flex justify-between">
          <div>
            <img className="h-6" src={logoDark} alt="" />

            <h1 className="mt-2 text-lg md:text-xl font-semibold text-primary dark:text-white">Coderthemes Inc.</h1>
          </div>
          <div className="text-end">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">Invoice #</h2>
            <span className="mt-1 block text-gray-500">3682303</span>

            <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
              45 Roker Terrace<br />
              Latheronwheel<br />
              KW5 8NW, London<br />
              United Kingdom<br />
            </address>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bill to:</h3>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sara Williams</h3>
            <address className="mt-2 not-italic text-gray-500">
              280 Suzanne Throughway,<br />
              Breannabury, OR 45801,<br />
              United States<br />
            </address>
          </div>
          <div className="sm:text-end space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Invoice date:</dt>
                <dd className="col-span-2 text-gray-500">03/10/2018</dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Due date:</dt>
                <dd className="col-span-2 text-gray-500">03/11/2018</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
            <div className="grid grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase">Qty</div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase">Rate</div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
            </div>
            <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                <p className="font-medium text-gray-800 dark:text-gray-200">Design UX and UI</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                <p className="text-gray-800 dark:text-gray-200">1</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                <p className="text-gray-800 dark:text-gray-200">5</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                <p className="sm:text-end text-gray-800 dark:text-gray-200">$500</p>
              </div>
            </div>

            <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                <p className="font-medium text-gray-800 dark:text-gray-200">Web project</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                <p className="text-gray-800 dark:text-gray-200">1</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                <p className="text-gray-800 dark:text-gray-200">24</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                <p className="sm:text-end text-gray-800 dark:text-gray-200">$1250</p>
              </div>
            </div>

            <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                <p className="font-medium text-gray-800 dark:text-gray-200">SEO</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                <p className="text-gray-800 dark:text-gray-200">1</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                <p className="text-gray-800 dark:text-gray-200">6</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                <p className="sm:text-end text-gray-800 dark:text-gray-200">$2000</p>
              </div>
            </div>
          </div>
        </div>



        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-2xl sm:text-end space-y-2">

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Subtotal:</dt>
                <dd className="col-span-2 text-gray-500">$2750.00</dd>
              </dl>

              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Total:</dt>
                <dd className="col-span-2 text-gray-500">$2750.00</dd>
              </dl>

              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Tax:</dt>
                <dd className="col-span-2 text-gray-500">$39.00</dd>
              </dl>

              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Amount paid:</dt>
                <dd className="col-span-2 text-gray-500">$2789.00</dd>
              </dl>

              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Due balance:</dt>
                <dd className="col-span-2 text-gray-500">$0.00</dd>
              </dl>
            </div>

          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Thank you!</h4>
          <p className="text-gray-500">If you have any questions concerning this invoice, use the following contact information:</p>
          <div className="mt-2">
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">example@site.com</p>
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">+1 (062) 109-9222</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="mt-5 text-sm text-gray-500">© 2023 Coderthemes.</p>

          <div className="flex gap-2 items-center print:hidden">
            <button onClick={() => window.print()} className="btn bg-primary text-white"><i className="mgc_print_line text-lg me-1"></i> Print</button>
            <a href="" className="btn bg-info text-white">Submit</a>
          </div>
        </div>
      </div>
    </>
  )
};

export default Invoice