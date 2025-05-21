'use client';

import { useState, useEffect } from 'react';

interface Client {
 id: string;
 name: string;
 email: string;
 company: string;
}

export function useClients() {
 const [clients, setClients] = useState<Client[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 // Mock data for initial development
 const mockClients: Client[] = [
  {
   id: 'client1',
   name: 'John Doe',
   email: 'john@example.com',
   company: 'Acme Corp',
  },
  {
   id: 'client2',
   name: 'Jane Smith',
   email: 'jane@example.com',
   company: 'TechStart Inc',
  },
 ];

 useEffect(() => {
  setClients(mockClients);
 }, []);

 return {
  clients,
  isLoading,
  error,
 };
} 