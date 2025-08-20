export interface SocietyMetric {
  title: string;
  value: string;
  trend: number;
  unit: string;
  keyMetric?: boolean;
  priority?: boolean;
  description: string;
}

export interface SocietySection {
  id: string;
  title: string;
  icon: string;
  metrics: SocietyMetric[];
}

export interface SocietyData {
  'key-metrics': SocietyMetric[];
  'engagement': SocietyMetric[];
  'monetization': SocietyMetric[];
  'community-health': SocietyMetric[];
  'platform-health': SocietyMetric[];
}

export interface ChartData {
  data: number[];
  categories: string[];
  color: string;
}

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

export interface TimeFrame {
  id: string;
  label: string;
  value: string;
}
