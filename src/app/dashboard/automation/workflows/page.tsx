'use client';

import React, { useState } from 'react';
import {
 ArrowLeftIcon,
 PlusIcon,
 PlayIcon,
 PauseIcon,
 TrashIcon,
 ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Workflow {
 id: string;
 name: string;
 description: string;
 status: 'active' | 'paused' | 'stopped';
 lastRun: string;
 nextRun: string;
 triggers: string[];
 actions: string[];
}

export default function WorkflowsPage() {
 const [workflows, setWorkflows] = useState<Workflow[]>([
  {
   id: '1',
   name: 'Invoice Generation',
   description: 'Automatically generate and send invoices',
   status: 'active',
   lastRun: '2024-03-20 09:00 AM',
   nextRun: '2024-03-21 09:00 AM',
   triggers: ['Daily at 9:00 AM'],
   actions: ['Generate Invoice', 'Send Email'],
  },
  {
   id: '2',
   name: 'Report Generation',
   description: 'Generate weekly performance reports',
   status: 'paused',
   lastRun: '2024-03-19 05:00 PM',
   nextRun: '2024-03-26 05:00 PM',
   triggers: ['Weekly on Monday'],
   actions: ['Collect Data', 'Generate Report', 'Send to Team'],
  },
 ]);

 const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false);

 const handleStatusChange = (id: string, newStatus: Workflow['status']) => {
  setWorkflows(workflows.map(wf =>
   wf.id === id ? { ...wf, status: newStatus } : wf
  ));
 };

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
      <h1 className="text-2xl font-semibold text-gray-900">Workflow Automation</h1>
     </div>
     <button
      onClick={() => setShowNewWorkflowModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      <PlusIcon className="h-5 w-5 mr-2" />
      Create Workflow
     </button>
    </div>

    {/* Workflow Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Active Workflows
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {workflows.filter(w => w.status === 'active').length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Paused Workflows
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {workflows.filter(w => w.status === 'paused').length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Total Workflows
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {workflows.length}
       </dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Success Rate
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">98%</dd>
      </div>
     </div>
    </div>

    {/* Workflows List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <ul role="list" className="divide-y divide-gray-200">
      {workflows.map((workflow) => (
       <li key={workflow.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <ArrowPathIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {workflow.name}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex space-x-2">
           {workflow.status === 'active' ? (
            <button
             onClick={() => handleStatusChange(workflow.id, 'paused')}
             className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             <PauseIcon className="h-4 w-4 mr-1" />
             Pause
            </button>
           ) : (
            <button
             onClick={() => handleStatusChange(workflow.id, 'active')}
             className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
             <PlayIcon className="h-4 w-4 mr-1" />
             Resume
            </button>
           )}
           <button
            onClick={() => handleStatusChange(workflow.id, 'stopped')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
           >
            <TrashIcon className="h-4 w-4 mr-1" />
            Delete
           </button>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            {workflow.description}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <p>Last Run: {workflow.lastRun}</p>
           <span className="mx-2">•</span>
           <p>Next Run: {workflow.nextRun}</p>
          </div>
         </div>
         <div className="mt-2">
          <div className="flex flex-wrap gap-2">
           {workflow.triggers.map((trigger, index) => (
            <span
             key={index}
             className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
             {trigger}
            </span>
           ))}
          </div>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>

   {/* New Workflow Modal (to be implemented) */}
  </div>
 );
} 