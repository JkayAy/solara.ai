'use client';

import React from 'react';
import { ArrowLeftIcon, ChartBarIcon, ArrowTrendingUpIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const AnalyticsPage = () => {
 // Mock data - replace with real data in production
 const projectMetrics = {
  overview: {
   totalProjects: 5,
   activeProjects: 3,
   completedProjects: 2,
   totalRevenue: 125000,
  },
  performance: {
   onTimeDelivery: 85,
   budgetAdherence: 92,
   clientSatisfaction: 88,
   teamProductivity: 90,
  },
  trends: [
   { month: 'Jan', value: 65 },
   { month: 'Feb', value: 70 },
   { month: 'Mar', value: 75 },
   { month: 'Apr', value: 80 },
   { month: 'May', value: 85 },
  ],
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center">
      <Link
       href="/dashboard/projects"
       className="mr-4 p-2 rounded-full hover:bg-gray-100"
      >
       <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Project Analytics</h1>
     </div>
    </div>

    {/* Project Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Total Projects
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {projectMetrics.overview.totalProjects}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Active Projects
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {projectMetrics.overview.activeProjects}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Completed Projects
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {projectMetrics.overview.completedProjects}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Total Revenue
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        ${(projectMetrics.overview.totalRevenue / 1000).toFixed(1)}k
       </dd>
      </div>
     </div>
    </div>

    {/* Performance Metrics */}
    <div className="mb-6 bg-white shadow rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Performance Metrics
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
       <div>
        <div className="flex justify-between text-sm mb-1">
         <span>On-time Delivery</span>
         <span>{projectMetrics.performance.onTimeDelivery}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
         <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${projectMetrics.performance.onTimeDelivery}%` }}
         />
        </div>
       </div>
       <div>
        <div className="flex justify-between text-sm mb-1">
         <span>Budget Adherence</span>
         <span>{projectMetrics.performance.budgetAdherence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
         <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${projectMetrics.performance.budgetAdherence}%` }}
         />
        </div>
       </div>
       <div>
        <div className="flex justify-between text-sm mb-1">
         <span>Client Satisfaction</span>
         <span>{projectMetrics.performance.clientSatisfaction}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
         <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${projectMetrics.performance.clientSatisfaction}%` }}
         />
        </div>
       </div>
       <div>
        <div className="flex justify-between text-sm mb-1">
         <span>Team Productivity</span>
         <span>{projectMetrics.performance.teamProductivity}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
         <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${projectMetrics.performance.teamProductivity}%` }}
         />
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* Trend Analysis */}
    <div className="bg-white shadow rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Performance Trend
      </h3>
      <div className="mt-4">
       <div className="flex items-center space-x-4">
        {projectMetrics.trends.map((trend) => (
         <div key={trend.month} className="flex flex-col items-center">
          <div className="h-24 w-8 bg-indigo-100 rounded-t">
           <div
            className="h-full w-full bg-indigo-500 rounded-t"
            style={{ height: `${(trend.value / 100) * 100}%` }}
           />
          </div>
          <span className="text-xs text-gray-500 mt-1">{trend.month}</span>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default AnalyticsPage; 