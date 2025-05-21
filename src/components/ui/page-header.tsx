import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
 title: string;
 backHref?: string;
 children?: React.ReactNode;
}

export function PageHeader({ title, backHref, children }: PageHeaderProps) {
 return (
  <div className="flex items-center justify-between mb-6">
   <div className="flex items-center">
    {backHref && (
     <Link
      href={backHref}
      className="mr-4 p-2 rounded-full hover:bg-gray-100"
     >
      <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
     </Link>
    )}
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
   </div>
   {children}
  </div>
 );
} 