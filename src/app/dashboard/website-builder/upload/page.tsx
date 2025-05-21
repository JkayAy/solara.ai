'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Upload, Image, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadedFile {
 id: string;
 name: string;
 size: number;
 type: string;
 progress: number;
}

export default function UploadAssetsPage() {
 const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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

  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
 };

 const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
   const files = Array.from(e.target.files);
   handleFiles(files);
  }
 };

 const handleFiles = (files: File[]) => {
  const newFiles = files.map(file => ({
   id: Math.random().toString(36).substr(2, 9),
   name: file.name,
   size: file.size,
   type: file.type,
   progress: 0
  }));

  setUploadedFiles(prev => [...prev, ...newFiles]);

  // Simulate upload progress
  newFiles.forEach(file => {
   let progress = 0;
   const interval = setInterval(() => {
    progress += 10;
    setUploadedFiles(prev =>
     prev.map(f =>
      f.id === file.id ? { ...f, progress } : f
     )
    );
    if (progress >= 100) clearInterval(interval);
   }, 200);
  });
 };

 const removeFile = (id: string) => {
  setUploadedFiles(prev => prev.filter(file => file.id !== id));
 };

 const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
 };

 return (
  <div className="space-y-6">
   <PageHeader
    title="Upload Assets"
    description="Upload images, documents, and other assets for your website"
   />

   {/* Upload Area */}
   <div
    className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
     }`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
   >
    <div className="space-y-4">
     <div className="flex justify-center">
      <Upload className="h-12 w-12 text-gray-400" />
     </div>
     <div className="text-gray-600">
      <p className="text-lg font-medium">Drag and drop your files here</p>
      <p className="text-sm">or</p>
      <label className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 cursor-pointer">
       Browse Files
       <input
        type="file"
        className="hidden"
        multiple
        onChange={handleFileInput}
       />
      </label>
     </div>
     <p className="text-xs text-gray-500">
      Supported formats: JPG, PNG, GIF, PDF, DOC, DOCX (Max 10MB)
     </p>
    </div>
   </div>

   {/* Uploaded Files List */}
   {uploadedFiles.length > 0 && (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
     <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
       Uploaded Files
      </h2>
      <div className="space-y-4">
       {uploadedFiles.map((file) => (
        <motion.div
         key={file.id}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
         <div className="flex items-center space-x-4">
          {file.type.startsWith('image/') ? (
           <Image className="h-8 w-8 text-gray-400" />
          ) : (
           <FileText className="h-8 w-8 text-gray-400" />
          )}
          <div>
           <p className="text-sm font-medium text-gray-900">
            {file.name}
           </p>
           <p className="text-xs text-gray-500">
            {formatFileSize(file.size)}
           </p>
          </div>
         </div>
         <div className="flex items-center space-x-4">
          <div className="w-32">
           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
             className="h-full bg-primary transition-all duration-300"
             style={{ width: `${file.progress}%` }}
            />
           </div>
          </div>
          <button
           onClick={() => removeFile(file.id)}
           className="text-gray-400 hover:text-gray-500"
          >
           <X className="h-5 w-5" />
          </button>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </div>
   )}
  </div>
 );
} 