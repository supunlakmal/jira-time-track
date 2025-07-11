// components
import { PopoverLayout } from "../../../components/HeadlessUI";

interface TaskWidgetProps {
  avatar1: string;
  avatar2: string;
  title: string;
  time: string;
}

const TaskWidget = (props: TaskWidgetProps) => {
  return (
    <div className="card">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-base mb-1 text-gray-600 dark:text-gray-400">{props.title}</h4>
            <p className="font-normal text-sm text-gray-400 truncate dark:text-gray-500">New Task Assign</p>
          </div>
          <div>
            <PopoverLayout placement="left-start" toggler={<i className="mgc_more_1_fill text-xl"></i>} togglerClass="text-gray-600 dark:text-gray-400">
              <div className="w-36 z-50 mt-2 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" href="">
                  <i className="mgc_add_circle_line"></i> Add
                </a>
                <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" href="">
                  <i className="mgc_edit_line"></i> Edit
                </a>
                <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="">
                  <i className="mgc_copy_2_line"></i> Copy
                </a>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2 -mx-2"></div>
                <a className="flex items-center gap-1.5 py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-danger hover:bg-danger/5" href="">
                  <i className="mgc_delete_line"></i> Delete
                </a>
              </div>
            </PopoverLayout>
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex-grow">
            <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> {props.time} </p>
          </div>
          <div className="flex">
            <a href="">
              <img src={props.avatar1} className="rounded-full h-8 w-8 border-2 border-gray-300 dark:border-gray-700" alt="friend" />
            </a>
            <a href="" className="-ms-2">
              <img src={props.avatar2} className="rounded-full h-8 w-8 border-2 border-gray-300 dark:border-gray-700" alt="friend" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskWidget