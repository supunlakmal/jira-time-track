
import React from 'react';
import Button from './Button';

interface TicketTableActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedProject: string | null;
  loading: boolean;
  refreshData: () => void;
}

const TicketTableActions: React.FC<TicketTableActionsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedProject,
  loading,
  refreshData,
}) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <input
        type="text"
        placeholder={`Search tickets in ${selectedProject || 'all projects'}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <Button onClick={refreshData} disabled={loading} variant="gray" size="md">
        ↻ Refresh All Data
      </Button>
    </div>
  );
};

export default TicketTableActions;
