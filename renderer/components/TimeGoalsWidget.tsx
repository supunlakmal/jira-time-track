import React, { useState } from 'react';
import { useTimeGoals } from '../hooks/useTimeGoals';

interface TimeGoalsWidgetProps {
  sessions: any;
  className?: string;
}

export const TimeGoalsWidget: React.FC<TimeGoalsWidgetProps> = ({ sessions, className = '' }) => {
  const { goals, progress, alerts, actions, formatTime } = useTimeGoals(sessions);
  const [showAllGoals, setShowAllGoals] = useState(false);

  const activeGoals = goals.filter(g => g.enabled);
  const displayGoals = showAllGoals ? activeGoals : activeGoals.slice(0, 3);

  const getProgressColor = (progressData: any) => {
    if (progressData.isOvertime) return 'bg-red-500';
    if (progressData.percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressTextColor = (progressData: any) => {
    if (progressData.isOvertime) return 'text-red-700 dark:text-red-300';
    if (progressData.percentage >= 80) return 'text-yellow-700 dark:text-yellow-300';
    return 'text-green-700 dark:text-green-300';
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Time Goals</h3>
          <button
            onClick={() => setShowAllGoals(!showAllGoals)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            {showAllGoals ? 'Show Less' : `Show All (${activeGoals.length})`}
          </button>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-4 space-y-2">
            {alerts.slice(0, 3).map(alert => (
              <div
                key={alert.id}
                className={`p-2 rounded-md text-sm ${
                  alert.type === 'overtime' ? 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700' :
                  alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700' :
                  'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span>{alert.message}</span>
                  <button
                    onClick={() => actions.dismissAlert(alert.id)}
                    className="text-xs opacity-70 hover:opacity-100 ml-2"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {alerts.length > 3 && (
              <button
                onClick={actions.clearAllAlerts}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Clear all alerts ({alerts.length})
              </button>
            )}
          </div>
        )}

        {/* Goals Progress */}
        <div className="space-y-3">
          {displayGoals.map(goal => {
            const progressData = progress.find(p => p.goalId === goal.id);
            if (!progressData) return null;

            return (
              <div key={goal.id} className="">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {goal.description}
                  </span>
                  <span className={`text-xs font-medium ${getProgressTextColor(progressData)}`}>
                    {formatTime(progressData.current)} / {formatTime(progressData.target)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${getProgressColor(progressData)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(progressData.percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {progressData.percentage.toFixed(1)}% complete
                  </span>
                  <span className={`text-xs font-medium ${getProgressTextColor(progressData)}`}>
                    {progressData.isOvertime 
                      ? `+${formatTime(Math.abs(progressData.remainingTime))} overtime`
                      : `${formatTime(progressData.remainingTime)} remaining`
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {activeGoals.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No active time goals set.</p>
            <button className="text-blue-600 dark:text-blue-400 text-sm mt-1 hover:underline">
              Set your first goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};