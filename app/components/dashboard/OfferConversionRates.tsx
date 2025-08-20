'use client';

import React from 'react';
import { DoughnutChart } from './DoughnutChart';
import { DashboardMetrics } from '../../lib/types/dashboard';
import { getMetricDisplayValue } from '../../lib/utils/formatters';

interface OfferConversionRatesProps {
  metrics: DashboardMetrics;
  recordHighs: { [key: string]: number };
  onHistoryClick: (metricKey: string, title: string) => void;
}

export const OfferConversionRates: React.FC<OfferConversionRatesProps> = ({
  metrics,
  recordHighs,
  onHistoryClick,
}) => {
  const offerData = [
    {
      key: 'orderBumpRate',
      title: 'Order Bump',
      subtitle: 'Private Label Rights',
      infoText:
        'Percentage of customers who accepted the order bump. <br><strong>Formula:</strong> (Bumps Accepted / Total Purchases) * 100',
    },
    {
      key: 'upsell1Rate',
      title: 'Upsell 1',
      subtitle: 'Annual Template Access',
      infoText:
        'Percentage of customers who accepted the first upsell. <br><strong>Formula:</strong> (Upsell 1s Accepted / Total Purchases) * 100',
    },
    {
      key: 'upsell2Rate',
      title: 'Upsell 2',
      subtitle: '1-on-1 Coaching Call',
      infoText:
        'Percentage of customers who accepted the second upsell. <br><strong>Formula:</strong> (Upsell 2s Accepted / Upsell 1s Accepted) * 100',
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Offer Conversion Rates
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offerData.map(({ key, title, subtitle, infoText }) => {
          const metricKey = key as keyof DashboardMetrics;
          const rate = metrics[metricKey];
          const recordHigh = getMetricDisplayValue(recordHighs[key] || 0, true);

          return (
            <DoughnutChart
              key={key}
              rate={rate}
              title={title}
              subtitle={subtitle}
              metricKey={key}
              recordHigh={recordHigh}
              onHistoryClick={onHistoryClick}
            />
          );
        })}
      </div>
    </div>
  );
};
