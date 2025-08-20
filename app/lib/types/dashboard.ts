export interface DashboardMetrics {
    visitors: number;
    purchases: number;
    conversionRate: number;
    newSubscribers: number;
    activeSubscriptions: number;
    oneTimePurchases: number;
    churnRate: number;
    orderBumpRate: number;
    upsell1Rate: number;
    upsell2Rate: number;
}

export interface SubscriptionPlan {
    name: string;
    count: number;
}

export interface DashboardData {
    visitors: number;
    purchases: number;
    oneTimePurchases: number;
    newSubscribers: number;
    churnRate: number;
    orderBumpsAccepted: number;
    upsell1Accepted: number;
    upsell2Accepted: number;
    activeSubscriptions: number;
    subscriptionPlans: SubscriptionPlan[];
    history: {
        [key: string]: number[];
    };
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly';

export type FunnelType =
    | 'all-funnels'
    | 'subscription-funnel'
    | 'one-time-funnel'
    | 'individual-funnels';

export interface RecordHighs {
    [key: string]: {
        [metric: string]: number;
    };
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string;
        tension?: number;
        fill?: boolean;
    }[];
}
