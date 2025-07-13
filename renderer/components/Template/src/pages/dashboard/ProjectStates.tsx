// components
import { ProjectState } from "./components"

// data
import { projectStates } from "./data"

const ProjectStates = () => {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
        {(projectStates || []).map((project, idx) => {
          return (
            <ProjectState
              key={idx}
              title={project.title}
              count={project.count}
              icon={project.icon}
              variant={project.variant}
            />
          )
        })}
      </div>
    </>
  )
}

export default ProjectStates