// import { cache } from 'react';
import { mockFinancialMetrics, mockInvoices, mockTransactions, mockPayments } from './mock-data';

export class ApiError extends Error {
 constructor(public status: number, message: string) {
  super(message);
  this.name = 'ApiError';
 }
}

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

interface CacheEntry<T> {
 data: T;
 timestamp: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

export async function fetchWithCache<T>(
 url: string,
 options?: RequestInit
): Promise<T> {
 const cacheKey = `${url}-${JSON.stringify(options)}`;
 const cached = cacheStore.get(cacheKey);

 if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
  return cached.data;
 }

 if (USE_MOCK_DATA) {
  // Return mock data based on the endpoint
  let mockData: any;
  if (url.includes('/api/documents/metrics')) {
   mockData = {
    totalDocuments: 156,
    recentUploads: 12,
    sharedDocuments: 45,
    storageUsed: 2.4,
   };
  } else if (url.includes('/api/financial/metrics')) {
   mockData = mockFinancialMetrics;
  } else if (url.includes('/api/financial/invoices')) {
   mockData = options?.method === 'POST' ? { id: Date.now(), ...JSON.parse(options.body as string) } : mockInvoices;
  } else if (url.includes('/api/financial/transactions')) {
   mockData = options?.method === 'POST' ? { id: Date.now(), ...JSON.parse(options.body as string) } : mockTransactions;
  } else if (url.includes('/api/financial/payments')) {
   mockData = options?.method === 'POST' ? { id: Date.now(), ...JSON.parse(options.body as string) } : mockPayments;
  } else if (url.includes('/api/analytics/metrics')) {
   mockData = {
    totalUsers: 5000,
    activeProjects: 25,
    completedTasks: 150,
    systemHealth: 98,
   };
  } else if (url.includes('/api/analytics/performance')) {
   mockData = mockPerformanceMetrics;
  } else if (url.includes('/api/analytics/usage')) {
   mockData = mockUsageMetrics;
  } else if (url.includes('/api/analytics/trends')) {
   mockData = mockTrendMetrics;
  } else if (url.includes('/api/analytics/monitoring')) {
   mockData = mockSystemMetrics;
  }

  if (mockData) {
   cacheStore.set(cacheKey, { data: mockData, timestamp: Date.now() });
   return mockData;
  }
 }

 try {
  const response = await fetch(url, {
   ...options,
   headers: {
    'Content-Type': 'application/json',
    ...options?.headers,
   },
  });

  if (!response.ok) {
   throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  cacheStore.set(cacheKey, { data, timestamp: Date.now() });
  return data;
 } catch (error) {
  if (error instanceof ApiError) {
   throw error;
  }
  throw new ApiError(500, 'An unexpected error occurred');
 }
}

// API endpoints
export const api = {
 tasks: {
  list: () => fetchWithCache('/api/tasks'),
  create: (data: any) => fetchWithCache('/api/tasks', {
   method: 'POST',
   body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchWithCache(`/api/tasks/${id}`, {
   method: 'PUT',
   body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchWithCache(`/api/tasks/${id}`, {
   method: 'DELETE',
  }),
 },
 timeTracking: {
  list: () => fetchWithCache('/api/time-entries'),
  create: (data: any) => fetchWithCache('/api/time-entries', {
   method: 'POST',
   body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchWithCache(`/api/time-entries/${id}`, {
   method: 'PUT',
   body: JSON.stringify(data),
  }),
 },
 resources: {
  list: () => fetchWithCache('/api/resources'),
  create: (data: any) => fetchWithCache('/api/resources', {
   method: 'POST',
   body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchWithCache(`/api/resources/${id}`, {
   method: 'PUT',
   body: JSON.stringify(data),
  }),
 },
 analytics: {
  getMetrics: () => fetchWithCache('/api/analytics/metrics'),
  getPerformanceMetrics: () => fetchWithCache('/api/analytics/performance'),
  getUsageMetrics: () => fetchWithCache('/api/analytics/usage'),
  getTrendMetrics: () => fetchWithCache('/api/analytics/trends'),
  getSystemMetrics: () => fetchWithCache('/api/analytics/monitoring'),
 },
 financial: {
  getMetrics: () => fetchWithCache('/api/financial/metrics'),
  invoices: {
   list: () => fetchWithCache('/api/financial/invoices'),
   create: (data: any) => fetchWithCache('/api/financial/invoices', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/financial/invoices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
  },
  transactions: {
   list: () => fetchWithCache('/api/financial/transactions'),
   create: (data: any) => fetchWithCache('/api/financial/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/financial/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
  },
  payments: {
   list: () => fetchWithCache('/api/financial/payments'),
   create: (data: any) => fetchWithCache('/api/financial/payments', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/financial/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
  },
 },
 team: {
  getMetrics: () => fetchWithCache('/api/team/metrics'),
  members: {
   list: () => fetchWithCache('/api/team/members'),
   create: (data: any) => fetchWithCache('/api/team/members', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/team/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
   delete: (id: string) => fetchWithCache(`/api/team/members/${id}`, {
    method: 'DELETE',
   }),
  },
  roles: {
   list: () => fetchWithCache('/api/team/roles'),
   create: (data: any) => fetchWithCache('/api/team/roles', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/team/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
   delete: (id: string) => fetchWithCache(`/api/team/roles/${id}`, {
    method: 'DELETE',
   }),
  },
  performance: {
   getMetrics: () => fetchWithCache('/api/team/performance'),
   getMemberMetrics: (id: string) => fetchWithCache(`/api/team/performance/${id}`),
  },
  schedules: {
   list: () => fetchWithCache('/api/team/schedules'),
   create: (data: any) => fetchWithCache('/api/team/schedules', {
    method: 'POST',
    body: JSON.stringify(data),
   }),
   update: (id: string, data: any) => fetchWithCache(`/api/team/schedules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
   }),
   delete: (id: string) => fetchWithCache(`/api/team/schedules/${id}`, {
    method: 'DELETE',
   }),
  },
 },
 documents: {
  getMetrics: () => fetchWithCache('/api/documents/metrics'),
  list: () => fetchWithCache('/api/documents'),
  getById: (id: string) => fetchWithCache(`/api/documents/${id}`),
  create: (data: any) => fetchWithCache('/api/documents', {
   method: 'POST',
   body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchWithCache(`/api/documents/${id}`, {
   method: 'PUT',
   body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchWithCache(`/api/documents/${id}`, {
   method: 'DELETE',
  }),
  share: (id: string, data: any) => fetchWithCache(`/api/documents/${id}/share`, {
   method: 'POST',
   body: JSON.stringify(data),
  }),
  getCategories: () => fetchWithCache('/api/documents/categories'),
  getRecent: () => fetchWithCache('/api/documents/recent'),
  getShared: () => fetchWithCache('/api/documents/shared'),
  search: (query: string) => fetchWithCache(`/api/documents/search?q=${encodeURIComponent(query)}`),
 },
};