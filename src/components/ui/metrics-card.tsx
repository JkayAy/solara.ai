import React from 'react';

interface MetricsCardProps {
 title: string;
 value: string | number;
 icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
 trend?: {
  value: number;
  isPositive: boolean;
 };
 className?: string;
}

export function MetricsCard({ title, value, icon: Icon, trend, className = '' }: MetricsCardProps) {
 return (
  <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
   <div className="px-4 py-5 sm:p-6">
    <div className="flex items-center">
     {Icon && (
      <div className="flex-shrink-0">
       <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </div>
     )}
     <div className="ml-5 w-0 flex-1">
      <dt className="text-sm font-medium text-gray-500 truncate">
       {title}
      </dt>
      <dd className="flex items-baseline">
       <div className="text-2xl font-semibold text-gray-900">
        {value}
       </div>
       {trend && (
        <div
         className={`ml-2 flex items-baseline text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
         {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
       )}
      </dd>
     </div>
    </div>
   </div>
  </div>
 );
} 