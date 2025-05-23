'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import {
  EnvelopeIcon,
  StarIcon,
  TrashIcon,
  ArchiveBoxIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function InboxPage() {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const [emails, setEmails] = useState([
 {
  id: '1',
      from: 'John Smith',
      fromEmail: 'john.smith@company.com',
      subject: 'Project Update: Q1 Review',
      preview: 'Hi team, I wanted to share the latest updates on our Q1 project progress...',
  date: '10:30 AM',
  isRead: false,
  isStarred: true,
      hasAttachment: true,
      priority: 'high',
      category: 'work',
      aiSummary: 'Project progress report with key milestones and upcoming deadlines',
      suggestedActions: ['Schedule follow-up', 'Share with team', 'Add to calendar'],
 },
 {
  id: '2',
      from: 'Sarah Johnson',
      fromEmail: 'sarah.j@client.com',
      subject: 'Meeting Request: Product Demo',
      preview: 'Hello, I would like to schedule a product demonstration for our team...',
  date: 'Yesterday',
  isRead: true,
  isStarred: false,
      hasAttachment: false,
      priority: 'medium',
      category: 'meeting',
      aiSummary: 'Client requesting product demo, suggests multiple time slots',
      suggestedActions: ['Schedule meeting', 'Prepare demo materials', 'Add to calendar'],
    },
    {
      id: '3',
      from: 'System Notification',
      fromEmail: 'notifications@system.com',
      subject: 'Security Alert: New Login Detected',
      preview: 'We detected a new login to your account from an unrecognized device...',
      date: '2 days ago',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      priority: 'high',
      category: 'security',
      aiSummary: 'Security alert about new login, requires immediate attention',
      suggestedActions: ['Review activity', 'Change password', 'Enable 2FA'],
    },
  ]);

  const [quickFilters, setQuickFilters] = useState([
 {
  id: 'unread',
  name: 'Unread',
  count: 5,
      icon: EnvelopeIcon,
 },
 {
  id: 'starred',
  name: 'Starred',
  count: 3,
      icon: StarIcon,
    },
    {
      id: 'attachments',
      name: 'Attachments',
      count: 2,
      icon: DocumentIcon,
 },
 {
  id: 'important',
  name: 'Important',
  count: 4,
      icon: SparklesIcon,
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: 'work',
      name: 'Work',
      count: 12,
      color: 'blue',
    },
    {
      id: 'personal',
      name: 'Personal',
      count: 8,
      color: 'green',
    },
    {
      id: 'meeting',
      name: 'Meetings',
      count: 5,
      color: 'purple',
    },
    {
      id: 'security',
      name: 'Security',
      count: 3,
      color: 'red',
    },
  ]);

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

 return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Inbox"
          description="Manage your emails and communications"
        />
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
      Compose
     </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
    </div>
        <input
         type="text"
         placeholder="Search emails..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Filters */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Filters
              </h2>
              <div className="space-y-2">
                {quickFilters.map((filter) => (
          <button
           key={filter.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <filter.icon className="h-5 w-5 text-gray-400" />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {filter.name}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {filter.count}
           </span>
          </button>
         ))}
        </div>
           </div>
         </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
               <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                          category.color
                        )}`}
                      >
                        {category.name}
               </span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
              ))}
             </div>
            </div>
      </div>
     </div>

        {/* Email List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 rounded-lg border ${email.isRead ? 'bg-white' : 'bg-blue-50'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            checked={selectedEmails.includes(email.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedEmails([...selectedEmails, email.id]);
                              } else {
                                setSelectedEmails(
                                  selectedEmails.filter((id) => id !== email.id)
                                );
                              }
                            }}
                          />
          <button
                            className={`${email.isStarred ? 'text-yellow-400' : 'text-gray-400'
                              }`}
          >
                            <StarIcon className="h-5 w-5" />
          </button>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {email.from}
                            </p>
                            <p className="text-sm text-gray-500">{email.fromEmail}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-900">
                            {email.subject}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{email.preview}</p>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-xs text-gray-500">{email.date}</span>
                          {email.hasAttachment && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <DocumentIcon className="h-4 w-4 mr-1" />
                              Attachment
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                              email.category
                            )}`}
                          >
                            {email.category}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button className="text-gray-400 hover:text-gray-500">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
         </div>
                    </div>

                    {/* AI Insights */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-gray-900">AI Summary</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{email.aiSummary}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {email.suggestedActions.map((action, index) => (
         <button
                            key={index}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
         >
                            {action}
         </button>
                        ))}
            </div>
           </div>
          </div>
                ))}
           </div>
          </div>
         </div>
       </div>
      </div>

      {/* Compose Email Modal (to be implemented) */}
      {/* Email Details Modal (to be implemented) */}
  </div>
 );
}