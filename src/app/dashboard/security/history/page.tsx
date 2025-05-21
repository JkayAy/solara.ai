'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 ClockIcon,
 CheckCircleIcon,
 XCircleIcon,
 ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function LoginHistoryPage() {
 const [loginHistory, setLoginHistory] = useState([
  {
   id: 1,
   timestamp: '2024-03-15T14:30:00',
   device: 'iPhone 13',
   location: 'New York, USA',
   ipAddress: '192.168.1.1',
   status: 'success',
   browser: 'Safari',
  },
  {
   id: 2,
   timestamp: '2024-03-15T13:15:00',
   device: 'MacBook Pro',
   location: 'New York, USA',
   ipAddress: '192.168.1.2',
   status: 'success',
   browser: 'Chrome',
  },
  {
   id: 3,
   timestamp: '2024-03-15T12:00:00',
   device: 'Unknown',
   location: 'Unknown',
   ipAddress: '192.168.1.3',
   status: 'failed',
   browser: 'Unknown',
  },
  {
   id: 4,
   timestamp: '2024-03-14T18:45:00',
   device: 'Windows PC',
   location: 'Boston, USA',
   ipAddress: '192.168.1.4',
   status: 'success',
   browser: 'Firefox',
  },
  {
   id: 5,
   timestamp: '2024-03-14T15:20:00',
   device: 'Unknown',
   location: 'Unknown',
   ipAddress: '192.168.1.5',
   status: 'suspicious',
   browser: 'Unknown',
  },
 ]);

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
 };

 const getStatusIcon = (status: string) => {
  switch (status) {
   case 'success':
    return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
   case 'failed':
    return <XCircleIcon className="h-5 w-5 text-red-500" />;
   case 'suspicious':
    return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
   default:
    return null;
  }
 };

 const getStatusText = (status: string) => {
  switch (status) {
   case 'success':
    return 'Successful';
   case 'failed':
    return 'Failed';
   case 'suspicious':
    return 'Suspicious';
   default:
    return status;
  }
 };

 const getStatusColor = (status: string) => {
  switch (status) {
   case 'success':
    return 'text-green-700 bg-green-50';
   case 'failed':
    return 'text-red-700 bg-red-50';
   case 'suspicious':
    return 'text-yellow-700 bg-yellow-50';
   default:
    return 'text-gray-700 bg-gray-50';
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Login History"
     description="View recent account activity and login attempts"
    />
    <BackButton href="/dashboard/security" label="Back to Security" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ClockIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Login History</h2>
       <p className="mt-1 text-sm text-gray-500">
        Recent login attempts and account activity
       </p>
      </div>
     </div>

     <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
         >
          Time
         </th>
         <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
         >
          Device
         </th>
         <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
         >
          Location
         </th>
         <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
         >
          IP Address
         </th>
         <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
         >
          Status
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {loginHistory.map((login) => (
         <tr key={login.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {formatDate(login.timestamp)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="text-sm text-gray-900">{login.device}</div>
           <div className="text-sm text-gray-500">{login.browser}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {login.location}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {login.ipAddress}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="flex items-center space-x-2">
            {getStatusIcon(login.status)}
            <span
             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              login.status
             )}`}
            >
             {getStatusText(login.status)}
            </span>
           </div>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>
   </div>

   {/* Security Notice */}
   <div className="bg-yellow-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-yellow-800">
       Security Notice
      </h3>
      <div className="mt-2 text-sm text-yellow-700">
       <p>
        If you notice any suspicious login attempts or unrecognized activity,
        please change your password immediately and enable two-factor
        authentication.
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 