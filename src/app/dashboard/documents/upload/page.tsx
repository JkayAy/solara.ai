'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { mockDocumentCategories } from '@/lib/mock-data';

export default function UploadDocumentPage() {
 const [files, setFiles] = useState<File[]>([]);
 const [selectedCategory, setSelectedCategory] = useState('');
 const [isDragging, setIsDragging] = useState(false);

 const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(true);
 };

 const handleDragLeave = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
 };

 const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
  const droppedFiles = Array.from(e.dataTransfer.files);
  setFiles((prev) => [...prev, ...droppedFiles]);
 };

 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
   const selectedFiles = Array.from(e.target.files);
   setFiles((prev) => [...prev, ...selectedFiles]);
  }
 };

 const removeFile = (index: number) => {
  setFiles((prev) => prev.filter((_, i) => i !== index));
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Upload Documents"
     description="Upload new documents to your workspace"
    />
    <BackButton href="/dashboard/documents" label="Back to Documents" />
   </div>

   <div className="bg-white rounded-lg shadow-sm p-6">
    {/* Upload Area */}
    <div
     className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      } transition-colors`}
     onDragOver={handleDragOver}
     onDragLeave={handleDragLeave}
     onDrop={handleDrop}
    >
     <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
     <h3 className="text-lg font-medium text-gray-900 mb-2">
      Drag and drop your files here
     </h3>
     <p className="text-gray-500 mb-4">or</p>
     <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer transition-colors">
      Browse Files
      <input
       type="file"
       className="hidden"
       multiple
       onChange={handleFileSelect}
      />
     </label>
    </div>

    {/* Selected Files */}
    {files.length > 0 && (
     <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900 mb-4">Selected Files</h4>
      <div className="space-y-3">
       {files.map((file, index) => (
        <div
         key={index}
         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
         <div className="flex items-center space-x-3">
          <DocumentIcon className="h-5 w-5 text-gray-400" />
          <div>
           <p className="text-sm font-medium text-gray-900">{file.name}</p>
           <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(1)} KB
           </p>
          </div>
         </div>
         <button
          onClick={() => removeFile(index)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
         >
          <XMarkIcon className="h-5 w-5 text-gray-400" />
         </button>
        </div>
       ))}
      </div>

      {/* Category Selection */}
      <div className="mt-6">
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
        <option value="">Select a category</option>
        {mockDocumentCategories.map((category) => (
         <option key={category.id} value={category.name}>
          {category.name}
         </option>
        ))}
       </select>
      </div>

      {/* Upload Button */}
      <div className="mt-6">
       <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
 );
} 