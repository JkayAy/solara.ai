'use client';

import type { ReportCategory } from '@/lib/data';
import { ReportCategoryCard } from './ReportCategoryCard';

interface ReportCategoriesProps {
 categories: ReportCategory[];
}

export function ReportCategories({ categories }: ReportCategoriesProps) {
 return (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
   {categories.map((category) => (
    <ReportCategoryCard key={category.id} category={category} />
   ))}
  </div>
 );
} 