'use client';

import { ChevronDown } from 'lucide-react';
import { TimeFrame } from '../../lib/types/society';
import { timeFrames } from '../../lib/data/societyData';
import styles from './SocietyHeader.module.css';

interface SocietyHeaderProps {
  selectedTimeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

export default function SocietyHeader({
  selectedTimeFrame,
  onTimeFrameChange,
}: SocietyHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>Society KPI Dashboard</h1>
        <p>Key Driver & Performance Metrics Overview</p>
      </div>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedTimeFrame}
          onChange={(e) => onTimeFrameChange(e.target.value)}
        >
          {timeFrames.map((timeFrame) => (
            <option key={timeFrame.id} value={timeFrame.id}>
              {timeFrame.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevronIcon} />
      </div>
    </header>
  );
}
