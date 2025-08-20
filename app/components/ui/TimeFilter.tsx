'use client';

import React from 'react';
import { TimeFrame } from '../../lib/types/dashboard';

interface TimeFilterProps {
  selectedTimeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
  selectedTimeframe,
  onTimeframeChange,
}) => {
  const timeframes: { value: TimeFrame; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="flex justify-center space-x-2">
      {timeframes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTimeframeChange(value)}
          className={`px-4 py-2 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedTimeframe === value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
