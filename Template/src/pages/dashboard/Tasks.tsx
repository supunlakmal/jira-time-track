// components
import { TaskWidget } from "./components"

// images
import avatar1 from '../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../assets/images/users/avatar-8.jpg'

const Tasks = () => {
  return (
    <>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
        <TaskWidget
          avatar1={avatar1}
          avatar2={avatar2}
          title="Project Dashboard"
          time="4 Hrs ago"
        />

        <TaskWidget
          avatar1={avatar3}
          avatar2={avatar4}
          title="Admin Template"
          time="3 Hrs ago"
        />
        <TaskWidget
          avatar1={avatar5}
          avatar2={avatar6}
          title="Client Project"
          time="5 Hrs ago"
        />
        <TaskWidget
          avatar1={avatar7}
          avatar2={avatar8}
          title="Figma Design"
          time="1 Day ago"
        />
      </div>
    </>
  )
}

export default Tasks