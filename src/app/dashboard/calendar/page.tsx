'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import {
  CalendarIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
  VideoCameraIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEvents } from '@/hooks/use-events';

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const [eventForm, setEventForm] = useState({
  title: '',
    type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
  location: '',
    description: '',
  attendees: [] as string[],
    color: 'blue',
    recurring: false,
    recurringPattern: 'none',
    reminders: [] as { type: string; time: number }[],
    meetingType: 'team',
    videoPlatform: 'zoom',
    meetingLink: '',
    agenda: '',
    requiredAttendees: [] as string[],
    optionalAttendees: [] as string[],
    preparationNotes: '',
    followUpRequired: false,
    meetingCategory: 'general',
    meetingObjectives: [] as string[],
    actionItems: [] as { task: string; assignee: string; dueDate: string }[],
    documents: [] as { name: string; url: string }[],
    recordingConsent: false,
    breakoutRooms: [] as { name: string; participants: string[] }[],
    recurringEndDate: '',
    recurringExceptions: [] as string[],
    recurringReminders: [] as { type: string; time: number }[],
    zoomSettings: {
      waitingRoom: true,
      joinBeforeHost: false,
      muteOnEntry: true,
      autoRecord: false,
    },
    teamsSettings: {
      lobby: true,
      allowMeetingChat: true,
      recordAutomatically: false,
    },
    meetSettings: {
      quickAccess: true,
      liveStreaming: false,
      recording: false,
    },
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!eventForm.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!eventForm.date) {
      errors.date = 'Date is required';
    }

    if (!eventForm.startTime || !eventForm.endTime) {
      errors.time = 'Start and end time are required';
    } else if (eventForm.startTime >= eventForm.endTime) {
      errors.time = 'End time must be after start time';
    }

    if (eventForm.type === 'meeting') {
      if (!eventForm.agenda.trim()) {
        errors.agenda = 'Agenda is required for meetings';
      }

      if (eventForm.requiredAttendees.length === 0) {
        errors.requiredAttendees = 'At least one required attendee is needed';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const allAttendees = [...eventForm.requiredAttendees, ...eventForm.optionalAttendees];
      const invalidEmails = allAttendees.filter(email => !emailRegex.test(email));
      if (invalidEmails.length > 0) {
        errors.attendees = 'Invalid email format detected';
      }
    }

    if (eventForm.videoPlatform) {
      if (!eventForm.meetingLink.trim()) {
        errors.meetingLink = 'Meeting link is required for video calls';
      }
    }

    if (eventForm.recurring) {
      if (!eventForm.recurringEndDate) {
        errors.recurringEndDate = 'End date is required for recurring meetings';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const eventData = {
        ...eventForm,
        id: selectedEvent?.id || Math.random().toString(36).substr(2, 9),
        recurring: eventForm.recurring ? {
          frequency: eventForm.recurringPattern,
          endDate: eventForm.recurringEndDate,
          exceptions: eventForm.recurringExceptions,
        } : undefined,
      };

      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventData);
      } else {
        await addEvent(eventData);
      }

      setShowEventModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      setFormErrors({ submit: 'Failed to save event. Please try again.' });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

 const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

 const getEventsForDate = (date: Date) => {
  return events.filter(event => {
   const eventDate = new Date(event.date);
   return eventDate.toDateString() === date.toDateString();
  });
 };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const generateCalendarGrid = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(selectedDate);
    const days = [];
    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50 p-2 min-h-[100px]">
          <span className="text-sm text-gray-400">{''}</span>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(monthStart);
      currentDate.setDate(day);
      const dayEvents = getEventsForDate(currentDate);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(currentDate)}
          className={`p-2 min-h-[100px] cursor-pointer transition-colors
            ${isToday ? 'bg-blue-50' : ''}
            ${isSelected ? 'ring-2 ring-primary' : ''}
            hover:bg-gray-50`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-gray-900'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-xs text-gray-500">{dayEvents.length} events</span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map(event => (
        <div
         key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
                className={`text-xs p-1 rounded truncate cursor-pointer
                  ${getEventColor(event.color)}`}
              >
                {event.title}
        </div>
       ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} more
      </div>
            )}
     </div>
   </div>
  );
    }

    return days;
  };

  const getEventColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleQuickAction = (actionType: string) => {
    setShowEventModal(true);
    setSelectedEvent(null);
    setFormErrors({});

    switch (actionType) {
      case 'meeting':
        setEventForm(prev => ({
          ...prev,
          type: 'meeting',
          title: 'Team Meeting',
          color: 'blue',
          meetingType: 'team',
          meetingCategory: 'team-sync',
          meetingObjectives: ['Review progress', 'Discuss blockers', 'Plan next steps'],
          reminders: [{ type: 'email', time: 30 }],
          recurring: true,
          recurringPattern: 'weekly',
          recurringEndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
          preparationNotes: 'Please prepare your weekly updates and any blockers to discuss.',
        }));
        break;
      case 'video':
        setEventForm(prev => ({
          ...prev,
          type: 'meeting',
          title: 'Video Conference',
          color: 'green',
          videoPlatform: 'zoom',
          location: 'Virtual Meeting',
          zoomSettings: {
            waitingRoom: true,
            joinBeforeHost: false,
            muteOnEntry: true,
            autoRecord: true,
          },
          reminders: [
            { type: 'email', time: 1440 },
            { type: 'notification', time: 15 }
          ],
          recordingConsent: true,
          preparationNotes: 'Please test your audio and video before joining.',
        }));
        break;
      default:
        setEventForm(prev => ({
          ...prev,
          type: 'meeting',
          color: 'blue',
        }));
    }
  };

  return (
    <div className="space-y-6">
   <div className="flex items-center justify-between">
        <PageHeader
          title="Calendar"
          description="Manage your schedule and events"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowEventModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Event
          </button>
        </div>
   </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateYear('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              {formatDate(selectedDate)}
        </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateYear('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
                </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentView === 'day'
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setCurrentView('day')}
            >
              Day
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentView === 'week'
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setCurrentView('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentView === 'month'
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setCurrentView('month')}
            >
              Month
            </button>
             </div>
            </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-white p-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
           </div>
          ))}
          {generateCalendarGrid()}
         </div>
      </div>

      <div className="space-y-4">
        {[
          {
            id: 1,
            name: 'New Event',
            description: 'Create a new calendar event',
            icon: PlusIcon,
            action: () => handleQuickAction('event'),
          },
          {
            id: 2,
            name: 'Schedule Meeting',
            description: 'Set up a team meeting',
            icon: UserGroupIcon,
            action: () => handleQuickAction('meeting'),
          },
          {
            id: 3,
            name: 'Video Call',
            description: 'Start a video conference',
            icon: VideoCameraIcon,
            action: () => handleQuickAction('video'),
          },
        ].map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <action.icon className="h-5 w-5 text-primary" />
        </div>
            <div className="ml-4 text-left">
              <p className="text-sm font-medium text-gray-900">{action.name}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
       </div>
          </button>
        ))}
      </div>

      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
       <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedEvent ? 'Edit Event' : 'New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
         </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
           Title
          </label>
          <input
           type="text"
                      id="title"
           required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                        ${formErrors.title ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Enter event title"
          />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                    )}
         </div>

         <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
           </label>
           <input
            type="date"
                        id="date"
            required
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                          ${formErrors.date ? 'border-red-300' : 'border-gray-300'}`}
           />
                      {formErrors.date && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
                      )}
          </div>
          <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
             Start Time
            </label>
            <input
             type="time"
                          id="startTime"
                          required
                          value={eventForm.startTime}
                          onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                            ${formErrors.time ? 'border-red-300' : 'border-gray-300'}`}
            />
           </div>
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
             End Time
            </label>
            <input
             type="time"
                          id="endTime"
                          required
                          value={eventForm.endTime}
                          onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                            ${formErrors.time ? 'border-red-300' : 'border-gray-300'}`}
                        />
                      </div>
                      {formErrors.time && (
                        <p className="mt-1 text-sm text-red-600 col-span-2">{formErrors.time}</p>
                      )}
           </div>
          </div>
         </div>

                {eventForm.type === 'meeting' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">
                        Meeting Type
                      </label>
                      <select
                        id="meetingType"
                        value={eventForm.meetingType}
                        onChange={(e) => setEventForm({ ...eventForm, meetingType: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="team">Team Meeting</option>
                        <option value="client">Client Meeting</option>
                        <option value="project">Project Review</option>
                        <option value="interview">Interview</option>
                        <option value="training">Training Session</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="meetingCategory" className="block text-sm font-medium text-gray-700">
                        Meeting Category
                      </label>
                      <select
                        id="meetingCategory"
                        value={eventForm.meetingCategory}
                        onChange={(e) => setEventForm({ ...eventForm, meetingCategory: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="general">General Discussion</option>
                        <option value="team-sync">Team Sync</option>
                        <option value="planning">Planning</option>
                        <option value="review">Review</option>
                        <option value="decision">Decision Making</option>
                        <option value="training">Training</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="agenda" className="block text-sm font-medium text-gray-700">
                        Agenda
          </label>
          <textarea
                        id="agenda"
           rows={3}
                        value={eventForm.agenda}
                        onChange={(e) => setEventForm({ ...eventForm, agenda: e.target.value })}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                          ${formErrors.agenda ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="Enter meeting agenda"
                      />
                      {formErrors.agenda && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.agenda}</p>
                      )}
         </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting Objectives
                      </label>
          <div className="space-y-2">
                        {eventForm.meetingObjectives.map((objective, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={objective}
                              onChange={(e) => {
                                const newObjectives = [...eventForm.meetingObjectives];
                                newObjectives[index] = e.target.value;
                                setEventForm({ ...eventForm, meetingObjectives: newObjectives });
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              placeholder="Enter objective"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newObjectives = eventForm.meetingObjectives.filter((_, i) => i !== index);
                                setEventForm({ ...eventForm, meetingObjectives: newObjectives });
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEventForm({
                              ...eventForm,
                              meetingObjectives: [...eventForm.meetingObjectives, ''],
                            });
                          }}
                          className="text-sm text-primary hover:text-primary-dark"
                        >
                          + Add Objective
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700">
                        Meeting Link
           </label>
           <input
            type="text"
                        id="meetingLink"
                        value={eventForm.meetingLink}
                        onChange={(e) => setEventForm({ ...eventForm, meetingLink: e.target.value })}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                          ${formErrors.meetingLink ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="Enter meeting link"
                      />
                      {formErrors.meetingLink && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.meetingLink}</p>
                      )}
          </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Attendees
           </label>
                  <input
                    type="text"
                    value={eventForm.requiredAttendees.join(', ')}
                    onChange={(e) => setEventForm({
                      ...eventForm,
                      requiredAttendees: e.target.value.split(',').map(email => email.trim())
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                      ${formErrors.requiredAttendees ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter email addresses (comma-separated)"
                  />
                  {formErrors.requiredAttendees && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.requiredAttendees}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Optional Attendees
                  </label>
                  <input
                    type="text"
                    value={eventForm.optionalAttendees.join(', ')}
                    onChange={(e) => setEventForm({
                      ...eventForm,
                      optionalAttendees: e.target.value.split(',').map(email => email.trim())
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                      ${formErrors.attendees ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter email addresses (comma-separated)"
                  />
                  {formErrors.attendees && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.attendees}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Items
                  </label>
                  <div className="space-y-2">
                    {eventForm.actionItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={item.task}
                          onChange={(e) => {
                            const newItems = [...eventForm.actionItems];
                            newItems[index].task = e.target.value;
                            setEventForm({ ...eventForm, actionItems: newItems });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          placeholder="Task"
                        />
                        <input
                          type="text"
                          value={item.assignee}
                          onChange={(e) => {
                            const newItems = [...eventForm.actionItems];
                            newItems[index].assignee = e.target.value;
                            setEventForm({ ...eventForm, actionItems: newItems });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          placeholder="Assignee"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="date"
                            value={item.dueDate}
                            onChange={(e) => {
                              const newItems = [...eventForm.actionItems];
                              newItems[index].dueDate = e.target.value;
                              setEventForm({ ...eventForm, actionItems: newItems });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = eventForm.actionItems.filter((_, i) => i !== index);
                              setEventForm({ ...eventForm, actionItems: newItems });
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setEventForm({
                          ...eventForm,
                          actionItems: [...eventForm.actionItems, { task: '', assignee: '', dueDate: '' }],
                        });
                      }}
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      + Add Action Item
                    </button>
          </div>
         </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={eventForm.recurring}
                      onChange={(e) => setEventForm({ ...eventForm, recurring: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                      Recurring Meeting
                    </label>
                  </div>

                  {eventForm.recurring && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="recurringPattern" className="block text-sm font-medium text-gray-700">
                          Recurring Pattern
                        </label>
           <select
                          id="recurringPattern"
                          value={eventForm.recurringPattern}
                          onChange={(e) => setEventForm({ ...eventForm, recurringPattern: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
           </select>
                      </div>

                      <div>
                        <label htmlFor="recurringEndDate" className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
            <input
             type="date"
                          id="recurringEndDate"
                          value={eventForm.recurringEndDate}
                          onChange={(e) => setEventForm({ ...eventForm, recurringEndDate: e.target.value })}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                            ${formErrors.recurringEndDate ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {formErrors.recurringEndDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.recurringEndDate}</p>
                        )}
         </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recurring Meeting Reminders
                        </label>
         <div className="space-y-2">
                          {eventForm.recurringReminders.map((reminder, index) => (
                            <div key={index} className="flex items-center space-x-2">
             <select
              value={reminder.type}
              onChange={(e) => {
                                  const newReminders = [...eventForm.recurringReminders];
                                  newReminders[index].type = e.target.value;
                                  setEventForm({ ...eventForm, recurringReminders: newReminders });
                                }}
                                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
             >
              <option value="email">Email</option>
              <option value="notification">Notification</option>
              <option value="sms">SMS</option>
             </select>
             <select
              value={reminder.time}
              onChange={(e) => {
                                  const newReminders = [...eventForm.recurringReminders];
                                  newReminders[index].time = parseInt(e.target.value);
                                  setEventForm({ ...eventForm, recurringReminders: newReminders });
                                }}
                                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              >
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
             </select>
                              <button
              type="button"
              onClick={() => {
                                  const newReminders = eventForm.recurringReminders.filter((_, i) => i !== index);
                                  setEventForm({ ...eventForm, recurringReminders: newReminders });
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
            </div>
           ))}
                          <button
            type="button"
            onClick={() => {
                              setEventForm({
                                ...eventForm,
                                recurringReminders: [...eventForm.recurringReminders, { type: 'email', time: 30 }],
             });
            }}
                            className="text-sm text-primary hover:text-primary-dark"
           >
                            + Add Reminder
                          </button>
          </div>
                      </div>
                    </div>
                  )}
         </div>

                <div>
                  <label htmlFor="preparationNotes" className="block text-sm font-medium text-gray-700">
                    Preparation Notes
                  </label>
                  <textarea
                    id="preparationNotes"
                    rows={2}
                    value={eventForm.preparationNotes}
                    onChange={(e) => setEventForm({ ...eventForm, preparationNotes: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Enter any preparation notes for attendees"
                  />
                </div>

                <div className="flex items-center space-x-2">
           <input
                    type="checkbox"
                    id="followUpRequired"
                    checked={eventForm.followUpRequired}
                    onChange={(e) => setEventForm({ ...eventForm, followUpRequired: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="followUpRequired" className="text-sm font-medium text-gray-700">
                    Follow-up Required
                  </label>
         </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
           type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
           Cancel
                  </button>
                  {selectedEvent && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this event?')) {
                          await deleteEvent(selectedEvent.id);
                          setShowEventModal(false);
                          setSelectedEvent(null);
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {selectedEvent ? 'Update Event' : 'Create Event'}
                  </button>
         </div>
        </form>
       </div>
      </div>
     </div>
      )}

      <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) > new Date())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {event.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()} at{' '}
                          {event.startTime}
                        </div>
                        {event.location && (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            {event.location}
    </div>
   )}
                        {event.attendees && (
                          <div className="flex items-center text-sm text-gray-500">
                            <UserGroupIcon className="h-4 w-4 mr-2" />
                            {event.attendees.length} attendees
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventColor(
                        event.color
                      )}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
  </div>
 );
} 