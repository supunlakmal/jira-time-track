// components
import { PopoverLayout } from "../../components/HeadlessUI"
import { ProjectRate, ProjectSummaryWidget, } from "./components"

// dummy data
import { projectSummaryWidgets } from "./data"

const CompletedProjectRate = () => {
  return (
    <ProjectRate
      title="On Time Completed Rate"
      subtitle="Completed Projects"
      icon="mgc_arrow_up_line"
      progress="65%"
      rate="59%"
      variant="success"
    />
  )
}

const ProjectSummary = () => {
  return (
    <>
      <div className="col-span-1">
        <div className="card mb-6">
          <div className="px-6 py-5 flex justify-between items-center">
            <h4 className="header-title">Project Summary</h4>
            <div>
              <PopoverLayout placement="left-start" togglerClass="text-gray-600 dark:text-gray-400" toggler={<i className="mgc_more_1_fill text-xl" />}>
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
          <div className="px-4 py-2 bg-warning/20 text-warning" role="alert">
            <i className="mgc_folder_star_line me-1 text-lg align-baseline"></i> <b>38</b> Total Admin & Client Projects
          </div>
          <div className="p-6 space-y-3">
            {(projectSummaryWidgets || []).map((summary, idx) => {
              return (
                <ProjectSummaryWidget
                  key={idx}
                  title={summary.title}
                  subtitle={summary.subtitle}
                  icon={summary.icon}
                  variant={summary.variant}
                />
              )
            })}
          </div>
        </div>
        <CompletedProjectRate />
      </div>
    </>
  )
}

export default ProjectSummary