'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { MagnifyingGlassIcon, DocumentIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { mockDocuments, mockDocumentCategories } from '@/lib/mock-data';

export default function AdvancedSearchPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('');
 const [dateRange, setDateRange] = useState({ start: '', end: '' });
 const [showFilters, setShowFilters] = useState(false);

 // Filter documents based on search criteria
 const filteredDocuments = mockDocuments.filter((doc) => {
  const matchesQuery = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchesCategory = !selectedCategory || doc.category === selectedCategory;
  const matchesDateRange = (!dateRange.start || new Date(doc.lastModified) >= new Date(dateRange.start)) &&
   (!dateRange.end || new Date(doc.lastModified) <= new Date(dateRange.end));

  return matchesQuery && matchesCategory && matchesDateRange;
 });

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Advanced Search"
     description="Search and filter your documents"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   <div className="bg-white rounded-lg shadow-sm p-6">
    {/* Search Bar */}
    <div className="flex space-x-4">
     <div className="flex-1">
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
       </div>
       <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="Search documents..."
       />
      </div>
     </div>
     <button
      onClick={() => setShowFilters(!showFilters)}
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
     >
      <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
      Filters
     </button>
    </div>

    {/* Filters */}
    {showFilters && (
     <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
        <label
         htmlFor="category"
         className="block text-sm font-medium text-gray-700 mb-2"
        >
         Category
        </label>
        <select
         id="category"
         value={selectedCategory}
         onChange={(e) => setSelectedCategory(e.target.value)}
         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
         <option value="">All Categories</option>
         {mockDocumentCategories.map((category) => (
          <option key={category.id} value={category.name}>
           {category.name}
          </option>
         ))}
        </select>
       </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
         <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 mb-2"
         >
          Start Date
         </label>
         <input
          type="date"
          id="startDate"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
         />
        </div>
        <div>
         <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700 mb-2"
         >
          End Date
         </label>
         <input
          type="date"
          id="endDate"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
         />
        </div>
       </div>
      </div>
     </div>
    )}

    {/* Search Results */}
    <div className="mt-6">
     <h3 className="text-lg font-medium text-gray-900 mb-4">
      Search Results ({filteredDocuments.length})
     </h3>
     {filteredDocuments.length > 0 ? (
      <div className="space-y-4">
       {filteredDocuments.map((doc) => (
        <div
         key={doc.id}
         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
         <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
           <DocumentIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
           <h4 className="font-medium text-gray-900">{doc.title}</h4>
           <div className="flex items-center space-x-4 mt-1">
            <span className="text-sm text-gray-500">{doc.category}</span>
            <span className="text-sm text-gray-500">
             {new Date(doc.lastModified).toLocaleDateString()}
            </span>
           </div>
          </div>
         </div>
         <div className="flex items-center space-x-2">
          {doc.tags.map((tag) => (
           <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
           >
            {tag}
           </span>
          ))}
         </div>
        </div>
       ))}
      </div>
     ) : (
      <div className="text-center py-12">
       <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
       <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
       <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
} 