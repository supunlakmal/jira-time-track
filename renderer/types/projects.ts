import { ProjectStatus } from "../constants/projectStatus";

export interface Project {
  id?: string;
  name:string;
  description: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  tasks: number;
  activities: number;
  client: string;
  budget: number;
  startDate: string;
  createdAt?: string;
}

export interface ProjectCost {
  cost: number;
  currency: string;
  rate: number;
}
