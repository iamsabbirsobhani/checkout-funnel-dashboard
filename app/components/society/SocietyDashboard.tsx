'use client';

import { useState, useEffect } from 'react';
import SocietyHeader from './SocietyHeader';
import SocietyFilter from './SocietyFilter';
import SocietySection from './SocietySection';
import SocietyModal from './SocietyModal';
import SocietyMetricCard from './SocietyMetricCard';
import { SocietyMetric } from '../../lib/types/society';
import {
  societyData,
  sectionTitles,
  timeFrames,
  filterOptions,
} from '../../lib/data/societyData';
import styles from './SocietyDashboard.module.css';

export default function SocietyDashboard() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0].id);
  const [activeFilter, setActiveFilter] = useState(filterOptions[0].id);
  const [selectedMetric, setSelectedMetric] = useState<SocietyMetric | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleMetricClick = (metric: SocietyMetric) => {
    setSelectedMetric(metric);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMetric(null);
  };

  const isSectionVisible = (sectionId: string) => {
    return activeFilter === 'all' || activeFilter === sectionId;
  };

  if (isInitialLoading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner} />
          <div className={styles.loadingText}>Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SocietyHeader
          selectedTimeFrame={selectedTimeFrame}
          onTimeFrameChange={setSelectedTimeFrame}
        />

        <SocietyFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className={styles.keyMetricsSection}>
          <h2 className={styles.keyMetricsTitle}>
            <svg
              className={styles.keyMetricsIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
            Key Metrics
          </h2>
          <div className={styles.keyMetricsGrid}>
            {societyData['key-metrics'].map(
              (metric: SocietyMetric, index: number) => (
                <SocietyMetricCard
                  key={metric.title}
                  metric={metric}
                  index={index}
                  onClick={handleMetricClick}
                />
              ),
            )}
          </div>
        </div>

        <div className={styles.mainSections}>
          {Object.entries(sectionTitles).map(([sectionId, sectionTitle]) => (
            <SocietySection
              key={sectionId}
              id={sectionId}
              title={sectionTitle}
              icon={sectionId}
              metrics={
                societyData[
                  sectionId as keyof typeof societyData
                ] as SocietyMetric[]
              }
              onMetricClick={handleMetricClick}
              isVisible={isSectionVisible(sectionId)}
            />
          ))}
        </div>
      </div>

      <SocietyModal
        metric={selectedMetric}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
