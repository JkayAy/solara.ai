'use client';

import React, { useState } from 'react';
import { PlusIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';

interface Task {
 id: number;
 title: string;
 project: string;
 assignee: string;
 dueDate: string;
 status: 'Not Started' | 'In Progress' | 'Completed';
 priority: 'High' | 'Medium' | 'Low';
 timeSpent: string;
 timeEstimate: string;
}

const TasksPage = () => {
 const [tasks, setTasks] = useState<Task[]>([
  {
   id: 1,
   title: 'Design System Implementation',
   project: 'Website Redesign',
   assignee: 'John Doe',
   dueDate: '2024-03-15',
   status: 'In Progress',
   priority: 'High',
   timeSpent: '12h',
   timeEstimate: '20h',
  },
  {
   id: 2,
   title: 'API Integration',
   project: 'Mobile App Development',
   assignee: 'Jane Smith',
   dueDate: '2024-03-20',
   status: 'Not Started',
   priority: 'Medium',
   timeSpent: '0h',
   timeEstimate: '15h',
  },
  {
   id: 3,
   title: 'User Testing',
   project: 'E-commerce Platform',
   assignee: 'Mike Johnson',
   dueDate: '2024-03-25',
   status: 'Completed',
   priority: 'Low',
   timeSpent: '8h',
   timeEstimate: '8h',
  },
 ]);

 const [filters, setFilters] = useState({
  project: 'All Projects',
  status: 'All Status',
  priority: 'All Priority',
 });

 const handleFilterChange = (key: keyof typeof filters, value: string) => {
  setFilters(prev => ({ ...prev, [key]: value }));
 };

 const filteredTasks = tasks.filter(task => {
  if (filters.project !== 'All Projects' && task.project !== filters.project) return false;
  if (filters.status !== 'All Status' && task.status !== filters.status) return false;
  if (filters.priority !== 'All Priority' && task.priority !== filters.priority) return false;
  return true;
 });

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <PageHeader title="Task Management" backHref="/dashboard/projects">
     <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Task
     </button>
    </PageHeader>

    {/* Task Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Total Tasks"
      value={tasks.length}
      icon={CheckCircleIcon}
     />
     <MetricsCard
      title="In Progress"
      value={tasks.filter(t => t.status === 'In Progress').length}
      icon={ClockIcon}
     />
     <MetricsCard
      title="Completed"
      value={tasks.filter(t => t.status === 'Completed').length}
      icon={CheckCircleIcon}
     />
     <MetricsCard
      title="Overdue"
      value={tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length}
      icon={ClockIcon}
     />
    </div>

    {/* Task Filters */}
    <div className="mb-6 flex flex-wrap gap-4">
     <select
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      value={filters.project}
      onChange={(e) => handleFilterChange('project', e.target.value)}
     >
      <option>All Projects</option>
      <option>Website Redesign</option>
      <option>Mobile App Development</option>
      <option>E-commerce Platform</option>
     </select>
     <select
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      value={filters.status}
      onChange={(e) => handleFilterChange('status', e.target.value)}
     >
      <option>All Status</option>
      <option>Not Started</option>
      <option>In Progress</option>
      <option>Completed</option>
     </select>
     <select
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      value={filters.priority}
      onChange={(e) => handleFilterChange('priority', e.target.value)}
     >
      <option>All Priority</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
     </select>
    </div>

    {/* Tasks List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <ul role="list" className="divide-y divide-gray-200">
      {filteredTasks.map((task) => (
       <li key={task.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <CheckCircleIcon
            className={`h-5 w-5 mr-2 ${task.status === 'Completed'
              ? 'text-green-500'
              : 'text-gray-300'
             }`}
           />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {task.title}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : task.status === 'In Progress'
               ? 'bg-yellow-100 text-yellow-800'
               : 'bg-gray-100 text-gray-800'
             }`}
           >
            {task.status}
           </p>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            Project: {task.project}
           </p>
           <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
            Assignee: {task.assignee}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
           <p>
            {task.timeSpent} / {task.timeEstimate}
           </p>
          </div>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default TasksPage; 