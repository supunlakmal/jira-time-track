
import React from "react";

interface ProjectCostProps {
  cost: number;
  currency: string;
  rate?: number;
}

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const ProjectCost: React.FC<ProjectCostProps> = ({ cost, currency, rate }) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-gray-900 dark:text-white">
        {formatCurrency(cost, currency)}
      </span>
      {rate && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatCurrency(rate, currency)}/h
        </span>
      )}
    </div>
  );
};

export default ProjectCost;
