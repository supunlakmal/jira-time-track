interface ProjectOnTimeRate {
  title: string;
  subtitle: string;
  icon: string;
  rate: string;
  progress: string;
  variant: string;
}

const ProjectRate = (props: ProjectOnTimeRate) => {
  return (
    <div className="card p-6">
      <h4 className="text-gray-600 dark:text-gray-300 mb-2.5">{props.title}&nbsp;<span className={`px-2 py-0.5 rounded bg-${props.variant}/25 text-${props.variant} ms-2`}><i className={`${props.icon} text-sm align-baseline me-1`}></i>{props.rate}</span></h4>
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-base font-semibold">{props.subtitle}</h5>
        <h5 className="text-gray-600 dark:text-gray-300">{props.progress}</h5>
      </div>
      <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ">
        <div className="flex flex-col justify-center overflow-hidden bg-primary w-7/12" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}></div>
      </div>
    </div>
  )
}

export default ProjectRate