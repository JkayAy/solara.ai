import React from 'react';

interface PageHeaderProps {
 title: string;
 description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
 return (
  <div className="mb-8">
   <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
   <p className="mt-2 text-sm text-gray-600">{description}</p>
  </div>
 );
} 