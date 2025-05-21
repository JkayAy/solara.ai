'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProposals } from '@/hooks/use-proposals';
import { useClients } from '@/hooks/use-clients';
import { useEvents } from '@/hooks/use-events';
import { useAIInsights } from '@/hooks/use-ai-insights';

interface AppContextType {
 // Shared state
 activeClient: string | null;
 activeProposal: string | null;
 activeEvent: string | null;
 isLoading: boolean;
 error: string | null;

 // Quick actions
 createProposal: () => Promise<void>;
 scheduleMeeting: () => Promise<void>;
 sendEmail: () => Promise<void>;

 // AI-powered features
 generateInsights: () => Promise<void>;
 getRecommendations: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
 const router = useRouter();
 const { createProposal: createProposalHook } = useProposals();
 const { addEvent } = useEvents();
 const { refreshInsights } = useAIInsights();

 const [activeClient, setActiveClient] = useState<string | null>(null);
 const [activeProposal, setActiveProposal] = useState<string | null>(null);
 const [activeEvent, setActiveEvent] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const createProposal = async () => {
  try {
   setIsLoading(true);
   setError(null);
   const proposal = await createProposalHook({
    title: 'New Proposal',
    clientId: '1', // Default client
    status: 'draft',
   });
   setActiveProposal(proposal.id);
   router.push('/dashboard/proposals');
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to create proposal');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const scheduleMeeting = async () => {
  try {
   setIsLoading(true);
   setError(null);
   const event = await addEvent({
    title: 'New Meeting',
    clientId: '1', // Default client
    date: new Date(),
    type: 'meeting',
   });
   setActiveEvent(event.id);
   router.push('/dashboard/calendar');
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to schedule meeting');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const sendEmail = async () => {
  try {
   setIsLoading(true);
   setError(null);
   // Implement email sending logic
   router.push('/dashboard/inbox');
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to send email');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const generateInsights = async () => {
  try {
   setIsLoading(true);
   setError(null);
   await refreshInsights();
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to generate insights');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const getRecommendations = async () => {
  try {
   setIsLoading(true);
   setError(null);
   // Implement recommendations logic
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to get recommendations');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const value = {
  activeClient,
  activeProposal,
  activeEvent,
  isLoading,
  error,
  createProposal,
  scheduleMeeting,
  sendEmail,
  generateInsights,
  getRecommendations,
 };

 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
 const context = useContext(AppContext);
 if (context === undefined) {
  throw new Error('useApp must be used within an AppProvider');
 }
 return context;
} 