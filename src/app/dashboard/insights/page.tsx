'use client';

import React from 'react';
import { LightBulbIcon, ChartBarIcon, ArrowTrendingUpIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const InsightsPage = () => {
 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Insights</h1>
   </div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {/* Key Metrics Card */}
     <Link
      href="/dashboard/insights/metrics"
      className="w-full text-left bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
     >
      <div className="p-5">
       <div className="flex items-center justify-between">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <ArrowTrendingUpIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">Key Metrics</dt>
           <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">24%</div>
            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
             <span>Growth</span>
            </div>
           </dd>
          </dl>
         </div>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
       </div>
      </div>
     </Link>

     {/* Performance Card */}
     <Link
      href="/dashboard/insights/performance"
      className="w-full text-left bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
     >
      <div className="p-5">
       <div className="flex items-center justify-between">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">Performance</dt>
           <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">89%</div>
            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
             <span>Efficiency</span>
            </div>
           </dd>
          </dl>
         </div>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
       </div>
      </div>
     </Link>

     {/* Recommendations Card */}
     <Link
      href="/dashboard/insights/recommendations"
      className="w-full text-left bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
     >
      <div className="p-5">
       <div className="flex items-center justify-between">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <LightBulbIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">Recommendations</dt>
           <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">5</div>
            <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
             <span>New</span>
            </div>
           </dd>
          </dl>
         </div>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
       </div>
      </div>
     </Link>
    </div>

    {/* Additional Content Section */}
    <div className="mt-8">
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900">Business Insights</h3>
       <div className="mt-4 text-sm text-gray-500">
        <p>Your personalized insights and recommendations will appear here. This section will provide actionable insights based on your business data and performance metrics.</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default InsightsPage; 