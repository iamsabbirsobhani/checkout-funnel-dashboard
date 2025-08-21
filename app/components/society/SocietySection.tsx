'use client';

import { SocietyMetric } from '../../lib/types/society';
import SocietyMetricCard from './SocietyMetricCard';
import {
  MessageSquare,
  ShoppingCart,
  Shield,
  Server,
  LucideIcon,
} from 'lucide-react';
import styles from './SocietySection.module.css';

interface SocietySectionProps {
  id: string;
  title: string;
  icon: string;
  metrics: SocietyMetric[];
  onMetricClick: (metric: SocietyMetric) => void;
  isVisible: boolean;
}

// Icon mapping to avoid dynamic imports that cause issues
const iconMap: Record<string, LucideIcon> = {
  'message-square': MessageSquare,
  'shopping-cart': ShoppingCart,
  shield: Shield,
  server: Server,
};

export default function SocietySection({
  id,
  title,
  icon,
  metrics,
  onMetricClick,
  isVisible,
}: SocietySectionProps) {
  const IconComponent = iconMap[icon] || MessageSquare; // fallback to MessageSquare

  // For engagement section, separate priority and non-priority metrics
  const priorityMetrics = metrics.filter((metric) => metric.priority);
  const nonPriorityMetrics = metrics.filter((metric) => !metric.priority);

  return (
    <section
      id={id}
      className={`${styles.section} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <h2 className={styles.sectionTitle}>
        <IconComponent className={styles.sectionIcon} />
        {title}
      </h2>

      {id === 'engagement' ? (
        <>
          {/* First row - 3 priority metrics */}
          <div className={styles.engagementFirstRow}>
            {priorityMetrics.map((metric, index) => (
              <SocietyMetricCard
                key={metric.title}
                metric={metric}
                index={index}
                onClick={onMetricClick}
              />
            ))}
          </div>

          {/* Second row - 4 non-priority metrics */}
          <div className={styles.engagementSecondRow}>
            {nonPriorityMetrics.map((metric, index) => (
              <SocietyMetricCard
                key={metric.title}
                metric={metric}
                index={index + priorityMetrics.length}
                onClick={onMetricClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          className={`${styles.grid} ${
            id === 'monetization' ? styles.monetization : ''
          }`}
        >
          {metrics.map((metric, index) => (
            <SocietyMetricCard
              key={metric.title}
              metric={metric}
              index={index}
              onClick={onMetricClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
