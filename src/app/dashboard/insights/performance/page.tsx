'use client';

import React from 'react';
import { ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const PerformancePage = () => {
 // Mock data - replace with real data in production
 const performanceData = {
  efficiency: {
   current: 89,
   previous: 85,
   change: 4,
   trend: 'up',
   breakdown: {
    responseTime: 92,
    completionRate: 88,
    qualityScore: 87,
   },
  },
  productivity: {
   current: 78,
   previous: 75,
   change: 3,
   trend: 'up',
  },
  utilization: {
   current: 82,
   previous: 80,
   change: 2,
   trend: 'up',
  },
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="flex items-center mb-6">
     <Link
      href="/dashboard/insights"
      className="mr-4 p-2 rounded-full hover:bg-gray-100"
     >
      <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
     </Link>
     <h1 className="text-2xl font-semibold text-gray-900">Performance Details</h1>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {/* Overall Efficiency Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ChartBarIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Overall Efficiency</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">{performanceData.efficiency.current}%</div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{performanceData.efficiency.change}%</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
       <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500">Efficiency Breakdown</h4>
        <div className="mt-2 space-y-2">
         <div>
          <div className="flex justify-between text-sm">
           <span>Response Time</span>
           <span className="font-medium">{performanceData.efficiency.breakdown.responseTime}%</span>
          </div>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
           <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${performanceData.efficiency.breakdown.responseTime}%` }}
           />
          </div>
         </div>
         <div>
          <div className="flex justify-between text-sm">
           <span>Completion Rate</span>
           <span className="font-medium">{performanceData.efficiency.breakdown.completionRate}%</span>
          </div>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
           <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${performanceData.efficiency.breakdown.completionRate}%` }}
           />
          </div>
         </div>
         <div>
          <div className="flex justify-between text-sm">
           <span>Quality Score</span>
           <span className="font-medium">{performanceData.efficiency.breakdown.qualityScore}%</span>
          </div>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
           <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${performanceData.efficiency.breakdown.qualityScore}%` }}
           />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Productivity Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ChartBarIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Productivity</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">{performanceData.productivity.current}%</div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{performanceData.productivity.change}%</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>

     {/* Resource Utilization Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ChartBarIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Resource Utilization</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">{performanceData.utilization.current}%</div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{performanceData.utilization.change}%</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* Performance Analysis Section */}
    <div className="mt-8">
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Analysis</h3>
       <div className="mt-4 text-sm text-gray-500">
        <p>This section provides a detailed analysis of your performance metrics, including:</p>
        <ul className="mt-2 list-disc list-inside">
         <li>Efficiency trends and patterns</li>
         <li>Resource utilization analysis</li>
         <li>Productivity benchmarks</li>
         <li>Improvement recommendations</li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PerformancePage; 