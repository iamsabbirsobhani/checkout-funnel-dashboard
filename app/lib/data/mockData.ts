import { DashboardData, TimeFrame, FunnelType } from '../types/dashboard';

export const INDIVIDUAL_FUNNELS = [
    'Lead Magnet Funnel',
    'Webinar Funnel',
    'Product Launch Funnel',
    'Tripwire Funnel',
    'VSL Funnel',
    'Challenge Funnel',
    'High-Ticket Funnel',
    'Ebook Funnel',
    'Free Trial Funnel',
    'Membership Funnel'
];

export const generateMockData = (timeframe: TimeFrame, funnel: FunnelType): DashboardData => {
    let multiplier = 1;
    if (timeframe === 'weekly') multiplier = 7;
    if (timeframe === 'monthly') multiplier = 30;

    let baseConversion = Math.random() * 0.04 + 0.02;
    let baseBumpRate = Math.random() * 0.20 + 0.1;
    let baseUpsell1Rate = Math.random() * 0.15 + 0.05;
    let baseSubscriptionRatio = Math.random() * 0.4 + 0.3;

    // Adjust rates based on funnel type
    if (funnel === 'subscription-funnel') {
        baseConversion *= 1.2;
        baseUpsell1Rate *= 1.3;
        baseSubscriptionRatio = 0.9;
    } else if (funnel === 'one-time-funnel') {
        baseConversion *= 0.9;
        baseBumpRate *= 1.4;
        baseSubscriptionRatio = 0.1;
    } else if (INDIVIDUAL_FUNNELS.includes(funnel)) {
        const funnelIndex = INDIVIDUAL_FUNNELS.indexOf(funnel);
        baseConversion *= (1 + (funnelIndex - 5) / 20);
        baseSubscriptionRatio *= (1 + (funnelIndex - 5) / 10);
    }

    const visitors = Math.floor(Math.random() * 2000 + 1000) * multiplier;
    const purchases = Math.floor(visitors * baseConversion);
    const newSubscribers = Math.floor(purchases * baseSubscriptionRatio);
    const oneTimePurchases = purchases - newSubscribers;
    const churnRate = Math.random() * 5 + 1;
    const orderBumpsAccepted = Math.floor(purchases * baseBumpRate);
    const upsell1Accepted = Math.floor(purchases * baseUpsell1Rate);
    const upsell2Accepted = Math.floor(upsell1Accepted * (Math.random() * 0.4 + 0.1));
    const activeSubscriptions = Math.floor(newSubscribers * (multiplier * 0.8) + (Math.random() * 500));

    const subscriptionPlans = [
        { name: 'Pro Monthly', count: Math.floor(activeSubscriptions * 0.4) },
        { name: 'Basic Monthly', count: Math.floor(activeSubscriptions * 0.25) },
        { name: 'Pro Yearly', count: Math.floor(activeSubscriptions * 0.2) },
        { name: 'Basic Yearly', count: Math.floor(activeSubscriptions * 0.1) },
        { name: 'Enterprise', count: Math.floor(activeSubscriptions * 0.05) },
    ].sort((a, b) => b.count - a.count);

    // Generate 30-day history data
    const historyLength = 30;
    const history: { [key: string]: number[] } = {};

    const metrics = {
        visitors,
        purchases,
        newSubscribers,
        oneTimePurchases,
        activeSubscriptions,
        orderBumpsAccepted,
        upsell1Accepted,
        upsell2Accepted
    };

    Object.keys(metrics).forEach(key => {
        const metricKey = key as keyof typeof metrics;
        history[metricKey] = Array.from(
            { length: historyLength },
            () => Math.floor(metrics[metricKey] * (Math.random() * 0.4 + 0.8) / multiplier)
        );
    });

    return {
        visitors,
        purchases,
        oneTimePurchases,
        newSubscribers,
        churnRate,
        orderBumpsAccepted,
        upsell1Accepted,
        upsell2Accepted,
        activeSubscriptions,
        subscriptionPlans,
        history
    };
};

export const calculateMetrics = (data: DashboardData) => {
    return {
        visitors: data.visitors,
        purchases: data.purchases,
        conversionRate: data.visitors > 0 ? (data.purchases / data.visitors) * 100 : 0,
        newSubscribers: data.newSubscribers,
        activeSubscriptions: data.activeSubscriptions,
        oneTimePurchases: data.oneTimePurchases,
        churnRate: data.churnRate,
        orderBumpRate: data.purchases > 0 ? (data.orderBumpsAccepted / data.purchases) * 100 : 0,
        upsell1Rate: data.purchases > 0 ? (data.upsell1Accepted / data.purchases) * 100 : 0,
        upsell2Rate: data.upsell1Accepted > 0 ? (data.upsell2Accepted / data.upsell1Accepted) * 100 : 0,
    };
};
