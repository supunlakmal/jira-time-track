"use client";

import React from "react";
import {
  TrendingUp,
  AccountBalance,
  Timeline,
  Work,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { StatsCardData } from "../../types/dashboard";

interface StatsCardProps {
  data: StatsCardData;
}

const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  const formatValue = (value: string | number, category?: string): string => {
    if (typeof value === 'string') return value;
    
    switch (category) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      case "time":
        return formatTime(value);
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "number":
      default:
        return value.toLocaleString();
    }
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getIcon = (iconType: string) => {
    const iconProps = {
      className: "text-bgray-900 dark:text-white",
      fontSize: "medium" as const,
    };

    switch (iconType) {
      case "earnings":
        return <AccountBalance {...iconProps} />;
      case "spending":
        return <Timeline {...iconProps} />;
      case "goals":
        return <Work {...iconProps} />;
      case "monthly":
        return <TrendingUp {...iconProps} />;
      case "tickets":
        return (
          <svg className="w-6 h-6 text-bgray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case "points":
        return (
          <svg className="w-6 h-6 text-bgray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "time":
        return (
          <svg className="w-6 h-6 text-bgray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "projects":
        return (
          <svg className="w-6 h-6 text-bgray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return <TrendingUp {...iconProps} />;
    }
  };

  const getTrendIcon = () => (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
        fill="#22C55E"
      />
      <path
        opacity="0.4"
        d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
        fill="#22C55E"
      />
    </svg>
  );

  return (
    <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>{getIcon(data.icon)}</span>
          </div>
          <span className="text-lg font-semibold text-bgray-900 dark:text-white">
            {data.title}
          </span>
        </div>
        <div>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              backgroundColor: "transparent",
            }}
            src="/assets/images/avatar/members-2.png"
            alt="members"
          />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
            {formatValue(data.value, data.category)}
          </p>
          <div className="flex items-center space-x-1">
            <span>{getTrendIcon()}</span>
            <span className="text-sm font-medium text-success-300">
              {data.change}
            </span>
          </div>
        </div>
        <div className="w-[136px]">
          <canvas id={data.chartId} height="68"></canvas>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
