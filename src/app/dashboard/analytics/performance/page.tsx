'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ChartBarIcon,
 ClockIcon,
 CpuChipIcon,
 ServerIcon,
} from '@heroicons/react/24/outline';

interface PerformanceMetrics {
 responseTime: number;
 cpuUsage: number;
 memoryUsage: number;
 requestCount: number;
 errorRate: number;
 uptime: number;
}

export default function PerformanceAnalyticsPage() {
 const { data: metrics, loading, error } = useData<PerformanceMetrics>(
  () => api.analytics.getPerformanceMetrics()
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
    <PageHeader title="Performance Analytics" backHref="/dashboard/analytics">
     <div className="flex space-x-4">
      <button
       type="button"
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Export Report
      </button>
     </div>
    </PageHeader>

    {/* Performance Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
     <MetricsCard
      title="Average Response Time"
      value={`${metrics?.responseTime}ms`}
      icon={ClockIcon}
     />
     <MetricsCard
      title="CPU Usage"
      value={`${metrics?.cpuUsage}%`}
      icon={CpuChipIcon}
     />
     <MetricsCard
      title="Memory Usage"
      value={`${metrics?.memoryUsage}%`}
      icon={ServerIcon}
     />
    </div>

    {/* Performance Details */}
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       System Performance
      </h3>
     </div>
     <div className="border-t border-gray-200">
      <dl>
       <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Request Count</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {metrics?.requestCount.toLocaleString()}
        </dd>
       </div>
       <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Error Rate</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {metrics?.errorRate}%
        </dd>
       </div>
       <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">System Uptime</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {metrics?.uptime}%
        </dd>
       </div>
      </dl>
     </div>
    </div>

    {/* Performance Charts */}
    <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Response Time Trend</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Response time chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Resource Usage</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Resource usage chart will be displayed here
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 