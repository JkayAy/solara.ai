'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 ShieldCheckIcon,
 KeyIcon,
 DevicePhoneMobileIcon,
 ClockIcon,
} from '@heroicons/react/24/outline';

export default function SecuritySettingsPage() {
 const [securitySettings, setSecuritySettings] = useState({
  passwordLastChanged: '2024-03-15',
  twoFactorEnabled: true,
  activeDevices: 3,
  loginHistory: [
   {
    device: 'Chrome on Windows',
    location: 'New York, USA',
    time: '2024-03-20T10:30:00Z',
    status: 'success',
   },
   {
    device: 'Safari on iPhone',
    location: 'New York, USA',
    time: '2024-03-19T15:45:00Z',
    status: 'success',
   },
   {
    device: 'Firefox on Mac',
    location: 'New York, USA',
    time: '2024-03-18T09:15:00Z',
    status: 'success',
   },
  ],
 });

 const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
  });
 };

 const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
   hour: '2-digit',
   minute: '2-digit',
  });
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Security Settings"
     description="Manage your account security and access"
    />
    <BackButton href="/dashboard/settings" label="Back to Settings" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Password Security */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <KeyIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Password Security</h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage your password and security settings
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Password</h3>
        <p className="text-sm text-gray-500">
         Last changed on {formatDate(securitySettings.passwordLastChanged)}
        </p>
       </div>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        Change Password
       </button>
      </div>

      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">
         Two-Factor Authentication
        </h3>
        <p className="text-sm text-gray-500">
         {securitySettings.twoFactorEnabled
          ? 'Enabled - Provides an extra layer of security'
          : 'Disabled - Enable for additional security'}
        </p>
       </div>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        {securitySettings.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
       </button>
      </div>
     </div>
    </div>

    {/* Active Devices */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <DevicePhoneMobileIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Active Devices</h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage devices that have access to your account
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Active Sessions</h3>
        <p className="text-sm text-gray-500">
         {securitySettings.activeDevices} devices currently active
        </p>
       </div>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        View All Devices
       </button>
      </div>
     </div>
    </div>

    {/* Login History */}
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ClockIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Login History</h2>
       <p className="mt-1 text-sm text-gray-500">
        Recent account activity and login attempts
       </p>
      </div>
     </div>

     <div className="space-y-4">
      {securitySettings.loginHistory.map((login, index) => (
       <div
        key={index}
        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
       >
        <div className="flex items-center space-x-3">
         <div
          className={`w-2 h-2 rounded-full ${login.status === 'success' ? 'bg-green-500' : 'bg-red-500'
           }`}
         />
         <div>
          <p className="text-sm font-medium text-gray-900">{login.device}</p>
          <p className="text-sm text-gray-500">
           {login.location} • {formatTime(login.time)}
          </p>
         </div>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700">
         Details
        </button>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Security Recommendations */}
   <div className="bg-blue-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-blue-800">
       Security Recommendations
      </h3>
      <div className="mt-2 text-sm text-blue-700">
       <ul className="list-disc pl-5 space-y-1">
        <li>Enable two-factor authentication for additional security</li>
        <li>Use a strong, unique password</li>
        <li>Review and remove any unrecognized devices</li>
        <li>Keep your contact information up to date</li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 