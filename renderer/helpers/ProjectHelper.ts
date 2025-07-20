import { Project } from "../types/projects";
import { ProjectStatus } from "../constants/projectStatus";

export class ProjectHelper {
  static getProgressBarColor(project: Project): string {
    if (project.status === ProjectStatus.Completed) {
      return "bg-green-500";
    }
    
    if (project.status === ProjectStatus.OnHold) {
      return "bg-gray-400";
    }
    
    if (project.status === ProjectStatus.Planning) {
      return "bg-blue-500";
    }
    
    // For InProgress status, determine color based on progress percentage
    if (project.status === ProjectStatus.InProgress) {
      if (project.progress >= 80) {
        return "bg-green-500";
      } else if (project.progress >= 50) {
        return "bg-yellow-500";
      } else if (project.progress >= 25) {
        return "bg-orange-500";
      } else {
        return "bg-red-500";
      }
    }
    
    // Default fallback
    return "bg-gray-500";
  }
}