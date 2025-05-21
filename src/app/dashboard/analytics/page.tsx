'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ChartBarIcon,
 UsersIcon,
 ArrowTrendingUpIcon,
 ServerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface AnalyticsOverview {
 totalUsers: number;
 activeProjects: number;
 completedTasks: number;
 systemHealth: number;
}

const analyticsFeatures = [
 {
  title: 'Performance Analytics',
  description: 'Monitor system performance, response times, and resource utilization',
  icon: ChartBarIcon,
  href: '/dashboard/analytics/performance',
 },
 {
  title: 'Usage Analytics',
  description: 'Track user activity, session data, and feature usage patterns',
  icon: UsersIcon,
  href: '/dashboard/analytics/usage',
 },
 {
  title: 'Trend Analysis',
  description: 'Analyze historical data and identify growth patterns',
  icon: ArrowTrendingUpIcon,
  href: '/dashboard/analytics/trends',
 },
 {
  title: 'Real-time Monitoring',
  description: 'Monitor system health and receive instant alerts',
  icon: ServerIcon,
  href: '/dashboard/analytics/monitoring',
 },
];

export default function AnalyticsPage() {
 const { data: overview, loading, error } = useData<AnalyticsOverview>(
  () => api.analytics.getMetrics()
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
    <PageHeader title="Analytics Dashboard">
     <div className="flex space-x-4">
      <button
       type="button"
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Export Data
      </button>
      <button
       type="button"
       className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Schedule Report
      </button>
     </div>
    </PageHeader>

    {/* Overview Metrics */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Total Users"
      value={overview?.totalUsers.toString() || '0'}
      icon={UsersIcon}
     />
     <MetricsCard
      title="Active Projects"
      value={overview?.activeProjects.toString() || '0'}
      icon={ChartBarIcon}
     />
     <MetricsCard
      title="Completed Tasks"
      value={overview?.completedTasks.toString() || '0'}
      icon={ChartBarIcon}
     />
     <MetricsCard
      title="System Health"
      value={`${overview?.systemHealth}%`}
      icon={ServerIcon}
     />
    </div>

    {/* Analytics Features */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     {analyticsFeatures.map((feature) => (
      <Link
       key={feature.title}
       href={feature.href}
       className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
      >
       <div>
        <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
         <feature.icon className="h-6 w-6" aria-hidden="true" />
        </span>
       </div>
       <div className="mt-8">
        <h3 className="text-lg font-medium">
         <span className="absolute inset-0" aria-hidden="true" />
         {feature.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
         {feature.description}
        </p>
       </div>
       <span
        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
       >
        <svg
         className="h-6 w-6"
         fill="currentColor"
         viewBox="0 0 24 24"
        >
         <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
       </span>
      </Link>
     ))}
    </div>
   </div>
  </div>
 );
} 