'use client';

import React, { useState } from 'react';
import {
 ArrowLeftIcon,
 PlusIcon,
 DocumentDuplicateIcon,
 ArrowPathIcon,
 StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Template {
 id: string;
 name: string;
 description: string;
 category: string;
 lastUsed: string;
 usageCount: number;
 isFavorite: boolean;
}

export default function TemplatesPage() {
 const [templates, setTemplates] = useState<Template[]>([
  {
   id: '1',
   name: 'Invoice Generation',
   description: 'Automatically generate and send invoices',
   category: 'Finance',
   lastUsed: '2024-03-20',
   usageCount: 45,
   isFavorite: true,
  },
  {
   id: '2',
   name: 'Report Generation',
   description: 'Generate weekly performance reports',
   category: 'Analytics',
   lastUsed: '2024-03-19',
   usageCount: 32,
   isFavorite: false,
  },
  {
   id: '3',
   name: 'Data Backup',
   description: 'Automated database backup process',
   category: 'System',
   lastUsed: '2024-03-18',
   usageCount: 28,
   isFavorite: true,
  },
 ]);

 const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState('All');

 const categories = ['All', 'Finance', 'Analytics', 'System', 'Marketing'];

 const filteredTemplates = selectedCategory === 'All'
  ? templates
  : templates.filter(t => t.category === selectedCategory);

 const toggleFavorite = (id: string) => {
  setTemplates(templates.map(template =>
   template.id === id
    ? { ...template, isFavorite: !template.isFavorite }
    : template
  ));
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center">
      <Link
       href="/dashboard/automation"
       className="mr-4 p-2 rounded-full hover:bg-gray-100"
      >
       <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Automation Templates</h1>
     </div>
     <button
      onClick={() => setShowNewTemplateModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      <PlusIcon className="h-5 w-5 mr-2" />
      Create Template
     </button>
    </div>

    {/* Category Filter */}
    <div className="mb-6">
     <div className="flex space-x-4">
      {categories.map((category) => (
       <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
         selectedCategory === category
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-500 hover:text-gray-700'
        }`}
       >
        {category}
       </button>
      ))}
     </div>
    </div>

    {/* Templates Grid */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {filteredTemplates.map((template) => (
      <div
       key={template.id}
       className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
      >
       <div className="p-6">
        <div className="flex items-center justify-between">
         <div className="flex items-center">
          <DocumentDuplicateIcon className="h-6 w-6 text-gray-400 mr-3" />
          <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
         </div>
         <button
          onClick={() => toggleFavorite(template.id)}
          className={`p-1 rounded-full ${
           template.isFavorite
            ? 'text-yellow-400 hover:text-yellow-500'
            : 'text-gray-400 hover:text-gray-500'
          }`}
         >
          <StarIcon className="h-5 w-5" />
         </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">{template.description}</p>
        <div className="mt-4 flex items-center justify-between">
         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {template.category}
         </span>
         <span className="text-sm text-gray-500">
          Used {template.usageCount} times
         </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
         <span className="text-sm text-gray-500">
          Last used: {template.lastUsed}
         </span>
         <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <ArrowPathIcon className="h-4 w-4 mr-1" />
          Use Template
         </button>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>

   {/* New Template Modal (to be implemented) */}
  </div>
 );
} 