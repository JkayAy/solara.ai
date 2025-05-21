'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import {
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon as ClockSolidIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function TimeTrackingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [selectedProject, setSelectedProject] = useState('');

  const [timeEntries, setTimeEntries] = useState([
    {
      id: '1',
      project: 'Website Redesign',
      task: 'UI/UX Design',
      duration: '2h 30m',
      date: '2024-03-20',
      status: 'completed',
      billable: true,
      rate: '$75/hour',
    },
    {
      id: '2',
      project: 'Mobile App Development',
      task: 'Frontend Development',
      duration: '4h 15m',
      date: '2024-03-19',
      status: 'completed',
      billable: true,
      rate: '$85/hour',
    },
    {
      id: '3',
      project: 'Client Meeting',
      task: 'Project Planning',
      duration: '1h 00m',
      date: '2024-03-18',
      status: 'completed',
      billable: true,
      rate: '$100/hour',
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Website Redesign',
      client: 'Acme Corp',
      totalHours: 45.5,
      billableHours: 42.0,
      status: 'active',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'TechStart Inc',
      totalHours: 78.25,
      billableHours: 75.0,
      status: 'active',
    },
    {
      id: '3',
      name: 'Brand Identity',
      client: 'Global Solutions',
      totalHours: 32.0,
      billableHours: 30.0,
      status: 'completed',
    },
  ]);

  const [timeStats, setTimeStats] = useState({
    today: '6h 45m',
    thisWeek: '32h 15m',
    thisMonth: '128h 30m',
    billable: '95%',
    productivity: '92%',
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: '1',
      action: 'Started timer',
      project: 'Website Redesign',
      time: '10:30 AM',
      duration: '2h 30m',
    },
    {
      id: '2',
      action: 'Completed task',
      project: 'Mobile App Development',
      time: 'Yesterday',
      duration: '4h 15m',
    },
    {
      id: '3',
      action: 'Added time entry',
      project: 'Client Meeting',
      time: '2 days ago',
      duration: '1h 00m',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/dashboard/projects"
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          </Link>
          <PageHeader
            title="Time Tracking"
            description="Track and manage your time efficiently"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Time Entry
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today</p>
              <p className="text-lg font-semibold text-gray-900">{timeStats.today}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Week</p>
              <p className="text-lg font-semibold text-gray-900">{timeStats.thisWeek}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Billable</p>
              <p className="text-lg font-semibold text-gray-900">{timeStats.billable}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Productivity</p>
              <p className="text-lg font-semibold text-gray-900">{timeStats.productivity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timer and Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Timer</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-4">{currentTime}</div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isTimerRunning ? (
                      <PauseIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <PlayIcon className="h-5 w-5 mr-2" />
                    )}
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <StopIcon className="h-5 w-5 mr-2" />
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <ClockSolidIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.project}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-sm text-gray-500">{activity.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects and Time Entries */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Projects</h2>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  New Project
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {project.totalHours}h
                        </p>
                        <p className="text-sm text-gray-500">
                          {project.billableHours}h billable
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {project.status}
                      </span>
                      <button className="text-sm text-primary hover:text-primary-dark">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Entries */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Time Entries</h2>
              <div className="space-y-4">
                {timeEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {entry.project}
                        </h3>
                        <p className="text-sm text-gray-500">{entry.task}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.duration}
                        </p>
                        <p className="text-sm text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entry.billable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {entry.billable ? 'Billable' : 'Non-billable'}
                      </span>
                      <span className="text-sm text-gray-500">{entry.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Time Entry Modal (to be implemented) */}
      {/* Project Details Modal (to be implemented) */}
      {/* Time Entry Details Modal (to be implemented) */}
    </div>
  );
} 