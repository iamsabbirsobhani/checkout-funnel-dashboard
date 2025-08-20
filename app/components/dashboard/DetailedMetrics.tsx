'use client';

import React from 'react';
import { MetricCard } from '../ui/MetricCard';
import { DashboardMetrics } from '../../lib/types/dashboard';
import { getMetricDisplayValue, getMetricId } from '../../lib/utils/formatters';

interface DetailedMetricsProps {
  metrics: DashboardMetrics;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const DetailedMetrics: React.FC<DetailedMetricsProps> = ({
  metrics,
  recordHighs,
  onHistoryClick,
}) => {
  const detailedMetricsData = [
    {
      key: 'newSubscribers',
      title: 'New Subscribers',
      infoText:
        'The number of new customers who successfully signed up for a subscription product in this funnel.',
    },
    {
      key: 'activeSubscriptions',
      title: 'Active Subscriptions',
      infoText:
        'Total number of active subscription plans currently running. One customer can have multiple subscriptions.',
    },
    {
      key: 'oneTimePurchases',
      title: 'One-Time Purchases',
      infoText:
        'The number of customers who successfully purchased a non-subscription product in this funnel.',
    },
    {
      key: 'churnRate',
      title: 'Subscription Churn Rate',
      infoText:
        'The percentage of subscribers who canceled their subscription within the selected period. (Note: This is a simulated metric).',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {detailedMetricsData.map(({ key, title, infoText }) => {
        const metricKey = key as keyof DashboardMetrics;
        const value = metrics[metricKey];
        const isRate = key.toLowerCase().includes('rate');
        const isChurn = key === 'churnRate';
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
            className={isChurn ? 'border-red-200' : ''}
          />
        );
      })}
    </div>
  );
};
