'use client';

import React from 'react';
import { FunnelType } from '../../lib/types/dashboard';
import { INDIVIDUAL_FUNNELS } from '../../lib/data/mockData';

interface FunnelSelectorProps {
  selectedFunnel: FunnelType;
  selectedIndividualFunnel: string;
  onFunnelChange: (funnel: FunnelType) => void;
  onIndividualFunnelChange: (funnel: string) => void;
}

export const FunnelSelector: React.FC<FunnelSelectorProps> = ({
  selectedFunnel,
  selectedIndividualFunnel,
  onFunnelChange,
  onIndividualFunnelChange,
}) => {
  const funnelOptions = [
    { value: 'all-funnels' as FunnelType, label: 'All Funnels' },
    {
      value: 'subscription-funnel' as FunnelType,
      label: 'Subscription Funnel',
    },
    {
      value: 'one-time-funnel' as FunnelType,
      label: 'One-Time Purchase Funnel',
    },
    { value: 'individual-funnels' as FunnelType, label: 'Individual Funnels' },
  ];

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedFunnel}
        onChange={(e) => onFunnelChange(e.target.value as FunnelType)}
        className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {funnelOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {selectedFunnel === 'individual-funnels' && (
        <select
          value={selectedIndividualFunnel}
          onChange={(e) => onIndividualFunnelChange(e.target.value)}
          className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {INDIVIDUAL_FUNNELS.map((funnel) => (
            <option key={funnel} value={funnel}>
              {funnel}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
