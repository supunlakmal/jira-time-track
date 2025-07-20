"use client";

import React from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { FilterOption } from '../../types/dashboard';

interface FilterDropdownProps {
  id: string;
  label: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  id,
  label,
  options,
  isOpen,
  onToggle,
  onSelect,
  className = ""
}) => {
  const handleOptionClick = (value: string) => {
    onSelect(value);
    onToggle(); // Close dropdown after selection
  };

  return (
    <div className={`date-filter relative ${className}`}>
      <button
        onClick={onToggle}
        type="button"
        className="flex items-center space-x-1 overflow-hidden rounded-lg bg-bgray-100 px-3 py-2 dark:bg-darkblack-500"
      >
        <span className="text-sm font-medium text-bgray-900 dark:text-white">
          {label}
        </span>
        <span>
          <KeyboardArrowDown 
            className={`text-bgray-900 dark:text-gray-50 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </span>
      </button>
      
      {isOpen && (
        <div
          id={id}
          className="absolute right-0 top-[44px] z-10 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500"
        >
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;