'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { DocumentIcon, FolderIcon, TagIcon } from '@heroicons/react/24/outline';
import { mockDocuments } from '@/lib/mock-data';

export default function AllDocumentsPage() {
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="All Documents"
     description="Browse and manage all your documents"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   {/* Filters */}
   <div className="flex flex-wrap gap-4 mb-6">
    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
     All Types
    </button>
    <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
     Documents
    </button>
    <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
     Spreadsheets
    </button>
    <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
     Presentations
    </button>
   </div>

   {/* Document List */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {mockDocuments.map((doc) => (
     <div
      key={doc.id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 group"
     >
      <div className="flex items-start justify-between">
       <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
         <DocumentIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
         <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
          {doc.title}
         </h3>
         <p className="text-sm text-gray-500">{doc.type}</p>
        </div>
       </div>
       <button className="text-gray-400 hover:text-gray-600 transition-colors">
        <svg
         className="h-5 w-5"
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
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
       <div className="flex items-center space-x-2">
        <FolderIcon className="h-4 w-4" />
        <span>{doc.category}</span>
       </div>
       <div className="flex items-center space-x-2">
        <TagIcon className="h-4 w-4" />
        <span>{doc.tags[0]}</span>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
} 