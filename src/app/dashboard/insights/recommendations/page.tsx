'use client';

import React from 'react';
import { LightBulbIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const RecommendationsPage = () => {
 // Mock data - replace with real data in production
 const recommendations = [
  {
   id: 1,
   title: 'Optimize Resource Allocation',
   description: 'Based on current utilization patterns, consider redistributing resources to improve efficiency.',
   priority: 'High',
   impact: 'Significant',
   status: 'New',
   actionItems: [
    'Review current resource distribution',
    'Identify bottlenecks',
    'Create optimization plan',
   ],
  },
  {
   id: 2,
   title: 'Enhance Client Communication',
   description: 'Implement automated follow-ups to improve response times and client satisfaction.',
   priority: 'Medium',
   impact: 'Moderate',
   status: 'In Progress',
   actionItems: [
    'Set up automated email sequences',
    'Create response templates',
    'Monitor response rates',
   ],
  },
  {
   id: 3,
   title: 'Streamline Project Workflow',
   description: 'Introduce new project management tools to reduce overhead and improve team collaboration.',
   priority: 'High',
   impact: 'Significant',
   status: 'New',
   actionItems: [
    'Evaluate project management tools',
    'Create implementation plan',
    'Train team members',
   ],
  },
 ];

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
     <h1 className="text-2xl font-semibold text-gray-900">Recommendations</h1>
    </div>

    <div className="space-y-6">
     {recommendations.map((recommendation) => (
      <div key={recommendation.id} className="bg-white shadow rounded-lg">
       <div className="p-6">
        <div className="flex items-start">
         <div className="flex-shrink-0">
          <LightBulbIcon className="h-6 w-6 text-yellow-400" />
         </div>
         <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
           <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
           <span className={`px-2 py-1 text-xs font-medium rounded-full ${recommendation.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
            {recommendation.status}
           </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{recommendation.description}</p>

          <div className="mt-4">
           <div className="flex items-center space-x-4">
            <div>
             <span className="text-sm font-medium text-gray-500">Priority:</span>
             <span className="ml-2 text-sm text-gray-900">{recommendation.priority}</span>
            </div>
            <div>
             <span className="text-sm font-medium text-gray-500">Impact:</span>
             <span className="ml-2 text-sm text-gray-900">{recommendation.impact}</span>
            </div>
           </div>
          </div>

          <div className="mt-4">
           <h4 className="text-sm font-medium text-gray-900">Action Items</h4>
           <ul className="mt-2 space-y-2">
            {recommendation.actionItems.map((item, index) => (
             <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-500">{item}</span>
             </li>
            ))}
           </ul>
          </div>

          <div className="mt-4">
           <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
            Implement Recommendation
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     ))}
    </div>

    {/* Additional Insights Section */}
    <div className="mt-8">
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900">Recommendation Insights</h3>
       <div className="mt-4 text-sm text-gray-500">
        <p>These recommendations are based on:</p>
        <ul className="mt-2 list-disc list-inside">
         <li>Historical performance data</li>
         <li>Industry best practices</li>
         <li>Team feedback and surveys</li>
         <li>Client satisfaction metrics</li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default RecommendationsPage; 