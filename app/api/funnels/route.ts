import { NextResponse } from 'next/server';
import { INDIVIDUAL_FUNNELS } from '../../lib/data/mockData';

export async function GET() {
    try {
        const funnels = [
            {
                id: 'all-funnels',
                name: 'All Funnels',
                type: 'aggregate',
                description: 'Combined data from all funnels'
            },
            {
                id: 'subscription-funnel',
                name: 'Subscription Funnel',
                type: 'subscription',
                description: 'Funnel optimized for subscription products'
            },
            {
                id: 'one-time-funnel',
                name: 'One-Time Purchase Funnel',
                type: 'one-time',
                description: 'Funnel optimized for single purchases'
            },
            ...INDIVIDUAL_FUNNELS.map(funnel => ({
                id: funnel,
                name: funnel,
                type: 'individual',
                description: `Individual funnel: ${funnel}`
            }))
        ];

        return NextResponse.json({
            success: true,
            data: funnels,
            total: funnels.length
        });

    } catch (error) {
        console.error('Funnels API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
