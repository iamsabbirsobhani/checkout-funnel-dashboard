'use client';

import React from 'react';
import { EngagementMetrics } from './EngagementMetrics';
import { EngagementDetailedMetrics } from './EngagementDetailedMetrics';
import { EngagementMetricsData } from '../../lib/types/engagement';

interface EngagementSectionProps {
  metrics: EngagementMetricsData;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const EngagementSection: React.FC<EngagementSectionProps> = ({
  metrics,
  recordHighs,
  onHistoryClick,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Engagement & Content
        </h2>
        <p className="text-gray-600">
          Track your content performance and audience engagement metrics.
        </p>
      </div>

      {/* First Row - 3 metrics */}
      <EngagementMetrics
        metrics={metrics}
        recordHighs={recordHighs}
        onHistoryClick={onHistoryClick}
      />

      {/* Second Row - 4 metrics */}
      <EngagementDetailedMetrics
        metrics={metrics}
        recordHighs={recordHighs}
        onHistoryClick={onHistoryClick}
      />
    </div>
  );
};
