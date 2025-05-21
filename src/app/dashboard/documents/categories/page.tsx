'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { mockDocumentCategories, mockDocuments } from '@/lib/mock-data';

export default function CategoriesPage() {
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Document Categories"
     description="Browse documents by category"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   {/* Categories Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {mockDocumentCategories.map((category) => {
     const categoryDocuments = mockDocuments.filter(
      (doc) => doc.category === category.name
     );

     return (
      <div
       key={category.id}
       className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
      >
       <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
         <FolderIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
         <h3 className="font-medium text-gray-900">{category.name}</h3>
         <p className="text-sm text-gray-500">
          {categoryDocuments.length} documents
         </p>
        </div>
       </div>

       {/* Recent Documents in Category */}
       <div className="space-y-3">
        {categoryDocuments.slice(0, 3).map((doc) => (
         <div
          key={doc.id}
          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
         >
          <DocumentIcon className="h-5 w-5 text-gray-400" />
          <div className="flex-1 min-w-0">
           <p className="text-sm font-medium text-gray-900 truncate">
            {doc.title}
           </p>
           <p className="text-xs text-gray-500">{doc.size}</p>
          </div>
         </div>
        ))}
       </div>

       {categoryDocuments.length > 3 && (
        <button className="mt-4 text-sm text-primary hover:text-primary-dark transition-colors">
         View all {categoryDocuments.length} documents
        </button>
       )}
      </div>
     );
    })}
   </div>
  </div>
 );
} 