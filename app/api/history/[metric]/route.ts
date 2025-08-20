import { NextRequest, NextResponse } from 'next/server';
import { TimeFrame, FunnelType } from '../../../lib/types/dashboard';
import { generateMockData } from '../../../lib/data/mockData';

export async function GET(
    request: NextRequest,
    { params }: { params: { metric: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const timeframe = searchParams.get('timeframe') as TimeFrame || 'daily';
        const funnel = searchParams.get('funnel') as FunnelType || 'all-funnels';
        const days = parseInt(searchParams.get('days') || '30');
        const metric = params.metric;

        // Validate parameters
        if (!['daily', 'weekly', 'monthly'].includes(timeframe)) {
            return NextResponse.json({ error: 'Invalid timeframe' }, { status: 400 });
        }

        if (days < 1 || days > 365) {
            return NextResponse.json({ error: 'Days must be between 1 and 365' }, { status: 400 });
        }

        // Generate data (replace with real database queries)
        const dashboardData = generateMockData(timeframe, funnel);

        let historyData: number[] = [];
        let metricName = '';

        // Map metric keys to actual data
        switch (metric) {
            case 'visitors':
                historyData = dashboardData.history.visitors;
                metricName = 'Visitors';
                break;
            case 'purchases':
                historyData = dashboardData.history.purchases;
                metricName = 'Purchases';
                break;
            case 'conversionRate':
                historyData = dashboardData.history.purchases.map((purchases, i) => {
                    const visitors = dashboardData.history.visitors[i];
                    return visitors > 0 ? (purchases / visitors) * 100 : 0;
                });
                metricName = 'Conversion Rate';
                break;
            case 'newSubscribers':
                historyData = dashboardData.history.newSubscribers;
                metricName = 'New Subscribers';
                break;
            case 'activeSubscriptions':
                historyData = dashboardData.history.activeSubscriptions;
                metricName = 'Active Subscriptions';
                break;
            case 'oneTimePurchases':
                historyData = dashboardData.history.oneTimePurchases;
                metricName = 'One-Time Purchases';
                break;
            case 'orderBumpRate':
                historyData = dashboardData.history.orderBumpsAccepted.map((bumps, i) => {
                    const purchases = dashboardData.history.purchases[i];
                    return purchases > 0 ? (bumps / purchases) * 100 : 0;
                });
                metricName = 'Order Bump Rate';
                break;
            case 'upsell1Rate':
                historyData = dashboardData.history.upsell1Accepted.map((upsells, i) => {
                    const purchases = dashboardData.history.purchases[i];
                    return purchases > 0 ? (upsells / purchases) * 100 : 0;
                });
                metricName = 'Upsell 1 Rate';
                break;
            case 'upsell2Rate':
                historyData = dashboardData.history.upsell2Accepted.map((upsells, i) => {
                    const upsell1s = dashboardData.history.upsell1Accepted[i];
                    return upsell1s > 0 ? (upsells / upsell1s) * 100 : 0;
                });
                metricName = 'Upsell 2 Rate';
                break;
            default:
                return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });
        }

        // Generate labels for the time period
        const labels = Array.from({ length: Math.min(days, historyData.length) }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (days - 1 - i));
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        });

        return NextResponse.json({
            success: true,
            data: {
                metric: metricName,
                values: historyData.slice(-days),
                labels,
                timeframe,
                funnel,
                unit: metric.includes('Rate') ? '%' : 'count',
                lastUpdated: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('History API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
