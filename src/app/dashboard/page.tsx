'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentIcon,
  ShieldCheckIcon,
  BellIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  InboxIcon,
  FolderIcon,
  CogIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  ArrowPathIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  CommandLineIcon,
  PuzzlePieceIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Tooltip } from '@/components/Tooltip';

export default function DashboardPage() {
  const [quickStats, setQuickStats] = useState([
    {
      id: 1,
      name: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      trend: 'up',
      icon: UserGroupIcon,
    },
    {
      id: 2,
      name: 'Active Sessions',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ClockIcon,
    },
    {
      id: 3,
      name: 'Total Documents',
      value: '8,765',
      change: '+15.3%',
      trend: 'up',
      icon: DocumentIcon,
    },
    {
      id: 4,
      name: 'Security Score',
      value: '92%',
      change: '+2.1%',
      trend: 'up',
      icon: ShieldCheckIcon,
    },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: 'John Doe',
      action: 'Created new document',
      time: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated security settings',
      time: '15 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Failed login attempt',
      time: '1 hour ago',
      status: 'warning',
    },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 1,
      type: 'Suspicious Activity',
      description: 'Multiple failed login attempts detected',
      severity: 'high',
      time: '1 hour ago',
    },
    {
      id: 2,
      type: 'System Update',
      description: 'Security patch available',
      severity: 'medium',
      time: '2 hours ago',
    },
  ]);

  const [quickActions, setQuickActions] = useState([
    {
      id: 1,
      name: 'AI Command Center',
      description: 'Control your entire system with AI',
      icon: CommandLineIcon,
      link: '/dashboard/ai-command',
      tooltip: 'Use natural language to control all features and get AI-powered insights',
      category: 'AI',
    },
    {
      id: 2,
      name: 'Website Builder',
      description: 'Create and manage your website with our powerful tools',
      icon: GlobeAltIcon,
      link: '/dashboard/website-builder',
      tooltip: 'Generate professional websites with AI-powered templates and content',
      category: 'Creation',
    },
    {
      id: 3,
      name: 'Integrations Hub',
      description: 'Connect your favorite tools',
      icon: PuzzlePieceIcon,
      link: '/dashboard/integrations',
      tooltip: 'Manage all your integrations and automate workflows',
      category: 'Integration',
    },
    {
      id: 4,
      name: 'Create Document',
      description: 'Start a new document',
      icon: DocumentIcon,
      link: '/dashboard/documents/create',
      tooltip: 'Create new documents, proposals, or contracts',
      category: 'Documents',
    },
    {
      id: 5,
      name: 'Manage Users',
      description: 'View and manage user access',
      icon: UserGroupIcon,
      link: '/dashboard/team',
      tooltip: 'Manage team members and their permissions',
      category: 'Team',
    },
    {
      id: 6,
      name: 'Security Settings',
      description: 'Configure security options',
      icon: ShieldCheckIcon,
      link: '/dashboard/security',
      tooltip: 'Manage security settings and access controls',
      category: 'Security',
    },
    {
      id: 7,
      name: 'System Analytics',
      description: 'Monitor system performance and usage',
      icon: ChartBarIcon,
      link: '/dashboard/analytics',
      tooltip: 'Track system performance, user activity, and technical metrics',
      category: 'Analytics',
    },
    {
      id: 8,
      name: 'Financial Overview',
      description: 'Track revenue and expenses',
      icon: CurrencyDollarIcon,
      link: '/dashboard/financial',
      tooltip: 'Monitor financial metrics and transactions',
      category: 'Finance',
    },
    {
      id: 9,
      name: 'Time Tracking',
      description: 'Monitor time and productivity',
      icon: ClockIcon,
      link: '/dashboard/time-tracking',
      tooltip: 'Track time spent on projects and tasks',
      category: 'Productivity',
    },
    {
      id: 10,
      name: 'Calendar',
      description: 'Manage your schedule',
      icon: CalendarIcon,
      link: '/dashboard/calendar',
      tooltip: 'View and manage your calendar events',
      category: 'Schedule',
    },
    {
      id: 11,
      name: 'Inbox',
      description: 'Check your messages',
      icon: InboxIcon,
      link: '/dashboard/inbox',
      tooltip: 'View and manage your messages',
      category: 'Communication',
    },
    {
      id: 12,
      name: 'Projects',
      description: 'Manage your projects',
      icon: FolderIcon,
      link: '/dashboard/projects',
      tooltip: 'View and manage your projects',
      category: 'Projects',
    },
    {
      id: 13,
      name: 'Business Reports',
      description: 'Generate and schedule reports',
      icon: ChartPieIcon,
      link: '/dashboard/reports',
      tooltip: 'Create, schedule, and manage business reports',
      category: 'Analytics',
    },
    {
      id: 14,
      name: 'Automation',
      description: 'Set up workflows',
      icon: ArrowPathIcon,
      link: '/dashboard/automation',
      tooltip: 'Configure automated workflows',
      category: 'Efficiency',
    },
    {
      id: 15,
      name: 'Business Insights',
      description: 'Get AI-powered recommendations',
      icon: LightBulbIcon,
      link: '/dashboard/insights',
      tooltip: 'View AI-generated insights and business recommendations',
      category: 'Analytics',
    },
  ]);

  // Group actions by category
  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your system"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div
                className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="ml-1 text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-8">
            {Object.entries(groupedActions).map(([category, actions]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-500 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {actions.map((action) => (
                    <Tooltip key={action.id} content={action.tooltip}>
                      <Link
                        href={action.link}
                        className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                            <action.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                              {action.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                          </div>
                        </div>
                      </Link>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity and Security Alerts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <a
                  href="/dashboard/activity"
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${activity.status === 'success'
                          ? 'bg-green-100'
                          : activity.status === 'warning'
                            ? 'bg-yellow-100'
                            : 'bg-gray-100'
                          }`}
                      >
                        <BellIcon
                          className={`h-5 w-5 ${activity.status === 'success'
                            ? 'text-green-600'
                            : activity.status === 'warning'
                              ? 'text-yellow-600'
                              : 'text-gray-600'
                            }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Security Alerts</h2>
                <a
                  href="/dashboard/security/alerts"
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${alert.severity === 'high'
                          ? 'bg-red-100'
                          : alert.severity === 'medium'
                            ? 'bg-yellow-100'
                            : 'bg-blue-100'
                          }`}
                      >
                        <ExclamationTriangleIcon
                          className={`h-5 w-5 ${alert.severity === 'high'
                            ? 'text-red-600'
                            : alert.severity === 'medium'
                              ? 'text-yellow-600'
                              : 'text-blue-600'
                            }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                        <p className="text-sm text-gray-500">{alert.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">CPU Usage</p>
                  <p className="text-2xl font-semibold text-gray-900">45%</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Memory Usage</p>
                  <p className="text-2xl font-semibold text-gray-900">62%</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Storage</p>
                  <p className="text-2xl font-semibold text-gray-900">78%</p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Network</p>
                  <p className="text-2xl font-semibold text-gray-900">92%</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 