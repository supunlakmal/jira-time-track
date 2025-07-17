import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProjectStatus } from "../constants/projectStatus";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;

  // team: { name: string; avatar: string }[];
  tasks: number;
  activities: number;
  client: string;
  budget: number;
  startDate: string;
  // priority: string;
  // priorityColor: string;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [
    {
      name: "Figma Design System",
      description: "UI component library for design system",
      status: ProjectStatus.InProgress,
      progress: 65,
      deadline: "Nov 15, 2023",

      // team: [
      //   { name: "Alex Morgan", avatar: "/images/logo.png" },
      //   { name: "Jessica Chen", avatar: "/images/logo.png" },
      //   { name: "Ryan Park", avatar: "/images/logo.png" },
      // ],
      tasks: 24,
      activities: 128,
      client: "Acme Inc.",
      budget: 12500.0,
      startDate: "Oct 1, 2023",
      // priority: "High",
      // priorityColor:
      //   "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    },
    {
      name: "Keep React",
      description: "React component library development",
      status: ProjectStatus.Planning,
      progress: 25,
      deadline: "Dec 5, 2023",

      // team: [
      //   { name: "Sarah Johnson", avatar: "/images/logo.png" },
      //   { name: "David Kim", avatar: "/images/logo.png" },
      //   { name: "Alex Morgan", avatar: "/images/logo.png" },
      // ],
      tasks: 18,
      activities: 86,
      client: "TechCorp",
      budget: 18000.0,
      startDate: "Oct 15, 2023",
      // priority: "Medium",
      // priorityColor:
      //   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    },
    {
      name: "StaticMania",
      description: "Marketing website redesign project",
      status: ProjectStatus.Completed,
      progress: 100,
      deadline: "Oct 25, 2023",

      // team: [
      //   { name: "Jessica Chen", avatar: "/images/logo.png" },
      //   { name: "Ryan Park", avatar: "/images/logo.png" },
      //   { name: "Sarah Johnson", avatar: "/images/logo.png" },
      // ],
      tasks: 32,
      activities: 214,
      client: "StaticMania",
      budget: 9800.0,
      startDate: "Sep 5, 2023",
      // priority: "Medium",
      // priorityColor:
      //   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    },
  ],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects.projects;

export default projectsSlice.reducer;
