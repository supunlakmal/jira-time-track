import { Link } from 'react-router-dom';

// components
import { PageBreadcrumb } from '../../components';

// logos
import logoDark from '../../assets/images/logo-dark.png'
import logoLight from '../../assets/images/logo-light.png'

const Error500 = () => {
  return (
    <>
      <PageBreadcrumb title='Error 500' />
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col justify-center text-center gap-6">
            <Link to="/" className="flex justify-center mx-auto">
              <img className="h-6 block dark:hidden" src={logoDark} alt="" />
              <img className="h-6 hidden dark:block" src={logoLight} alt="" />
            </Link>
            <p className="text-3xl font-semibold text-gray-600 dark:text-gray-100">500</p>
            <h1 className="text-4xl font-bold tracking-tight dark:text-gray-100">Internal Server Error.</h1>
            <p className="text-base text-gray-600 dark:text-gray-300">Why not try refreshing your page? or you can contact Support.</p>
            <Link to="/" className="text-base font-medium text-primary"> Go back home </Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default Error500