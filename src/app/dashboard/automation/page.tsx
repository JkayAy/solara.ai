'use client';

import React, { useState, useEffect } from 'react';
import {
 ArrowPathIcon,
 ClockIcon,
 ChartBarIcon,
 DocumentDuplicateIcon,
 PlusIcon,
 PlayIcon,
 PauseIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Automation {
 id: string;
 name: string;
 type: string;
 status: 'active' | 'paused';
 lastRun: string;
 nextRun: string;
}

interface AutomationFeature {
 title: string;
 description: string;
 icon: React.ElementType;
 href: string;
}

const projectFeatures: AutomationFeature[] = [
 {
  title: 'Workflow Automation',
  description: 'Create and manage automated workflows',
  icon: ArrowPathIcon,
  href: '/dashboard/automation/workflows',
 },
 {
  title: 'Scheduled Tasks',
  description: 'Schedule and monitor automated tasks',
  icon: ClockIcon,
  href: '/dashboard/automation/scheduled',
 },
 {
  title: 'Performance',
  description: 'Monitor automation performance metrics',
  icon: ChartBarIcon,
  href: '/dashboard/automation/performance',
 },
 {
  title: 'Templates',
  description: 'Use and create automation templates',
  icon: DocumentDuplicateIcon,
  href: '/dashboard/automation/templates',
 },
];

export default function AutomationPage() {
 const [activeAutomations, setActiveAutomations] = useState<Automation[]>([
  {
   id: '1',
   name: 'Invoice Generation',
   type: 'Workflow',
   status: 'active',
   lastRun: '2024-03-20 09:00 AM',
   nextRun: '2024-03-21 09:00 AM',
  },
  {
   id: '2',
   name: 'Weekly Report',
   type: 'Scheduled Task',
   status: 'paused',
   lastRun: '2024-03-19 05:00 PM',
   nextRun: '2024-03-26 05:00 PM',
  },
  {
   id: '3',
   name: 'Data Backup',
   type: 'Workflow',
   status: 'active',
   lastRun: '2024-03-20 02:00 AM',
   nextRun: '2024-03-21 02:00 AM',
  },
 ]);

 const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false);
 const [isAutomationRunning, setIsAutomationRunning] = useState(true);

 // Handle automation status changes
 const handleStatusChange = (id: string, newStatus: 'active' | 'paused') => {
  setActiveAutomations(prev =>
   prev.map(automation =>
    automation.id === id ? { ...automation, status: newStatus } : automation
   )
  );
 };

 // Handle global automation state
 const toggleGlobalAutomation = () => {
  setIsAutomationRunning(!isAutomationRunning);
  setActiveAutomations(prev =>
   prev.map(automation => ({
    ...automation,
    status: !isAutomationRunning ? 'active' : 'paused',
   }))
  );
 };

 // Handle quick actions
 const handleQuickAction = (action: 'create' | 'start' | 'pause') => {
  switch (action) {
   case 'create':
    setShowNewWorkflowModal(true);
    break;
   case 'start':
    setIsAutomationRunning(true);
    setActiveAutomations(prev =>
     prev.map(automation => ({ ...automation, status: 'active' }))
    );
    break;
   case 'pause':
    setIsAutomationRunning(false);
    setActiveAutomations(prev =>
     prev.map(automation => ({ ...automation, status: 'paused' }))
    );
    break;
  }
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Automation</h1>
    <p className="mt-2 text-sm text-gray-700">
     Manage and monitor your automated workflows and tasks
    </p>

    {/* Quick Actions */}
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
     <button
      onClick={() => handleQuickAction('create')}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
     >
      <PlusIcon className="mx-auto h-8 w-8 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
       Create Workflow
      </span>
     </button>
     <button
      onClick={() => handleQuickAction('start')}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
     >
      <PlayIcon className="mx-auto h-8 w-8 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
       Start Automation
      </span>
     </button>
     <button
      onClick={() => handleQuickAction('pause')}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
     >
      <PauseIcon className="mx-auto h-8 w-8 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
       Pause Automation
      </span>
     </button>
    </div>

    {/* Project Features */}
    <div className="mt-8">
     <h2 className="text-lg font-medium text-gray-900">Automation Features</h2>
     <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {projectFeatures.map((feature) => (
       <Link
        key={feature.title}
        href={feature.href}
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
       >
        <feature.icon className="mx-auto h-8 w-8 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-900">
         {feature.title}
        </span>
        <span className="mt-1 block text-xs text-gray-500">
         {feature.description}
        </span>
       </Link>
      ))}
     </div>
    </div>

    {/* Active Automations */}
    <div className="mt-8">
     <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-gray-900">Active Automations</h2>
      <div className="flex items-center space-x-4">
       <span className="text-sm text-gray-500">
        Global Status: {isAutomationRunning ? 'Running' : 'Paused'}
       </span>
       <button
        onClick={toggleGlobalAutomation}
        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${isAutomationRunning
          ? 'text-red-700 bg-red-100 hover:bg-red-200'
          : 'text-green-700 bg-green-100 hover:bg-green-200'
         }`}
       >
        {isAutomationRunning ? (
         <>
          <PauseIcon className="h-4 w-4 mr-1" />
          Pause All
         </>
        ) : (
         <>
          <PlayIcon className="h-4 w-4 mr-1" />
          Start All
         </>
        )}
       </button>
      </div>
     </div>
     <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
       {activeAutomations.map((automation) => (
        <li key={automation.id}>
         <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
           <div className="flex items-center">
            <ArrowPathIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm font-medium text-indigo-600 truncate">
             {automation.name}
            </p>
           </div>
           <div className="ml-2 flex-shrink-0 flex space-x-2">
            {automation.status === 'active' ? (
             <button
              onClick={() => handleStatusChange(automation.id, 'paused')}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
              <PauseIcon className="h-4 w-4 mr-1" />
              Pause
             </button>
            ) : (
             <button
              onClick={() => handleStatusChange(automation.id, 'active')}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
             >
              <PlayIcon className="h-4 w-4 mr-1" />
              Resume
             </button>
            )}
           </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
           <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
             {automation.type}
            </p>
           </div>
           <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <p>Last Run: {automation.lastRun}</p>
            <span className="mx-2">•</span>
            <p>Next Run: {automation.nextRun}</p>
           </div>
          </div>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>

   {/* New Workflow Modal (to be implemented) */}
  </div>
 );
} 