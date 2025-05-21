'use client';

import { ToggleSwitch } from './ToggleSwitch';

export function QuickSettings() {
 const handleEmailNotifications = (value: boolean) => {
  console.log('Email notifications:', value);
  // Add your email notification logic here
 };

 const handleTwoFactor = (value: boolean) => {
  console.log('2FA:', value);
  // Add your 2FA logic here
 };

 const handleDarkMode = (value: boolean) => {
  console.log('Dark mode:', value);
  // Add your dark mode logic here
 };

 return (
  <div className="mt-8">
   <h2 className="text-lg font-medium text-gray-900">Quick Settings</h2>
   <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:p-6">
     <div className="space-y-4">
      <ToggleSwitch
       label="Email Notifications"
       description="Receive email updates about your account"
       initialValue={true}
       onChange={handleEmailNotifications}
      />

      <ToggleSwitch
       label="Two-Factor Authentication"
       description="Add an extra layer of security to your account"
       initialValue={false}
       onChange={handleTwoFactor}
      />

      <ToggleSwitch
       label="Dark Mode"
       description="Switch between light and dark themes"
       initialValue={false}
       onChange={handleDarkMode}
      />
     </div>
    </div>
   </div>
  </div>
 );
} 