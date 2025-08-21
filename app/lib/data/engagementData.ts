import { EngagementData } from '../types/engagement';
import { TimeFrame, FunnelType } from '../types/dashboard';

export const generateEngagementData = (timeframe: TimeFrame, funnel: FunnelType): EngagementData => {
    let multiplier = 1;
    if (timeframe === 'weekly') multiplier = 7;
    if (timeframe === 'monthly') multiplier = 30;

    // Base engagement metrics
    const numberOfPosts = Math.floor(Math.random() * 50 + 20) * multiplier;
    const numberOfPostLikes = Math.floor(numberOfPosts * (Math.random() * 200 + 100));
    const numberOfComments = Math.floor(numberOfPostLikes * (Math.random() * 0.3 + 0.1));
    const reach = Math.floor(numberOfPosts * (Math.random() * 1000 + 500));
    const impressions = Math.floor(reach * (Math.random() * 2 + 1.5));
    const shares = Math.floor(numberOfPosts * (Math.random() * 20 + 5));

    // Calculate engagement rate (likes + comments) / reach * 100
    const engagementRate = ((numberOfPostLikes + numberOfComments) / reach) * 100;

    // Generate 30-day history data
    const historyLength = 30;
    const history: { [key: string]: number[] } = {};

    const metrics = {
        numberOfPosts,
        numberOfPostLikes,
        numberOfComments,
        engagementRate,
        reach,
        impressions,
        shares
    };

    Object.keys(metrics).forEach(key => {
        const metricKey = key as keyof typeof metrics;
        history[metricKey] = Array.from(
            { length: historyLength },
            () => {
                const baseValue = metrics[metricKey];
                if (key === 'engagementRate') {
                    return Math.max(0, baseValue * (Math.random() * 0.4 + 0.8));
                }
                return Math.floor(baseValue * (Math.random() * 0.4 + 0.8) / multiplier);
            }
        );
    });

    return {
        numberOfPosts,
        numberOfPostLikes,
        numberOfComments,
        engagementRate,
        reach,
        impressions,
        shares,
        history
    };
};

export const calculateEngagementMetrics = (data: EngagementData) => {
    return {
        numberOfPosts: data.numberOfPosts,
        numberOfPostLikes: data.numberOfPostLikes,
        numberOfComments: data.numberOfComments,
        engagementRate: data.engagementRate,
        reach: data.reach,
        impressions: data.impressions,
        shares: data.shares,
    };
};
