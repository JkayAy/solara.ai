import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
 title: string;
 description: string;
 icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
 href: string;
 onClick?: () => void;
}

export function FeatureCard({ title, description, icon: Icon, href, onClick }: FeatureCardProps) {
 const content = (
  <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
   <div className="flex-shrink-0">
    <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
   </div>
   <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-gray-900">{title}</p>
    <p className="text-sm text-gray-500 truncate">{description}</p>
   </div>
  </div>
 );

 if (onClick) {
  return (
   <button onClick={onClick} className="w-full text-left">
    {content}
   </button>
  );
 }

 return (
  <Link href={href} className="block">
   {content}
  </Link>
 );
} 