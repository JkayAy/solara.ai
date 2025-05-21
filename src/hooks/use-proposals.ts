'use client';

import { useState, useEffect } from 'react';

interface Proposal {
 id: string;
 title: string;
 clientId: string;
 status: 'draft' | 'sent' | 'accepted' | 'rejected';
 createdAt: Date;
 updatedAt: Date;
}

export function useProposals() {
 const [proposals, setProposals] = useState<Proposal[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 // Mock data for initial development
 const mockProposals: Proposal[] = [
  {
   id: '1',
   title: 'Website Redesign Project',
   clientId: 'client1',
   status: 'accepted',
   createdAt: new Date('2024-03-01'),
   updatedAt: new Date('2024-03-01'),
  },
  {
   id: '2',
   title: 'Mobile App Development',
   clientId: 'client2',
   status: 'sent',
   createdAt: new Date('2024-03-02'),
   updatedAt: new Date('2024-03-02'),
  },
 ];

 useEffect(() => {
  // In a real app, this would fetch from an API
  setProposals(mockProposals);
 }, []);

 const createProposal = async (clientId: string) => {
  try {
   setIsLoading(true);
   setError(null);

   // In a real app, this would be an API call
   const newProposal: Proposal = {
    id: Math.random().toString(36).substr(2, 9),
    title: 'New Proposal',
    clientId,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
   };

   setProposals(prev => [...prev, newProposal]);
   return newProposal;
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to create proposal');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const updateProposal = async (id: string, updates: Partial<Proposal>) => {
  try {
   setIsLoading(true);
   setError(null);

   // In a real app, this would be an API call
   setProposals(prev =>
    prev.map(proposal =>
     proposal.id === id ? { ...proposal, ...updates, updatedAt: new Date() } : proposal
    )
   );
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to update proposal');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 const deleteProposal = async (id: string) => {
  try {
   setIsLoading(true);
   setError(null);

   // In a real app, this would be an API call
   setProposals(prev => prev.filter(proposal => proposal.id !== id));
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to delete proposal');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 return {
  proposals,
  isLoading,
  error,
  createProposal,
  updateProposal,
  deleteProposal,
 };
} 