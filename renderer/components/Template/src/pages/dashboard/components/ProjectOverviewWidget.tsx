interface ProjectOverviewDetail {
  title: string;
  totalProject: number;
  employ: number;
  variant: string;
}

const ProjectOverviewWidget = (props: ProjectOverviewDetail) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <i className={`mgc_round_fill h-10 w-10 flex justify-center items-center rounded-full bg-${props.variant}/25 text-lg text-${props.variant}`}></i>
      </div>
      <div className="flex-grow ms-3">
        <h5 className="fw-semibold mb-1">{props.title}</h5>
        <ul className="flex items-center gap-2">
          <li className="list-inline-item"><b>{props.totalProject}</b> Total Projects</li>
          <li className="list-inline-item">
            <div className="w-1 h-1 rounded bg-gray-400"></div>
          </li>
          <li className="list-inline-item"><b>{props.employ}</b> Employees</li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectOverviewWidget