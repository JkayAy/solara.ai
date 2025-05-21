'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 ShieldCheckIcon,
 KeyIcon,
 DevicePhoneMobileIcon,
 ClockIcon,
 LockClosedIcon,
 UserGroupIcon,
} from '@heroicons/react/24/outline';

const securityFeatures = [
 {
  title: 'Two-Factor Authentication',
  description: 'Add an extra layer of security to your account',
  icon: ShieldCheckIcon,
  href: '/dashboard/security/2fa',
  status: 'Enabled',
  statusColor: 'text-green-600',
 },
 {
  title: 'Password Management',
  description: 'Update your password and security settings',
  icon: KeyIcon,
  href: '/dashboard/security/password',
  status: 'Last changed 30 days ago',
  statusColor: 'text-gray-600',
 },
 {
  title: 'Active Sessions',
  description: 'Manage devices that have access to your account',
  icon: DevicePhoneMobileIcon,
  href: '/dashboard/security/sessions',
  status: '3 active devices',
  statusColor: 'text-blue-600',
 },
 {
  title: 'Login History',
  description: 'View recent account activity and login attempts',
  icon: ClockIcon,
  href: '/dashboard/security/history',
  status: 'Last login 2 hours ago',
  statusColor: 'text-gray-600',
 },
 {
  title: 'Access Control',
  description: 'Manage permissions and access levels',
  icon: LockClosedIcon,
  href: '/dashboard/security/access',
  status: 'Standard access',
  statusColor: 'text-gray-600',
 },
 {
  title: 'Team Security',
  description: 'Manage team member access and permissions',
  icon: UserGroupIcon,
  href: '/dashboard/security/team',
  status: '5 team members',
  statusColor: 'text-gray-600',
 },
];

export default function SecurityManagementPage() {
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Security Management"
     description="Manage your account security and access controls"
    />
    <BackButton href="/dashboard" label="Back to Dashboard" />
   </div>

   {/* Quick Actions */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {securityFeatures.map((feature, index) => (
     <a
      key={index}
      href={feature.href}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
     >
      <div className="flex items-start space-x-4">
       <div className="p-2 bg-primary/10 rounded-lg">
        <feature.icon className="h-6 w-6 text-primary" />
       </div>
       <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
        <p className={`mt-2 text-sm font-medium ${feature.statusColor}`}>
         {feature.status}
        </p>
       </div>
      </div>
     </a>
    ))}
   </div>

   {/* Security Overview */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <h2 className="text-lg font-medium text-gray-900 mb-4">
      Security Overview
     </h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-green-50 rounded-lg">
       <div className="flex items-center space-x-2">
        <ShieldCheckIcon className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-green-600">
         Two-Factor Authentication
        </span>
       </div>
       <p className="mt-2 text-sm text-green-700">Enabled</p>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg">
       <div className="flex items-center space-x-2">
        <DevicePhoneMobileIcon className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-600">
         Active Sessions
        </span>
       </div>
       <p className="mt-2 text-sm text-blue-700">3 devices</p>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg">
       <div className="flex items-center space-x-2">
        <ClockIcon className="h-5 w-5 text-purple-600" />
        <span className="text-sm font-medium text-purple-600">
         Last Login
        </span>
       </div>
       <p className="mt-2 text-sm text-purple-700">2 hours ago</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg">
       <div className="flex items-center space-x-2">
        <KeyIcon className="h-5 w-5 text-yellow-600" />
        <span className="text-sm font-medium text-yellow-600">
         Password Age
        </span>
       </div>
       <p className="mt-2 text-sm text-yellow-700">30 days</p>
      </div>
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