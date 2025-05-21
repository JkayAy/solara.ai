'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { DocumentIcon, UserIcon, ShareIcon } from '@heroicons/react/24/outline';
import { mockDocuments } from '@/lib/mock-data';

export default function SharedDocumentsPage() {
 // Filter shared documents
 const sharedDocuments = mockDocuments.filter(doc => doc.shared);

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Shared with Me"
     description="Access documents that have been shared with you"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   {/* Shared Documents List */}
   <div className="bg-white rounded-lg shadow-sm">
    {sharedDocuments.length > 0 ? (
     sharedDocuments.map((doc, index) => (
      <div
       key={doc.id}
       className={`p-4 hover:bg-gray-50 transition-colors ${index !== sharedDocuments.length - 1 ? 'border-b border-gray-200' : ''
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
            <UserIcon className="h-4 w-4 mr-1" />
            <span>Shared by {doc.owner}</span>
           </div>
           <div className="flex items-center text-sm text-gray-500">
            <ShareIcon className="h-4 w-4 mr-1" />
            <span>{doc.shared}</span>
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
     ))
    ) : (
     <div className="p-8 text-center">
      <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No shared documents</h3>
      <p className="text-gray-500">Documents shared with you will appear here</p>
     </div>
    )}
   </div>
  </div>
 );
} 