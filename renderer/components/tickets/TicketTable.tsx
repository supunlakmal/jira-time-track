
import React from 'react';
import Button from '../ui/Button';
import { TimerSession } from '../../store/sessionsSlice';

interface Ticket {
  ticket_number: string;
  ticket_name: string;
  story_points?: number;
  isManual?: boolean;
}

interface TicketTableProps {
  ticketsToDisplay: Ticket[];
  sessions: { [key: string]: TimerSession };
  selectedProject: string | null;
  searchTerm: string;
  formatTime: (ms: number) => string;
  getProjectName: (ticketNumber: string) => string;
  openEditDialog: (task: any) => void;
  handleDeleteManualTask: (ticketNumber: string) => void;
  data: any[];
  billingData?: any;
}

const TicketTable: React.FC<TicketTableProps> = ({
  ticketsToDisplay,
  sessions,
  selectedProject,
  searchTerm,
  formatTime,
  getProjectName,
  openEditDialog,
  handleDeleteManualTask,
  data,
  billingData,
}) => {
  
  const calculateTicketCost = (ticketNumber: string): { cost: number; currency: string } | null => {
    if (!billingData?.settings) return null;
    
    const session = sessions[ticketNumber];
    if (!session?.totalElapsed) return null;
    
    const ticket = data.find(t => t.ticket_number === ticketNumber);
    if (!ticket) return null;
    
    const projectName = getProjectName(ticketNumber);
    const hourlyRate = billingData.settings.projectRates?.[projectName] || billingData.settings.globalHourlyRate;
    
    if (!hourlyRate) return null;
    
    const timeSpentHours = session.totalElapsed / (1000 * 60 * 60);
    const cost = timeSpentHours * hourlyRate;
    
    return {
      cost,
      currency: billingData.settings.currency || 'USD'
    };
  };
  
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {selectedProject ? `${selectedProject} Tickets` : 'All Tickets'}
          {searchTerm && (
            <span className="text-sm font-normal text-gray-600 dark:text-gray-300 ml-2">
              (filtered by "{searchTerm}")
            </span>
          )}
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span>{ticketsToDisplay.length} tickets</span>
          <span>
            {ticketsToDisplay
              .reduce((sum, t) => sum + (t.story_points || 0), 0)
              .toFixed(1)}{' '}
            points
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Story Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {ticketsToDisplay.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-300">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-300 dark:text-gray-500 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <p className="text-lg font-medium mb-2 dark:text-gray-100">
                      {data.length === 0
                        ? 'No tickets available'
                        : selectedProject && searchTerm
                        ? 'No matching tickets found'
                        : selectedProject
                        ? `No tickets found for ${selectedProject}`
                        : searchTerm
                        ? 'No tickets match your search'
                        : 'No tickets in current filter'}
                    </p>
                    {data.length === 0 && (
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Load your Project data to see tickets here
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              ticketsToDisplay.map((ticket) => {
                const ticketSession = sessions[ticket.ticket_number];
                const isTracked = !!ticketSession;
                const isActive = ticketSession?.sessions?.some(
                  (s) => s.status === 'running'
                );
                const isCompleted = ticketSession?.sessions?.some(
                  (s) => s.status === 'completed'
                );
                const isPaused = ticketSession?.sessions?.some(
                  (s) => s.status === 'paused'
                );

                let statusColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
                let statusText = 'Not Started';

                if (isActive) {
                  statusColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                  statusText = 'Active';
                } else if (isPaused) {
                  statusColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
                  statusText = 'Paused';
                } else if (isCompleted) {
                  statusColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                  statusText = 'Completed';
                } else if (isTracked) {
                  statusColor = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                  statusText = 'Tracked';
                }

                return (
                  <tr
                    key={ticket.ticket_number}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {isActive && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                          )}
                        </div>
                        <div>
                          <div
                            className={`text-sm font-medium flex items-center ${
                              ticket.isManual
                                ? 'text-purple-600 dark:text-purple-400'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {ticket.ticket_number}
                            {ticket.isManual && (
                              <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                                Manual
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {getProjectName(ticket.ticket_number)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div
                        className="max-w-xs truncate"
                        title={ticket.ticket_name}
                      >
                        {ticket.ticket_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white font-mono">
                        {ticket.story_points?.toFixed(1) || '-'}
                      </div>
                      {ticket.story_points && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {ticket.story_points <= 1
                            ? 'XS'
                            : ticket.story_points <= 3
                            ? 'S'
                            : ticket.story_points <= 5
                            ? 'M'
                            : ticket.story_points <= 8
                            ? 'L'
                            : 'XL'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                      >
                        {statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col">
                        <span className="font-mono text-gray-900 dark:text-white">
                          {isTracked
                            ? formatTime(ticketSession.totalElapsed || 0)
                            : '-'}
                        </span>
                        {isTracked && ticketSession.sessions && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {ticketSession.sessions.length} session
                            {ticketSession.sessions.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {(() => {
                        const costData = calculateTicketCost(ticket.ticket_number);
                        if (!costData) {
                          return (
                            <span className="text-gray-400 dark:text-gray-500">-</span>
                          );
                        }
                        return (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(costData.cost, costData.currency)}
                            </span>
                            {billingData?.settings?.globalHourlyRate && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatCurrency(billingData.settings.projectRates?.[getProjectName(ticket.ticket_number)] || billingData.settings.globalHourlyRate, costData.currency)}/h
                              </span>
                            )}
                          </div>
                        );
                      })()} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            window.ipc?.send('start-task', {
                              ticket: ticket.ticket_number,
                              name: ticket.ticket_name,
                              storyPoints: ticket.story_points,
                            });
                          }}
                          variant="link"
                          size="sm"
                          title="Start tracking time for this ticket"
                        >
                          {isActive ? 'Resume' : 'Start Timer'}
                        </Button>
                        {isTracked && (
                          <Button
                            onClick={() => {
                              // View session details - could open a modal or expand row
                              console.log(
                                'View sessions for:',
                                ticket.ticket_number,
                                ticketSession
                              );
                            }}
                            variant="gray"
                            size="sm"
                            className="text-xs"
                            title="View time tracking details"
                          >
                            Details
                          </Button>
                        )}
                        {ticket.isManual && (
                          <>
                            <Button
                              onClick={() => openEditDialog(ticket)}
                              variant="secondary"
                              size="sm"
                              className="text-xs"
                              title="Edit manual task"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                handleDeleteManualTask(ticket.ticket_number)
                              }
                              variant="danger"
                              size="sm"
                              className="text-xs"
                              title="Delete manual task"
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {ticketsToDisplay.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <div className="flex space-x-6">
              <span>
                <strong>{ticketsToDisplay.length}</strong> tickets shown
              </span>
              <span>
                <strong>
                  {ticketsToDisplay
                    .reduce((sum, t) => sum + (t.story_points || 0), 0)
                    .toFixed(1)}
                </strong>{' '}
                total story points
              </span>
            </div>
            <div className="flex space-x-6">
              <span>
                <strong>
                  {
                    ticketsToDisplay.filter((t) =>
                      sessions[t.ticket_number]?.sessions?.some(
                        (s) => s.status === 'completed'
                      )
                    ).length
                  }
                </strong>{' '}
                completed
              </span>
              <span>
                <strong>
                  {
                    ticketsToDisplay.filter((t) =>
                      sessions[t.ticket_number]?.sessions?.some(
                        (s) => s.status === 'running'
                      )
                    ).length
                  }
                </strong>{' '}
                active
              </span>
              <span>
                <strong>
                  {formatTime(
                    ticketsToDisplay.reduce(
                      (sum, t) =>
                        sum + (sessions[t.ticket_number]?.totalElapsed || 0),
                      0
                    )
                  )}
                </strong>{' '}
                total time
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
