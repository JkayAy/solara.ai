'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 UserIcon,
 BellIcon,
 LockClosedIcon,
 GlobeAltIcon,
 CreditCardIcon,
 ShieldCheckIcon,
 DevicePhoneMobileIcon,
 KeyIcon,
} from '@heroicons/react/24/outline';

const settingsSections = [
 {
  title: 'Account Settings',
  description: 'Manage your account preferences and personal information',
  icon: UserIcon,
  items: [
   {
    title: 'Profile Information',
    description: 'Update your personal details and profile picture',
    href: '/dashboard/settings/profile',
    icon: UserIcon,
   },
   {
    title: 'Security Settings',
    description: 'Manage your password and security preferences',
    href: '/dashboard/settings/security',
    icon: LockClosedIcon,
   },
   {
    title: 'Notification Preferences',
    description: 'Configure how you receive notifications',
    href: '/dashboard/settings/notifications',
    icon: BellIcon,
   },
  ],
 },
 {
  title: 'Workspace Settings',
  description: 'Customize your workspace and team preferences',
  icon: GlobeAltIcon,
  items: [
   {
    title: 'Team Management',
    description: 'Manage team members and roles',
    href: '/dashboard/settings/team',
    icon: UserIcon,
   },
   {
    title: 'Workspace Preferences',
    description: 'Customize your workspace appearance and behavior',
    href: '/dashboard/settings/workspace',
    icon: GlobeAltIcon,
   },
   {
    title: 'API Keys',
    description: 'Manage your API keys and integrations',
    href: '/dashboard/settings/api-keys',
    icon: KeyIcon,
   },
  ],
 },
 {
  title: 'Billing & Subscription',
  description: 'Manage your subscription and billing information',
  icon: CreditCardIcon,
  items: [
   {
    title: 'Subscription Plan',
    description: 'View and manage your current subscription',
    href: '/dashboard/settings/subscription',
    icon: CreditCardIcon,
   },
   {
    title: 'Payment Methods',
    description: 'Manage your payment methods and billing history',
    href: '/dashboard/settings/payments',
    icon: CreditCardIcon,
   },
   {
    title: 'Invoices',
    description: 'View and download your invoices',
    href: '/dashboard/settings/invoices',
    icon: CreditCardIcon,
   },
  ],
 },
 {
  title: 'Security & Privacy',
  description: 'Manage your security settings and privacy preferences',
  icon: ShieldCheckIcon,
  items: [
   {
    title: 'Two-Factor Authentication',
    description: 'Enhance your account security with 2FA',
    href: '/dashboard/settings/2fa',
    icon: ShieldCheckIcon,
   },
   {
    title: 'Privacy Settings',
    description: 'Control your privacy preferences',
    href: '/dashboard/settings/privacy',
    icon: ShieldCheckIcon,
   },
   {
    title: 'Connected Devices',
    description: 'Manage your connected devices and sessions',
    href: '/dashboard/settings/devices',
    icon: DevicePhoneMobileIcon,
   },
  ],
 },
];

export default function SettingsPage() {
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Settings"
     description="Manage your account settings and preferences"
    />
    <BackButton href="/dashboard" label="Back to Dashboard" />
   </div>

   <div className="grid grid-cols-1 gap-6">
    {settingsSections.map((section) => (
     <div
      key={section.title}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
     >
      <div className="p-6 border-b border-gray-200">
       <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
         <section.icon className="h-6 w-6 text-primary" />
        </div>
        <div>
         <h2 className="text-lg font-medium text-gray-900">
          {section.title}
         </h2>
         <p className="mt-1 text-sm text-gray-500">
          {section.description}
         </p>
        </div>
       </div>
      </div>

      <div className="divide-y divide-gray-200">
       {section.items.map((item) => (
        <a
         key={item.title}
         href={item.href}
         className="block p-6 hover:bg-gray-50 transition-colors"
        >
         <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
           <div className="p-2 bg-gray-50 rounded-lg">
            <item.icon className="h-5 w-5 text-gray-500" />
           </div>
           <div>
            <h3 className="text-sm font-medium text-gray-900">
             {item.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
             {item.description}
            </p>
           </div>
          </div>
          <svg
           className="h-5 w-5 text-gray-400"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
          >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
           />
          </svg>
         </div>
        </a>
       ))}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
} 