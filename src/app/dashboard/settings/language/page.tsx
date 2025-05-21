import { headers } from 'next/headers';
import React from 'react';

const languages = [
 { code: 'en', name: 'English' },
 { code: 'es', name: 'Spanish' },
 { code: 'fr', name: 'French' },
 { code: 'de', name: 'German' },
 { code: 'zh', name: 'Chinese' },
];

const regions = [
 { code: 'US', name: 'United States' },
 { code: 'GB', name: 'United Kingdom' },
 { code: 'CA', name: 'Canada' },
 { code: 'AU', name: 'Australia' },
 { code: 'EU', name: 'European Union' },
];

export default async function LanguagePage() {
 const headersList = await headers();

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Language & Region</h1>
   </div>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <form className="space-y-6">
       <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
         Language
        </label>
        <select
         id="language"
         name="language"
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
         {languages.map((language) => (
          <option key={language.code} value={language.code}>
           {language.name}
          </option>
         ))}
        </select>
       </div>

       <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
         Region
        </label>
        <select
         id="region"
         name="region"
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
         {regions.map((region) => (
          <option key={region.code} value={region.code}>
           {region.name}
          </option>
         ))}
        </select>
       </div>

       <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
         Timezone
        </label>
        <select
         id="timezone"
         name="timezone"
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
         <option value="UTC">UTC</option>
         <option value="EST">Eastern Time (ET)</option>
         <option value="CST">Central Time (CT)</option>
         <option value="MST">Mountain Time (MT)</option>
         <option value="PST">Pacific Time (PT)</option>
        </select>
       </div>

       <div className="flex justify-end">
        <button
         type="submit"
         className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
         Save Changes
        </button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </div>
 );
} 