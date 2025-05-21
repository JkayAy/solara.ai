'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 UserCircleIcon,
 EnvelopeIcon,
 PhoneIcon,
 GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function AccountSettingsPage() {
 const [accountSettings, setAccountSettings] = useState({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  language: 'en',
  timezone: 'America/New_York',
  bio: 'Software engineer and tech enthusiast',
  website: 'https://johndoe.com',
 });

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => {
  const { name, value } = e.target;
  setAccountSettings((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Account Settings"
     description="Manage your account information and preferences"
    />
    <BackButton href="/dashboard/settings" label="Back to Settings" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Profile Information */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <UserCircleIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
       <p className="mt-1 text-sm text-gray-500">
        Update your personal information and profile details
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Full Name
       </label>
       <input
        type="text"
        id="name"
        name="name"
        value={accountSettings.name}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>

      <div>
       <label
        htmlFor="bio"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Bio
       </label>
       <textarea
        id="bio"
        name="bio"
        rows={3}
        value={accountSettings.bio}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>

      <div>
       <label
        htmlFor="website"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Website
       </label>
       <input
        type="url"
        id="website"
        name="website"
        value={accountSettings.website}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>
     </div>
    </div>

    {/* Contact Information */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <EnvelopeIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
       <p className="mt-1 text-sm text-gray-500">
        Update your contact details and communication preferences
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Email Address
       </label>
       <input
        type="email"
        id="email"
        name="email"
        value={accountSettings.email}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>

      <div>
       <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Phone Number
       </label>
       <input
        type="tel"
        id="phone"
        name="phone"
        value={accountSettings.phone}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>
     </div>
    </div>

    {/* Preferences */}
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <GlobeAltIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
       <p className="mt-1 text-sm text-gray-500">
        Set your language and timezone preferences
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="language"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Language
       </label>
       <select
        id="language"
        name="language"
        value={accountSettings.language}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
       </select>
      </div>

      <div>
       <label
        htmlFor="timezone"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Timezone
       </label>
       <select
        id="timezone"
        name="timezone"
        value={accountSettings.timezone}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       >
        <option value="America/New_York">Eastern Time (ET)</option>
        <option value="America/Chicago">Central Time (CT)</option>
        <option value="America/Denver">Mountain Time (MT)</option>
        <option value="America/Los_Angeles">Pacific Time (PT)</option>
       </select>
      </div>
     </div>
    </div>
   </div>

   {/* Save Changes Button */}
   <div className="flex justify-end">
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
     Save Changes
    </button>
   </div>
  </div>
 );
} 