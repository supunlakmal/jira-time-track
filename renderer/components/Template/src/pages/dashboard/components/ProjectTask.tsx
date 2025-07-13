interface ProjectDailyTask {
  title: string;
  time: string;
  description: string;
  people: number;
}

const ProjectTask = (props: ProjectDailyTask) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded p-2">
      <ul className="flex items-center gap-2 mb-2">
        <a href="" className="text-base text-gray-600 dark:text-gray-400">{props.title}</a>
        <i className="mgc_round_fill text-[5px]"></i>
        <h5 className="text-sm font-semibold">{props.time}</h5>
      </ul>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{props.description}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm"><i className="mgc_group_line text-xl me-1 align-middle"></i> <b>{props.people}</b> People</p>
    </div>
  )
}

export default ProjectTask