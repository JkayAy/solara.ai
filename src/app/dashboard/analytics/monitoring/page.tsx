'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import {
 ServerIcon,
 CpuChipIcon,
 CircleStackIcon,
 ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface SystemMetrics {
 cpu: {
  usage: number;
  cores: number;
  temperature: number;
 };
 memory: {
  total: number;
  used: number;
  free: number;
 };
 disk: {
  total: number;
  used: number;
  free: number;
 };
 network: {
  bytesIn: number;
  bytesOut: number;
  connections: number;
 };
 alerts: Array<{
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
 }>;
}

export default function RealTimeMonitoringPage() {
 const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds
 const { data: metrics, loading, error, refetch } = useData<SystemMetrics>(
  () => api.analytics.getSystemMetrics()
 );

 useEffect(() => {
  const interval = setInterval(() => {
   refetch();
  }, refreshInterval);

  return () => clearInterval(interval);
 }, [refreshInterval, refetch]);

 if (loading && !metrics) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="text-red-600">
     Error: {error.message}
    </div>
   </div>
  );
 }

 const formatBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
   value /= 1024;
   unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
 };

 const getAlertColor = (type: string) => {
  switch (type) {
   case 'error':
    return 'bg-red-100 text-red-800';
   case 'warning':
    return 'bg-yellow-100 text-yellow-800';
   case 'info':
    return 'bg-blue-100 text-blue-800';
   default:
    return 'bg-gray-100 text-gray-800';
  }
 };

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <PageHeader title="Real-time Monitoring" backHref="/dashboard/analytics">
     <div className="flex space-x-4">
      <select
       value={refreshInterval}
       onChange={(e) => setRefreshInterval(Number(e.target.value))}
       className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
       <option value={5000}>5 seconds</option>
       <option value={10000}>10 seconds</option>
       <option value={30000}>30 seconds</option>
       <option value={60000}>1 minute</option>
      </select>
     </div>
    </PageHeader>

    {/* System Metrics */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="CPU Usage"
      value={`${metrics?.cpu.usage}%`}
      icon={CpuChipIcon}
      subtitle={`${metrics?.cpu.cores} cores`}
     />
     <MetricsCard
      title="Memory Usage"
      value={`${((metrics?.memory.used / metrics?.memory.total) * 100).toFixed(1)}%`}
      icon={CircleStackIcon}
      subtitle={`${formatBytes(metrics?.memory.used)} / ${formatBytes(metrics?.memory.total)}`}
     />
     <MetricsCard
      title="Disk Usage"
      value={`${((metrics?.disk.used / metrics?.disk.total) * 100).toFixed(1)}%`}
      icon={ServerIcon}
      subtitle={`${formatBytes(metrics?.disk.used)} / ${formatBytes(metrics?.disk.total)}`}
     />
     <MetricsCard
      title="Network Traffic"
      value={`${formatBytes(metrics?.network.bytesIn)}/s`}
      icon={ServerIcon}
      subtitle={`${metrics?.network.connections} connections`}
     />
    </div>

    {/* System Alerts */}
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
     <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       System Alerts
      </h3>
      <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
     </div>
     <div className="border-t border-gray-200">
      <ul role="list" className="divide-y divide-gray-200">
       {metrics?.alerts.map((alert) => (
        <li key={alert.id} className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAlertColor(alert.type)}`}>
            {alert.type}
           </p>
           <p className="ml-3 text-sm text-gray-900">
            {alert.message}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p className="text-sm text-gray-500">
            {new Date(alert.timestamp).toLocaleTimeString()}
           </p>
          </div>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>

    {/* Real-time Charts */}
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">CPU & Memory Usage</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       CPU and memory usage chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Network Traffic</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Network traffic chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Disk I/O</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       Disk I/O chart will be displayed here
      </div>
     </div>
     <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">System Load</h4>
      <div className="h-64 flex items-center justify-center text-gray-500">
       System load chart will be displayed here
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 