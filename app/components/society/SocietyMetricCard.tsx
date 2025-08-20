'use client';

import { useState, useEffect, useRef } from 'react';
import { Gem, Star, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { SocietyMetric } from '../../lib/types/society';
import { generateTrendData } from '../../lib/data/societyData';
import styles from './SocietyMetricCard.module.css';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SocietyMetricCardProps {
  metric: SocietyMetric;
  index: number;
  onClick: (metric: SocietyMetric) => void;
}

export default function SocietyMetricCard({
  metric,
  index,
  onClick,
}: SocietyMetricCardProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const infoIconRef = useRef<HTMLDivElement>(null);

  const handleInfoMouseEnter = (e: React.MouseEvent) => {
    if (infoIconRef.current) {
      const rect = infoIconRef.current.getBoundingClientRect();
      const tooltipWidth = 280;
      const tooltipHeight = 120; // Approximate height
      
      // Calculate center position
      let x = rect.left + rect.width / 2 - tooltipWidth / 2;
      let y = rect.top - tooltipHeight - 10; // Position above the icon
      
      // Ensure tooltip stays within viewport bounds
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Adjust horizontal position if it goes outside viewport
      if (x < 10) x = 10;
      if (x + tooltipWidth > viewportWidth - 10) {
        x = viewportWidth - tooltipWidth - 10;
      }
      
      // If tooltip would go above viewport, position it below the icon
      if (y < 10) {
        y = rect.bottom + 10;
      }
      
      setTooltipPosition({ x, y });
      setShowTooltip(true);
    }
  };

  const handleInfoMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    // Simulate loading delay for better UX
    const loadingTimer = setTimeout(() => {
      // Generate chart data on mount
      const data = generateTrendData(metric.trend);
      setChartData(data);

      // Create ApexCharts options matching the original design
      const chartColor =
        metric.trend >= 0
          ? 'var(--trend-positive-dark)'
          : 'var(--trend-negative-dark)';

      const options: ApexOptions = {
        chart: {
          type: 'area',
          height: 50,
          sparkline: { enabled: true },
          animations: { enabled: false },
        },
        stroke: {
          curve: 'smooth',
          width: 2.5,
        },
        fill: {
          type: 'solid',
          opacity: 0.2,
        },
        tooltip: { enabled: false },
        series: [{ data }],
        colors: [chartColor],
      };

      setChartOptions(options);
      setIsChartLoading(false);
    }, 300 + index * 50); // Staggered loading for visual effect

    return () => clearTimeout(loadingTimer);
  }, [metric.trend, index]);

  const trendSign = metric.trend > 0 ? '+' : '';
  const trendClass =
    metric.trend >= 0 ? styles.trendPositive : styles.trendNegative;
  const TrendIcon = metric.trend >= 0 ? TrendingUp : TrendingDown;

  return (
    <div
      className={`${styles.kpiCard} ${styles.fadeIn}`}
      data-title={metric.title}
      style={{
        animationDelay: `${index * 40}ms`,
        animationFillMode: 'forwards',
      }}
      onClick={() => onClick(metric)}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{metric.title}</span>
          <div className={styles.iconContainer}>
            {metric.keyMetric && <Gem className={styles.keyMetricGem} />}
            {metric.priority && !metric.keyMetric && (
              <Star className={styles.priorityStar} />
            )}
            <div
              className={styles.infoIconWrapper}
              ref={infoIconRef}
              onMouseEnter={handleInfoMouseEnter}
              onMouseLeave={handleInfoMouseLeave}
            >
              <Info className={styles.infoIcon} />
            </div>
          </div>
        </div>
        <div className={styles.valueRow}>
          <span className={styles.value}>
            {metric.value}
            {metric.unit}
          </span>
          <span className={`${styles.trendContainer} ${trendClass}`}>
            <TrendIcon className={styles.trendIcon} />
            {trendSign}
            {metric.trend}%
          </span>
        </div>
      </div>
      <div className={styles.chartContainer}>
        {isChartLoading ? (
          <div className={styles.chartSkeleton} />
        ) : chartOptions ? (
          <Chart
            options={chartOptions}
            series={[{ data: chartData }]}
            type="area"
            height={50}
          />
        ) : (
          <div className={styles.chartLoading}>Chart unavailable</div>
        )}
      </div>

      {/* Fixed positioned tooltip */}
      {showTooltip && (
        <div
          className={styles.infoTooltip}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
          dangerouslySetInnerHTML={{ __html: metric.description }}
        />
      )}
    </div>
  );
}
