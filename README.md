# Monday.com Dashboard App

A comprehensive dashboard application that integrates with Monday.com to track employee workloads and calculate financial metrics.

## 🚀 Live Demo

- **Live Application**: [https://dashboard-monday-app.vercel.app/](https://dashboard-monday-app.vercel.app/)
- **Demo Video**: [YouTube Demo](https://youtu.be/VQDnJhHvuZg)

## 📋 Features

- **Real-time Data Integration**: Seamless integration with Monday.com API
- **Employee Workload Tracking**: Monitor work hours and productivity metrics
- **Financial Calculations**: Automated salary and payment calculations
- **Live Updates**: Background data refresh every 30 seconds
- **Responsive Design**: Modern UI with optimal user experience

## 🔧 Technical Implementation

### Monday.com Integration
- **API**: Utilizes Monday.com GraphQL API v2 (`https://api.monday.com/v2`)
- **Authentication**: Secure token-based authentication
- **Data Selection**: Optimized queries for specific data requirements

### Data Processing
- **Server-Side Processing**: All data calculations and aggregations handled on the backend
- **API Routes**: Clean separation between frontend and Monday.com API interactions
- **Error Handling**: Robust error handling with graceful degradation

### Live Updates
- **Background Refresh**: Automatic data updates every 30 seconds
- **Non-Blocking Updates**: Background updates don't disrupt user experience
- **Cache Management**: Proper cache control to ensure data freshness

## 💰 Payment Calculation Formula

The application calculates employee payments based on the following logic:

1. **Standard Work Hours**: Each employee should work 160 hours per month (standard norm)
2. **Base Salary Calculation**: `Employee Rate × 160 hours = Base Monthly Salary`
3. **Actual Work Calculation**: `Hours Worked × Employee Rate = Amount Earned`
4. **Overpayment/Underpayment**: `Base Salary - Amount Earned = Company Overpayment`

This formula helps track whether the company is overpaying or underpaying employees based on their actual work hours versus the standard 160-hour month.

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes
- **Integration**: Monday.com GraphQL API
- **Deployment**: Vercel

## 📖 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (Monday.com API token)
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_MONDAY_API_TOKEN=your_monday_api_token_here
MONDAY_API_TOKEN=your_monday_api_token_here
```

For boards ids need setup in constants file BOARD_IDS array in file:
`app/api/monday-data/constants.ts`