
export enum ProjectStatus {
  InProgress = "In Progress",
  Planning = "Planning",
  Completed = "Completed",
  OnHold = "On Hold",
}

export const projectStatusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.InProgress]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  [ProjectStatus.Planning]: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  [ProjectStatus.Completed]: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  [ProjectStatus.OnHold]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};
