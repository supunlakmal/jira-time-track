// dummy data
import { TaskTypes } from './data';

interface TaskItemProps {
  task: TaskTypes;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className={`flex justify-between items-center h-6 px-3 text-xs font-semibold rounded-full ${task.variant}`}>{task.category}</h4>

        <div className="text-xs">{task.dueDate}</div>
      </div>

      <h4 className="mt-3 text-sm">{task.title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <i className="mgc_chat_3_line text-base"></i>
          <span className="ms-1 leading-none">{task.comments}</span>
        </div>
        <div className="flex items-center ms-4">
          <i className="mgc_attachment_line rotate-45 text-base"></i>
          <span className="ms-1 leading-none">{task.attachments}</span>
        </div>
        <img className="w-6 h-6 ms-auto rounded-full" src={task.userAvatar} />
      </div>
    </>
  )
}

export default TaskItem