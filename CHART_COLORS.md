# Titans Dashboard Chart Colors & Gradients

## 🎨 Primary Chart Colors

### Green (Positive/Increase Metrics)

```css
/* Primary Green Color */
#10B981

/* Green Gradient for Area Charts */
linear-gradient(
  to bottom,
  rgba(16, 185, 129, 0.4) 5%,    /* #10B981 with 40% opacity */
  rgba(16, 185, 129, 0) 95%      /* #10B981 with 0% opacity */
)
```

### Red (Negative/Decrease Metrics)

```css
/* Primary Red Color */
#EF4444

/* Red Gradient for Area Charts */
linear-gradient(
  to bottom,
  rgba(239, 68, 68, 0.4) 5%,     /* #EF4444 with 40% opacity */
  rgba(239, 68, 68, 0) 95%       /* #EF4444 with 0% opacity */
)
```

## 📊 Line Chart Colors

### Website Data

```css
/* Blue for Website metrics */
#3B82F6
```

### Extension Data

```css
/* Green for Extension metrics */
#10B981
```

## 🎯 Tailwind CSS Classes

### Text Colors

```css
/* Positive changes */
text-green-600

/* Negative changes */
text-red-600

/* Labels and secondary text */
text-gray-500
text-gray-600
text-gray-800
```

### Background Colors

```css
/* Card backgrounds */
bg-white

/* Page background */
bg-gray-50

/* Progress bars */
bg-gray-200
bg-blue-500
```

## 🔧 React/Recharts Implementation

### Area Chart Gradient (MetricChartCard)

```jsx
const chartColor = changeType === 'increase' ? "#10B981" : "#EF4444";

// In AreaChart component:
<defs>
  <linearGradient id={`color-${changeType}`} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={chartColor} stopOpacity={0.4}/>
    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
  </linearGradient>
</defs>
<Area
  type="monotone"
  dataKey="pv"
  stroke={chartColor}
  strokeWidth={2}
  fillOpacity={1}
  fill={`url(#color-${changeType})`}
/>
```

### Line Chart Colors (BigChartCard)

```jsx
<Line
  type="monotone"
  dataKey="Website"
  stroke="#3B82F6"
  strokeWidth={2}
  dot={{ r: 4 }}
  activeDot={{ r: 8 }}
/>
<Line
  type="monotone"
  dataKey="Extension"
  stroke="#10B981"
  strokeWidth={2}
  dot={{ r: 4 }}
  activeDot={{ r: 8 }}
/>
```

## 🎨 Complete Color Palette

### CSS Custom Properties

```css
:root {
  /* Primary Colors */
  --green-primary: #10b981;
  --red-primary: #ef4444;
  --blue-primary: #3b82f6;

  /* Gray Scale */
  --gray-50: #f9fafb;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-800: #1f2937;

  /* Opacity Values */
  --opacity-40: 0.4;
  --opacity-0: 0;
}
```

### RGB Values

```css
/* Green */
rgb(16, 185, 129)

/* Red */
rgb(239, 68, 68)

/* Blue */
rgb(59, 130, 246)
```

## 📝 Usage Examples

### 1. CSS Gradient Background

```css
.green-gradient {
  background: linear-gradient(
    to bottom,
    rgba(16, 185, 129, 0.4) 5%,
    rgba(16, 185, 129, 0) 95%
  );
}

.red-gradient {
  background: linear-gradient(
    to bottom,
    rgba(239, 68, 68, 0.4) 5%,
    rgba(239, 68, 68, 0) 95%
  );
}
```

### 2. SVG Gradient Definition

```svg
<defs>
  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="#10B981" stop-opacity="0.4"/>
    <stop offset="95%" stop-color="#10B981" stop-opacity="0"/>
  </linearGradient>

  <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="#EF4444" stop-opacity="0.4"/>
    <stop offset="95%" stop-color="#EF4444" stop-opacity="0"/>
  </linearGradient>
</defs>
```

### 3. Tailwind CSS Classes

```html
<!-- Green text -->
<div class="text-green-600">+15.2%</div>

<!-- Red text -->
<div class="text-red-600">-0.5%</div>

<!-- Green background -->
<div class="bg-green-500">Positive metric</div>

<!-- Red background -->
<div class="bg-red-500">Negative metric</div>
```

## 🎨 Color Psychology

- **Green (#10B981)**: Growth, success, positive trends
- **Red (#EF4444)**: Decline, alerts, negative trends
- **Blue (#3B82F6)**: Trust, stability, website data
- **Gray Scale**: Neutral, professional, readability

---

_These colors are optimized for accessibility and provide good contrast ratios for readability._
