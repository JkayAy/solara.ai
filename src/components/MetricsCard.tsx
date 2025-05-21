import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface MetricsCardProps {
 title: string;
 value: string | number;
 icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
 trend?: number;
}

export function MetricsCard({ title, value, icon: Icon, trend }: MetricsCardProps) {
 return (
  <div className="bg-white rounded-lg shadow p-6">
   <div className="flex items-center justify-between">
    <div>
     <p className="text-sm font-medium text-gray-600">{title}</p>
     <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
    <div className="p-3 bg-primary/10 rounded-full">
     <Icon className="h-6 w-6 text-primary" />
    </div>
   </div>
   {trend !== undefined && (
    <div className="mt-4 flex items-center">
     {trend > 0 ? (
      <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
     ) : (
      <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
     )}
     <span className={`ml-2 text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
      {Math.abs(trend)}%
     </span>
     <span className="ml-2 text-sm text-gray-500">vs last period</span>
    </div>
   )}
  </div>
 );
} 