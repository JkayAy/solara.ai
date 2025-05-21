'use client';

import React from 'react';
import {
 DocumentTextIcon,
 ClockIcon,
 ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export function QuickActions() {
 return (
  <div className="mt-8">
   <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <button
     type="button"
     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
     <DocumentTextIcon className="h-5 w-5 mr-2" />
     Generate Report
    </button>
    <button
     type="button"
     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
     <ClockIcon className="h-5 w-5 mr-2" />
     Schedule Report
    </button>
    <button
     type="button"
     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
     <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
     Export Data
    </button>
   </div>
  </div>
 );
} 