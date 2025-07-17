"use client";

import React from 'react';
import { TrendingUp } from '@mui/icons-material';
import Image from 'next/image';
import { LocationData } from '../../types/dashboard';

interface LocationAnalyticsProps {
  data: LocationData[];
}

const LocationAnalytics: React.FC<LocationAnalyticsProps> = ({ data }) => {
  const getProgressBarColor = (color: 'success' | 'warning' | 'orange') => {
    switch (color) {
      case 'success':
        return 'bg-success-300';
      case 'warning':
        return 'bg-warning-100';
      case 'orange':
        return 'bg-orange';
      default:
        return 'bg-success-300';
    }
  };

  const getTrendIcon = () => (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 5.89575L3.5 2.89575L5.5 4.89575L9.5 0.895752"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 0.895752H9.5V4.39575"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="h-full w-full rounded-lg bg-white p-5 dark:bg-darkblack-600">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
          Most Location
        </h3>
        <div className="flex items-center space-x-1.5">
          <span className="text-2xl font-bold text-bgray-900 dark:text-white">
            76,345
          </span>
          <div className="flex h-[22px] w-[60px] items-center justify-center rounded-full bg-success-400">
            <div className="flex items-center space-x-1">
              <span>{getTrendIcon()}</span>
              <span className="text-xs font-medium text-white">12,00%</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mb-8 text-sm text-bgray-600 dark:text-bgray-50">
        Compared to last month
      </p>
      
      <div className="flex flex-col space-y-8">
        {data.map((location) => (
          <div key={location.id} className="flex items-center space-x-5">
            <div className="w-[30px]">
              <Image
                src={location.flagImage}
                width={30}
                height={20}
                alt="flag"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-bgray-900 dark:text-white">
                  {location.country}
                </span>
                <span className="text-sm font-medium dark:text-white">
                  {location.percentage}%
                </span>
              </div>
              <div className="relative h-[14px] w-full overflow-hidden rounded bg-bgray-100">
                <div
                  style={{ width: `${location.percentage}%` }}
                  className={`absolute left-0 top-0 h-full rounded ${getProgressBarColor(
                    location.progressColor
                  )}`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationAnalytics;