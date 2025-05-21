'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 UserGroupIcon,
 ShieldCheckIcon,
 UserPlusIcon,
} from '@heroicons/react/24/outline';

export default function TeamSecurityPage() {
 const [teamMembers, setTeamMembers] = useState([
  {
   id: 1,
   name: 'John Doe',
   email: 'john.doe@example.com',
   role: 'Admin',
   lastActive: '2 minutes ago',
   status: 'active',
  },
  {
   id: 2,
   name: 'Jane Smith',
   email: 'jane.smith@example.com',
   role: 'Editor',
   lastActive: '1 hour ago',
   status: 'active',
  },
  {
   id: 3,
   name: 'Mike Johnson',
   email: 'mike.johnson@example.com',
   role: 'Viewer',
   lastActive: '3 days ago',
   status: 'inactive',
  },
 ]);

 const [invitations, setInvitations] = useState([
  {
   id: 1,
   email: 'sarah.wilson@example.com',
   role: 'Editor',
   status: 'pending',
   invitedAt: '2024-03-15T10:00:00',
  },
  {
   id: 2,
   email: 'david.brown@example.com',
   role: 'Viewer',
   status: 'pending',
   invitedAt: '2024-03-15T09:30:00',
  },
 ]);

 const handleRemoveMember = (memberId: number) => {
  setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
 };

 const handleCancelInvitation = (invitationId: number) => {
  setInvitations((prev) =>
   prev.filter((invitation) => invitation.id !== invitationId)
  );
 };

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Team Security"
     description="Manage team member access and permissions"
    />
    <BackButton href="/dashboard/security" label="Back to Security" />
   </div>

   {/* Team Members */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <UserGroupIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
        <p className="mt-1 text-sm text-gray-500">
         Manage access and permissions for team members
        </p>
       </div>
      </div>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
       <UserPlusIcon className="h-5 w-5 mr-2" />
       Invite Member
      </button>
     </div>

     <div className="space-y-4">
      {teamMembers.map((member) => (
       <div
        key={member.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
       >
        <div>
         <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
          <span
           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'active'
             ? 'bg-green-100 text-green-800'
             : 'bg-gray-100 text-gray-800'
            }`}
          >
           {member.status}
          </span>
         </div>
         <p className="text-sm text-gray-500">{member.email}</p>
         <div className="mt-1 text-xs text-gray-500">
          <p>Role: {member.role}</p>
          <p>Last active: {member.lastActive}</p>
         </div>
        </div>
        <button
         onClick={() => handleRemoveMember(member.id)}
         className="text-sm text-red-600 hover:text-red-800"
        >
         Remove
        </button>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Pending Invitations */}
   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
       <UserPlusIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">
        Pending Invitations
       </h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage pending team member invitations
       </p>
      </div>
     </div>

     <div className="space-y-4">
      {invitations.map((invitation) => (
       <div
        key={invitation.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
       >
        <div>
         <p className="text-sm font-medium text-gray-900">
          {invitation.email}
         </p>
         <div className="mt-1 text-xs text-gray-500">
          <p>Role: {invitation.role}</p>
          <p>Invited: {formatDate(invitation.invitedAt)}</p>
         </div>
        </div>
        <button
         onClick={() => handleCancelInvitation(invitation.id)}
         className="text-sm text-red-600 hover:text-red-800"
        >
         Cancel
        </button>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Security Notice */}
   <div className="bg-blue-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-blue-800">
       Security Best Practices
      </h3>
      <div className="mt-2 text-sm text-blue-700">
       <ul className="list-disc pl-5 space-y-1">
        <li>Regularly review team member access and permissions</li>
        <li>Remove access for team members who no longer need it</li>
        <li>Use the principle of least privilege when assigning roles</li>
        <li>Monitor team member activity for suspicious behavior</li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 