# Checkout Funnel Dashboard

A modern, responsive dashboard built with Next.js and TypeScript for tracking checkout funnel performance and conversion metrics.

## Features

- **Real-time Metrics**: Track visitors, purchases, conversion rates, and more
- **Interactive Charts**: Visualize data with Chart.js powered components
- **Filtering Options**: Switch between daily, weekly, and monthly views
- **Funnel Selection**: View data for different funnel types (subscription, one-time, individual funnels)
- **Historical Data**: Click on any metric to view 30-day historical trends
- **Record Tracking**: Automatically tracks and displays record highs/lows
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Project Structure

```
app/
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── CoreMetrics.tsx
│   │   ├── DetailedMetrics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DoughnutChart.tsx
│   │   ├── OfferConversionRates.tsx
│   │   └── SubscriptionPopularityChart.tsx
│   └── ui/                  # Reusable UI components
│       ├── MetricCard.tsx
│       ├── TimeFilter.tsx
│       ├── FunnelSelector.tsx
│       └── HistoryModal.tsx
├── lib/
│   ├── types/              # TypeScript type definitions
│   │   └── dashboard.ts
│   ├── data/               # Data generation and utilities
│   │   └── mockData.ts
│   └── utils/              # Utility functions
│       └── formatters.ts
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Main page component
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Key Components

### Core Metrics

- **Visitors/Clicks**: Total unique users entering the funnel
- **Total Purchases**: Successful transactions completed
- **Conversion Rate**: Percentage of visitors who made a purchase

### Detailed Metrics

- **New Subscribers**: Customers who signed up for subscriptions
- **Active Subscriptions**: Currently running subscription plans
- **One-Time Purchases**: Non-subscription product purchases
- **Churn Rate**: Percentage of subscribers who canceled

### Offer Conversion Rates

- **Order Bump**: Private Label Rights acceptance rate
- **Upsell 1**: Annual Template Access acceptance rate
- **Upsell 2**: 1-on-1 Coaching Call acceptance rate

## Data Structure

The dashboard uses mock data generation that simulates real-world funnel performance. Each metric includes:

- Current value
- Record high/low tracking
- 30-day historical data
- Interactive tooltips with explanations

## API Integration Ready

The modular structure makes it easy to integrate with real APIs:

- Replace `generateMockData()` in `mockData.ts` with API calls
- Update data fetching logic in the Dashboard component
- Maintain the same component interfaces for seamless integration

## Customization

- **Colors**: Modify Tailwind classes in components
- **Metrics**: Add new metrics by updating types and components
- **Charts**: Extend Chart.js configurations for different visualizations
- **Styling**: Update `globals.css` for global style changes

## Performance

- Components are optimized with React.memo where appropriate
- Chart.js configurations are optimized for performance
- Lazy loading ready for large datasets
- Responsive design with mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
