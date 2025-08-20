import { NextRequest, NextResponse } from 'next/server';
import { TimeFrame, FunnelType, DashboardData } from '../../lib/types/dashboard';
import { generateMockData, calculateMetrics } from '../../lib/data/mockData';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeframe = searchParams.get('timeframe') as TimeFrame || 'daily';
        const funnel = searchParams.get('funnel') as FunnelType || 'all-funnels';

        // Validate parameters
        if (!['daily', 'weekly', 'monthly'].includes(timeframe)) {
            return NextResponse.json({ error: 'Invalid timeframe' }, { status: 400 });
        }

        if (!['all-funnels', 'subscription-funnel', 'one-time-funnel', 'individual-funnels'].includes(funnel)) {
            return NextResponse.json({ error: 'Invalid funnel type' }, { status: 400 });
        }

        // Generate data (replace this with real database queries)
        const dashboardData: DashboardData = generateMockData(timeframe, funnel);
        const metrics = calculateMetrics(dashboardData);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json({
            success: true,
            data: {
                metrics,
                subscriptionPlans: dashboardData.subscriptionPlans,
                history: dashboardData.history,
                timeframe,
                funnel,
                lastUpdated: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
