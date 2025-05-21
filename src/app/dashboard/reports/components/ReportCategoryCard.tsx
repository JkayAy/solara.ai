'use client';

import Link from 'next/link';
import {
 ChartBarIcon,
 ChartPieIcon,
 ExclamationTriangleIcon,
 DocumentTextIcon,
} from '@heroicons/react/24/outline';
import type { ReportCategory } from '@/lib/data';

interface ReportCategoryCardProps {
 category: ReportCategory;
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
 ChartBarIcon,
 ChartPieIcon,
 ExclamationTriangleIcon,
 DocumentTextIcon,
};

export function ReportCategoryCard({ category }: ReportCategoryCardProps) {
 const Icon = iconMap[category.icon];

 return (
  <div
   key={category.id}
   className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
   <div className="flex-shrink-0">
    {Icon && <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />}
   </div>
   <div className="flex-1 min-w-0">
    <Link href={category.href} className="focus:outline-none">
     <span className="absolute inset-0" aria-hidden="true" />
     <p className="text-sm font-medium text-gray-900">{category.title}</p>
     <p className="text-sm text-gray-500 truncate">{category.description}</p>
    </Link>
   </div>
  </div>
 );
} 