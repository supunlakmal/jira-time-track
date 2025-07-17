"use client";

import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  FilterList,
  KeyboardArrowDown,
  MoreHoriz,
  SwapVert,
} from "@mui/icons-material";
import { Avatar, Checkbox } from "@mui/material";
import React from "react";
import {
  CustomerData,
  DashboardFilters,
  FilterOption,
  PaginationState,
} from "../../types/dashboard";
import SearchInput from "../ui/SearchInput";
import FilterDropdown from "./FilterDropdown";

interface DataTableProps {
  data: CustomerData[];
  filters: DashboardFilters;
  pagination: PaginationState;
  activeDropdown: string | null;
  onFilterChange: (key: keyof DashboardFilters, value: string) => void;
  onDropdownToggle: (dropdownId: string) => void;
  onPaginationChange: (pagination: PaginationState) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  filters,
  pagination,
  activeDropdown,
  onFilterChange,
  onDropdownToggle,
  onPaginationChange,
}) => {
  const locationOptions: FilterOption[] = [
    { value: "all", label: "All Locations" },
    { value: "usa", label: "USA" },
    { value: "brazil", label: "Brazil" },
  ];

  const amountOptions: FilterOption[] = [
    { value: "all", label: "All Amounts" },
    { value: ">1000", label: "> $1,000" },
    { value: "<1000", label: "< $1,000" },
  ];

  const dateOptions: FilterOption[] = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
  ];

  const transactionOptions: FilterOption[] = [
    { value: "all", label: "All transaction" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const resultOptions: FilterOption[] = [
    { value: "3", label: "3" },
    { value: "5", label: "5" },
    { value: "10", label: "10" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange("searchQuery", e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    onPaginationChange({
      ...pagination,
      currentPage: newPage,
    });
  };

  const handleItemsPerPageChange = (value: string) => {
    onPaginationChange({
      ...pagination,
      itemsPerPage: parseInt(value),
      currentPage: 1,
    });
  };

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        {/* Search and Filter Bar */}
        <div className="flex h-[56px] w-full space-x-4">
          <div className="hidden sm:block sm:w-70 lg:w-88">
            <SearchInput
              placeholder="Search by name, email, or others..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              variant="filled"
              fullWidth
              className="h-[56px] rounded-lg bg-bgray-100 dark:bg-darkblack-500 border-transparent focus-within:border-success-300"
            />
          </div>

          <div className="relative h-full flex-1">
            <button
              onClick={() => onDropdownToggle("table-filter")}
              type="button"
              className="flex h-full w-full items-center justify-center rounded-lg border border-bgray-300 bg-bgray-100 dark:border-darkblack-500 dark:bg-darkblack-500"
            >
              <div className="flex items-center space-x-3">
                <span>
                  <FilterList className="text-bgray-900 dark:text-success-400" />
                </span>
                <span className="text-base font-medium text-success-300">
                  Filters
                </span>
              </div>
            </button>

            {activeDropdown === "table-filter" && (
              <div className="absolute right-0 top-[60px] z-10 w-full overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500">
                <ul>
                  {["January", "February", "March"].map((month) => (
                    <li
                      key={month}
                      onClick={() => onDropdownToggle("table-filter")}
                      className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Filter Content */}
        <div className="filter-content w-full">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="w-full">
              <p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
                Location
              </p>
              <div className="relative h-[56px] w-full">
                <button
                  onClick={() => onDropdownToggle("province-filter")}
                  type="button"
                  className="relative flex h-full w-full items-center justify-between rounded-lg bg-bgray-100 px-4 dark:bg-darkblack-500"
                >
                  <span className="text-base text-bgray-500">
                    State or province
                  </span>
                  <KeyboardArrowDown className="text-bgray-500" />
                </button>

                {activeDropdown === "province-filter" && (
                  <FilterDropdown
                    id="province-filter"
                    label={filters.location || "Select Location"}
                    options={locationOptions}
                    isOpen={true}
                    onToggle={() => onDropdownToggle("province-filter")}
                    onSelect={(value) => onFilterChange("location", value)}
                    className="absolute right-0 top-14 z-10 w-full"
                  />
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
                Amount Spent
              </p>
              <div className="relative h-[56px] w-full">
                <button
                  onClick={() => onDropdownToggle("amount-filter")}
                  type="button"
                  className="relative flex h-full w-full items-center justify-between rounded-lg bg-bgray-100 px-4 dark:bg-darkblack-500"
                >
                  <span className="text-base text-bgray-500">{">"} $1,000</span>
                  <KeyboardArrowDown className="text-bgray-500" />
                </button>

                {activeDropdown === "amount-filter" && (
                  <FilterDropdown
                    id="amount-filter"
                    label={filters.amountSpent || "Select Amount"}
                    options={amountOptions}
                    isOpen={true}
                    onToggle={() => onDropdownToggle("amount-filter")}
                    onSelect={(value) => onFilterChange("amountSpent", value)}
                    className="absolute right-0 top-14 z-10 w-full"
                  />
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
                Transaction list Date
              </p>
              <div className="relative h-[56px] w-full">
                <button
                  onClick={() => onDropdownToggle("date-filter-table")}
                  type="button"
                  className="relative flex h-full w-full items-center justify-between rounded-lg bg-bgray-100 px-4 dark:bg-darkblack-500"
                >
                  <span className="text-base text-bgray-500">Select date</span>
                  <CalendarToday className="text-bgray-500 dark:text-white" />
                </button>

                {activeDropdown === "date-filter-table" && (
                  <FilterDropdown
                    id="date-filter-table"
                    label={filters.transactionDate || "Select Date"}
                    options={dateOptions}
                    isOpen={true}
                    onToggle={() => onDropdownToggle("date-filter-table")}
                    onSelect={(value) =>
                      onFilterChange("transactionDate", value)
                    }
                    className="absolute right-0 top-14 z-10 w-full"
                  />
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
                Type of transaction
              </p>
              <div className="relative h-[56px] w-full">
                <button
                  onClick={() => onDropdownToggle("trans-filter-tb")}
                  type="button"
                  className="relative flex h-full w-full items-center justify-between rounded-lg bg-bgray-100 px-4 dark:bg-darkblack-500"
                >
                  <span className="text-base text-bgray-500">
                    All transaction
                  </span>
                  <KeyboardArrowDown className="text-bgray-500" />
                </button>

                {activeDropdown === "trans-filter-tb" && (
                  <FilterDropdown
                    id="trans-filter-tb"
                    label={filters.transactionType || "Select Type"}
                    options={transactionOptions}
                    isOpen={true}
                    onToggle={() => onDropdownToggle("trans-filter-tb")}
                    onSelect={(value) =>
                      onFilterChange("transactionType", value)
                    }
                    className="absolute right-0 top-14 z-10 w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="table-content w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                <td>
                  <label className="text-center">
                    <Checkbox
                      sx={{
                        color: "#A0AEC0",
                        "&.Mui-checked": {
                          color: "#22C55E",
                        },
                      }}
                    />
                  </label>
                </td>
                <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Customer name
                    </span>
                    <SwapVert className="text-bgray-600" />
                  </div>
                </td>
                <td className="px-6 py-5 xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Email
                    </span>
                    <SwapVert className="text-bgray-600" />
                  </div>
                </td>
                <td className="px-6 py-5 xl:px-0">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Location
                    </span>
                    <SwapVert className="text-bgray-600" />
                  </div>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Spent
                    </span>
                    <SwapVert className="text-bgray-600" />
                  </div>
                </td>
                <td className="px-6 py-5 xl:px-0"></td>
              </tr>
            </thead>
            <tbody>
              {data.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-bgray-300 dark:border-darkblack-400"
                >
                  <td>
                    <label className="text-center">
                      <Checkbox
                        sx={{
                          color: "#A0AEC0",
                          "&.Mui-checked": {
                            color: "#22C55E",
                          },
                        }}
                      />
                    </label>
                  </td>
                  <td className="px-6 py-5 xl:px-0">
                    <div className="flex w-full items-center space-x-2.5">
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#F3F4F6",
                        }}
                        src={customer.avatar}
                        alt="avatar"
                      >
                        {customer.name.charAt(0)}
                      </Avatar>
                      <p className="text-base font-semibold text-bgray-900 dark:text-white">
                        {customer.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5 xl:px-0">
                    <p className="text-base font-medium text-bgray-900 dark:text-white">
                      {customer.email}
                    </p>
                  </td>
                  <td className="px-6 py-5 xl:px-0">
                    <p className="text-base font-medium text-bgray-900 dark:text-white">
                      {customer.location}
                    </p>
                  </td>
                  <td className="w-[165px] px-6 py-5 xl:px-0">
                    <p className="text-base font-semibold text-bgray-900 dark:text-white">
                      {customer.spent}
                    </p>
                  </td>
                  <td className="px-6 py-5 xl:px-0">
                    <div className="flex justify-center">
                      <button type="button">
                        <MoreHoriz className="text-bgray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-content w-full">
          <div className="flex w-full items-center justify-center lg:justify-between">
            <div className="hidden items-center space-x-4 lg:flex">
              <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
                Show result:
              </span>
              <div className="relative">
                <FilterDropdown
                  id="result-filter"
                  label={pagination.itemsPerPage.toString()}
                  options={resultOptions}
                  isOpen={activeDropdown === "result-filter"}
                  onToggle={() => onDropdownToggle("result-filter")}
                  onSelect={handleItemsPerPageChange}
                  className="border border-bgray-300 dark:border-darkblack-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-5 sm:space-x-[35px]">
              <button
                type="button"
                onClick={() =>
                  handlePageChange(Math.max(1, pagination.currentPage - 1))
                }
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="text-bgray-400" />
              </button>

              <div className="flex items-center">
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === pagination.currentPage;

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out lg:px-6 lg:py-2.5 lg:text-sm ${
                        isActive
                          ? "bg-success-50 text-success-300 dark:bg-darkblack-500 dark:text-bgray-50"
                          : "text-bgray-500 hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 3 && (
                  <>
                    <span className="text-sm text-bgray-500">. . . .</span>
                    <button
                      type="button"
                      onClick={() => handlePageChange(totalPages)}
                      className="rounded-lg px-4 py-1.5 text-xs font-bold text-bgray-500 transition duration-300 ease-in-out hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500 lg:px-6 lg:py-2.5 lg:text-sm"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePageChange(
                    Math.min(totalPages, pagination.currentPage + 1)
                  )
                }
                disabled={pagination.currentPage === totalPages}
              >
                <ChevronRight className="text-bgray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
