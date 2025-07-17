import React from "react";
import { Add } from "@mui/icons-material";

interface CreateProjectListItemProps {
  onClick: () => void;
}

export const CreateProjectListItem: React.FC<CreateProjectListItemProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer rounded-lg group"
    >
      <div className="flex items-center flex-1 space-x-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
          <Add className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Create New Project
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Click to create a new project and start tracking your work
          </p>
        </div>
      </div>

      <div className="flex items-center pl-4">
        <div className="text-blue-600 dark:text-blue-400">
          <Add className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};