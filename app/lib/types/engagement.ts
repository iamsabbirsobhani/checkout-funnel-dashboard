export interface EngagementMetricsData {
    numberOfPosts: number;
    numberOfPostLikes: number;
    numberOfComments: number;
    engagementRate: number;
    reach: number;
    impressions: number;
    shares: number;
}

export interface EngagementData {
    numberOfPosts: number;
    numberOfPostLikes: number;
    numberOfComments: number;
    engagementRate: number;
    reach: number;
    impressions: number;
    shares: number;
    history: {
        [key: string]: number[];
    };
}
