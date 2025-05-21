import { headers } from 'next/headers';
import React from 'react';

export default async function ProfileSettingsPage() {
 const headersList = await headers();

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
   </div>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
     <div className="px-4 py-5 sm:p-6">
      <form className="space-y-6">
       <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
         Full Name
        </label>
        <input
         type="text"
         name="name"
         id="name"
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
       </div>

       <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
         Email
        </label>
        <input
         type="email"
         name="email"
         id="email"
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
       </div>

       <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
         Bio
        </label>
        <textarea
         id="bio"
         name="bio"
         rows={3}
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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