'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 DevicePhoneMobileIcon,
 ComputerDesktopIcon,
 GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function ActiveSessionsPage() {
 const [sessions, setSessions] = useState([
  {
   id: 1,
   device: 'iPhone 13',
   browser: 'Safari',
   location: 'New York, USA',
   lastActive: '2 minutes ago',
   ipAddress: '192.168.1.1',
   isCurrent: true,
  },
  {
   id: 2,
   device: 'MacBook Pro',
   browser: 'Chrome',
   location: 'New York, USA',
   lastActive: '1 hour ago',
   ipAddress: '192.168.1.2',
   isCurrent: false,
  },
  {
   id: 3,
   device: 'Windows PC',
   browser: 'Firefox',
   location: 'Boston, USA',
   lastActive: '3 days ago',
   ipAddress: '192.168.1.3',
   isCurrent: false,
  },
 ]);

 const handleTerminateSession = (sessionId: number) => {
  setSessions((prev) => prev.filter((session) => session.id !== sessionId));
 };

 const getDeviceIcon = (device: string) => {
  if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
   return <DevicePhoneMobileIcon className="h-5 w-5" />;
  } else if (device.toLowerCase().includes('mac') || device.toLowerCase().includes('windows')) {
   return <ComputerDesktopIcon className="h-5 w-5" />;
  }
  return <GlobeAltIcon className="h-5 w-5" />;
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Active Sessions"
     description="Manage devices that have access to your account"
    />
    <BackButton href="/dashboard/security" label="Back to Security" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <DevicePhoneMobileIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
        <p className="mt-1 text-sm text-gray-500">
         Manage devices that are currently logged into your account
        </p>
       </div>
      </div>
      <button
       onClick={() => {
        setSessions((prev) => prev.filter((session) => session.isCurrent));
       }}
       className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
       Terminate All Other Sessions
      </button>
     </div>

     <div className="space-y-4">
      {sessions.map((session) => (
       <div
        key={session.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
       >
        <div className="flex items-center space-x-4">
         <div className="p-2 bg-white rounded-lg">
          {getDeviceIcon(session.device)}
         </div>
         <div>
          <div className="flex items-center space-x-2">
           <h3 className="text-sm font-medium text-gray-900">
            {session.device}
           </h3>
           {session.isCurrent && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
             Current
            </span>
           )}
          </div>
          <p className="text-sm text-gray-500">{session.browser}</p>
          <div className="mt-1 text-xs text-gray-500">
           <p>{session.location}</p>
           <p>IP: {session.ipAddress}</p>
           <p>Last active: {session.lastActive}</p>
          </div>
         </div>
        </div>
        {!session.isCurrent && (
         <button
          onClick={() => handleTerminateSession(session.id)}
          className="text-sm text-red-600 hover:text-red-800"
         >
          Terminate
         </button>
        )}
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Security Notice */}
   <div className="bg-yellow-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <DevicePhoneMobileIcon className="h-5 w-5 text-yellow-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-yellow-800">
       Security Notice
      </h3>
      <div className="mt-2 text-sm text-yellow-700">
       <p>
        If you notice any suspicious activity or unrecognized devices, please
        terminate those sessions immediately and change your password.
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 