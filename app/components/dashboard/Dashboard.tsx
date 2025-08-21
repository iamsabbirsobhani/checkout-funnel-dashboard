'use client';

import React, { useState, useCallback } from 'react';
import { TimeFilter } from '../ui/TimeFilter';
import { FunnelSelector } from '../ui/FunnelSelector';
import { CoreMetrics } from './CoreMetrics';
import { DetailedMetrics } from './DetailedMetrics';
import { OfferConversionRates } from './OfferConversionRates';
import { SubscriptionPopularityChart } from './SubscriptionPopularityChart';
import { HistoryModal } from '../ui/HistoryModal';
import { EngagementSection } from '../engagement/EngagementSection';
import {
  TimeFrame,
  FunnelType,
  DashboardMetrics,
  RecordHighs,
} from '../../lib/types/dashboard';
import {
  generateMockData,
  calculateMetrics,
  INDIVIDUAL_FUNNELS,
} from '../../lib/data/mockData';
import {
  generateEngagementData,
  calculateEngagementMetrics,
} from '../../lib/data/engagementData';

export const Dashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<TimeFrame>('daily');
  const [selectedFunnel, setSelectedFunnel] =
    useState<FunnelType>('all-funnels');
  const [selectedIndividualFunnel, setSelectedIndividualFunnel] =
    useState<string>(INDIVIDUAL_FUNNELS[0]);
  const [recordHighs, setRecordHighs] = useState<RecordHighs>({});
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyModalData, setHistoryModalData] = useState<{
    title: string;
    data: number[];
  }>({ title: '', data: [] });

  // Generate data based on current filters
  const getCurrentFunnel = (): string => {
    return selectedFunnel === 'individual-funnels'
      ? selectedIndividualFunnel
      : selectedFunnel;
  };

  const currentData = generateMockData(
    selectedTimeframe,
    getCurrentFunnel() as FunnelType,
  );
  const metrics = calculateMetrics(currentData);

  const engagementData = generateEngagementData(
    selectedTimeframe,
    getCurrentFunnel() as FunnelType,
  );
  const engagementMetrics = calculateEngagementMetrics(engagementData);

  // Update record highs
  const updateRecordHighs = useCallback(() => {
    const key = `${selectedTimeframe}-${getCurrentFunnel()}`;
    if (!recordHighs[key]) recordHighs[key] = {};

    // Update dashboard metrics record highs
    Object.keys(metrics).forEach((metric) => {
      const isRate = metric.toLowerCase().includes('rate');
      const isChurn = metric === 'churnRate';
      const currentValue = metrics[metric as keyof DashboardMetrics];
      const currentHigh = recordHighs[key][metric] || (isChurn ? 100 : 0);

      if (
        (isChurn && currentValue < currentHigh) ||
        (!isChurn && currentValue > currentHigh)
      ) {
        setRecordHighs((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            [metric]: currentValue,
          },
        }));
      }
    });

    // Update engagement metrics record highs
    Object.keys(engagementMetrics).forEach((metric) => {
      const isRate = metric.toLowerCase().includes('rate');
      const currentValue =
        engagementMetrics[metric as keyof typeof engagementMetrics];
      const currentHigh = recordHighs[key][metric] || 0;

      if (currentValue > currentHigh) {
        setRecordHighs((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            [metric]: currentValue,
          },
        }));
      }
    });
  }, [
    selectedTimeframe,
    selectedFunnel,
    selectedIndividualFunnel,
    metrics,
    engagementMetrics,
    recordHighs,
  ]);

  // Update record highs when data changes
  React.useEffect(() => {
    updateRecordHighs();
  }, [updateRecordHighs]);

  const handleHistoryClick = useCallback(
    (metricKey: string, title: string) => {
      let historyData: number[];

      // Check if it's an engagement metric
      if (engagementData.history[metricKey]) {
        historyData = engagementData.history[metricKey];
      } else if (metricKey.includes('Rate')) {
        // Calculate rate history
        const numeratorKey =
          metricKey === 'conversionRate'
            ? 'purchases'
            : metricKey === 'orderBumpRate'
            ? 'orderBumpsAccepted'
            : metricKey === 'upsell1Rate'
            ? 'upsell1Accepted'
            : 'upsell2Accepted';
        const denominatorKey =
          metricKey === 'conversionRate'
            ? 'visitors'
            : metricKey === 'upsell2Rate'
            ? 'upsell1Accepted'
            : 'purchases';

        historyData = currentData.history[numeratorKey].map((num, i) => {
          const den = currentData.history[denominatorKey][i];
          return den > 0 ? (num / den) * 100 : 0;
        });
      } else {
        // Use direct history data
        const historyKey =
          metricKey === 'visitors'
            ? 'visitors'
            : metricKey === 'purchases'
            ? 'purchases'
            : metricKey === 'newSubscribers'
            ? 'newSubscribers'
            : metricKey === 'activeSubscriptions'
            ? 'activeSubscriptions'
            : metricKey === 'oneTimePurchases'
            ? 'oneTimePurchases'
            : metricKey === 'churnRate'
            ? 'activeSubscriptions' // Use activeSubscriptions for churn visualization
            : 'visitors'; // fallback

        historyData = currentData.history[historyKey] || [];
      }

      setHistoryModalData({ title, data: historyData });
      setIsHistoryModalOpen(true);
    },
    [currentData.history, engagementData.history],
  );

  const handleTimeframeChange = (timeframe: TimeFrame) => {
    setSelectedTimeframe(timeframe);
  };

  const handleFunnelChange = (funnel: FunnelType) => {
    setSelectedFunnel(funnel);
  };

  const handleIndividualFunnelChange = (funnel: string) => {
    setSelectedIndividualFunnel(funnel);
  };

  const currentRecordHighs =
    recordHighs[`${selectedTimeframe}-${getCurrentFunnel()}`] || {};

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout Funnel Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            An overview of your checkout performance.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <TimeFilter
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={handleTimeframeChange}
          />
          <FunnelSelector
            selectedFunnel={selectedFunnel}
            selectedIndividualFunnel={selectedIndividualFunnel}
            onFunnelChange={handleFunnelChange}
            onIndividualFunnelChange={handleIndividualFunnelChange}
          />
        </div>

        {/* Core Metrics */}
        <CoreMetrics
          metrics={metrics}
          recordHighs={currentRecordHighs}
          onHistoryClick={handleHistoryClick}
        />

        {/* Detailed Metrics */}
        <DetailedMetrics
          metrics={metrics}
          recordHighs={currentRecordHighs}
          onHistoryClick={handleHistoryClick}
        />

        {/* Engagement & Content Section */}
        <EngagementSection
          metrics={engagementMetrics}
          recordHighs={currentRecordHighs}
          onHistoryClick={handleHistoryClick}
        />

        {/* Offer Conversion Rates */}
        <OfferConversionRates
          metrics={metrics}
          recordHighs={currentRecordHighs}
          onHistoryClick={handleHistoryClick}
        />

        {/* Subscription Popularity Chart */}
        <SubscriptionPopularityChart
          subscriptionPlans={currentData.subscriptionPlans}
        />
      </div>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title={historyModalData.title}
        data={historyModalData.data}
      />
    </div>
  );
};
