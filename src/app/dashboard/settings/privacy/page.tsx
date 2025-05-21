'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { ShieldCheckIcon, EyeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function PrivacySettingsPage() {
 const [privacySettings, setPrivacySettings] = useState({
  profileVisibility: 'public',
  activityStatus: true,
  emailNotifications: true,
  dataCollection: true,
  locationSharing: false,
 });

 const handleToggle = (setting: keyof typeof privacySettings) => {
  setPrivacySettings((prev) => ({
   ...prev,
   [setting]: !prev[setting],
  }));
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Privacy Settings"
     description="Control your privacy preferences and data sharing"
    />
    <BackButton href="/dashboard/settings" label="Back to Settings" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Profile Privacy */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <EyeIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Profile Privacy</h2>
       <p className="mt-1 text-sm text-gray-500">
        Control who can see your profile information
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="profileVisibility"
        className="block text-sm font-medium text-gray-700 mb-2"
       >
        Profile Visibility
       </label>
       <select
        id="profileVisibility"
        value={privacySettings.profileVisibility}
        onChange={(e) =>
         setPrivacySettings((prev) => ({
          ...prev,
          profileVisibility: e.target.value,
         }))
        }
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="connections">Connections Only</option>
       </select>
      </div>

      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Activity Status</h3>
        <p className="text-sm text-gray-500">
         Show when you're active on the platform
        </p>
       </div>
       <button
        onClick={() => handleToggle('activityStatus')}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${privacySettings.activityStatus ? 'bg-primary' : 'bg-gray-200'
         }`}
       >
        <span
         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${privacySettings.activityStatus ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
       </button>
      </div>
     </div>
    </div>

    {/* Data Collection */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ShieldCheckIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Data Collection</h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage how your data is collected and used
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">
         Email Notifications
        </h3>
        <p className="text-sm text-gray-500">
         Receive email updates about your account
        </p>
       </div>
       <button
        onClick={() => handleToggle('emailNotifications')}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${privacySettings.emailNotifications ? 'bg-primary' : 'bg-gray-200'
         }`}
       >
        <span
         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${privacySettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
       </button>
      </div>

      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Data Collection</h3>
        <p className="text-sm text-gray-500">
         Allow us to collect usage data to improve our services
        </p>
       </div>
       <button
        onClick={() => handleToggle('dataCollection')}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${privacySettings.dataCollection ? 'bg-primary' : 'bg-gray-200'
         }`}
       >
        <span
         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${privacySettings.dataCollection ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
       </button>
      </div>
     </div>
    </div>

    {/* Location Settings */}
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <GlobeAltIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Location Settings</h2>
       <p className="mt-1 text-sm text-gray-500">
        Control how your location data is used
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Location Sharing</h3>
        <p className="text-sm text-gray-500">
         Allow location-based features and services
        </p>
       </div>
       <button
        onClick={() => handleToggle('locationSharing')}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${privacySettings.locationSharing ? 'bg-primary' : 'bg-gray-200'
         }`}
       >
        <span
         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${privacySettings.locationSharing ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
       </button>
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