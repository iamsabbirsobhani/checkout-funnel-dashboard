'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { SocietyMetric } from '../../lib/types/society';
import { generateTrendData } from '../../lib/data/societyData';
import styles from './SocietyModal.module.css';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SocietyModalProps {
  metric: SocietyMetric | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SocietyModal({
  metric,
  isOpen,
  onClose,
}: SocietyModalProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(true);

  const handleCloseModal = useCallback(() => {
    // Reset chart state when closing modal
    setIsChartLoading(true);
    setChartData([]);
    setChartOptions(null);
    setCategories([]);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      if (document.body) {
        document.body.style.overflow = 'hidden';
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (document.body) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, handleCloseModal]);

  useEffect(() => {
    if (metric) {
      // Reset chart state when metric changes
      setIsChartLoading(true);
      setChartData([]);
      setChartOptions(null);
      setCategories([]);

      // Small delay to ensure proper reset
      const timer = setTimeout(() => {
        const data = generateTrendData(metric.trend, 30, 100);
        setChartData(data);
        const cats = Array.from({ length: 30 }, (_, i) =>
          new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString(),
        );
        setCategories(cats);

        const chartColor =
          metric.trend >= 0
            ? 'var(--trend-positive-dark)'
            : 'var(--trend-negative-dark)';

        const options: ApexOptions = {
          chart: {
            type: 'area',
            height: 250,
            toolbar: { show: false },
            animations: { enabled: true },
          },
          dataLabels: { enabled: false },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          series: [{ name: 'Value', data }],
          xaxis: {
            categories: cats,
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            labels: { style: { colors: '#6b7280' } },
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4,
          },
          tooltip: {
            x: { format: 'dd MMM' },
          },
          colors: [chartColor],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'vertical',
              opacityFrom: 0.7,
              opacityTo: 0.1,
            },
          },
        };
        setChartOptions(options);
        setIsChartLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [metric]);

  if (!metric || !isOpen) return null;

  const trendSign = metric.trend > 0 ? '+' : '';
  const trendClass =
    metric.trend >= 0 ? styles.modalTrendPositive : styles.modalTrendNegative;
  const TrendIcon = metric.trend >= 0 ? TrendingUp : TrendingDown;

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseModal();
        }
      }}
    >
      <div className={styles.modalContent}>
        <button
          onClick={handleCloseModal}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <h2 id="modal-title" className={styles.modalTitle}>
            {metric.title}
          </h2>
          <p className={styles.modalDescription}>
            {metric.description.replace(/<[^>]*>/g, '')}
          </p>
          <div className={styles.modalValueRow}>
            <span className={styles.modalValue}>
              {metric.value}
              {metric.unit}
            </span>
            <span className={`${styles.modalTrendContainer} ${trendClass}`}>
              <TrendIcon className={styles.modalTrendIcon} />
              {trendSign}
              {metric.trend}% vs last period
            </span>
          </div>
          <div className={styles.modalChartContainer}>
            {isChartLoading ? (
              <div className={styles.chartSkeleton} />
            ) : chartOptions ? (
              <Chart
                options={chartOptions}
                series={[{ name: 'Value', data: chartData }]}
                type="area"
                height={250}
              />
            ) : (
              <div className={styles.chartLoading}>Chart unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
