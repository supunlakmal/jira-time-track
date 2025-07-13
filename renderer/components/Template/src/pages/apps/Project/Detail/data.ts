// images
import avatar1 from '../../../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../../../assets/images/users/avatar-3.jpg'
import avatar5 from '../../../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../../assets/images/users/avatar-7.jpg'
import avatar9 from '../../../../assets/images/users/avatar-9.jpg'
import avatar10 from '../../../../assets/images/users/avatar-10.jpg'

interface ProjectOverview {
  title: string;
  count: number;
  icon: string;
}
interface AboutProject {
  tag: string;
  assignee?: string[];
  attachments?: string;
}

interface ProjectActivity {
  name: string,
  email: string,
  field: string,
  status: string,
  image: string,
}

export const projectOverviews: ProjectOverview[] = [
  {
    title: "Total Tasks",
    count: 210,
    icon: "mgc_grid_line"
  },
  {
    title: "Total Tasks Completed",
    count: 121,
    icon: "mgc_check_circle_line"
  },
  {
    title: "Total Team Size",
    count: 12,
    icon: "mgc_user_1_line"
  },
  {
    title: "Total Hours Spent",
    count: 2500,
    icon: "mgc_time_line"
  },
]

export const aboutProjects: AboutProject[] = [
  {
    tag: "HTML",
    assignee: [avatar2, avatar3, avatar9, avatar10],
    attachments: "Landing 1.psd",
  },
  {
    tag: "CSS",
    attachments: "Landing 2.psd",
  },
  {
    tag: "TAILWIND",
  },
  {
    tag: "JAVASCRIPT",
  },
]

export const projectActivities: ProjectActivity[] = [
  {
    name: "James Walton",
    email: "jameswalton@gmail.com",
    field: "Wire Frame",
    status: "Working",
    image: avatar1,
  },
  {
    name: "Jerry Geiger",
    email: "jerrygeiger@gmail.com",
    field: "Figma Design",
    status: "Completed",
    image: avatar2,
  },
  {
    name: "Mark Adams",
    email: "markadams@gmail.com",
    field: "Frontend",
    status: "Stop",
    image: avatar3,
  },
  {
    name: "Lindsay Walton",
    email: "lindsaywalton@gmail.com",
    field: "Backend",
    status: "Working",
    image: avatar9,
  },
  {
    name: "Jhon Otto",
    email: "jhonotto@gmail.com",
    field: "Support",
    status: "Stop",
    image: avatar5,
  },
  {
    name: "Barak Obama",
    email: "barakobama@gmail.com",
    field: "Testing",
    status: "Completed",
    image: avatar6,
  },
  {
    name: "Oliver Williams",
    email: "oliverwilliams@gmail.com",
    field: "Marketing",
    status: "Working",
    image: avatar7,
  },
]