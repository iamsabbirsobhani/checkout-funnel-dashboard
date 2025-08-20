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

## Backend Implementation for This App

This dashboard comes with a complete backend implementation ready for real data integration:

### **Built-in API Endpoints**

The app includes these API routes in `app/api/`:

1. **`/api/dashboard`** - Main dashboard data

   ```typescript
   GET /api/dashboard?timeframe=daily&funnel=all-funnels
   ```

2. **`/api/funnels`** - Available funnels list

   ```typescript
   GET / api / funnels;
   ```

3. **`/api/history/[metric]`** - Historical data for specific metrics
   ```typescript
   GET /api/history/visitors?timeframe=daily&funnel=all-funnels&days=30
   ```

### **Database Integration Ready**

The app includes database service layer in `app/lib/services/database.ts` with support for PostgreSQL, MySQL, and MongoDB.

### **API Service Layer**

The app includes a complete API service layer in `app/lib/services/api.ts`:

- **Error handling** with fallback to mock data
- **Caching** with 5-minute TTL
- **Authentication** ready (JWT/OAuth)
- **Rate limiting** support
- **Real-time updates** preparation

### **Integration Steps**

1. **Set up your database** (PostgreSQL, MySQL, or MongoDB)
2. **Update database configuration** in `app/lib/services/database.ts`
3. **Replace mock data calls** in API routes with real database queries
4. **Add authentication** to API endpoints
5. **Configure environment variables**:
   ```env
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=your-database-name
   DB_USER=your-username
   DB_PASSWORD=your-password
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

### **Real-time Features Ready**

The app is prepared for real-time updates:

- WebSocket support structure
- Server-Sent Events ready
- Polling fallback
- Live metric updates

### **Performance Optimizations**

- **Database indexing** recommendations included
- **Query optimization** examples provided
- **Caching strategy** implemented
- **CDN ready** for static assets

## API Integration Implementation

### Step 1: Replace Mock Data

```typescript
// In mockData.ts, replace generateMockData with:
export const fetchDashboardData = async (
  timeframe: TimeFrame,
  funnel: FunnelType,
) => {
  const response = await fetch(
    `/api/dashboard?timeframe=${timeframe}&funnel=${funnel}`,
  );
  return response.json();
};
```

### Step 2: Add Data Fetching Hooks

```typescript
// Create custom hooks for data fetching
export const useDashboardData = (timeframe: TimeFrame, funnel: FunnelType) => {
  return useQuery(['dashboard', timeframe, funnel], () =>
    fetchDashboardData(timeframe, funnel),
  );
};
```

### Step 3: Error Handling & Loading States

- Implement loading skeletons for better UX
- Add error boundaries for API failures
- Include retry mechanisms for failed requests
- Add offline support with cached data

### Step 4: Authentication & Authorization

- Implement user authentication (JWT, OAuth, etc.)
- Add role-based access control
- Secure API endpoints with proper authentication
- Implement data filtering based on user permissions

## Data Pipeline Architecture

```
[Event Sources] → [Data Collection] → [ETL Process] → [Data Warehouse] → [API Layer] → [Frontend]
     ↓                    ↓                ↓              ↓              ↓           ↓
  Analytics         Event Tracking    Data Cleaning   Aggregation   REST APIs   Dashboard
  E-commerce        Funnel Events     Transformation  Storage       Caching     Components
  CRM Systems       User Actions      Enrichment      Indexing      Security    Real-time UI
```

## Performance Considerations

- **Caching**: Implement Redis or similar for frequently accessed data
- **CDN**: Use CDN for static assets and API responses
- **Database Optimization**: Proper indexing and query optimization
- **Rate Limiting**: Implement API rate limiting to prevent abuse
- **Monitoring**: Add application performance monitoring (APM)

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
