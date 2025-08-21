import { SocietyData, TimeFrame } from '../types/society';

export const societyData: SocietyData = {
    'key-metrics': [
        {
            title: 'New Signups',
            value: '1,280',
            trend: 12,
            unit: '',
            keyMetric: true,
            description: '<b>What:</b> The total count of new, unique user accounts created.<br><b>How:</b> Counted on successful completion of the registration process.<br><b>Ex:</b> Counts a new user signing up via email. Does <u>not</u> count a returning user logging in.'
        },
        {
            title: 'Daily Active Users (DAU)',
            value: '18.5k',
            trend: 8,
            unit: '',
            keyMetric: true,
            description: '<b>What:</b> Unique users who engaged with the platform in a 24-hour period.<br><b>How:</b> Counted when a user ID performs an action (e.g., login, post, view).<br><b>Ex:</b> A user logging in 5 times today is 1 DAU. Does <u>not</u> count users who only visit the landing page.'
        },
        {
            title: 'Monthly Active Users (MAU)',
            value: '102k',
            trend: 15,
            unit: '',
            keyMetric: true,
            description: '<b>What:</b> Unique users who engaged with the platform in the last 30 days.<br><b>How:</b> A rolling count of unique user IDs with activity.<br><b>Ex:</b> A user active on day 1 and day 28 is counted once. Does <u>not</u> count a user whose last visit was 31 days ago.'
        },
        {
            title: 'Activation Rate',
            value: '35',
            trend: 2,
            unit: '%',
            keyMetric: true,
            description: '<b>What:</b> Percentage of new users who perform a key first action.<br><b>How:</b> (New Users with Key Action / Total New Users) * 100.<br><b>Ex:</b> A user joins a group on their first day. Does <u>not</u> count a user who signs up but takes no further action.'
        },
        {
            title: 'Cohort Retention – Day 7',
            value: '18',
            trend: -1.5,
            unit: '%',
            keyMetric: true,
            description: '<b>What:</b> Percentage of new users who return on the 7th day after signing up.<br><b>How:</b> (Users from a cohort active on Day 7 / Total users in cohort) * 100.<br><b>Ex:</b> Counts users who signed up last Monday and returned the following Monday. Does <u>not</u> count if they return on Day 6 or 8.'
        }
    ],
    'engagement': [
        {
            title: 'Number of Posts',
            value: '2,450',
            trend: 15,
            unit: '',
            priority: true,
            description: '<b>What:</b> Total number of posts published in the selected timeframe.<br><b>How:</b> Count of all posts created and published by users.<br><b>Ex:</b> A user creates a new post. Does <u>not</u> count draft posts or deleted posts.'
        },
        {
            title: 'Number of Post Likes',
            value: '18.2k',
            trend: 8,
            unit: '',
            priority: true,
            description: '<b>What:</b> Total number of likes received across all posts in the selected timeframe.<br><b>How:</b> Sum of all like interactions on published posts.<br><b>Ex:</b> A user likes a post. Does <u>not</u> count likes on deleted posts.'
        },
        {
            title: 'Number of Comments',
            value: '4,320',
            trend: 12,
            unit: '',
            priority: true,
            description: '<b>What:</b> Total number of comments received across all posts in the selected timeframe.<br><b>How:</b> Count of all comment interactions on published posts.<br><b>Ex:</b> A user comments on a post. Does <u>not</u> count comments on deleted posts.'
        },
        {
            title: 'Time Spent per Session',
            value: '12.5',
            trend: -0.5,
            unit: 'm',
            priority: false,
            description: '<b>What:</b> The average duration a user is actively engaged on the platform.<br><b>How:</b> Total active time of all users / Total number of sessions.<br><b>Ex:</b> A user actively browsing for 10 mins. Does <u>not</u> count time spent idle in a background browser tab.'
        },
        {
            title: 'Content Creation Rate',
            value: '11',
            trend: 1,
            unit: '%',
            priority: false,
            description: '<b>What:</b> Percentage of daily active users who create content.<br><b>How:</b> (Unique Content Creators / DAU) * 100.<br><b>Ex:</b> A user makes a post or a comment. Does <u>not</u> count a user who only likes or views content.'
        },
        {
            title: 'Post Engagement – Comments',
            value: '1.8',
            trend: 0.2,
            unit: 'avg',
            priority: false,
            description: '<b>What:</b> The average number of comments per post.<br><b>How:</b> Total Comments / Total Posts.<br><b>Ex:</b> A direct reply to a post. Does <u>not</u> include post likes, shares, or other reactions.'
        },
        {
            title: 'Active Groups (7 Days)',
            value: '240',
            trend: 25,
            unit: '',
            priority: false,
            description: '<b>What:</b> Total groups with meaningful activity in the last 7 days.<br><b>How:</b> A count of groups with a new post, comment, or call.<br><b>Ex:</b> A group where a member posted yesterday. Does <u>not</u> count a group where members only viewed old content.'
        }
    ],
    'monetization': [
        {
            title: 'Products Sold (Digital)',
            value: '85',
            trend: 10,
            unit: '',
            priority: true,
            description: '<b>What:</b> Total volume of individual digital products sold.<br><b>How:</b> A count of completed purchase transactions for digital goods.<br><b>Ex:</b> A user buys a course and an e-book (2 products). Does <u>not</u> include subscriptions or free downloads.'
        },
        {
            title: 'Conversion Rate (Free → Paid)',
            value: '2.1',
            trend: 0.2,
            unit: '%',
            priority: true,
            description: '<b>What:</b> Percentage of free users who upgrade to a paid subscription.<br><b>How:</b> (Users who Upgraded / Total Free Users) * 100.<br><b>Ex:</b> A user on a free trial buys a monthly plan. Does <u>not</u> count existing paying users.'
        },
        {
            title: 'Paid Groups & Memberships',
            value: '150',
            trend: 22,
            unit: '',
            priority: true,
            description: '<b>What:</b> Total number of active, recurring subscriptions to groups or memberships.<br><b>How:</b> A sum of all currently active subscriptions.<br><b>Ex:</b> A user paying for a premium community. Does <u>not</u> include one-time product purchases.'
        },
        {
            title: 'Courses Published',
            value: '42',
            trend: 5,
            unit: '',
            priority: true,
            description: '<b>What:</b> The total number of new courses made available for sale.<br><b>How:</b> A count of courses set to a "published" or "live" state.<br><b>Ex:</b> A creator publishes a new 10-lesson course. Does <u>not</u> count a course that is still in a "draft" state.'
        },
        {
            title: 'Digital Products Created',
            value: '530',
            trend: 45,
            unit: '',
            priority: false,
            description: '<b>What:</b> Total new digital products created, published or not.<br><b>How:</b> A count of new product entries created in the backend.<br><b>Ex:</b> Includes a new course in "draft" and a published e-book. Measures creator intent.'
        }
    ],
    'community-health': [
        {
            title: 'Community Quality Score',
            value: '4.2',
            trend: 0.1,
            unit: '/5',
            priority: true,
            description: '<b>What:</b> A user-rated score for community health and safety.<br><b>How:</b> Calculated from the average rating from in-app surveys.<br><b>Ex:</b> Based on responses to "How helpful is this community?". Not an automated metric.'
        },
        {
            title: 'Moderation Actions',
            value: '112',
            trend: -5,
            unit: '',
            priority: false,
            description: '<b>What:</b> Number of times moderators intervened (e.g., removing content).<br><b>How:</b> A direct count of actions logged by the moderation team.<br><b>Ex:</b> Removing a spam post. Does <u>not</u> count user reports that required no action.'
        }
    ],
    'platform-health': [
        {
            title: 'System Uptime %',
            value: '99.98',
            trend: 0.01,
            unit: '%',
            priority: true,
            description: '<b>What:</b> The percentage of time the platform was operational.<br><b>How:</b> (Total Time - Downtime) / Total Time * 100.<br><b>Ex:</b> Site down for 5 mins in a 24-hour period. Does <u>not</u> typically include planned maintenance.'
        },
        {
            title: 'Avg. Page Load',
            value: '250',
            trend: -10,
            unit: 'ms',
            priority: false,
            description: '<b>What:</b> Average time for a page to load and become interactive.<br><b>How:</b> Measured by performance monitoring tools across user sessions.<br><b>Ex:</b> Time from click to when you can scroll the new page. Lower is better.'
        }
    ]
};

export const sectionTitles = {
    'engagement': 'Engagement & Content',
    'monetization': 'Marketplace & Monetization',
    'community-health': 'Community Health',
    'platform-health': 'Platform Health',
};

export const sectionIcons = {
    'engagement': 'message-square',
    'monetization': 'shopping-cart',
    'community-health': 'shield',
    'platform-health': 'server',
};

export const timeFrames: TimeFrame[] = [
    { id: '30d', label: 'Last 30 Days', value: '30d' },
    { id: '7d', label: 'Last 7 Days', value: '7d' },
    { id: 'qtd', label: 'Quarter-to-Date', value: 'qtd' },
    { id: 'ytd', label: 'Year-to-Date', value: 'ytd' }
];

export const filterOptions = [
    { id: 'all', label: 'All', active: true },
    { id: 'engagement', label: 'Engagement', active: false },
    { id: 'monetization', label: 'Monetization', active: false },
    { id: 'community-health', label: 'Community Health', active: false },
    { id: 'platform-health', label: 'Platform Health', active: false }
];

export function generateTrendData(trend: number, points: number = 30, baseValue: number = 50): number[] {
    const data = [baseValue];
    let value = baseValue;
    const trendFactor = trend >= 0 ? 0.45 : 0.55;

    for (let i = 1; i < points; i++) {
        const randomFactor = (Math.random() - trendFactor) * (baseValue / 5);
        const trendIncrement = (trend / 100) * (baseValue / points) * i;
        value = baseValue + trendIncrement + randomFactor;
        data.push(Math.max(0, Math.round(value)));
    }

    return data;
}
