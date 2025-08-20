import { TimeFrame, FunnelType, DashboardData, DashboardMetrics } from '../types/dashboard';

// API base URL - change this to your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

interface DashboardApiResponse {
    metrics: DashboardMetrics;
    subscriptionPlans: Array<{ name: string; count: number }>;
    history: { [key: string]: number[] };
    timeframe: TimeFrame;
    funnel: FunnelType;
    lastUpdated: string;
}

interface HistoryApiResponse {
    metric: string;
    values: number[];
    labels: string[];
    timeframe: TimeFrame;
    funnel: FunnelType;
    unit: string;
    lastUpdated: string;
}

interface FunnelApiResponse {
    id: string;
    name: string;
    type: string;
    description: string;
}

// Generic API fetch function with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers here
                // 'Authorization': `Bearer ${getAuthToken()}`,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: ApiResponse<T> = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'API request failed');
        }

        return data.data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}

// Dashboard API functions
export const dashboardApi = {
    // Get main dashboard data
    async getDashboardData(timeframe: TimeFrame, funnel: FunnelType): Promise<DashboardApiResponse> {
        return apiFetch<DashboardApiResponse>(
            `/api/dashboard?timeframe=${timeframe}&funnel=${funnel}`
        );
    },

    // Get available funnels
    async getFunnels(): Promise<FunnelApiResponse[]> {
        return apiFetch<FunnelApiResponse[]>('/api/funnels');
    },

    // Get historical data for a specific metric
    async getMetricHistory(
        metric: string,
        timeframe: TimeFrame,
        funnel: FunnelType,
        days: number = 30
    ): Promise<HistoryApiResponse> {
        return apiFetch<HistoryApiResponse>(
            `/api/history/${metric}?timeframe=${timeframe}&funnel=${funnel}&days=${days}`
        );
    },

    // Get real-time updates (for future WebSocket implementation)
    async getRealTimeUpdates(): Promise<DashboardApiResponse> {
        return apiFetch<DashboardApiResponse>('/api/dashboard/realtime');
    }
};

// Fallback to mock data if API is not available
export const getDashboardDataWithFallback = async (
    timeframe: TimeFrame,
    funnel: FunnelType
): Promise<DashboardApiResponse> => {
    try {
        return await dashboardApi.getDashboardData(timeframe, funnel);
    } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        // Import mock data as fallback
        const { generateMockData, calculateMetrics } = await import('../data/mockData');
        const dashboardData = generateMockData(timeframe, funnel);
        const metrics = calculateMetrics(dashboardData);

        return {
            metrics,
            subscriptionPlans: dashboardData.subscriptionPlans,
            history: dashboardData.history,
            timeframe,
            funnel,
            lastUpdated: new Date().toISOString()
        };
    }
};

// Cache management for API responses
class ApiCache {
    private cache = new Map<string, { data: any; timestamp: number }>();
    private readonly TTL = 5 * 60 * 1000; // 5 minutes

    set(key: string, data: any): void {
        this.cache.set(key, { data, timestamp: Date.now() });
    }

    get(key: string): any | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.TTL) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear(): void {
        this.cache.clear();
    }
}

export const apiCache = new ApiCache();

// Cached API functions
export const cachedDashboardApi = {
    async getDashboardData(timeframe: TimeFrame, funnel: FunnelType): Promise<DashboardApiResponse> {
        const cacheKey = `dashboard-${timeframe}-${funnel}`;
        const cached = apiCache.get(cacheKey);

        if (cached) {
            return cached;
        }

        const data = await dashboardApi.getDashboardData(timeframe, funnel);
        apiCache.set(cacheKey, data);
        return data;
    },

    async getMetricHistory(
        metric: string,
        timeframe: TimeFrame,
        funnel: FunnelType,
        days: number = 30
    ): Promise<HistoryApiResponse> {
        const cacheKey = `history-${metric}-${timeframe}-${funnel}-${days}`;
        const cached = apiCache.get(cacheKey);

        if (cached) {
            return cached;
        }

        const data = await dashboardApi.getMetricHistory(metric, timeframe, funnel, days);
        apiCache.set(cacheKey, data);
        return data;
    }
};
