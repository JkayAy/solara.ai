'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
   CalendarIcon,
   PlusIcon,
   PencilIcon,
   TrashIcon,
   UserGroupIcon,
   ClockIcon
} from '@heroicons/react/24/outline';

interface Schedule {
   id: string;
   title: string;
   type: 'meeting' | 'training' | 'event';
   startTime: string;
   endTime: string;
   participants: number;
   status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
   description: string;
}

export default function SchedulesPage() {
   const [selectedDate, setSelectedDate] = useState('');
   const [selectedType, setSelectedType] = useState('');
   const { data: schedules, error, isLoading } = useData<Schedule[]>(() => api.team.schedules.list());

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
            <div className="text-red-500">Error loading schedules: {error.message}</div>
         </div>
      );
   }

   const filteredSchedules = schedules?.filter(schedule => {
      if (selectedDate && !schedule.startTime.startsWith(selectedDate)) {
         return false;
      }
      if (selectedType && schedule.type !== selectedType) {
         return false;
      }
      return true;
   });

   return (
      <div className="space-y-6">
         <BackButton href="/dashboard/team" label="Back to Team" />
         <PageHeader
            title="Team Schedules"
            description="Manage team meetings, training sessions, and events"
         />

         {/* Actions Bar */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
               <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
               />
               <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
               >
                  <option value="">All Types</option>
                  <option value="meeting">Meetings</option>
                  <option value="training">Training</option>
                  <option value="event">Events</option>
               </select>
            </div>
            <button
               onClick={() => window.location.href = '/dashboard/team/schedules/create'}
               className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
               <PlusIcon className="h-5 w-5 mr-2" />
               Create Schedule
            </button>
         </div>

         {/* Schedules Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules?.map((schedule) => (
               <div key={schedule.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">{schedule.title}</h3>
                        <p className="text-sm text-gray-500">{schedule.description}</p>
                     </div>
                     <div className="flex space-x-2">
                        <button
                           onClick={() => window.location.href = `/dashboard/team/schedules/${schedule.id}/edit`}
                           className="text-primary hover:text-primary-dark"
                        >
                           <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                           onClick={() => {
                              if (confirm('Are you sure you want to delete this schedule?')) {
                                 // Handle schedule deletion
                              }
                           }}
                           className="text-red-600 hover:text-red-900"
                        >
                           <TrashIcon className="h-5 w-5" />
                        </button>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>
                           {new Date(schedule.startTime).toLocaleDateString()} at{' '}
                           {new Date(schedule.startTime).toLocaleTimeString()}
                        </span>
                     </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        <span>
                           {new Date(schedule.startTime).toLocaleTimeString()} -{' '}
                           {new Date(schedule.endTime).toLocaleTimeString()}
                        </span>
                     </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <UserGroupIcon className="h-5 w-5 mr-2" />
                        <span>{schedule.participants} participants</span>
                     </div>
                     <div className="mt-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
         ${schedule.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              schedule.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                 schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'}`}>
                           {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
} 