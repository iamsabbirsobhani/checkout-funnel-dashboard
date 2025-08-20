'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  rate: number;
  title: string;
  subtitle: string;
  metricKey: string;
  recordHigh: string;
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  rate,
  title,
  subtitle,
  metricKey,
  recordHigh,
  onHistoryClick,
}) => {
  const data = {
    labels: ['Converted', 'Not Converted'],
    datasets: [
      {
        data: [rate, 100 - rate],
        backgroundColor: ['#10b981', '#e5e7eb'],
        borderColor: '#ffffff',
        borderWidth: 4,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative text-center" data-metric={metricKey}>
      <div className="flex justify-center items-center gap-2 mb-2">
        <h4 className="text-lg text-gray-600">{title}</h4>
        <button
          onClick={() => onHistoryClick(metricKey, title)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="View History"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm font-semibold text-blue-600 mb-2">{subtitle}</p>
      <div className="relative w-40 h-40 mx-auto">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
          {rate.toFixed(1)}%
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Record High: <span>{recordHigh}</span>
      </p>
    </div>
  );
};
