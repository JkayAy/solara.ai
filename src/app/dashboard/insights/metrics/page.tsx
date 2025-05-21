'use client';

import React from 'react';
import { ArrowTrendingUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const MetricsPage = () => {
 // Mock data - replace with real data in production
 const metricsData = {
  growth: {
   current: 24,
   previous: 18,
   change: 6,
   trend: 'up',
   history: [
    { month: 'Jan', value: 15 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 20 },
    { month: 'Apr', value: 22 },
    { month: 'May', value: 24 },
   ],
  },
  revenue: {
   current: 125000,
   previous: 100000,
   change: 25,
   trend: 'up',
  },
  clients: {
   current: 45,
   previous: 38,
   change: 7,
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
     <h1 className="text-2xl font-semibold text-gray-900">Key Metrics Details</h1>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {/* Growth Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ArrowTrendingUpIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Growth Rate</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">{metricsData.growth.current}%</div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{metricsData.growth.change}%</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
       <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500">Monthly Trend</h4>
        <div className="mt-2 flex items-center space-x-2">
         {metricsData.growth.history.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
           <div className="h-24 w-8 bg-indigo-100 rounded-t">
            <div
             className="h-full w-full bg-indigo-500 rounded-t"
             style={{ height: `${(item.value / metricsData.growth.current) * 100}%` }}
            />
           </div>
           <span className="text-xs text-gray-500 mt-1">{item.month}</span>
          </div>
         ))}
        </div>
       </div>
      </div>
     </div>

     {/* Revenue Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ArrowTrendingUpIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">
            ${(metricsData.revenue.current / 1000).toFixed(1)}k
           </div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{metricsData.revenue.change}%</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>

     {/* Clients Card */}
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
       <div className="flex items-center">
        <div className="flex-shrink-0">
         <ArrowTrendingUpIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">{metricsData.clients.current}</div>
           <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
            <span>+{metricsData.clients.change}</span>
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* Additional Metrics Section */}
    <div className="mt-8">
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900">Detailed Analysis</h3>
       <div className="mt-4 text-sm text-gray-500">
        <p>This section provides a comprehensive analysis of your key metrics, including:</p>
        <ul className="mt-2 list-disc list-inside">
         <li>Historical trends and patterns</li>
         <li>Comparative analysis with industry standards</li>
         <li>Growth projections and forecasts</li>
         <li>Actionable insights and recommendations</li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MetricsPage; 