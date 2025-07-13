// images
import avatar1 from '../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../assets/images/users/avatar-6.jpg'

interface SummaryWidget {
  title: string;
  subtitle: string;
  icon: string;
  variant: string;
}

interface ProjectDetail {
  title: string;
  count: number;
  icon: string;
  variant: string;
}

interface ProjectOverviewDetail {
  title: string;
  totalProject: number;
  employ: number;
  variant: string;
}

interface ProjectDailyTask {
  title: string;
  time: string;
  description: string;
  people: number;
}

interface ProjectTeam {
  name: string;
  tech: string;
  exprience: string;
  image: string;
}

export const projectSummaryWidgets: SummaryWidget[] = [
  {
    title: "Project Discssion",
    subtitle: "6 Person",
    icon: "mgc_group_line",
    variant: "primary",
  },
  {
    title: "In Progress",
    subtitle: "16 Projects",
    icon: "mgc_compass_line",
    variant: "warning",
  },
  {
    title: "Completed Projects",
    subtitle: "24",
    icon: "mgc_check_circle_line",
    variant: "danger",
  },
  {
    title: "Delivery Projects",
    subtitle: "20",
    icon: "mgc_send_line",
    variant: "success",
  },
]

export const projectStates: ProjectDetail[] = [
  {
    title: "Active Projects",
    count: 85,
    icon: "mgc_document_2_line",
    variant: "primary"
  },
  {
    title: "Total Employees",
    count: 32,
    icon: "mgc_group_line",
    variant: "success"
  },
  {
    title: "Project Reviews",
    count: 40,
    icon: "mgc_star_line",
    variant: "info"
  },
  {
    title: "New Projects",
    count: 25,
    icon: "mgc_new_folder_line",
    variant: "warning"
  },
]

export const projectOverviewDetails: ProjectOverviewDetail[] = [
  {
    title: "Product Design",
    totalProject: 26,
    employ: 4,
    variant: "primary",
  },
  {
    title: "Web Development",
    totalProject: 30,
    employ: 5,
    variant: "danger",
  },
  {
    title: "Illustration Design",
    totalProject: 12,
    employ: 3,
    variant: "success",
  },
  {
    title: "UI/UX Design",
    totalProject: 8,
    employ: 4,
    variant: "warning",
  },
]

export const dailyTasks: ProjectDailyTask[] = [
  {
    title: "Landing Page Design",
    time: "2 Hrs ago",
    description: "Create a new landing page (Saas Product)",
    people: 5,
  },
  {
    title: "Admin Dashboard",
    time: "3 Hrs ago",
    description: "Create a new Admin dashboard",
    people: 2,
  },
  {
    title: "Client Work",
    time: "5 Hrs ago",
    description: "Create a new Power Project (Sktech design)",
    people: 2,
  },
  {
    title: "UI/UX Design",
    time: "6 Hrs ago",
    description: "Create a new UI Kit in figma",
    people: 3,
  },
]

export const teamMembers: ProjectTeam[] = [
  {
    name: "Risa Pearson",
    tech: "UI/UX Designer",
    exprience: "2.5",
    image: avatar1,
  },
  {
    name: "Margaret D. Evans",
    tech: "PHP Developer",
    exprience: "2",
    image: avatar2,
  },
  {
    name: "Bryan J. Luellen",
    tech: "Front end Developer",
    exprience: "1",
    image: avatar3,
  },
  {
    name: "Kathryn S. Collier",
    tech: "UI/UX Designer",
    exprience: "3",
    image: avatar4,
  },
  {
    name: "Timothy Kauper",
    tech: "Backend Developer",
    exprience: "2",
    image: avatar5,
  },
  {
    name: "Zara Raws",
    tech: "Python Developer",
    exprience: "1",
    image: avatar6,
  },
]
