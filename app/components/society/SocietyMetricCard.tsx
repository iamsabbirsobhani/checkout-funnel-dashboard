'use client';

import { useState, useEffect, useRef } from 'react';
import { Diamond, Star, TrendingUp, TrendingDown, Info } from 'lucide-react';
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
            {metric.keyMetric && (
              <Diamond className={styles.keyMetricDiamond} />
            )}
            {metric.priority && !metric.keyMetric && (
              <Star className={styles.priorityStar} />
            )}
            <div className={styles.infoIconWrapper}>
              <Info className={styles.infoIcon} />
              <span
                className={styles.infoTooltip}
                dangerouslySetInnerHTML={{ __html: metric.description }}
              />
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
    </div>
  );
}
