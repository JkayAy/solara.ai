import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BackButtonProps {
 href: string;
 label?: string;
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
 return (
  <Link
   href={href}
   className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
  >
   <ArrowLeftIcon className="h-5 w-5 mr-2" />
   {label}
  </Link>
 );
} 