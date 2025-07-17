import { Refresh } from "@mui/icons-material";
import React from "react";
import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";

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
      <SearchInput
        placeholder={`Search tickets in ${
          selectedProject || "all projects"
        }...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1"
        fullWidth
      />
      <Button
        onClick={refreshData}
        disabled={loading}
        variant="gray"
        size="md"
        startIcon={<Refresh fontSize="small" />}
      >
        Refresh All Data
      </Button>
    </div>
  );
};

export default TicketTableActions;
