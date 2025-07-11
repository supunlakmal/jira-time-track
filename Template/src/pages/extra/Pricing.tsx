import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components";

const Pricing = () => {
  return (
    <>
      <PageBreadcrumb title='Pricing' name='Pricing' breadCrumbItems={["Konrix", "Extra Pages", "Pricing"]} />

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Find the right plan for your team</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Pay as you go service, cancel anytime.</p>
        </div>
        <div className="mt-12 relative before:absolute before:inset-0 before:-z-[1] before:bg-[radial-gradient(closest-side,#cbd5e1,transparent)] dark:before:bg-[radial-gradient(closest-side,#334155,transparent)]">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 lg:items-center">

            <div className="flex flex-col h-full text-center">
              <div className="bg-white pt-8 pb-5 px-8 dark:bg-gray-800">
                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200">Free</h4>
              </div>
              <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-gray-800">
                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-gray-200">
                  Free
                </span>
              </div>
              <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-gray-800">
                <ul className="space-y-2.5 text-center text-sm">
                  <li className="text-gray-800 dark:text-gray-400">
                    1 user
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Plan features
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Product support
                  </li>
                </ul>
              </div>
              <div className="bg-white py-8 px-8 dark:bg-gray-800">
                <Link className="btn btn-lg border-primary text-primary hover:bg-primary hover:text-white" to="#">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="flex flex-col h-full text-center">
              <div className="bg-white pt-8 pb-5 px-8 dark:bg-gray-800">
                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200">Startup</h4>
              </div>
              <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-gray-800">
                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-gray-200">
                  <span className="font-bold text-2xl me-1">$</span>
                  39
                </span>
              </div>
              <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-gray-800">
                <ul className="space-y-2.5 text-center text-sm">
                  <li className="text-gray-800 dark:text-gray-400">
                    2 users
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Plan features
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Product support
                  </li>
                </ul>
              </div>
              <div className="bg-white py-8 px-8 dark:bg-gray-800">
                <Link className="btn btn-lg border-primary text-primary hover:bg-primary hover:text-white" to="#">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="flex flex-col h-full text-center">
              <div className="bg-white pt-8 pb-5 px-8 dark:bg-gray-800">
                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200">Team</h4>
              </div>
              <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-gray-800">
                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-gray-200">
                  <span className="font-bold text-2xl me-1">$</span>
                  89
                </span>
              </div>
              <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-gray-800">
                <ul className="space-y-2.5 text-center text-sm">
                  <li className="text-gray-800 dark:text-gray-400">
                    5 users
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Plan features
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Product support
                  </li>
                </ul>
              </div>
              <div className="bg-white py-8 px-8 dark:bg-gray-800">
                <Link className="btn btn-lg border-primary text-primary hover:bg-primary hover:text-white" to="#">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="flex flex-col h-full text-center">
              <div className="bg-white pt-8 pb-5 px-8 dark:bg-gray-800">
                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200">Enterprise</h4>
              </div>
              <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-gray-800">
                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-gray-200">
                  <span className="font-bold text-2xl me-1">$</span>
                  149
                </span>
              </div>
              <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-gray-800">
                <ul className="space-y-2.5 text-center text-sm">
                  <li className="text-gray-800 dark:text-gray-400">
                    10 users
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Plan features
                  </li>
                  <li className="text-gray-800 dark:text-gray-400">
                    Product support
                  </li>
                </ul>
              </div>
              <div className="bg-white py-8 px-8 dark:bg-gray-800">
                <Link className="btn btn-lg border-primary text-primary hover:bg-primary hover:text-white" to="#">
                  Sign up
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default Pricing