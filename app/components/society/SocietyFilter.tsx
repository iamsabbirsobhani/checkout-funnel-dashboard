'use client';

import { FilterOption } from '../../lib/types/society';
import { filterOptions } from '../../lib/data/societyData';
import styles from './SocietyFilter.module.css';

interface SocietyFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function SocietyFilter({
  activeFilter,
  onFilterChange,
}: SocietyFilterProps) {
  return (
    <div
      className={styles.filterContainer}
      role="group"
      aria-label="Filter metrics by category"
    >
      {filterOptions.map((option) => (
        <button
          key={option.id}
          className={`${styles.filterButton} ${
            activeFilter === option.id ? styles.active : ''
          }`}
          data-filter={option.id}
          aria-pressed={activeFilter === option.id}
          onClick={() => onFilterChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
