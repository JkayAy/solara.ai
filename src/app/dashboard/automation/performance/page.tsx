'use client';

import React, { useState } from 'react';
import {
 ArrowLeftIcon,
 ChartBarIcon,
 ClockIcon,
 CheckCircleIcon,
 XCircleIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface PerformanceMetric {
 id: string;
 name: string;
 value: number;
 change: number;
 trend: 'up' | 'down';
 unit: string;
}

interface AutomationStats {
 totalExecutions: number;
 successRate: number;
 averageDuration: string;
 totalTimeSaved: string;
}

export default function PerformancePage() {
 const [metrics, setMetrics] = useState<PerformanceMetric[]>([
  {
   id: '1',
   name: 'Success Rate',
   value: 95.8,
   change: 2.3,
   trend: 'up',
   unit: '%',
  },
  {
   id: '2',
   name: 'Average Duration',
   value: 45,
   change: -5.2,
   trend: 'down',
   unit: 'sec',
  },
  {
   id: '3',
   name: 'Time Saved',
   value: 128,
   change: 15.4,
   trend: 'up',
   unit: 'hrs',
  },
  {
   id: '4',
   name: 'Error Rate',
   value: 4.2,
   change: -1.8,
   trend: 'down',
   unit: '%',
  },
 ]);

 const [stats, setStats] = useState<AutomationStats>({
  totalExecutions: 1250,
  successRate: 95.8,
  averageDuration: '45 seconds',
  totalTimeSaved: '128 hours',
 });

 const [recentExecutions, setRecentExecutions] = useState([
  {
   id: '1',
   name: 'Invoice Generation',
   status: 'success',
   duration: '2m 15s',
   timestamp: '2024-03-20 09:00 AM',
  },
  {
   id: '2',
   name: 'Report Generation',
   status: 'success',
   duration: '5m 30s',
   timestamp: '2024-03-20 08:30 AM',
  },
  {
   id: '3',
   name: 'Data Backup',
   status: 'failed',
   duration: '1m 45s',
   timestamp: '2024-03-20 08:00 AM',
  },
 ]);

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center">
      <Link
       href="/dashboard/automation"
       className="mr-4 p-2 rounded-full hover:bg-gray-100"
      >
       <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Performance Metrics</h1>
     </div>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
     {metrics.map((metric) => (
      <div key={metric.id} className="bg-white overflow-hidden shadow rounded-lg">
       <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">
         {metric.name}
        </dt>
        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
         <div className="flex items-baseline text-2xl font-semibold text-gray-900">
          {metric.value}
          <span className="ml-2 text-sm font-medium text-gray-500">
           {metric.unit}
          </span>
         </div>
         <div
          className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${metric.trend === 'up'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
           }`}
         >
          {metric.trend === 'up' ? (
           <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
          ) : (
           <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
          )}
          {metric.change}%
         </div>
        </dd>
       </div>
      </div>
     ))}
    </div>

    {/* Performance Overview */}
    <div className="bg-white shadow rounded-lg mb-6">
     <div className="px-4 py-5 sm:p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
       Performance Overview
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
       <div>
        <p className="text-sm font-medium text-gray-500">Total Executions</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
         {stats.totalExecutions}
        </p>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-500">Success Rate</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
         {stats.successRate}%
        </p>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-500">Average Duration</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
         {stats.averageDuration}
        </p>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-500">Time Saved</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
         {stats.totalTimeSaved}
        </p>
       </div>
      </div>
     </div>
    </div>

    {/* Recent Executions */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <div className="px-4 py-5 sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Recent Executions</h2>
     </div>
     <ul role="list" className="divide-y divide-gray-200">
      {recentExecutions.map((execution) => (
       <li key={execution.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {execution.name}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${execution.status === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
             }`}
           >
            {execution.status === 'success' ? (
             <CheckCircleIcon className="h-4 w-4 mr-1" />
            ) : (
             <XCircleIcon className="h-4 w-4 mr-1" />
            )}
            {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
           </span>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {execution.duration}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <p>{execution.timestamp}</p>
          </div>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
} 