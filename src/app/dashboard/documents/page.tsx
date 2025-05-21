import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { MetricsCard } from '@/components/MetricsCard';
import { mockDocumentMetrics } from '@/lib/mock-data';
import {
 DocumentIcon,
 FolderIcon,
 ClockIcon,
 ShareIcon,
 PlusIcon,
 ArrowUpTrayIcon,
 MagnifyingGlassIcon as SearchIcon,
 TagIcon
} from '@heroicons/react/24/outline';

interface DocumentMetrics {
 totalDocuments: number;
 recentUploads: number;
 sharedDocuments: number;
 storageUsed: number;
}

const documentFeatures = [
 {
  title: 'All Documents',
  description: 'Access and manage all your documents',
  icon: DocumentIcon,
  href: '/dashboard/documents/all',
 },
 {
  title: 'Recent Files',
  description: 'Quickly access recently modified files',
  icon: ClockIcon,
  href: '/dashboard/documents/recent',
 },
 {
  title: 'Shared with Me',
  description: 'View documents shared with you',
  icon: ShareIcon,
  href: '/dashboard/documents/shared',
 },
 {
  title: 'Categories',
  description: 'Browse documents by category',
  icon: FolderIcon,
  href: '/dashboard/documents/categories',
 },
];

export default function DocumentsPage() {
 // In a real application, you would fetch this data from your database
 const metrics: DocumentMetrics = mockDocumentMetrics;

 return (
  <div className="space-y-6">
   <PageHeader
    title="Document Management"
    description="Organize, share, and manage your documents efficiently"
   />

   {/* Quick Actions */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Link
     href="/dashboard/documents/upload"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <ArrowUpTrayIcon className="h-6 w-6 text-primary mr-2" />
     <span>Upload Document</span>
    </Link>
    <Link
     href="/dashboard/documents/create"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <PlusIcon className="h-6 w-6 text-primary mr-2" />
     <span>Create New Document</span>
    </Link>
    <Link
     href="/dashboard/documents/search"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <SearchIcon className="h-6 w-6 text-primary mr-2" />
     <span>Advanced Search</span>
    </Link>
   </div>

   {/* Document Metrics */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <MetricsCard
     title="Total Documents"
     value={metrics.totalDocuments}
     icon={DocumentIcon}
     trend={5}
    />
    <MetricsCard
     title="Recent Uploads"
     value={metrics.recentUploads}
     icon={ArrowUpTrayIcon}
     trend={2}
    />
    <MetricsCard
     title="Shared Documents"
     value={metrics.sharedDocuments}
     icon={ShareIcon}
     trend={3}
    />
    <MetricsCard
     title="Storage Used"
     value={`${metrics.storageUsed}GB`}
     icon={FolderIcon}
     trend={-1}
    />
   </div>

   {/* Document Features */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {documentFeatures.map((feature) => (
     <Link
      key={feature.title}
      href={feature.href}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
     >
      <feature.icon className="h-8 w-8 text-primary mb-4" />
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
     </Link>
    ))}
   </div>

   {/* Recent Activity */}
   <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
    <div className="space-y-4">
     {/* Activity items will be populated from the API */}
     <div className="flex items-center text-sm text-gray-600">
      <DocumentIcon className="h-5 w-5 mr-2" />
      <span>No recent activity</span>
     </div>
    </div>
   </div>
  </div>
 );
} 