'use client';

import React, { useState } from 'react';
import { Info, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './EngagementMetricCard.module.css';

interface EngagementMetricCardProps {
  title: string;
  value: number;
  recordHigh: number;
  metricKey: string;
  infoText: string;
  onHistoryClick: (metricKey: string, title: string) => void;
  className?: string;
}

export const EngagementMetricCard: React.FC<EngagementMetricCardProps> = ({
  title,
  value,
  recordHigh,
  metricKey,
  infoText,
  onHistoryClick,
  className,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const formatValue = (val: number): string => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toString();
  };

  return (
    <div
      className={clsx(styles.engagementCard, className)}
      data-metric={metricKey}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardActions}>
          <button
            onClick={() => onHistoryClick(metricKey, title)}
            className={styles.historyButton}
            title="View History"
          >
            <TrendingUp size={16} />
          </button>
          <div className={styles.infoContainer}>
            <button
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className={styles.infoButton}
            >
              <Info size={16} />
            </button>
            {showInfo && (
              <div className={styles.infoTooltip}>
                <div dangerouslySetInnerHTML={{ __html: infoText }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className={styles.cardValue}>{formatValue(value)}</p>
      <p className={styles.recordHigh}>
        Record High: <span>{formatValue(recordHigh)}</span>
      </p>
    </div>
  );
};
