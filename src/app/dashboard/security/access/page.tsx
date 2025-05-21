'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 LockClosedIcon,
 ShieldCheckIcon,
 UserGroupIcon,
 DocumentIcon,
 PlusIcon,
 ChartBarIcon,
 ClockIcon,
 ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function AccessControlPage() {
 const [accessLevels, setAccessLevels] = useState([
  {
   id: 1,
   name: 'Admin',
   description: 'Full access to all features and settings',
   permissions: [
    'Manage users and roles',
    'Configure system settings',
    'Access all documents',
    'Manage security settings',
   ],
   userCount: 5,
   lastModified: '2024-03-15T10:00:00',
  },
  {
   id: 2,
   name: 'Editor',
   description: 'Can create and edit documents',
   permissions: [
    'Create and edit documents',
    'Share documents',
    'Manage document categories',
    'View analytics',
   ],
   userCount: 12,
   lastModified: '2024-03-15T09:30:00',
  },
  {
   id: 3,
   name: 'Viewer',
   description: 'Can only view documents',
   permissions: [
    'View documents',
    'Download documents',
    'Comment on documents',
    'View basic analytics',
   ],
   userCount: 25,
   lastModified: '2024-03-15T09:00:00',
  },
 ]);

 const [resourceAccess, setResourceAccess] = useState([
  {
   id: 1,
   resource: 'Documents',
   icon: DocumentIcon,
   accessLevel: 'Full Access',
   lastModified: '2024-03-15T10:00:00',
   userCount: 42,
   status: 'active',
  },
  {
   id: 2,
   resource: 'Team Members',
   icon: UserGroupIcon,
   accessLevel: 'Full Access',
   lastModified: '2024-03-15T09:30:00',
   userCount: 15,
   status: 'active',
  },
  {
   id: 3,
   resource: 'Security Settings',
   icon: ShieldCheckIcon,
   accessLevel: 'Full Access',
   lastModified: '2024-03-15T09:00:00',
   userCount: 8,
   status: 'restricted',
  },
 ]);

 const [accessLogs, setAccessLogs] = useState([
  {
   id: 1,
   user: 'John Doe',
   action: 'Modified access level',
   resource: 'Documents',
   timestamp: '2024-03-15T14:30:00',
   status: 'success',
  },
  {
   id: 2,
   user: 'Jane Smith',
   action: 'Granted access',
   resource: 'Team Members',
   timestamp: '2024-03-15T13:15:00',
   status: 'success',
  },
  {
   id: 3,
   user: 'Mike Johnson',
   action: 'Attempted unauthorized access',
   resource: 'Security Settings',
   timestamp: '2024-03-15T12:00:00',
   status: 'failed',
  },
 ]);

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
 };

 const getStatusColor = (status: string) => {
  switch (status) {
   case 'success':
    return 'text-green-700 bg-green-50';
   case 'failed':
    return 'text-red-700 bg-red-50';
   case 'restricted':
    return 'text-yellow-700 bg-yellow-50';
   default:
    return 'text-gray-700 bg-gray-50';
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Access Control"
     description="Manage permissions and access levels"
    />
    <div className="flex items-center space-x-4">
     <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
      <PlusIcon className="h-5 w-5 mr-2" />
      New Access Level
     </button>
     <BackButton href="/dashboard/security" label="Back to Security" />
    </div>
   </div>

   {/* Quick Stats */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="bg-white rounded-lg shadow-sm p-4">
     <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-lg">
       <UserGroupIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Total Users</p>
       <p className="text-2xl font-semibold text-gray-900">42</p>
      </div>
     </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-4">
     <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-lg">
       <LockClosedIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Access Levels</p>
       <p className="text-2xl font-semibold text-gray-900">3</p>
      </div>
     </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-4">
     <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-lg">
       <DocumentIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Resources</p>
       <p className="text-2xl font-semibold text-gray-900">3</p>
      </div>
     </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-4">
     <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ChartBarIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Active Sessions</p>
       <p className="text-2xl font-semibold text-gray-900">28</p>
      </div>
     </div>
    </div>
   </div>

   {/* Access Levels */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <LockClosedIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">Access Levels</h2>
        <p className="mt-1 text-sm text-gray-500">
         Define and manage different access levels
        </p>
       </div>
      </div>
      <div className="flex items-center space-x-2">
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        <ChartBarIcon className="h-4 w-4 mr-1" />
        Analytics
       </button>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        <ClockIcon className="h-4 w-4 mr-1" />
        History
       </button>
      </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {accessLevels.map((level) => (
       <div
        key={level.id}
        className="p-4 bg-gray-50 rounded-lg"
       >
        <div className="flex items-center justify-between">
         <h3 className="text-sm font-medium text-gray-900">{level.name}</h3>
         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {level.userCount} users
         </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{level.description}</p>
        <div className="mt-4">
         <h4 className="text-xs font-medium text-gray-700 mb-2">
          Permissions:
         </h4>
         <ul className="space-y-2">
          {level.permissions.map((permission, index) => (
           <li
            key={index}
            className="flex items-start space-x-2 text-sm text-gray-600"
           >
            <span className="mt-1">•</span>
            <span>{permission}</span>
           </li>
          ))}
         </ul>
        </div>
        <div className="mt-4 flex items-center justify-between">
         <span className="text-xs text-gray-500">
          Last modified: {formatDate(level.lastModified)}
         </span>
         <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Edit
         </button>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Resource Access */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <ShieldCheckIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">Resource Access</h2>
        <p className="mt-1 text-sm text-gray-500">
         Manage access to different resources
        </p>
       </div>
      </div>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
       <PlusIcon className="h-5 w-5 mr-2" />
       Add Resource
      </button>
     </div>

     <div className="space-y-4">
      {resourceAccess.map((resource) => (
       <div
        key={resource.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
       >
        <div className="flex items-center space-x-4">
         <div className="p-2 bg-white rounded-lg">
          <resource.icon className="h-5 w-5 text-gray-600" />
         </div>
         <div>
          <div className="flex items-center space-x-2">
           <h3 className="text-sm font-medium text-gray-900">
            {resource.resource}
           </h3>
           <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
             resource.status
            )}`}
           >
            {resource.status}
           </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
           <p>Access Level: {resource.accessLevel}</p>
           <p>Users: {resource.userCount}</p>
           <p>Last Modified: {formatDate(resource.lastModified)}</p>
          </div>
         </div>
        </div>
        <div className="flex items-center space-x-2">
         <button className="text-sm text-primary hover:text-primary-dark">
          Manage Access
         </button>
         <button className="text-sm text-gray-500 hover:text-gray-700">
          View Details
         </button>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Recent Activity */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <ClockIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <p className="mt-1 text-sm text-gray-500">
         Monitor access control changes and activities
        </p>
       </div>
      </div>
      <button className="text-sm text-primary hover:text-primary-dark">
       View All Activity
      </button>
     </div>

     <div className="space-y-4">
      {accessLogs.map((log) => (
       <div
        key={log.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
       >
        <div className="flex items-center space-x-4">
         <div
          className={`p-2 rounded-lg ${log.status === 'success'
            ? 'bg-green-100'
            : log.status === 'failed'
             ? 'bg-red-100'
             : 'bg-gray-100'
           }`}
         >
          <ExclamationTriangleIcon
           className={`h-5 w-5 ${log.status === 'success'
             ? 'text-green-600'
             : log.status === 'failed'
              ? 'text-red-600'
              : 'text-gray-600'
            }`}
          />
         </div>
         <div>
          <p className="text-sm font-medium text-gray-900">{log.user}</p>
          <p className="text-sm text-gray-500">
           {log.action} - {log.resource}
          </p>
         </div>
        </div>
        <div className="text-sm text-gray-500">
         {formatDate(log.timestamp)}
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Security Notice */}
   <div className="bg-blue-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-blue-800">
       Access Control Best Practices
      </h3>
      <div className="mt-2 text-sm text-blue-700">
       <ul className="list-disc pl-5 space-y-1">
        <li>Follow the principle of least privilege</li>
        <li>Regularly review and update access levels</li>
        <li>Document all permission changes</li>
        <li>Implement role-based access control (RBAC)</li>
        <li>Monitor access patterns for suspicious activity</li>
        <li>Conduct regular security audits</li>
        <li>Maintain detailed access logs</li>
        <li>Implement automated access reviews</li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 