'use client';

import React from 'react';
import { ArrowLeftIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ResourcesPage = () => {
 // Mock data - replace with real data in production
 const resources = [
  {
   id: 1,
   name: 'John Doe',
   role: 'Senior Developer',
   projects: ['Website Redesign', 'Mobile App Development'],
   utilization: 85,
   availability: 'Full-time',
   skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
   id: 2,
   name: 'Jane Smith',
   role: 'UX Designer',
   projects: ['Website Redesign', 'E-commerce Platform'],
   utilization: 75,
   availability: 'Full-time',
   skills: ['Figma', 'UI Design', 'User Research'],
  },
  {
   id: 3,
   name: 'Mike Johnson',
   role: 'Project Manager',
   projects: ['Mobile App Development', 'E-commerce Platform'],
   utilization: 90,
   availability: 'Full-time',
   skills: ['Agile', 'Scrum', 'Risk Management'],
  },
 ];

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center">
      <Link
       href="/dashboard/projects"
       className="mr-4 p-2 rounded-full hover:bg-gray-100"
      >
       <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Resource Management</h1>
     </div>
    </div>

    {/* Resource Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Total Resources
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Average Utilization
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">83%</dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Active Projects
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">5</dd>
      </div>
     </div>
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <dt className="text-sm font-medium text-gray-500 truncate">
        Available Capacity
       </dt>
       <dd className="mt-1 text-3xl font-semibold text-gray-900">17%</dd>
      </div>
     </div>
    </div>

    {/* Resource List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Team Resources
      </h3>
     </div>
     <ul role="list" className="divide-y divide-gray-200">
      {resources.map((resource) => (
       <li key={resource.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
           <div>
            <p className="text-sm font-medium text-indigo-600">
             {resource.name}
            </p>
            <p className="text-sm text-gray-500">{resource.role}</p>
           </div>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resource.utilization >= 90
              ? 'bg-red-100 text-red-800'
              : resource.utilization >= 75
               ? 'bg-yellow-100 text-yellow-800'
               : 'bg-green-100 text-green-800'
             }`}
           >
            {resource.utilization}% Utilized
           </p>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            Projects: {resource.projects.join(', ')}
           </p>
           <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
            Availability: {resource.availability}
           </p>
          </div>
         </div>
         <div className="mt-2">
          <div className="flex flex-wrap gap-2">
           {resource.skills.map((skill) => (
            <span
             key={skill}
             className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
             {skill}
            </span>
           ))}
          </div>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>

    {/* Resource Allocation Chart */}
    <div className="mt-6 bg-white shadow rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Resource Allocation
      </h3>
      <div className="mt-4">
       <div className="space-y-4">
        {resources.map((resource) => (
         <div key={resource.id}>
          <div className="flex justify-between text-sm mb-1">
           <span>{resource.name}</span>
           <span>{resource.utilization}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
           <div
            className={`h-2 rounded-full ${resource.utilization >= 90
              ? 'bg-red-500'
              : resource.utilization >= 75
               ? 'bg-yellow-500'
               : 'bg-green-500'
             }`}
            style={{ width: `${resource.utilization}%` }}
           />
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ResourcesPage; 