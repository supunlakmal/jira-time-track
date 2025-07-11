import { Link } from 'react-router-dom';

// logos
import logoDark from '../../assets/images/logo-dark.png'
import logoLight from '../../assets/images/logo-light.png'

// components
import { PageBreadcrumb } from '../../components';

const ComingSoon = () => {
  return (
    <>
      <PageBreadcrumb title='Coming Soon' />
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col justify-center text-center gap-6">
            <Link to="/" className="flex justify-center mx-auto">
              <img className="h-6 block dark:hidden" src={logoDark} alt="" />
              <img className="h-6 hidden dark:block" src={logoLight} alt="" />
            </Link>
            <i className="mgc_rocket_line text-4xl text-gray-600 dark:text-gray-100 -rotate-45 my-4"></i>
            <h1 className="text-2xl font-bold tracking-tight dark:text-gray-100">Stay tunned, we're launching very soon</h1>
            <p className="text-base text-gray-600 dark:text-gray-300">We're making the system more awesome.</p>
          </div>
        </div>
      </div>
    </>
  )
};

export default ComingSoon