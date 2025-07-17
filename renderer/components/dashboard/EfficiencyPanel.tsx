"use client";

import React from 'react';
import { KeyboardArrowDown, TrendingUp, TrendingDown } from '@mui/icons-material';
import { EfficiencyData } from '../../types/dashboard';

interface EfficiencyPanelProps {
  data: EfficiencyData;
  onFilterChange: (value: string) => void;
  activeDropdown: string | null;
  onDropdownToggle: (dropdownId: string) => void;
}

const EfficiencyPanel: React.FC<EfficiencyPanelProps> = ({
  data,
  onFilterChange,
  activeDropdown,
  onDropdownToggle
}) => {
  const getUpArrowIcon = () => (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7749 0.558058C10.5309 0.313981 10.1351 0.313981 9.89107 0.558058L7.39107 3.05806C7.14699 3.30214 7.14699 3.69786 7.39107 3.94194C7.63514 4.18602 8.03087 4.18602 8.27495 3.94194L9.70801 2.50888V11C9.70801 11.3452 9.98783 11.625 10.333 11.625C10.6782 11.625 10.958 11.3452 10.958 11V2.50888L12.3911 3.94194C12.6351 4.18602 13.0309 4.18602 13.2749 3.94194C13.519 3.69786 13.519 3.30214 13.2749 3.05806L10.7749 0.558058Z"
        fill="#22C55E"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.22407 11.4419C3.46815 11.686 3.86388 11.686 4.10796 11.4419L6.60796 8.94194C6.85203 8.69786 6.85203 8.30214 6.60796 8.05806C6.36388 7.81398 5.96815 7.81398 5.72407 8.05806L4.29102 9.49112L4.29101 1C4.29101 0.654823 4.01119 0.375001 3.66602 0.375001C3.32084 0.375001 3.04102 0.654823 3.04102 1L3.04102 9.49112L1.60796 8.05806C1.36388 7.81398 0.968151 7.81398 0.724074 8.05806C0.479996 8.30214 0.479996 8.69786 0.724074 8.94194L3.22407 11.4419Z"
        fill="#22C55E"
      />
    </svg>
  );

  const getBidirectionalArrowIcon = () => (
    <svg
      className="fill-bgray-900 dark:fill-bgray-50"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7749 0.558058C10.5309 0.313981 10.1351 0.313981 9.89107 0.558058L7.39107 3.05806C7.14699 3.30214 7.14699 3.69786 7.39107 3.94194C7.63514 4.18602 8.03087 4.18602 8.27495 3.94194L9.70801 2.50888V11C9.70801 11.3452 9.98783 11.625 10.333 11.625C10.6782 11.625 10.958 11.3452 10.958 11V2.50888L12.3911 3.94194C12.6351 4.18602 13.0309 4.18602 13.2749 3.94194C13.519 3.69786 13.519 3.30214 13.2749 3.05806L10.7749 0.558058Z"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.22407 11.4419C3.46815 11.686 3.86388 11.686 4.10796 11.4419L6.60796 8.94194C6.85203 8.69786 6.85203 8.30214 6.60796 8.05806C6.36388 7.81398 5.96815 7.81398 5.72407 8.05806L4.29102 9.49112L4.29101 1C4.29101 0.654823 4.01119 0.375001 3.66602 0.375001C3.32084 0.375001 3.04102 0.654823 3.04102 1L3.04102 9.49112L1.60796 8.05806C1.36388 7.81398 0.968151 7.81398 0.724074 8.05806C0.479996 8.30214 0.479996 8.69786 0.724074 8.94194L3.22407 11.4419Z"
      />
    </svg>
  );

  const monthFilterOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' }
  ];

  return (
    <div className="h-full rounded-lg bg-white dark:bg-darkblack-600">
      <div className="flex items-center justify-between border-b border-bgray-300 px-[20px] py-[12px] dark:border-darkblack-400">
        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
          Efficiency
        </h3>
        <div className="date-filter relative">
          <button
            onClick={() => onDropdownToggle('month-filter')}
            type="button"
            className="flex items-center space-x-1"
          >
            <span className="text-base font-semibold text-bgray-900 dark:text-white">
              Monthly
            </span>
            <span>
              <KeyboardArrowDown className="text-bgray-900 dark:text-bgray-50" />
            </span>
          </button>
          {activeDropdown === 'month-filter' && (
            <div className="absolute right-0 top-5 z-10 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500">
              <ul>
                {monthFilterOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      onFilterChange(option.value);
                      onDropdownToggle('month-filter');
                    }}
                    className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-[20px] py-[12px]">
        <div className="mb-4 flex items-center space-x-8">
          <div className="relative w-[180px]">
            <canvas id="pie_chart" height="168"></canvas>
            <div
              className="absolute z-0 h-[34px] w-[34px] rounded-full bg-[#EDF2F7]"
              style={{
                left: 'calc(50% - 17px)',
                top: 'calc(50% - 17px)'
              }}
            ></div>
          </div>
          
          <div className="counting">
            <div className="mb-6">
              <div className="flex items-center space-x-[2px]">
                <p className="text-lg font-bold text-success-300">
                  ${data.arrival.toLocaleString()}
                </p>
                <span>{getUpArrowIcon()}</span>
              </div>
              <p className="text-base font-medium text-bgray-600">
                Arrival
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-[2px]">
                <p className="text-lg font-bold text-bgray-900 dark:text-white">
                  ${data.spending.toLocaleString()}
                </p>
                <span>{getBidirectionalArrowIcon()}</span>
              </div>
              <p className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                Spending
              </p>
            </div>
          </div>
        </div>
        
        <div className="status">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-2.5 w-2.5 rounded-full bg-success-300"></div>
              <span className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                Goal
              </span>
            </div>
            <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
              {data.goalPercentage}%
            </p>
          </div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-2.5 w-2.5 rounded-full bg-warning-300"></div>
              <span className="text-sm font-medium text-bgray-600 dark:text-white">
                Spending
              </span>
            </div>
            <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
              {data.spendingPercentage}%
            </p>
          </div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-2.5 w-2.5 rounded-full bg-bgray-200"></div>
              <span className="text-sm font-medium text-bgray-600 dark:text-white">
                Others
              </span>
            </div>
            <p className="text-sm font-bold text-bgray-900 dark:text-bgray-50">
              {data.othersPercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyPanel;