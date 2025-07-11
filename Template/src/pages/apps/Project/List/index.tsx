// components
import { PageBreadcrumb } from '../../../../components'

// dummy data
import { projects } from './data'

const ProjectList = () => {
  return (
    <>
      <PageBreadcrumb title='Project List' name='Project List' breadCrumbItems={["Konrix", "Project", "Project List"]} />
      <div className="flex flex-auto flex-col">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(projects || []).map((project, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-header">
                  <div className="flex justify-between items-center">
                    <h5 className="card-title">{project.heading}</h5>
                    <div className={`${(project.state === "Completed") ? "bg-success" : (project.state === "Pending") ? "bg-warning/60" : "bg-success"} text-xs text-white rounded-md py-1 px-1.5 font-medium`} role="alert">
                      <span>{project.state}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="py-3 px-6">
                    <h5 className="my-2"><a href="" className="text-slate-900 dark:text-slate-200">{project.title}</a></h5>
                    <p className="text-gray-500 text-sm mb-9">{project.shortDesc}</p>

                    <div className="flex -space-x-2">
                      {project.assignee.image && (project.assignee.image || []).map((member, idx) => {
                        return (
                          <a href="" key={idx}>
                            <img className="inline-block h-12 w-12 rounded-full border-2 border-white dark:border-gray-700" src={member} alt="Image Description" />
                          </a>
                        )
                      })}
                      {project.assignee.more &&
                        <a href="">
                          <div className="relative inline-flex">
                            <button className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 border-2 border-white font-medium text-gray-700 shadow-sm align-middle dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all text-sm">
                              <span className="font-medium leading-none">{project.assignee.more}</span>
                            </button>
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                  <div className="border-t p-5 border-gray-300 dark:border-gray-700">
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <a href="" className="text-sm">
                          <i className="mgc_calendar_line text-lg me-2"></i>&nbsp;
                          <span className="align-text-bottom">{project.date}</span>
                        </a>

                        <a href="" className="text-sm">
                          <i className="mgc_align_justify_line text-lg me-2"></i>&nbsp;
                          <span className="align-text-bottom">{project.totalTasks}</span>
                        </a>

                        <a href="" className="text-sm">
                          <i className="mgc_comment_line text-lg me-2"></i>&nbsp;
                          <span className="align-text-bottom">{project.totalComments}</span>
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div className={`bg-${project.variant} h-1.5 rounded-full dark:bg-${project.variant} w-2/3`}></div>
                        </div>
                        <span>{project.progress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-6">
          <button type="button" className="btn bg-transparent border-gray-300 dark:border-gray-700">
            <i className="mgc_loading_4_line me-2 animate-spin"></i>
            <span>Load More</span>
          </button>
        </div>

      </div>
    </>
  )
};

export default ProjectList