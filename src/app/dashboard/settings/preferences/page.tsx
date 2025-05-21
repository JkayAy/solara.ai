import { headers } from 'next/headers';
import React from 'react';
import { PreferenceSettings } from '../components/PreferenceSettings';

export default async function PreferencesPage() {
 const headersList = await headers();

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Preferences</h1>
   </div>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <PreferenceSettings />
     </div>
    </div>
   </div>
  </div>
 );
} 