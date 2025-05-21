'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { DocumentIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { mockDocuments } from '@/lib/mock-data';

export default function RecentFilesPage() {
 // Sort documents by lastModified date
 const recentDocuments = [...mockDocuments]
  .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
  .slice(0, 10);

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Recent Files"
     description="Quickly access your recently modified files"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   {/* Recent Files List */}
   <div className="bg-white rounded-lg shadow-sm">
    {recentDocuments.map((doc, index) => (
     <div
      key={doc.id}
      className={`p-4 hover:bg-gray-50 transition-colors ${index !== recentDocuments.length - 1 ? 'border-b border-gray-200' : ''
       }`}
     >
      <div className="flex items-center justify-between">
       <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-lg">
         <DocumentIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
         <h3 className="font-medium text-gray-900 hover:text-primary transition-colors cursor-pointer">
          {doc.title}
         </h3>
         <div className="flex items-center space-x-4 mt-1">
          <div className="flex items-center text-sm text-gray-500">
           <ClockIcon className="h-4 w-4 mr-1" />
           <span>
            {new Date(doc.lastModified).toLocaleDateString('en-US', {
             month: 'short',
             day: 'numeric',
             hour: '2-digit',
             minute: '2-digit',
            })}
           </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
           <UserIcon className="h-4 w-4 mr-1" />
           <span>{doc.owner}</span>
          </div>
         </div>
        </div>
       </div>
       <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">{doc.size}</span>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
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
           d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
         </svg>
        </button>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
} 