import { ApexOptions } from "apexcharts"
import SimpleBar from "simplebar-react"
import ReactApexChart from "react-apexcharts"

// components
import { PopoverLayout } from "../../components/HeadlessUI"
import { ProjectOverviewWidget, ProjectTask, ProjectTeamMember, } from "./components"

// dummy data
import { dailyTasks, projectOverviewDetails, teamMembers } from "./data"

const ProjectOverviewDetail = () => {
  const projectOverviewChart: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar'
    },
    colors: ["#3073F1", "#ff679b", "#0acf97", "#ffbc00"],
    series: [85, 70, 80, 65],
    labels: ['Product Design', 'Web Development', 'Illustration Design', 'UI/UX Design'],
    plotOptions: {
      radialBar: {
        track: {
          margin: 5,
        }
      }
    }
  }

  return (
    <div className="2xl:col-span-2 md:col-span-2">
      <div className="card">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Project Overview</h4>
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

          <div className="grid md:grid-cols-2 items-center gap-4">
            <div className="md:order-1 order-2">
              <div className="flex flex-col gap-6">
                {(projectOverviewDetails || []).map((project, idx) => {
                  return (
                    <ProjectOverviewWidget
                      key={idx}
                      title={project.title}
                      totalProject={project.totalProject}
                      employ={project.employ}
                      variant={project.variant}
                    />
                  )
                })}
              </div>
            </div>

            <div className="md:order-2 order-1">
              <ReactApexChart
                height={350}
                options={projectOverviewChart}
                series={projectOverviewChart.series}
                type="radialBar"
              />
              <div id="project-overview-chart" className="apex-charts" data-colors="#3073F1,#ff679b,#0acf97,#ffbc00"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DailyTask = () => {
  return (
    <>
      <div className="col-span-1">
        <div className="card h-full">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Daily Task</h4>
              <div>
                <select className="form-input form-select-sm">
                  <option defaultChecked>Today</option>
                  <option value="1">Yesterday</option>
                  <option value="2">Tomorrow</option>
                </select>
              </div>
            </div>
          </div>
          <div className="py-6">
            <SimpleBar className="px-6" data-simplebar style={{ maxHeight: 304 }}>
              <div className="space-y-4">
                {(dailyTasks || []).map((project, idx) => {
                  return (
                    <ProjectTask
                      key={idx}
                      title={project.title}
                      time={project.time}
                      description={project.description}
                      people={project.people}
                    />
                  )
                })}
                <div className="flex items-center justify-center">
                  <div className="animate-spin flex">
                    <i className="mgc_loading_2_line text-xl"></i>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </>
  )
}

const TeamMember = () => {
  return (
    <div className="col-span-1">
      <div className="card h-full">
        <div className="card-header flex justify-between items-center">
          <h4 className="card-title">Team Members</h4>
          <div>
            <select className="form-select form-select-sm">
              <option defaultChecked>Active</option>
              <option value="1">Offline</option>
            </select>
          </div>
        </div>
        <div className="py-6">
          <SimpleBar className="px-6" data-simplebar style={{ maxHeight: 304 }}>
            <div className="space-y-6">
              {(teamMembers || []).map((member, idx) => {
                return (
                  <ProjectTeamMember
                    key={idx}
                    name={member.name}
                    exprience={member.exprience}
                    image={member.image}
                    tech={member.tech}
                  />
                )
              })}
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  )
}

const ProjectOverview = () => {

  return (
    <>
      <ProjectOverviewDetail />
      <DailyTask />
      <TeamMember />
    </>
  )
}

export default ProjectOverview