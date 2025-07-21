// renderer/pages/float.tsx
import React, { useEffect, useState } from "react";
import { useTimerActions } from "../hooks/useTimerActions";
import TimerGrid from "../components/timers/TimerGrid";
import FloatingWindowHeader from "../components/layout/FloatingWindowHeader";
import Button from "../components/ui/Button";
import TimerDetail from "../components/timers/TimerDetail";
import { ThemeProvider } from "../components/theme/ThemeProvider";



const FloatingWindow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState<
    string | null
  >(null);
  
  // Use the custom hook for all timer functionality
  const {
    timers,
    ticketData,
    handleTimerAction,
    handleDeleteTimer,
    formatTime,
    getStatusColor,
    getStatusIcon,
    getStatusText,
    getMinimalStatusColorClass,
  } = useTimerActions();



  // Handle selectedTicketNumber cleanup when timer is deleted
  useEffect(() => {
    if (selectedTicketNumber && !timers.find(t => t.ticketNumber === selectedTicketNumber)) {
      setSelectedTicketNumber(null);
    }
  }, [timers, selectedTicketNumber]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const { movementX, movementY } = e;
      window.ipc.send("window-move", { movementX, movementY });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleClose = () => window.ipc.window.hide();


  const currentTimerDetails = selectedTicketNumber
    ? timers.find((t) => t.ticketNumber === selectedTicketNumber)
    : null;

  return (
    <ThemeProvider>
      <div className="h-screen bg-transparent select-none">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        <FloatingWindowHeader
          selectedTicketNumber={selectedTicketNumber}
          timersLength={timers.length}
          setIsDragging={setIsDragging}
          handleClose={handleClose}
        />

        <div className="p-4 overflow-y-auto flex-grow">
            {selectedTicketNumber && currentTimerDetails ? (
              <TimerDetail
                timer={currentTimerDetails}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                getStatusText={getStatusText}
                handleDeleteTimer={handleDeleteTimer}
                handleTimerAction={handleTimerAction}
                setSelectedTicketNumber={setSelectedTicketNumber}
              />
            ) : selectedTicketNumber && !currentTimerDetails ? (
              <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <p>Timer '{selectedTicketNumber}' not found.</p>
                <Button
                  onClick={() => setSelectedTicketNumber(null)}
                  variant="gray"
                  size="sm"
                  className="mt-2"
                >
                  Back to Grid
                </Button>
              </div>
            ) : (
              <TimerGrid
                timers={timers}
                formatTime={formatTime}
                getMinimalStatusColorClass={getMinimalStatusColorClass}
                getStatusText={getStatusText}
                setSelectedTicketNumber={setSelectedTicketNumber}
              />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FloatingWindow;

  
