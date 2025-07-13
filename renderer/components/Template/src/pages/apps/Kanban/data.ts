// images
import avatar1 from '../../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../../assets/images/users/avatar-8.jpg'
import avatar9 from '../../../assets/images/users/avatar-9.jpg'

export interface TaskTypes {
  id: number;
  title: string;
  status: string;
  category: string,
  variant: string,
  dueDate: string;
  comments: number;
  attachments: number;
  userAvatar: string;
}

interface AssigneeTypes {
  id: number;
  title: string;
  image: string;
}

const tasks: TaskTypes[] = [
  {
    id: 1,
    title: "iOS App home page",
    status: "Inprogress",
    category: "Design",
    variant: "text-danger bg-danger/25",
    dueDate: "13 Jul 2023",
    comments: 12,
    attachments: 12,
    userAvatar: avatar8,
  },
  {
    id: 2,
    title: "Topnav layout design",
    status: "Inprogress",
    category: "Web",
    variant: "text-gray-400 bg-gray-400/25",
    dueDate: "15 Jul 2023",
    comments: 4,
    attachments: 1,
    userAvatar: avatar4,
  },
  {
    id: 3,
    title: "Invite user to a project",
    status: "Inprogress",
    category: "Backend",
    variant: "text-success bg-success/25",
    dueDate: "12 Jul 2023",
    comments: 8,
    attachments: 6,
    userAvatar: avatar2,
  },
  {
    id: 4,
    title: "Write a release note",
    status: "Todo",
    category: "Product",
    variant: "text-info bg-info/25",
    dueDate: "14 Jul 2023",
    comments: 6,
    attachments: 7,
    userAvatar: avatar4,
  },
  {
    id: 5,
    title: "Create a Graph of Sketch",
    status: "Todo",
    category: "Checking",
    variant: "text-cyan-500 bg-cyan-500/25",
    dueDate: "18 Jul 2023",
    comments: 8,
    attachments: 10,
    userAvatar: avatar5,
  },
  {
    id: 6,
    title: "Enable analytics tracking",
    status: "Todo",
    category: "Shopify",
    variant: "text-warning bg-warning/25",
    dueDate: "15 Jul 2023",
    comments: 5,
    attachments: 14,
    userAvatar: avatar7,
  },
  {
    id: 7,
    title: "Kanban board design",
    status: "Review",
    category: "Wordpress",
    variant: "text-success bg-success/25",
    dueDate: "14 Jul 2023",
    comments: 46,
    attachments: 17,
    userAvatar: avatar3,
  },
  {
    id: 8,
    title: "Code HTML email template",
    status: "Review",
    category: "Design",
    variant: "text-danger bg-danger/25",
    dueDate: "15 Jul 2023",
    comments: 24,
    attachments: 15,
    userAvatar: avatar4,
  },
  {
    id: 9,
    title: "Brand logo design",
    status: "Done",
    category: "App",
    variant: "text-sky-500 bg-sky-500/25",
    dueDate: "16 Jul 2023",
    comments: 34,
    attachments: 16,
    userAvatar: avatar6,
  },
  {
    id: 10,
    title: "Improve animation loader",
    status: "Done",
    category: "Design",
    variant: "text-danger bg-danger/25",
    dueDate: "15 Jul 2023",
    comments: 2,
    attachments: 15,
    userAvatar: avatar9,
  },
  {
    id: 11,
    title: "Dashboard design",
    status: "Unassigned",
    category: "Web",
    variant: "text-success bg-success/25",
    dueDate: "16 Jul 2023",
    comments: 14,
    attachments: 5,
    userAvatar: avatar2,
  },
  {
    id: 12,
    title: "Banner Design for FB & Twitter",
    status: "Unassigned",
    category: "Testing",
    variant: "text-amber-500 bg-amber-500/25",
    dueDate: "17 Jul 2023",
    comments: 9,
    attachments: 41,
    userAvatar: avatar7,
  },
  {
    id: 13,
    title: "Create a Blog Template UI",
    status: "New",
    category: "Q&A",
    variant: "text-pink-500 bg-pink-500/25",
    dueDate: "17 Jul 2023",
    comments: 14,
    attachments: 5,
    userAvatar: avatar4,
  },
  {
    id: 14,
    title: "Deploy the Project",
    status: "New",
    category: "Design",
    variant: "text-danger bg-danger/25",
    dueDate: "15 Jul 2023",
    comments: 2,
    attachments: 15,
    userAvatar: avatar9,
  },
  {
    id: 15,
    title: "Hire new Developer",
    status: "New",
    category: "Wordpress",
    variant: "text-success bg-success/25",
    dueDate: "14 Jul 2023",
    comments: 46,
    attachments: 17,
    userAvatar: avatar3,
  },
];

const assignees: AssigneeTypes[] = [
  {
    id: 1,
    title: 'Coderthemes',
    image: avatar1,
  },
  {
    id: 2,
    title: 'Kenil Sudani',
    image: avatar2,
  },
  {
    id: 3,
    title: 'Arya Stark',
    image: avatar3,
  },
  {
    id: 4,
    title: 'Jon Snow',
    image: avatar4,
  },
  {
    id: 5,
    title: 'Sansa Stark',
    image: avatar5,
  },
  {
    id: 6,
    title: 'Daenerys Targaryen',
    image: avatar6,
  },
]

export { tasks, assignees };