'use client';

import React, { useState } from 'react';
import {
 ArrowLeftIcon,
 PlusIcon,
 ClockIcon,
 CalendarIcon,
 CheckCircleIcon,
 XCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ScheduledTask {
 id: string;
 name: string;
 description: string;
 schedule: string;
 status: 'active' | 'completed' | 'failed';
 lastRun: string;
 nextRun: string;
 type: 'daily' | 'weekly' | 'monthly';
}

export default function ScheduledTasksPage() {
 const [tasks, setTasks] = useState<ScheduledTask[]>([
  {
   id: '1',
   name: 'Database Backup',
   description: 'Backup production database',
   schedule: 'Daily at 2:00 AM',
   status: 'active',
   lastRun: '2024-03-20 02:00 AM',
   nextRun: '2024-03-21 02:00 AM',
   type: 'daily',
  },
  {
   id: '2',
   name: 'Weekly Report',
   description: 'Generate weekly analytics report',
   schedule: 'Every Monday at 9:00 AM',
   status: 'completed',
   lastRun: '2024-03-18 09:00 AM',
   nextRun: '2024-03-25 09:00 AM',
   type: 'weekly',
  },
  {
   id: '3',
   name: 'Monthly Cleanup',
   description: 'Clean up temporary files',
   schedule: '1st of every month at 3:00 AM',
   status: 'failed',
   lastRun: '2024-03-01 03:00 AM',
   nextRun: '2024-04-01 03:00 AM',
   type: 'monthly',
  },
 ]);

 const [showNewTaskModal, setShowNewTaskModal] = useState(false);

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
      <h1 className="text-2xl font-semibold text-gray-900">Scheduled Tasks</h1>
     </div>
     <button
      onClick={() => setShowNewTaskModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      <PlusIcon className="h-5 w-5 mr-2" />
      Schedule New Task
     </button>
    </div>

    {/* Task Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Active Tasks
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {tasks.filter(t => t.status === 'active').length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Completed Tasks
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {tasks.filter(t => t.status === 'completed').length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Failed Tasks
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {tasks.filter(t => t.status === 'failed').length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Success Rate
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">95%</dd>
      </div>
     </div>
    </div>

    {/* Tasks List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <ul role="list" className="divide-y divide-gray-200">
      {tasks.map((task) => (
       <li key={task.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {task.name}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === 'active'
              ? 'bg-green-100 text-green-800'
              : task.status === 'completed'
               ? 'bg-blue-100 text-blue-800'
               : 'bg-red-100 text-red-800'
             }`}
           >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
           </span>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            {task.description}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
           <p>{task.schedule}</p>
          </div>
         </div>
         <div className="mt-2 flex items-center text-sm text-gray-500">
          <p>Last Run: {task.lastRun}</p>
          <span className="mx-2">•</span>
          <p>Next Run: {task.nextRun}</p>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>

   {/* New Task Modal (to be implemented) */}
  </div>
 );
} 