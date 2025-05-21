'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ChartBarIcon,
 UserGroupIcon,
 ClockIcon,
 CheckCircleIcon,
 ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface PerformanceMetrics {
 averageCompletionRate: number;
 averageResponseTime: number;
 taskCompletionRate: number;
 onTimeDelivery: number;
 memberPerformance: {
  id: string;
  name: string;
  completionRate: number;
  responseTime: number;
  taskCount: number;
  onTimeDelivery: number;
 }[];
}

export default function PerformancePage() {
 const [timeRange, setTimeRange] = useState('week');
 const { data: performance, error, isLoading } = useData<PerformanceMetrics>(() => api.team.performance.getMetrics());

 if (isLoading) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="text-red-500">Error loading performance data: {error.message}</div>
   </div>
  );
 }

 return (
  <div className="space-y-6">
   <BackButton href="/dashboard/team" label="Back to Team" />
   <PageHeader
    title="Team Performance"
    description="Track and analyze team performance metrics"
   />

   {/* Time Range Selector */}
   <div className="flex justify-end">
    <select
     value={timeRange}
     onChange={(e) => setTimeRange(e.target.value)}
     className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    >
     <option value="week">Last 7 Days</option>
     <option value="month">Last 30 Days</option>
     <option value="quarter">Last 90 Days</option>
    </select>
   </div>

   {/* Performance Metrics */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
     <div className="flex items-center justify-between">
      <div>
       <p className="text-sm font-medium text-gray-500">Average Completion Rate</p>
       <p className="text-2xl font-semibold text-gray-900">
        {performance?.averageCompletionRate}%
       </p>
      </div>
      <div className="p-3 bg-blue-100 rounded-full">
       <ChartBarIcon className="h-6 w-6 text-blue-600" />
      </div>
     </div>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
     <div className="flex items-center justify-between">
      <div>
       <p className="text-sm font-medium text-gray-500">Average Response Time</p>
       <p className="text-2xl font-semibold text-gray-900">
        {performance?.averageResponseTime}h
       </p>
      </div>
      <div className="p-3 bg-green-100 rounded-full">
       <ClockIcon className="h-6 w-6 text-green-600" />
      </div>
     </div>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
     <div className="flex items-center justify-between">
      <div>
       <p className="text-sm font-medium text-gray-500">Task Completion Rate</p>
       <p className="text-2xl font-semibold text-gray-900">
        {performance?.taskCompletionRate}%
       </p>
      </div>
      <div className="p-3 bg-purple-100 rounded-full">
       <CheckCircleIcon className="h-6 w-6 text-purple-600" />
      </div>
     </div>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
     <div className="flex items-center justify-between">
      <div>
       <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
       <p className="text-2xl font-semibold text-gray-900">
        {performance?.onTimeDelivery}%
       </p>
      </div>
      <div className="p-3 bg-yellow-100 rounded-full">
       <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" />
      </div>
     </div>
    </div>
   </div>

   {/* Member Performance Table */}
   <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-6 py-4 border-b">
     <h3 className="text-lg font-semibold text-gray-900">Member Performance</h3>
    </div>
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Member
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Completion Rate
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Response Time
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Tasks
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         On-Time Delivery
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       {performance?.memberPerformance.map((member) => (
        <tr key={member.id}>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
           <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
             <UserGroupIcon className="h-6 w-6 text-gray-500" />
            </div>
           </div>
           <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{member.name}</div>
           </div>
          </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.completionRate}%</div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.responseTime}h</div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.taskCount}</div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.onTimeDelivery}%</div>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
} 