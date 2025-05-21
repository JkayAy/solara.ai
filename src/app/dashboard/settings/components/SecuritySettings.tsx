'use client';

import React from 'react';
import { ToggleSwitch } from './ToggleSwitch';

export function SecuritySettings() {
 const handle2FA = (value: boolean) => {
  console.log('2FA:', value);
  // Add your 2FA logic here
 };

 return (
  <div className="space-y-6">
   <div>
    <h3 className="text-lg font-medium text-gray-900">Password</h3>
    <div className="mt-4">
     <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      Change Password
     </button>
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
    <div className="mt-4">
     <ToggleSwitch
      label="Enable 2FA"
      description="Add an extra layer of security to your account"
      initialValue={false}
      onChange={handle2FA}
     />
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Login History</h3>
    <div className="mt-4">
     <div className="bg-gray-50 px-4 py-5 sm:rounded-lg">
      <p className="text-sm text-gray-500">Last login: 2 hours ago from 192.168.1.1</p>
     </div>
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
    <div className="mt-4">
     <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      View Active Sessions
     </button>
    </div>
   </div>
  </div>
 );
} 