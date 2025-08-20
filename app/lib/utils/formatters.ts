export const formatNumber = (value: number): string => {
    return value.toLocaleString();
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const getMetricDisplayValue = (value: number, isRate: boolean = false): string => {
    return isRate ? formatPercentage(value) : formatNumber(value);
};

export const getMetricId = (metricName: string): string => {
    return metricName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
