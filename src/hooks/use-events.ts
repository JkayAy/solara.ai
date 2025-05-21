'use client';

import { useState, useEffect } from 'react';
import { useProposals } from './use-proposals';
import { useClients } from './use-clients';

export interface Event {
 id: string;
 title: string;
 date: string;
 startTime?: string;
 endTime?: string;
 type: 'proposal' | 'meeting' | 'reminder' | 'deadline';
 status?: 'draft' | 'sent' | 'accepted' | 'rejected';
 client?: string;
 description?: string;
 location?: string;
 attendees?: string[];
 recurring?: {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  endDate?: string;
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
 };
 reminders?: {
  type: 'email' | 'notification' | 'sms';
  time: number; // minutes before event
 }[];
 priority?: 'low' | 'medium' | 'high';
 tags?: string[];
 attachments?: {
  name: string;
  url: string;
  type: string;
 }[];
 notes?: string;
 followUp?: {
  type: 'email' | 'call' | 'meeting';
  scheduledFor: string;
  notes: string;
 };
}

// Mock meetings data with enhanced features
const mockMeetings: Event[] = [
 {
  id: 'm1',
  title: 'Client Kickoff Meeting',
  date: '2024-05-20',
  startTime: '10:00',
  endTime: '11:30',
  type: 'meeting',
  client: 'Acme Corp',
  description: 'Initial project kickoff meeting to discuss requirements and timeline',
  location: 'Conference Room A',
  attendees: ['john@acmecorp.com', 'sarah@techstart.com'],
  recurring: {
   frequency: 'weekly',
   endDate: '2024-06-20',
   daysOfWeek: [1] // Monday
  },
  reminders: [
   { type: 'email', time: 1440 }, // 24 hours before
   { type: 'notification', time: 30 } // 30 minutes before
  ],
  priority: 'high',
  tags: ['kickoff', 'project-planning'],
  attachments: [
   {
    name: 'Project Brief.pdf',
    url: '/attachments/project-brief.pdf',
    type: 'application/pdf'
   }
  ],
  notes: 'Prepare presentation and bring project timeline'
 },
 {
  id: 'm2',
  title: 'Project Review',
  date: '2024-05-25',
  startTime: '14:00',
  endTime: '15:00',
  type: 'meeting',
  client: 'TechStart Inc',
  description: 'Monthly project status review and milestone check',
  location: 'Virtual Meeting Room',
  attendees: ['michael@techstart.com'],
  recurring: {
   frequency: 'monthly',
   endDate: '2024-12-25'
  },
  reminders: [
   { type: 'email', time: 1440 },
   { type: 'notification', time: 15 }
  ],
  priority: 'medium',
  tags: ['review', 'milestone'],
  followUp: {
   type: 'email',
   scheduledFor: '2024-05-26',
   notes: 'Send meeting minutes and action items'
  }
 }
];

export function useEvents() {
 const { proposals } = useProposals();
 const { clients } = useClients();
 const [events, setEvents] = useState<Event[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');

 useEffect(() => {
  try {
   // Convert proposals to events
   const proposalEvents: Event[] = proposals.map(proposal => ({
    id: proposal.id,
    title: proposal.title,
    date: proposal.dueDate,
    type: 'proposal',
    status: proposal.status,
    client: proposal.client,
    priority: proposal.status === 'accepted' ? 'high' : 'medium',
    reminders: [
     { type: 'email', time: 1440 }, // 24 hours before
     { type: 'notification', time: 60 } // 1 hour before
    ]
   }));

   // Combine proposals and meetings
   setEvents([...proposalEvents, ...mockMeetings]);
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to load events');
  } finally {
   setIsLoading(false);
  }
 }, [proposals]);

 const addEvent = async (event: Omit<Event, 'id'>) => {
  try {
   setIsLoading(true);
   const newEvent: Event = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
   };
   setEvents(prev => [...prev, newEvent]);
   return newEvent;
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to add event');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const updateEvent = (id: string, updates: Partial<Event>) => {
  setEvents(prev =>
   prev.map(event =>
    event.id === id ? { ...event, ...updates } : event
   )
  );
 };

 const deleteEvent = (id: string) => {
  setEvents(prev => prev.filter(event => event.id !== id));
 };

 const getEventsByDateRange = (startDate: Date, endDate: Date) => {
  return events.filter(event => {
   const eventDate = new Date(event.date);
   return eventDate >= startDate && eventDate <= endDate;
  });
 };

 const getUpcomingEvents = (days: number = 7) => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + days);
  return getEventsByDateRange(today, endDate);
 };

 const getOverdueEvents = () => {
  const today = new Date();
  return events.filter(event => {
   const eventDate = new Date(event.date);
   return eventDate < today && event.status !== 'completed';
  });
 };

 const getEventsByPriority = (priority: Event['priority']) => {
  return events.filter(event => event.priority === priority);
 };

 const getEventsByTag = (tag: string) => {
  return events.filter(event => event.tags?.includes(tag));
 };

 return {
  events,
  isLoading,
  error,
  view,
  setView,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsByDateRange,
  getUpcomingEvents,
  getOverdueEvents,
  getEventsByPriority,
  getEventsByTag
 };
} 