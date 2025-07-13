import Link from 'next/link';
import { useRouter } from 'next/router';

import { ProfileMenuItem } from '../layouts/Topbar';
import React from 'react';
import { PopoverLayout } from './HeadlessUI';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

interface ProfileDropDownProps {
  menuItems: Array<ProfileMenuItem>;
  profiliePic?: string;
}

const ProfileDropDown = ({ menuItems, profiliePic }: ProfileDropDownProps) => {

  const router = useRouter();
  const { user, userLoggedIn, logout, resetAuth } = useAuth();

  const PopoverToggler = () => {
    return (
      <Image src={profiliePic} alt="user-image" className="rounded-full h-10" />
    )
  }

  const handleLogout = () => {
    resetAuth();
    logout();
    if (userLoggedIn || user) {
      router.push("/auth/login");
    }
  }

  return (
    <div className="relative">
      <PopoverLayout placement='bottom-end' toggler={<PopoverToggler />} togglerClass='nav-link' menuClass='w-44 z-50 mt-2 bg-white shadow-lg border rounded-lg p-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800'>
        {(menuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Link className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href={item.redirectTo}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </Link>
            </React.Fragment>
          )
        })}
        <hr className="my-2 -mx-2 border-gray-200 dark:border-gray-700" />
        <button className="w-full flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" onClick={handleLogout}>
          <i className='mgc_exit_line me-2' />
          <span>Logout</span>
        </button>
      </PopoverLayout>
    </div>
  )
}

export default ProfileDropDown