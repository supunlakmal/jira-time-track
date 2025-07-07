import React, { useState, useEffect, useMemo } from 'react';
import Button from '../ui/Button';
import { ModalWrapper } from '../ui/ModalWrapper';
import { TimerSession } from '../../store/sessionsSlice';

interface Ticket {
  ticket_number: string;
  ticket_name: string;
  story_points?: number;
  isManual?: boolean;
}

interface TicketSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: Ticket[];
  sessions: { [key: string]: TimerSession };
  formatTime: (ms: number) => string;
  getProjectName: (ticketNumber: string) => string;
}

export const TicketSearchModal: React.FC<TicketSearchModalProps> = ({
  isOpen,
  onClose,
  tickets,
  sessions,
  formatTime,
  getProjectName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset search state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedProject('');
    }
  }, [isOpen]);

  // Get unique projects from tickets
  const availableProjects = useMemo(() => {
    const projects = new Set<string>();
    tickets.forEach(ticket => {
      const projectName = getProjectName(ticket.ticket_number);
      if (projectName !== 'N/A') {
        projects.add(projectName);
      }
    });
    return Array.from(projects).sort();
  }, [tickets, getProjectName]);

  // Filter tickets based on search term and project
  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    // Filter by project
    if (selectedProject) {
      filtered = filtered.filter(ticket => 
        getProjectName(ticket.ticket_number) === selectedProject
      );
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.ticket_number.toLowerCase().includes(searchLower) ||
        ticket.ticket_name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [tickets, selectedProject, debouncedSearchTerm, getProjectName]);

  // Calculate stats for filtered tickets
  const stats = useMemo(() => {
    const totalStoryPoints = filteredTickets.reduce((sum, ticket) => 
      sum + (ticket.story_points || 0), 0
    );
    const totalTimeTracked = filteredTickets.reduce((sum, ticket) => 
      sum + (sessions[ticket.ticket_number]?.totalElapsed || 0), 0
    );
    const activeTickets = filteredTickets.filter(ticket =>
      sessions[ticket.ticket_number]?.sessions?.some(s => s.status === 'running')
    ).length;
    const completedTickets = filteredTickets.filter(ticket =>
      sessions[ticket.ticket_number]?.sessions?.some(s => s.status === 'completed')
    ).length;

    return {
      totalTickets: filteredTickets.length,
      totalStoryPoints,
      totalTimeTracked,
      activeTickets,
      completedTickets,
    };
  }, [filteredTickets, sessions]);

  const getTicketStatus = (ticket: Ticket) => {
    const ticketSession = sessions[ticket.ticket_number];
    if (!ticketSession) return { text: 'Not Started', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' };

    const isActive = ticketSession.sessions?.some(s => s.status === 'running');
    const isPaused = ticketSession.sessions?.some(s => s.status === 'paused');
    const isCompleted = ticketSession.sessions?.some(s => s.status === 'completed');

    if (isActive) {
      return { text: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    } else if (isPaused) {
      return { text: 'Paused', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    } else if (isCompleted) {
      return { text: 'Completed', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    }
    return { text: 'Tracked', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' };
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 font-medium">{part}</span> : 
        part
    );
  };

  const footerContent = (
    <div className="flex justify-between w-full">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">Esc</kbd> to close
      </div>
      <Button onClick={onClose} variant="gray" size="md">
        Close
      </Button>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Search Tickets"
      size="full"
      footer={footerContent}
      closeOnEscape={true}
    >
      <div className="flex flex-col h-full">
        {/* Search Controls */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tickets by number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                autoFocus
              />
            </div>
            <div className="min-w-[200px]">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Projects</option>
                {availableProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
            <span><strong>{stats.totalTickets}</strong> tickets</span>
            <span><strong>{stats.totalStoryPoints.toFixed(1)}</strong> story points</span>
            <span><strong>{formatTime(stats.totalTimeTracked)}</strong> tracked</span>
            <span><strong>{stats.activeTickets}</strong> active</span>
            <span><strong>{stats.completedTickets}</strong> completed</span>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <svg
                className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.343"
                />
              </svg>
              <p className="text-lg font-medium mb-2">No tickets found</p>
              <p className="text-sm">
                {searchTerm || selectedProject ? 
                  'Try adjusting your search criteria' : 
                  'Start typing to search for tickets'
                }
              </p>
            </div>
          ) : (
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredTickets.map((ticket) => {
                    const ticketSession = sessions[ticket.ticket_number];
                    const status = getTicketStatus(ticket);
                    const isActive = ticketSession?.sessions?.some(s => s.status === 'running');

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
                              <div className={`text-sm font-medium flex items-center ${
                                ticket.isManual
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : 'text-blue-600 dark:text-blue-400'
                              }`}>
                                {highlightSearchTerm(ticket.ticket_number, debouncedSearchTerm)}
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
                          <div className="max-w-xs truncate" title={ticket.ticket_name}>
                            {highlightSearchTerm(ticket.ticket_name, debouncedSearchTerm)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white font-mono">
                            {ticket.story_points?.toFixed(1) || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex flex-col">
                            <span className="font-mono text-gray-900 dark:text-white">
                              {ticketSession ? formatTime(ticketSession.totalElapsed || 0) : '-'}
                            </span>
                            {ticketSession?.sessions && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {ticketSession.sessions.length} session{ticketSession.sessions.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};