'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ShieldCheckIcon,
 PlusIcon,
 PencilIcon,
 TrashIcon,
 CheckIcon,
 XMarkIcon
} from '@heroicons/react/24/outline';

interface Role {
 id: string;
 name: string;
 description: string;
 permissions: {
  [key: string]: boolean;
 };
 memberCount: number;
}

const defaultPermissions = {
 'view_dashboard': false,
 'manage_tasks': false,
 'manage_projects': false,
 'manage_team': false,
 'manage_finances': false,
 'view_reports': false,
 'manage_settings': false,
};

export default function RolesPage() {
 const { data: roles, error, isLoading } = useData<Role[]>(() => api.team.roles.list());
 const [searchTerm, setSearchTerm] = useState('');

 if (isLoading) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="text-red-500">Error loading roles: {error.message}</div>
   </div>
  );
 }

 const filteredRoles = roles?.filter(role =>
  role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  role.description.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div className="space-y-6">
   <BackButton href="/dashboard/team" label="Back to Team" />
   <PageHeader
    title="Roles & Permissions"
    description="Manage team roles and their permissions"
   />

   {/* Actions Bar */}
   <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="w-full md:w-auto">
     <input
      type="text"
      placeholder="Search roles..."
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
     />
    </div>
    <button
     onClick={() => window.location.href = '/dashboard/team/roles/create'}
     className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
    >
     <PlusIcon className="h-5 w-5 mr-2" />
     Create Role
    </button>
   </div>

   {/* Roles List */}
   <div className="grid grid-cols-1 gap-6">
    {filteredRoles?.map((role) => (
     <div key={role.id} className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
       <div>
        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
        <p className="text-sm text-gray-500">{role.description}</p>
       </div>
       <div className="flex space-x-2">
        <button
         onClick={() => window.location.href = `/dashboard/team/roles/${role.id}/edit`}
         className="text-primary hover:text-primary-dark"
        >
         <PencilIcon className="h-5 w-5" />
        </button>
        <button
         onClick={() => {
          if (confirm('Are you sure you want to delete this role?')) {
           // Handle role deletion
          }
         }}
         className="text-red-600 hover:text-red-900"
        >
         <TrashIcon className="h-5 w-5" />
        </button>
       </div>
      </div>

      <div className="mt-4">
       <div className="text-sm font-medium text-gray-700 mb-2">
        Members with this role: {role.memberCount}
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(role.permissions).map(([permission, granted]) => (
         <div key={permission} className="flex items-center space-x-2">
          {granted ? (
           <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
           <XMarkIcon className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm text-gray-600">
           {permission.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
           ).join(' ')}
          </span>
         </div>
        ))}
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
} 