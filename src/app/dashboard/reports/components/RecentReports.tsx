'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import type { RecentReport } from '@/lib/data';

interface RecentReportsProps {
 reports: RecentReport[];
}

export function RecentReports({ reports }: RecentReportsProps) {
 return (
  <div className="mt-8">
   <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
   <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
    <ul role="list" className="divide-y divide-gray-200">
     {reports.map((report) => (
      <li key={report.id}>
       <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
         <p className="text-sm font-medium text-indigo-600 truncate">
          {report.title}
         </p>
         <div className="ml-2 flex-shrink-0 flex">
          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
           {report.status}
          </p>
         </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
         <div className="sm:flex">
          <p className="flex items-center text-sm text-gray-500">
           <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
           Generated: {report.generatedAt}
          </p>
         </div>
         <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
          <p>
           Type: {report.type}
          </p>
         </div>
        </div>
       </div>
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
} 