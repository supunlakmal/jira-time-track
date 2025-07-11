
// flag
import usFlag from '../assets/images/flags/us.jpg'
import germanyFlag from '../assets/images/flags/germany.jpg'
import italyFlag from '../assets/images/flags/italy.jpg'
import spainFlag from '../assets/images/flags/spain.jpg'
import russiaFlag from '../assets/images/flags/russia.jpg'
import { PopoverLayout } from './HeadlessUI'

// get the languages and flags
const languages = [
  {
    name: "German",
    flag: germanyFlag,
  },
  {
    name: "Italian",
    flag: italyFlag,
  },
  {
    name: "Spanish",
    flag: spainFlag,
  },
  {
    name: "Russian",
    flag: russiaFlag,
  },
]

const LanguageDropdown = () => {

  const PopoverToggler = () => {
    return (
      <span className="flex items-center justify-center h-6 w-6">
        <img src={usFlag} alt="user-image" className="h-4 w-6" />
      </span>
    )
  }

  return (
    <div className="relative">
      <PopoverLayout placement='bottom-end' toggler={<PopoverToggler />} togglerClass='nav-link p-2'>
        <div className="w-40 z-50 mt-2 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
          {(languages || []).map((lang, idx) => {
            return (
              <a key={idx} href="" className="flex items-center gap-2.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                <img src={lang.flag} alt="user-image" className="h-4" />
                <span className="align-middle">{lang.name}</span>
              </a>
            )
          })}
        </div>
      </PopoverLayout>
    </div>
  )
}

export default LanguageDropdown;