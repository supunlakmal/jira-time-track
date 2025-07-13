// images
import avatar1 from '../../../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../../../assets/images/users/avatar-8.jpg'
import avatar9 from '../../../../assets/images/users/avatar-9.jpg'
import avatar10 from '../../../../assets/images/users/avatar-10.jpg'

export interface ProjectsList {
  id?: number;
  heading: string;
  title?: string;
  state: string;
  shortDesc?: string;
  date: string;
  totalTasks?: number;
  totalComments?: number;
  progress?: string;
  variant: string;
  assignee: {
    image?: string[];
    more?: string;
  };
}

const projects: ProjectsList[] = [
  {
    id: 1,
    heading: "Web Design",
    title: "Landing page Design",
    state: "Completed",
    shortDesc: "If several languages coalesce, the grammar of the resulting language is more regular.",
    date: "15 Dec",
    totalTasks: 56,
    totalComments: 224,
    progress: "66%",
    variant: "success",
    assignee: {
      image: [avatar2, avatar3],
      more: "2+",
    }
  },
  {
    id: 2,
    heading: "Android",
    title: "App Design and Develop",
    state: "Pending",
    shortDesc: "To achieve this, it would be necessary to have uniform grammar and more common words.",
    date: "28 nov",
    totalTasks: 62,
    totalComments: 196,
    progress: "33%",
    variant: "warning",
    assignee: {
      image: [avatar4, avatar5, avatar6, avatar7],
      more: "4+",
    }
  },
  {
    id: 3,
    heading: "Web Design",
    title: "New Admin Design",
    state: "Frontend Completed",
    shortDesc: "If several languages coalesce, the grammar of the resulting language is more regular.",
    date: "19 Nov",
    totalTasks: 69,
    totalComments: 102,
    progress: "50%",
    variant: "success",
    assignee: {
      image: [avatar9, avatar10, avatar1],
      more: "3+",
    }
  },
  {
    id: 4,
    heading: "Android",
    title: "Custom Software Development",
    state: "Pending",
    shortDesc: "Their separate existence is a myth. For science, music, sport, etc uses the vocabulary.",
    date: "02 Nov",
    totalTasks: 72,
    totalComments: 184,
    progress: "25%",
    variant: "warning",
    assignee: {
      image: [avatar2, avatar8, avatar9],
    }
  },
  {
    id: 5,
    heading: "Web Design",
    title: "Brand logo design",
    state: "Completed",
    shortDesc: "Everyone realizes why a new common language refuse to pay expensive translators.",
    date: "19 Nov",
    totalTasks: 69,
    totalComments: 102,
    progress: "75%",
    variant: "danger",
    assignee: {
      image: [avatar6],
    }
  },
  {
    id: 6,
    heading: "Web Design",
    title: "Website Redesign",
    state: "Completed",
    shortDesc: "The languages only differ in their grammar pronunciation and their most common words.",
    date: "19 Nov",
    totalTasks: 69,
    totalComments: 102,
    progress: "50%",
    variant: "info",
    assignee: {
      image: [avatar3, avatar9],
    }
  },
]

export { projects };