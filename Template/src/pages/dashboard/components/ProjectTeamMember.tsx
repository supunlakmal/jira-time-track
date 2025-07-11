interface ProjectTeam {
  name: string;
  tech: string;
  exprience: string;
  image: string;
}

const ProjectTeamMember = (props: ProjectTeam) => {
  return (
    <div className="flex items-center">
      <img className="me-3 rounded-full" src={props.image} width="40" alt="Generic placeholder image" />
      <div className="w-full overflow-hidden">
        <h5 className="font-semibold"><a href="" className="text-gray-600 dark:text-gray-400">{props.name}</a></h5>
        <div className="flex items-center gap-2">
          <div>{props.tech}</div>
          <i className="mgc_round_fill text-[5px]"></i>
          <div>{props.exprience} Year Experience</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTeamMember