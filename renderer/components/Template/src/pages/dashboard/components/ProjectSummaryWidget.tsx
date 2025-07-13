import Tippy from "@tippyjs/react";

// styles
import 'tippy.js/dist/tippy.css';

interface SummaryWidgetProps {
  title: string;
  subtitle: string;
  icon: string;
  variant: string;
}

const ProjectSummaryWidget = (props: SummaryWidgetProps) => {
  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded px-3 py-2">
      <div className="flex-shrink-0 me-2">
        <div className={`w-12 h-12 flex justify-center items-center rounded-full text-${props.variant} bg-${props.variant}/25`}>
          <i className={`${props.icon} text-xl`}></i>
        </div>
      </div>
      <div className="flex-grow">
        <h5 className="font-semibold  my-0">{props.title}</h5>
        <p>{props.subtitle}</p>
      </div>
      <div>

        <Tippy
          content={'Info'}
          className="!bg-slate-700"
          animation='fade'
          theme="translucent"
        >
          <button className="text-gray-400">
            <i className={`mgc_information_line text-xl`}></i>
          </button>
        </Tippy>

      </div>
    </div>
  )
}

export default ProjectSummaryWidget