'use client';

import React, { useState } from 'react';
import { Info, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string;
  recordHigh: string;
  metricKey: string;
  infoText: string;
  onHistoryClick: (metricKey: string, title: string) => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  recordHigh,
  metricKey,
  infoText,
  onHistoryClick,
  className,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={clsx(
        'bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative',
        className,
      )}
      data-metric={metricKey}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onHistoryClick(metricKey, title)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="View History"
          >
            <TrendingUp size={16} />
          </button>
          <div className="relative">
            <button
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Info size={16} />
            </button>
            {showInfo && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 text-gray-300 p-3 rounded-lg shadow-lg text-sm z-10">
                <div dangerouslySetInnerHTML={{ __html: infoText }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-xs text-gray-500 mt-1">
        Record High: <span>{recordHigh}</span>
      </p>
    </div>
  );
};
