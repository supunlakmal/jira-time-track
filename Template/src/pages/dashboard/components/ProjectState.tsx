// components
import { PopoverLayout } from "../../../components/HeadlessUI";

interface ProjectDetail {
  title: string;
  count: number;
  icon: string;
  variant: string;
}

const ProjectState = (props: ProjectDetail) => {
  return (
    <div className="col-span-1">
      <div className="card">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 me-3">
              <div className={`w-12 h-12 flex justify-center items-center rounded text-${props.variant} bg-${props.variant}/25`}>
                <i className={`${props.icon} text-xl`}></i>
              </div>
            </div>
            <div className="flex-grow">
              <h5 className="mb-1">{props.title}</h5>
              <p>{props.count}</p>
            </div>
            <div>
              <PopoverLayout placement="left-start" toggler={<i className="mgc_more_2_fill text-xl"></i>} togglerClass="text-gray-600 dark:text-gray-400">
                <div className="w-36 z-50 mt-2 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                  <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" href="">
                    Today
                  </a>
                  <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" href="">
                    Yesterday
                  </a>
                  <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="">
                    Last Week
                  </a>
                  <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="">
                    Last Month
                  </a>
                </div>
              </PopoverLayout>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectState