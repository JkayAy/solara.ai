'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ChartBarIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
 CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface TrendMetrics {
 revenue: {
  current: number;
  previous: number;
  change: number;
 };
 users: {
  current: number;
  previous: number;
  change: number;
 };
 engagement: {
  current: number;
  previous: number;
  change: number;
 };
 conversion: {
  current: number;
  previous: number;
  change: number;
 };
 monthlyTrends: Array<{
  month: string;
  revenue: number;
  users: number;
  engagement: number;
  conversion: number;
 }>;
}

export default function TrendAnalysisPage() {
 const { data: metrics, loading, error } = useData<TrendMetrics>(
  () => api.analytics.getTrendMetrics()
 );

 if (loading) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="text-red-600">
     Error: {error.message}
    </div>
   </div>
  );
 }

 const formatChange = (change: number) => {
  const isPositive = change >= 0;
  const icon = isPositive ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  const color = isPositive ? 'text-green-600' : 'text-red-600';
  return (
   <div className={`flex items-center ${color}`}>
    <icon className="h-4 w-4 mr-1" />
    <span>{Math.abs(change)}%</span>
   </div>
  );
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <PageHeader title="Trend Analysis" backHref="/dashboard/analytics">
     <div className="flex space-x-4">
      <button
       type="button"
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Export Trends
      </button>
     </div>
    </PageHeader>

    {/* Key Metrics */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Revenue"
      value={`$${metrics?.revenue.current.toLocaleString()}`}
      icon={CurrencyDollarIcon}
      change={formatChange(metrics?.revenue.change || 0)}
     />
     <MetricsCard
      title="Active Users"
      value={metrics?.users.current.toLocaleString()}
      icon={ChartBarIcon}
      change={formatChange(metrics?.users.change || 0)}
     />
     <MetricsCard
      title="Engagement Rate"
      value={`${metrics?.engagement.current}%`}
      icon={ChartBarIcon}
      change={formatChange(metrics?.engagement.change || 0)}
     />
     <MetricsCard
      title="Conversion Rate"
      value={`${metrics?.conversion.current}%`}
      icon={ChartBarIcon}
      change={formatChange(metrics?.conversion.change || 0)}
     />
    </div>

    {/* Monthly Trends */}
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Monthly Trends
      </h3>
     </div>
     <div className="border-t border-gray-200">
      <div className="overflow-x-auto">
       <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
         <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Month
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Revenue
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Users
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Engagement
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Conversion
          </th>
         </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
         {metrics?.monthlyTrends.map((trend) => (
          <tr key={trend.month}>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {trend.month}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${trend.revenue.toLocaleString()}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {trend.users.toLocaleString()}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {trend.engagement}%
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {trend.conversion}%
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>
     </div>
    </div>

    {/* Trend Charts */}
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Revenue trend chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">User Growth</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       User growth chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Engagement Trend</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Engagement trend chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Conversion Trend</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Conversion trend chart will be displayed here
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 