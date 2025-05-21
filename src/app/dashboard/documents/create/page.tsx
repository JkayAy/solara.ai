'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { mockDocumentCategories } from '@/lib/mock-data';

export default function CreateDocumentPage() {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('');
 const [tags, setTags] = useState<string[]>([]);
 const [newTag, setNewTag] = useState('');

 const handleAddTag = () => {
  if (newTag.trim() && !tags.includes(newTag.trim())) {
   setTags([...tags, newTag.trim()]);
   setNewTag('');
  }
 };

 const handleRemoveTag = (tagToRemove: string) => {
  setTags(tags.filter((tag) => tag !== tagToRemove));
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Create New Document"
     description="Create a new document in your workspace"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   <div className="bg-white rounded-lg shadow-sm p-6">
    <form className="space-y-6">
     {/* Title Input */}
     <div>
      <label
       htmlFor="title"
       className="block text-sm font-medium text-gray-700 mb-2"
      >
       Document Title
      </label>
      <input
       type="text"
       id="title"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       placeholder="Enter document title"
       required
      />
     </div>

     {/* Category Selection */}
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
       required
      >
       <option value="">Select a category</option>
       {mockDocumentCategories.map((category) => (
        <option key={category.id} value={category.name}>
         {category.name}
        </option>
       ))}
      </select>
     </div>

     {/* Content Editor */}
     <div>
      <label
       htmlFor="content"
       className="block text-sm font-medium text-gray-700 mb-2"
      >
       Document Content
      </label>
      <textarea
       id="content"
       value={content}
       onChange={(e) => setContent(e.target.value)}
       rows={10}
       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       placeholder="Enter document content"
       required
      />
     </div>

     {/* Tags */}
     <div>
      <label
       htmlFor="tags"
       className="block text-sm font-medium text-gray-700 mb-2"
      >
       Tags
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
       {tags.map((tag) => (
        <span
         key={tag}
         className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
        >
         {tag}
         <button
          type="button"
          onClick={() => handleRemoveTag(tag)}
          className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-primary/20 transition-colors"
         >
          ×
         </button>
        </span>
       ))}
      </div>
      <div className="flex space-x-2">
       <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        placeholder="Add a tag"
        onKeyPress={(e) => {
         if (e.key === 'Enter') {
          e.preventDefault();
          handleAddTag();
         }
        }}
       />
       <button
        type="button"
        onClick={handleAddTag}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
       >
        Add
       </button>
      </div>
     </div>

     {/* Create Button */}
     <div className="flex justify-end">
      <button
       type="submit"
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
      >
       <DocumentIcon className="h-5 w-5 mr-2" />
       Create Document
      </button>
     </div>
    </form>
   </div>
  </div>
 );
} 