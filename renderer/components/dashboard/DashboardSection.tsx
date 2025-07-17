"use client";

import React, { useState } from "react";
import {
  CustomerData,
  DashboardFilters,
  EfficiencyData,
  LocationData,
  PaginationState,
  StatsCardData,
} from "../../types/dashboard";
import DataTable from "./DataTable";
import EfficiencyPanel from "./EfficiencyPanel";
import FilterDropdown from "./FilterDropdown";
import LocationAnalytics from "./LocationAnalytics";
import StatsCard from "./StatsCard";

// Mock data - replace with real data from props or API
const mockStatsData: StatsCardData[] = [
  {
    id: "1",
    title: "Total earnings",
    value: "$7,245.00",
    change: "+ 3.5%",
    changeType: "positive",
    icon: "earnings",
    chartId: "totalEarnBar",
  },
  {
    id: "2",
    title: "Total Spending",
    value: "$7,245.00",
    change: "+ 3.5%",
    changeType: "positive",
    icon: "spending",
    chartId: "totalSpendingBar",
  },
  {
    id: "3",
    title: "Total Goals",
    value: "$7,245.00",
    change: "+ 3.5%",
    changeType: "positive",
    icon: "goals",
    chartId: "totalGoalBar",
  },
  {
    id: "4",
    title: "Monthly Spending",
    value: "$7,245.00",
    change: "+ 3.5%",
    changeType: "positive",
    icon: "monthly",
    chartId: "monthSpendingBar",
  },
];

const mockEfficiencyData: EfficiencyData = {
  arrival: 5230,
  spending: 6230,
  goal: 13,
  goalPercentage: 13,
  spendingPercentage: 28,
  othersPercentage: 59,
};

const mockLocationData: LocationData[] = [
  {
    id: "1",
    country: "Brazil",
    flagImage: "/assets/images/flag/fe.png",
    percentage: 65,
    progressColor: "success",
  },
  {
    id: "2",
    country: "Brazil",
    flagImage: "/assets/images/flag/bra.png",
    percentage: 85,
    progressColor: "warning",
  },
  {
    id: "3",
    country: "Italy",
    flagImage: "/assets/images/flag/italy.png",
    percentage: 95,
    progressColor: "orange",
  },
];

const mockCustomerData: CustomerData[] = [
  {
    id: "1",
    name: "Devon Lane",
    email: "devon@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
  },
  {
    id: "2",
    name: "Bessie Cooper",
    email: "devon@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
  },
  {
    id: "3",
    name: "Dianne Russell",
    email: "devon@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
  },
];

const DashboardSection: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: "Jan 10 - Jan 16",
    location: "",
    amountSpent: "",
    transactionDate: "",
    transactionType: "",
    searchQuery: "",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: mockCustomerData.length,
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDropdownToggle = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <section className="mb-6 2xl:mb-0 2xl:flex-1">
      {/* Stats Cards Grid */}
      <div className="mb-[24px] w-full xl:flex xl:space-x-[24px]">
        <div className="w-full xl:w-66">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-[24px]">
            {mockStatsData.map((stat) => (
              <StatsCard key={stat.id} data={stat} />
            ))}
          </div>
        </div>

        {/* Efficiency Panel */}
        <div className="hidden flex-1 xl:block">
          <EfficiencyPanel
            data={mockEfficiencyData}
            onFilterChange={(value) => handleFilterChange("dateRange", value)}
            activeDropdown={activeDropdown}
            onDropdownToggle={handleDropdownToggle}
          />
        </div>
      </div>

      {/* Summary Chart and Location Analytics */}
      <div className="mb-[24px] flex w-full space-x-[24px]">
        {/* Summary Chart */}
        <div className="flex w-full flex-col justify-between rounded-lg bg-white px-[24px] py-3 dark:bg-darkblack-600 xl:w-66">
          <div className="mb-2 flex items-center justify-between border-b border-bgray-300 pb-2 dark:border-darkblack-400">
            <h3 className="text-xl font-bold text-bgray-900 dark:text-white sm:text-2xl">
              Summary
            </h3>
            <div className="hidden items-center space-x-[28px] sm:flex">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-orange"></div>
                <span className="text-sm font-medium text-bgray-700 dark:text-white">
                  Lost
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-success-300"></div>
                <span className="text-sm font-medium text-bgray-700 dark:text-white">
                  Signed
                </span>
              </div>
            </div>
            <FilterDropdown
              id="date-filter-body"
              label={filters.dateRange}
              options={[
                { value: "Jan 10 - Jan 16", label: "Jan 10 - Jan 16" },
                { value: "Jan 17 - Jan 23", label: "Jan 17 - Jan 23" },
                { value: "Jan 24 - Jan 30", label: "Jan 24 - Jan 30" },
              ]}
              isOpen={activeDropdown === "date-filter-body"}
              onToggle={() => handleDropdownToggle("date-filter-body")}
              onSelect={(value) => handleFilterChange("dateRange", value)}
            />
          </div>
          <div className="w-full">
            <canvas id="revenueFlowBar" height="255"></canvas>
          </div>
        </div>

        {/* Location Analytics */}
        <div className="hidden flex-1 xl:block">
          <LocationAnalytics data={mockLocationData} />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockCustomerData}
        filters={filters}
        pagination={pagination}
        activeDropdown={activeDropdown}
        onFilterChange={handleFilterChange}
        onDropdownToggle={handleDropdownToggle}
        onPaginationChange={setPagination}
      />
    </section>
  );
};

export default DashboardSection;
