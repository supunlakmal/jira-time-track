import React from 'react'
import { Link } from 'react-router-dom'

// components
import { PageBreadcrumb } from '../../../../components'

// dummy data
import { aboutProjects, projectActivities, projectOverviews } from './data'

const ProjectOverview = () => {
  return (
    <div className="lg:col-span-3">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Project Overview</h6>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-4 gap-6">

            {(projectOverviews || []).map((project, idx) => {
              return (
                <div className="flex items-center gap-5" key={idx}>
                  <i className={`${project.icon} text-5xl  h-10 w-10`}></i>
                  <div className="">
                    <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">{project.count}</h4>
                    <span className="text-sm">{project.title}</span>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

const AboutProject = () => {
  return (
    <div className="lg:col-span-2">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">About Project</h4>
        </div>
        <div className="p-6">
          <div>
            <p className="text-gray-500 mb-4 text-sm">To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth.</p>
            <p className="text-gray-500 mb-4 text-sm">Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
            <ul className="ps-9 mb-9 list-disc">
              <li>Quis autem vel eum iure</li>
              <li>Ut enim ad minima veniam</li>
              <li>Et harum quidem rerum</li>
              <li>Nam libero cum soluta</li>
            </ul>
            <div className="mb-6">
              <h6 className="font-medium my-3 text-gray-800">Tags</h6>
              <div className="uppercase flex gap-4">

                {(aboutProjects || []).map((project, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <Link to="#" className="inline-flex items-center font-semibold py-1 px-2 rounded text-xs bg-primary/20 text-primary">{project.tag}</Link>
                    </React.Fragment>
                  )
                })}

              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <div>
                  <p className="mb-3 text-sm uppercase font-medium"><i className="uil-calender text-red-500 text-base"></i> Start Date</p>
                  <h5 className="text-base text-gray-700 dark:text-gray-300 font-medium">15 July, 2019</h5>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm uppercase font-medium"><i className="uil-calendar-slash text-red-500 text-base"></i> Due Date</p>
                <h5 className="text-base text-gray-700 dark:text-gray-300 font-medium">21 Nov, 2020</h5>
              </div>
              <div>
                <p className="mb-3 text-sm uppercase font-medium"><i className="uil-dollar-alt text-red-500 text-base"></i> Budget</p>
                <h5 className="text-base text-gray-700 dark:text-gray-300 font-medium">$13,250</h5>
              </div>
              <div>
                <p className="mb-3 text-sm uppercase font-medium"><i className="uil-user text-red-500 text-base"></i> Owner</p>
                <h5 className="text-base text-gray-700 dark:text-gray-300 font-medium">Rick Perry</h5>
              </div>
            </div>
            <div className="mt-6">
              <h6 className="text-sm text-gray-800 font-medium mb-3">Assign To</h6>
              <div className="flex flex-wrap -space-x-2">

                {(aboutProjects || []).map((project, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {(project.assignee || []).map((image, idx) => {
                        return (
                          <Link to="#" key={idx}>
                            <img className="inline-block h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src={image} alt="Image Description" />
                          </Link>
                        )
                      })}
                    </React.Fragment>
                  )
                })}

              </div>
            </div>

            <div className="mt-6">
              <h6 className="text-gray-800 font-medium mb-3">Attached Files</h6>
              <div className="grid md:grid-cols-4 gap-3">

                {(aboutProjects || []).slice(0, 2).map((project, idx) => {
                  return (
                    <div key={idx} className="p-2 border border-gray-200 dark:border-gray-700 rounded mb-2">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded flex justify-center items-center text-primary bg-primary/20 me-3">
                          <i className="mgc_file_new_line text-xl"></i>
                        </div>
                        <div className="">
                          <Link to="" className="text-sm font-medium">{project.attachments}</Link>
                        </div>
                        <div>
                          <Link to="" className="p-2"><i className="mgc_download_line text-xl"></i></Link>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectActivities = () => {
  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Project Activities</h6>
        </div>
        <div className="table overflow-hidden w-full">
          <div className="divide-y divide-gray-300 dark:divide-gray-700 overflow-auto w-full max-w-full">

            {(projectActivities || []).map((record, idx) => {
              return (
                <div className="p-3" key={idx}>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={record.image} alt="" />
                    </div>
                    <div className="flex-grow truncate">
                      <div className="font-medium text-gray-900 dark:text-gray-300">{record.name}</div>
                      <p className="text-gray-600 dark:text-gray-400">{record.email}</p>
                    </div>
                    <div className="px-3 py-1 md:block hidden rounded text-xs font-medium">{record.field}</div>
                    <div className="ms-auto">
                      <div className={`${(record.status === "Stop") ? "bg-danger/25 text-danger" : (record.status === "Working") ? "bg-primary/25 text-primary" : "bg-success/25 text-success"} px-3 py-1 rounded text-xs font-medium`}>{record.status}</div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectDetail = () => {
  return (
    <>
      <PageBreadcrumb name='Project Detail' title='Project Detail' breadCrumbItems={["Konrix", "Project", "Project Detail"]} />
      <div className="grid lg:grid-cols-3 gap-6">
        <ProjectOverview />
        <AboutProject />
        <ProjectActivities />
      </div>
    </>
  )
};

export default ProjectDetail