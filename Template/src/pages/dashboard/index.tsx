// components
import { PageBreadcrumb } from "../../components"
import Tasks from "./Tasks"
import ProjectChart from "./ProjectChart"
import ProjectSummary from "./ProjectSummary"
import ProjectStates from "./ProjectStates"
import ProjectOverview from "./ProjectOverview"

const Dashboard = () => {
  return (
    <>
      <PageBreadcrumb title='Dashboard' name='Dashboard' breadCrumbItems={['Konrix', 'Menu', 'Dashboard']} />

      <div className="grid 2xl:grid-cols-4 gap-6 mb-6">
        <div className="2xl:col-span-3">
          <Tasks />
          <ProjectChart />
        </div>
        <ProjectSummary />
      </div>
      <ProjectStates />
      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 gap-6">
        <ProjectOverview />
      </div>
    </>
  )
}

export default Dashboard