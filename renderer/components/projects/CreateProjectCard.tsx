import React from "react";
import { Add } from "@mui/icons-material";

interface CreateProjectCardProps {
  onClick: () => void;
}

export const CreateProjectCard: React.FC<CreateProjectCardProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer dark:bg-gray-800 group"
    >
      <div className="flex flex-col items-center justify-center h-full p-6 min-h-[200px]">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
          <Add className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Create New Project
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Click to create a new project and start tracking your work
        </p>
      </div>
    </div>
  );
};