'use client';

import React, { useState } from 'react';
import {
 FolderIcon,
 ClockIcon,
 UserGroupIcon,
 ChartBarIcon,
 PlusIcon,
} from '@heroicons/react/24/outline';
import { PageHeader } from '@/components/ui/page-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { MetricsCard } from '@/components/ui/metrics-card';

const projectFeatures = [
 {
  title: 'Task Management',
  description: 'Create and assign tasks, track progress, and manage deadlines',
  icon: FolderIcon,
  href: '/dashboard/projects/tasks',
 },
 {
  title: 'Time Tracking',
  description: 'Log hours, generate timesheets, and track billable time',
  icon: ClockIcon,
  href: '/dashboard/time-tracking',
 },
 {
  title: 'Resource Management',
  description: 'Allocate resources, track utilization, and plan capacity',
  icon: UserGroupIcon,
  href: '/dashboard/projects/resources',
 },
 {
  title: 'Project Analytics',
  description: 'Track project metrics, analyze performance, and generate reports',
  icon: ChartBarIcon,
  href: '/dashboard/projects/analytics',
 },
];

export default function ProjectsPage() {
 const [showNewProjectModal, setShowNewProjectModal] = useState(false);
 const [showNewTaskModal, setShowNewTaskModal] = useState(false);
 const [showReportModal, setShowReportModal] = useState(false);

 const handleCreateProject = () => {
  setShowNewProjectModal(true);
  // Add project creation logic here
 };

 const handleAddTask = () => {
  setShowNewTaskModal(true);
  // Add task creation logic here
 };

 const handleGenerateReport = () => {
  setShowReportModal(true);
  // Add report generation logic here
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <PageHeader title="Project Management">
     <div className="flex space-x-4">
      <button
       type="button"
       onClick={handleCreateProject}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       <PlusIcon className="h-5 w-5 mr-2" />
       Create New Project
      </button>
     </div>
    </PageHeader>

    {/* Project Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Active Projects"
      value="3"
      icon={FolderIcon}
      trend={{ value: 12, isPositive: true }}
     />
     <MetricsCard
      title="Total Tasks"
      value="24"
      icon={ClockIcon}
      trend={{ value: 8, isPositive: true }}
     />
     <MetricsCard
      title="Team Members"
      value="8"
      icon={UserGroupIcon}
     />
     <MetricsCard
      title="Project Health"
      value="92%"
      icon={ChartBarIcon}
      trend={{ value: 5, isPositive: true }}
     />
    </div>

    {/* Project Features */}
    <div className="py-4">
     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {projectFeatures.map((feature) => (
       <FeatureCard
        key={feature.title}
        title={feature.title}
        description={feature.description}
        icon={feature.icon}
        href={feature.href}
       />
      ))}
     </div>
    </div>

    {/* Quick Actions */}
    <div className="mt-8">
     <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
     <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
       type="button"
       onClick={handleAddTask}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       <PlusIcon className="h-5 w-5 mr-2" />
       Add Task
      </button>
      <button
       type="button"
       onClick={handleGenerateReport}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       <ChartBarIcon className="h-5 w-5 mr-2" />
       Generate Report
      </button>
     </div>
    </div>
   </div>
  </div>
 );
} 