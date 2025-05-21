'use client';

import { useState } from 'react';

interface Insight {
 id: string;
 title: string;
 description: string;
 type: 'proposal' | 'client' | 'business';
 createdAt: Date;
}

export function useAIInsights() {
 const [insights, setInsights] = useState<Insight[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const refreshInsights = async () => {
  try {
   setIsLoading(true);
   setError(null);

   // Mock data for initial development
   const mockInsights: Insight[] = [
    {
     id: '1',
     title: 'Proposal Success Rate',
     description: 'Your proposal acceptance rate has increased by 15% this month.',
     type: 'proposal',
     createdAt: new Date(),
    },
    {
     id: '2',
     title: 'Client Engagement',
     description: 'Client response time has decreased by 20% in the last week.',
     type: 'client',
     createdAt: new Date(),
    },
   ];

   setInsights(mockInsights);
  } catch (err) {
   setError(err instanceof Error ? err.message : 'Failed to generate insights');
   throw err;
  } finally {
   setIsLoading(false);
  }
 };

 return {
  insights,
  isLoading,
  error,
  refreshInsights,
 };
} 