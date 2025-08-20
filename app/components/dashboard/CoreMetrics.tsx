'use client';

import React from 'react';
import { MetricCard } from '../ui/MetricCard';
import { DashboardMetrics } from '../../lib/types/dashboard';
import { getMetricDisplayValue, getMetricId } from '../../lib/utils/formatters';

interface CoreMetricsProps {
  metrics: DashboardMetrics;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const CoreMetrics: React.FC<CoreMetricsProps> = ({
  metrics,
  recordHighs,
  onHistoryClick,
}) => {
  const coreMetricsData = [
    {
      key: 'visitors',
      title: 'Clicks / Visitors',
      infoText:
        'The total number of unique users who have entered the top of this specific funnel within the selected timeframe.',
    },
    {
      key: 'purchases',
      title: 'Total Purchases',
      infoText:
        'The total number of successful transactions completed. An order bump or upsell does not count as a separate purchase.',
    },
    {
      key: 'conversionRate',
      title: 'Overall Conversion Rate',
      infoText:
        'The percentage of visitors who completed a purchase. <br><strong>Formula:</strong> (Total Purchases / Clicks) * 100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {coreMetricsData.map(({ key, title, infoText }) => {
        const metricKey = key as keyof DashboardMetrics;
        const value = metrics[metricKey];
        const isRate = key.toLowerCase().includes('rate');
        const displayValue = getMetricDisplayValue(value, isRate);
        const recordHigh = getMetricDisplayValue(recordHighs[key] || 0, isRate);

        return (
          <MetricCard
            key={key}
            title={title}
            value={displayValue}
            recordHigh={recordHigh}
            metricKey={getMetricId(key)}
            infoText={infoText}
            onHistoryClick={onHistoryClick}
          />
        );
      })}
    </div>
  );
};
