'use client';

import { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';
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
            <Gem className={styles.keyMetricsIcon} />
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
          {Object.entries(sectionTitles).map(([sectionId, sectionTitle]) => {
            // Only show sections that match the active filter
            if (!isSectionVisible(sectionId)) {
              return null;
            }

            return (
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
                isVisible={true}
              />
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Corvin Van Stone. All rights reserved.
          </div>
          <div className={styles.poweredBy}>
            Powered by{' '}
            <a
              href="https://selfpublishingtitans.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.poweredByLink}
            >
              Digital Titans
            </a>
          </div>
        </div>
      </footer>

      <SocietyModal
        metric={selectedMetric}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
