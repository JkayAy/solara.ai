import React from 'react';
import { PageHeader } from '@/components/PageHeader';

export default function Loading() {
 return (
  <div className="space-y-6">
   <PageHeader
    title="Document Management"
    description="Organize, share, and manage your documents efficiently"
   />

   {/* Quick Actions Skeleton */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
     <div
      key={i}
      className="h-16 bg-gray-200 rounded-lg animate-pulse"
     />
    ))}
   </div>

   {/* Metrics Skeleton */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
     <div
      key={i}
      className="h-32 bg-gray-200 rounded-lg animate-pulse"
     />
    ))}
   </div>

   {/* Features Skeleton */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
     <div
      key={i}
      className="h-48 bg-gray-200 rounded-lg animate-pulse"
     />
    ))}
   </div>

   {/* Recent Activity Skeleton */}
   <div className="bg-gray-200 rounded-lg p-6 animate-pulse">
    <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
    <div className="space-y-4">
     {[1, 2, 3].map((i) => (
      <div
       key={i}
       className="h-8 bg-gray-300 rounded"
      />
     ))}
    </div>
   </div>
  </div>
 );
} 