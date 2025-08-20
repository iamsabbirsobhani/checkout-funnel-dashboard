# Backend Requirements for Checkout Funnel Dashboard

This document outlines the exact data and API endpoints needed to make each part of the dashboard functional.

## 1. Core Metrics Section

### Endpoint: `GET /api/dashboard/core-metrics`

**Purpose**: Get visitors, purchases, and conversion rate data

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "visitors": 15420,
    "purchases": 462,
    "conversionRate": 3.0,
    "timeframe": "daily",
    "funnel": "all-funnels",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Page view tracking (visitors)
- Order completion tracking (purchases)
- Real-time calculation (conversion rate)

---

## 2. Detailed Metrics Section

### Endpoint: `GET /api/dashboard/detailed-metrics`

**Purpose**: Get subscription and purchase breakdown data

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "newSubscribers": 324,
    "activeSubscriptions": 2847,
    "oneTimePurchases": 138,
    "churnRate": 2.1,
    "timeframe": "daily",
    "funnel": "all-funnels",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Subscription signup events
- Active subscription status tracking
- One-time purchase tracking
- Subscription cancellation events (for churn)

---

## 3. Offer Conversion Rates Section

### Endpoint: `GET /api/dashboard/offer-conversions`

**Purpose**: Get order bump and upsell conversion data

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "orderBumpRate": 18.5,
    "upsell1Rate": 12.3,
    "upsell2Rate": 8.7,
    "orderBumpsAccepted": 85,
    "upsell1Accepted": 57,
    "upsell2Accepted": 7,
    "timeframe": "daily",
    "funnel": "all-funnels",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Order bump offer events
- Upsell offer events
- Offer acceptance/rejection tracking
- Purchase completion events

---

## 4. Subscription Popularity Chart

### Endpoint: `GET /api/dashboard/subscription-plans`

**Purpose**: Get subscription plan distribution data

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "subscriptionPlans": [
      {
        "name": "Pro Monthly",
        "count": 1139,
        "percentage": 40.0
      },
      {
        "name": "Basic Monthly",
        "count": 712,
        "percentage": 25.0
      },
      {
        "name": "Pro Yearly",
        "count": 569,
        "percentage": 20.0
      },
      {
        "name": "Basic Yearly",
        "count": 284,
        "percentage": 10.0
      },
      {
        "name": "Enterprise",
        "count": 142,
        "percentage": 5.0
      }
    ],
    "totalActiveSubscriptions": 2846,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Active subscription database
- Subscription plan types
- Real-time subscription status

---

## 5. Historical Data for Charts

### Endpoint: `GET /api/history/{metric}`

**Purpose**: Get 30-day historical data for any metric

**Sample Response for Visitors:**

```json
{
  "success": true,
  "data": {
    "metric": "Visitors",
    "values": [
      1200, 1350, 1100, 1400, 1250, 1600, 1450, 1300, 1550, 1400, 1200, 1350,
      1100, 1400, 1250, 1600, 1450, 1300, 1550, 1400, 1200, 1350, 1100, 1400,
      1250, 1600, 1450, 1300, 1550, 1400
    ],
    "labels": [
      "Dec 16",
      "Dec 17",
      "Dec 18",
      "Dec 19",
      "Dec 20",
      "Dec 21",
      "Dec 22",
      "Dec 23",
      "Dec 24",
      "Dec 25",
      "Dec 26",
      "Dec 27",
      "Dec 28",
      "Dec 29",
      "Dec 30",
      "Dec 31",
      "Jan 1",
      "Jan 2",
      "Jan 3",
      "Jan 4",
      "Jan 5",
      "Jan 6",
      "Jan 7",
      "Jan 8",
      "Jan 9",
      "Jan 10",
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14"
    ],
    "timeframe": "daily",
    "funnel": "all-funnels",
    "unit": "count",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Sample Response for Conversion Rate:**

```json
{
  "success": true,
  "data": {
    "metric": "Conversion Rate",
    "values": [
      2.8, 3.1, 2.9, 3.2, 2.7, 3.4, 3.0, 2.8, 3.3, 2.9, 2.8, 3.1, 2.9, 3.2, 2.7,
      3.4, 3.0, 2.8, 3.3, 2.9, 2.8, 3.1, 2.9, 3.2, 2.7, 3.4, 3.0, 2.8, 3.3, 2.9
    ],
    "labels": [
      "Dec 16",
      "Dec 17",
      "Dec 18",
      "Dec 19",
      "Dec 20",
      "Dec 21",
      "Dec 22",
      "Dec 23",
      "Dec 24",
      "Dec 25",
      "Dec 26",
      "Dec 27",
      "Dec 28",
      "Dec 29",
      "Dec 30",
      "Dec 31",
      "Jan 1",
      "Jan 2",
      "Jan 3",
      "Jan 4",
      "Jan 5",
      "Jan 6",
      "Jan 7",
      "Jan 8",
      "Jan 9",
      "Jan 10",
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14"
    ],
    "timeframe": "daily",
    "funnel": "all-funnels",
    "unit": "%",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Daily aggregated metrics
- Historical data storage
- Real-time calculation engine

---

## 6. Funnel Selection Data

### Endpoint: `GET /api/funnels`

**Purpose**: Get available funnels for filtering

**Sample Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "all-funnels",
      "name": "All Funnels",
      "type": "aggregate",
      "description": "Combined data from all funnels",
      "active": true
    },
    {
      "id": "subscription-funnel",
      "name": "Subscription Funnel",
      "type": "subscription",
      "description": "Funnel optimized for subscription products",
      "active": true
    },
    {
      "id": "one-time-funnel",
      "name": "One-Time Purchase Funnel",
      "type": "one-time",
      "description": "Funnel optimized for single purchases",
      "active": true
    },
    {
      "id": "Lead Magnet Funnel",
      "name": "Lead Magnet Funnel",
      "type": "individual",
      "description": "Individual funnel: Lead Magnet Funnel",
      "active": true
    },
    {
      "id": "Webinar Funnel",
      "name": "Webinar Funnel",
      "type": "individual",
      "description": "Individual funnel: Webinar Funnel",
      "active": true
    }
  ],
  "total": 13
}
```

**Required Data Sources:**

- Funnel configuration database
- Active funnel status tracking

---

## 7. Record Highs Tracking

### Endpoint: `GET /api/records/{timeframe}/{funnel}`

**Purpose**: Get record highs for all metrics

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "visitors": 1800,
    "purchases": 54,
    "conversionRate": 3.8,
    "newSubscribers": 42,
    "activeSubscriptions": 2950,
    "oneTimePurchases": 18,
    "churnRate": 1.2,
    "orderBumpRate": 22.5,
    "upsell1Rate": 15.8,
    "upsell2Rate": 12.3,
    "timeframe": "daily",
    "funnel": "all-funnels",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Historical record tracking
- Real-time comparison engine

---

## 8. Real-time Updates (Optional)

### Endpoint: `GET /api/dashboard/realtime`

**Purpose**: Get live updates for dashboard

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "liveVisitors": 45,
    "livePurchases": 2,
    "liveConversionRate": 4.4,
    "lastMinuteUpdates": [
      {
        "metric": "visitors",
        "change": 3,
        "timestamp": "2024-01-15T10:29:45Z"
      },
      {
        "metric": "purchases",
        "change": 1,
        "timestamp": "2024-01-15T10:29:30Z"
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**Required Data Sources:**

- Real-time event streaming
- WebSocket or Server-Sent Events
- Live visitor tracking

---

## Data Collection Requirements

### Event Tracking Needed:

1. **Page Views**: `user_id`, `funnel_name`, `timestamp`
2. **Purchases**: `user_id`, `funnel_name`, `amount`, `subscription_type`, `timestamp`
3. **Offer Events**: `user_id`, `funnel_name`, `offer_type`, `accepted`, `timestamp`
4. **Subscription Events**: `user_id`, `plan_name`, `action` (signup/cancel), `timestamp`

### Data Processing Requirements:

1. **Real-time aggregation** for live metrics
2. **Daily/hourly batching** for historical data
3. **Cross-funnel calculations** for "All Funnels" view
4. **Rate calculations** (conversion rates, churn rates)
5. **Record tracking** and comparison

### Storage Requirements:

1. **Event store** for raw events
2. **Aggregated metrics** for fast dashboard queries
3. **Historical data** for trend analysis
4. **Cache layer** for frequently accessed data

### API Performance Requirements:

1. **Response time**: < 200ms for dashboard data
2. **Caching**: 5-minute TTL for dashboard metrics
3. **Rate limiting**: 100 requests/minute per user
4. **Error handling**: Graceful fallbacks to cached data
