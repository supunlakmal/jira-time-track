import { Link } from 'react-router-dom';

// components
import { PageBreadcrumb } from '../../components';

//logo
import logoDark from '../../assets/images/logo-dark.png'
import logoLight from '../../assets/images/logo-light.png'

const Maintenance = () => {
  return (
    <>
      <PageBreadcrumb title='Maintenance' />
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col justify-center text-center gap-6">
            <Link to="/" className="flex justify-center mx-auto">
              <img className="h-6 block dark:hidden" src={logoDark} alt="" />
              <img className="h-6 hidden dark:block" src={logoLight} alt="" />
            </Link>
            <p className="text-3xl font-semibold text-primary">Site under Re:build</p>
            <h1 className="text-4xl font-bold tracking-tight dark:text-gray-100">We are under scheduled maintenance.</h1>
            <p className="text-base text-gray-600 dark:text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
            <Link to="/" className="text-base font-medium text-primary"> Go back home </Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default Maintenance