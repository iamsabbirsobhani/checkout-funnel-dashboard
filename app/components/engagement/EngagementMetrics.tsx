'use client';

import React from 'react';
import { EngagementMetricCard } from './EngagementMetricCard';
import { EngagementMetricsData } from '../../lib/types/engagement';

interface EngagementMetricsProps {
  metrics: EngagementMetricsData;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  metrics,
  recordHighs,
  onHistoryClick,
}) => {
  const engagementMetricsData = [
    {
      key: 'numberOfPosts',
      title: 'Number of Posts',
      infoText: 'Total number of posts published in the selected timeframe.',
    },
    {
      key: 'numberOfPostLikes',
      title: 'Number of Post Likes',
      infoText:
        'Total number of likes received across all posts in the selected timeframe.',
    },
    {
      key: 'numberOfComments',
      title: 'Number of Comments',
      infoText:
        'Total number of comments received across all posts in the selected timeframe.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {engagementMetricsData.map(({ key, title, infoText }) => {
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
