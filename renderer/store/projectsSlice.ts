
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Project {
  name: string;
  description: string;
  status: string;
  statusColor: string;
  progress: number;
  deadline: string;
  isStarred: boolean;
  team: { name: string; avatar: string }[];
  tasks: number;
  activities: number;
  client: string;
  budget: string;
  startDate: string;
  priority: string;
  priorityColor: string;
  barColor: string;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [
    {
      name: "Figma Design System",
      description: "UI component library for design system",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      progress: 65,
      deadline: "Nov 15, 2023",
      isStarred: true,
      team: [
        { name: "Alex Morgan", avatar: "/images/logo.png" },
        { name: "Jessica Chen", avatar: "/images/logo.png" },
        { name: "Ryan Park", avatar: "/images/logo.png" },
      ],
      tasks: 24,
      activities: 128,
      client: "Acme Inc.",
      budget: "$12,500",
      startDate: "Oct 1, 2023",
      priority: "High",
      priorityColor: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      barColor: "bg-yellow-500",
    },
    {
      name: "Keep React",
      description: "React component library development",
      status: "Planning",
      statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      progress: 25,
      deadline: "Dec 5, 2023",
      isStarred: false,
      team: [
        { name: "Sarah Johnson", avatar: "/images/logo.png" },
        { name: "David Kim", avatar: "/images/logo.png" },
        { name: "Alex Morgan", avatar: "/images/logo.png" },
      ],
      tasks: 18,
      activities: 86,
      client: "TechCorp",
      budget: "$18,000",
      startDate: "Oct 15, 2023",
      priority: "Medium",
      priorityColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      barColor: "bg-blue-500",
    },
    {
      name: "StaticMania",
      description: "Marketing website redesign project",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      progress: 100,
      deadline: "Oct 25, 2023",
      isStarred: true,
      team: [
        { name: "Jessica Chen", avatar: "/images/logo.png" },
        { name: "Ryan Park", avatar: "/images/logo.png" },
        { name: "Sarah Johnson", avatar: "/images/logo.png" },
      ],
      tasks: 32,
      activities: 214,
      client: "StaticMania",
      budget: "$9,800",
      startDate: "Sep 5, 2023",
      priority: "Medium",
      priorityColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      barColor: "bg-green-500",
    },
  ],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects.projects;

export default projectsSlice.reducer;
