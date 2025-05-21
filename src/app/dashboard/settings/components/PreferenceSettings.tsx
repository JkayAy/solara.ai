'use client';

import React from 'react';
import { ToggleSwitch } from './ToggleSwitch';

export function PreferenceSettings() {
 const handleDarkMode = (value: boolean) => {
  console.log('Dark mode:', value);
  // Add your dark mode logic here
 };

 const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log('Language:', event.target.value);
  // Add your language change logic here
 };

 const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log('Timezone:', event.target.value);
  // Add your timezone change logic here
 };

 const handleDateFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log('Date format:', event.target.value);
  // Add your date format change logic here
 };

 return (
  <div className="space-y-6">
   <div>
    <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
    <div className="mt-4 space-y-4">
     <ToggleSwitch
      label="Dark Mode"
      description="Switch between light and dark themes"
      initialValue={false}
      onChange={handleDarkMode}
     />
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Language</h3>
    <div className="mt-4">
     <select
      id="language"
      name="language"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      defaultValue="en"
      onChange={handleLanguageChange}
     >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
     </select>
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Time Zone</h3>
    <div className="mt-4">
     <select
      id="timezone"
      name="timezone"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      defaultValue="UTC"
      onChange={handleTimezoneChange}
     >
      <option value="UTC">UTC</option>
      <option value="EST">Eastern Time</option>
      <option value="CST">Central Time</option>
      <option value="PST">Pacific Time</option>
     </select>
    </div>
   </div>

   <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900">Date Format</h3>
    <div className="mt-4">
     <select
      id="date-format"
      name="date-format"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      defaultValue="MM/DD/YYYY"
      onChange={handleDateFormatChange}
     >
      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
     </select>
    </div>
   </div>
  </div>
 );
} 