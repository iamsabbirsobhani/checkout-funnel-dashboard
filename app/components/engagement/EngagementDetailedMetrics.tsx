'use client';

import React from 'react';
import { EngagementMetricCard } from './EngagementMetricCard';
import { EngagementMetricsData } from '../../lib/types/engagement';

interface EngagementDetailedMetricsProps {
  metrics: EngagementMetricsData;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const EngagementDetailedMetrics: React.FC<
  EngagementDetailedMetricsProps
> = ({ metrics, recordHighs, onHistoryClick }) => {
  const detailedEngagementMetricsData = [
    {
      key: 'engagementRate',
      title: 'Engagement Rate',
      infoText:
        'Average engagement rate across all posts (likes + comments / followers).',
    },
    {
      key: 'reach',
      title: 'Total Reach',
      infoText: 'Total number of unique users who saw your content.',
    },
    {
      key: 'impressions',
      title: 'Total Impressions',
      infoText: 'Total number of times your content was displayed to users.',
    },
    {
      key: 'shares',
      title: 'Total Shares',
      infoText: 'Total number of times your content was shared by users.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {detailedEngagementMetricsData.map(({ key, title, infoText }) => {
        const metricKey = key as keyof EngagementMetricsData;
        const value = metrics[metricKey];
        const recordHigh = recordHighs[key] || 0;

        return (
          <EngagementMetricCard
            key={key}
            title={title}
            value={value}
            recordHigh={recordHigh}
            metricKey={key}
            infoText={infoText}
            onHistoryClick={onHistoryClick}
          />
        );
      })}
    </div>
  );
};
