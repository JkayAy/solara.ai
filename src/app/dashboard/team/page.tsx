'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { MetricsCard } from '@/components/MetricsCard';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 UserGroupIcon,
 ShieldCheckIcon,
 ChartBarIcon,
 CalendarIcon,
 PlusIcon,
 UserPlusIcon,
 DocumentTextIcon
} from '@heroicons/react/24/outline';

interface TeamMetrics {
 totalMembers: number;
 activeMembers: number;
 pendingInvites: number;
 teamHealth: number;
}

const teamFeatures = [
 {
  title: 'Team Members',
  description: 'Manage team members, roles, and access levels',
  icon: UserGroupIcon,
  href: '/dashboard/team/members',
 },
 {
  title: 'Roles & Permissions',
  description: 'Configure team roles and access permissions',
  icon: ShieldCheckIcon,
  href: '/dashboard/team/roles',
 },
 {
  title: 'Performance',
  description: 'Track team performance and productivity metrics',
  icon: ChartBarIcon,
  href: '/dashboard/team/performance',
 },
 {
  title: 'Schedules',
  description: 'Manage team schedules and availability',
  icon: CalendarIcon,
  href: '/dashboard/team/schedules',
 },
];

export default function TeamPage() {
 const { data: metrics, error, isLoading } = useData<TeamMetrics>(() => api.team.getMetrics());

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
    <div className="text-red-500">Error loading team data: {error.message}</div>
   </div>
  );
 }

 return (
  <div className="space-y-6">
   <PageHeader
    title="Team Management"
    description="Manage your team, roles, and performance"
   />

   {/* Quick Actions */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Link
     href="/dashboard/team/members/invite"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <UserPlusIcon className="h-6 w-6 text-primary mr-2" />
     <span>Invite Team Member</span>
    </Link>
    <Link
     href="/dashboard/team/roles/create"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <PlusIcon className="h-6 w-6 text-primary mr-2" />
     <span>Create New Role</span>
    </Link>
    <Link
     href="/dashboard/team/reports"
     className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
     <DocumentTextIcon className="h-6 w-6 text-primary mr-2" />
     <span>Generate Reports</span>
    </Link>
   </div>

   {/* Team Metrics */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <MetricsCard
     title="Total Members"
     value={metrics?.totalMembers || 0}
     icon={UserGroupIcon}
     trend={5}
    />
    <MetricsCard
     title="Active Members"
     value={metrics?.activeMembers || 0}
     icon={UserGroupIcon}
     trend={2}
    />
    <MetricsCard
     title="Pending Invites"
     value={metrics?.pendingInvites || 0}
     icon={UserPlusIcon}
     trend={-1}
    />
    <MetricsCard
     title="Team Health"
     value={`${metrics?.teamHealth || 0}%`}
     icon={ChartBarIcon}
     trend={3}
    />
   </div>

   {/* Team Features */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {teamFeatures.map((feature) => (
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
  </div>
 );
} 