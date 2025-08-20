'use client';

import { useState, useEffect } from 'react';
import { SocietyMetric } from '../../lib/types/society';
import {
  societyData,
  sectionTitles,
  sectionIcons,
} from '../../lib/data/societyData';
import SocietyHeader from './SocietyHeader';
import SocietyFilter from './SocietyFilter';
import SocietySection from './SocietySection';
import SocietyModal from './SocietyModal';
import SocietyMetricCard from './SocietyMetricCard';
import { Gem } from 'lucide-react';
import styles from './SocietyDashboard.module.css';

export default function SocietyDashboard() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('30d');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState<SocietyMetric | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved filter from localStorage
  useEffect(() => {
    const savedFilter = localStorage.getItem('societyFilter');
    if (savedFilter && savedFilter !== 'all') {
      setActiveFilter(savedFilter);
    }
  }, []);

  // Save filter choice to localStorage
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    localStorage.setItem('societyFilter', filter);
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SocietyHeader
          selectedTimeFrame={selectedTimeFrame}
          onTimeFrameChange={setSelectedTimeFrame}
        />

        {/* Key Metrics Section */}
        <section className={styles.keyMetricsSection}>
          <h2 className={styles.keyMetricsTitle}>
            <Gem className={styles.keyMetricsIcon} />
            Key Metrics
          </h2>
          <div className={styles.keyMetricsGrid}>
            {societyData['key-metrics'].map((metric, index) => (
              <SocietyMetricCard
                key={metric.title}
                metric={metric}
                index={index}
                onClick={handleMetricClick}
              />
            ))}
          </div>
        </section>

        <SocietyFilter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Main Dashboard Sections */}
        <div className={styles.mainSections}>
          <SocietySection
            id="engagement"
            title={sectionTitles.engagement}
            icon={sectionIcons.engagement}
            metrics={societyData.engagement}
            onMetricClick={handleMetricClick}
            isVisible={isSectionVisible('engagement')}
          />

          <SocietySection
            id="monetization"
            title={sectionTitles.monetization}
            icon={sectionIcons.monetization}
            metrics={societyData.monetization}
            onMetricClick={handleMetricClick}
            isVisible={isSectionVisible('monetization')}
          />

          <div className={styles.bottomGrid}>
            <SocietySection
              id="community-health"
              title={sectionTitles['community-health']}
              icon={sectionIcons['community-health']}
              metrics={societyData['community-health']}
              onMetricClick={handleMetricClick}
              isVisible={isSectionVisible('community-health')}
            />

            <SocietySection
              id="platform-health"
              title={sectionTitles['platform-health']}
              icon={sectionIcons['platform-health']}
              metrics={societyData['platform-health']}
              onMetricClick={handleMetricClick}
              isVisible={isSectionVisible('platform-health')}
            />
          </div>
        </div>

        <SocietyModal
          metric={selectedMetric}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
