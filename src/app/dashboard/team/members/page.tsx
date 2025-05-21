'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 UserGroupIcon,
 UserPlusIcon,
 PencilIcon,
 TrashIcon,
 EnvelopeIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
 id: string;
 name: string;
 email: string;
 role: string;
 status: 'active' | 'inactive' | 'pending';
 joinDate: string;
 lastActive: string;
}

export default function TeamMembersPage() {
 const { data: members, error, isLoading } = useData<TeamMember[]>(() => api.team.members.list());
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedRole, setSelectedRole] = useState('all');

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
    <div className="text-red-500">Error loading team members: {error.message}</div>
   </div>
  );
 }

 const filteredMembers = members?.filter(member => {
  const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   member.email.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesRole = selectedRole === 'all' || member.role === selectedRole;
  return matchesSearch && matchesRole;
 });

 return (
  <div className="space-y-6">
   <BackButton href="/dashboard/team" label="Back to Team" />
   <PageHeader
    title="Team Members"
    description="Manage your team members and their roles"
   />

   {/* Actions Bar */}
   <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
     <input
      type="text"
      placeholder="Search members..."
      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
     />
     <select
      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
     >
      <option value="all">All Roles</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="member">Member</option>
     </select>
    </div>
    <button
     onClick={() => window.location.href = '/dashboard/team/members/invite'}
     className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
    >
     <UserPlusIcon className="h-5 w-5 mr-2" />
     Invite Member
    </button>
   </div>

   {/* Members List */}
   <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Member
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Role
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Join Date
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Last Active
       </th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
       </th>
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {filteredMembers?.map((member) => (
       <tr key={member.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
         <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
           <UserGroupIcon className="h-10 w-10 text-gray-400" />
          </div>
          <div className="ml-4">
           <div className="text-sm font-medium text-gray-900">{member.name}</div>
           <div className="text-sm text-gray-500">{member.email}</div>
          </div>
         </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {member.role}
         </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'active' ? 'bg-green-100 text-green-800' :
          member.status === 'inactive' ? 'bg-red-100 text-red-800' :
           'bg-yellow-100 text-yellow-800'
          }`}>
          {member.status}
         </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
         {member.joinDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
         {member.lastActive}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
         <div className="flex justify-end space-x-2">
          <button
           onClick={() => window.location.href = `/dashboard/team/members/${member.id}/edit`}
           className="text-primary hover:text-primary-dark"
          >
           <PencilIcon className="h-5 w-5" />
          </button>
          <button
           onClick={() => window.location.href = `mailto:${member.email}`}
           className="text-primary hover:text-primary-dark"
          >
           <EnvelopeIcon className="h-5 w-5" />
          </button>
          <button
           onClick={() => {
            if (confirm('Are you sure you want to remove this member?')) {
             // Handle member removal
            }
           }}
           className="text-red-600 hover:text-red-900"
          >
           <TrashIcon className="h-5 w-5" />
          </button>
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
} 