'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 UsersIcon,
 ClockIcon,
 ChartBarIcon,
 DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

interface UsageMetrics {
 activeUsers: number;
 totalSessions: number;
 averageSessionDuration: number;
 peakConcurrentUsers: number;
 mobileUsers: number;
 desktopUsers: number;
 topFeatures: Array<{
  name: string;
  usage: number;
 }>;
}

export default function UsageAnalyticsPage() {
 const { data: metrics, loading, error } = useData<UsageMetrics>(
  () => api.analytics.getUsageMetrics()
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

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <PageHeader title="Usage Analytics" backHref="/dashboard/analytics">
     <div className="flex space-x-4">
      <button
       type="button"
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Export Report
      </button>
     </div>
    </PageHeader>

    {/* Usage Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Active Users"
      value={metrics?.activeUsers.toString() || '0'}
      icon={UsersIcon}
     />
     <MetricsCard
      title="Total Sessions"
      value={metrics?.totalSessions.toString() || '0'}
      icon={ChartBarIcon}
     />
     <MetricsCard
      title="Avg. Session Duration"
      value={`${metrics?.averageSessionDuration} min`}
      icon={ClockIcon}
     />
     <MetricsCard
      title="Peak Concurrent Users"
      value={metrics?.peakConcurrentUsers.toString() || '0'}
      icon={UsersIcon}
     />
    </div>

    {/* Device Usage */}
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Device Usage
      </h3>
     </div>
     <div className="border-t border-gray-200">
      <dl>
       <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Mobile Users</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {metrics?.mobileUsers.toLocaleString()}
        </dd>
       </div>
       <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Desktop Users</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {metrics?.desktopUsers.toLocaleString()}
        </dd>
       </div>
      </dl>
     </div>
    </div>

    {/* Top Features */}
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Top Features
      </h3>
     </div>
     <div className="border-t border-gray-200">
      <ul role="list" className="divide-y divide-gray-200">
       {metrics?.topFeatures.map((feature) => (
        <li key={feature.name} className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <p className="text-sm font-medium text-gray-900">
            {feature.name}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {feature.usage}%
           </p>
          </div>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>

    {/* Usage Charts */}
    <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">User Activity</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       User activity chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Feature Usage</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Feature usage chart will be displayed here
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 