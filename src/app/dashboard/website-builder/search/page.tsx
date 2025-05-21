'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Search, Filter, Grid, List, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Template {
 id: string;
 name: string;
 description: string;
 category: string;
 features: string[];
 image: string;
 tags: string[];
}

const templates: Template[] = [
 {
  id: 'business',
  name: 'Business',
  description: 'Professional business website with modern design',
  category: 'Business',
  features: ['About Us', 'Services', 'Portfolio', 'Contact Form', 'Blog'],
  image: 'https://placehold.co/600x400/2563eb/ffffff?text=Business+Template',
  tags: ['business', 'professional', 'modern']
 },
 {
  id: 'ecommerce',
  name: 'E-commerce',
  description: 'Full-featured online store with product management',
  category: 'E-commerce',
  features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Management', 'Customer Reviews'],
  image: 'https://placehold.co/600x400/16a34a/ffffff?text=E-commerce+Template',
  tags: ['ecommerce', 'store', 'products']
 },
 {
  id: 'portfolio',
  name: 'Portfolio',
  description: 'Creative portfolio showcase with gallery',
  category: 'Portfolio',
  features: ['Project Showcase', 'Image Gallery', 'Testimonials', 'Skills Section', 'Contact Form'],
  image: 'https://placehold.co/600x400/9333ea/ffffff?text=Portfolio+Template',
  tags: ['portfolio', 'creative', 'gallery']
 },
 {
  id: 'blog',
  name: 'Blog',
  description: 'Content-focused blog with modern layout',
  category: 'Blog',
  features: ['Article Management', 'Categories', 'Comments', 'Newsletter', 'Social Sharing'],
  image: 'https://placehold.co/600x400/d97706/ffffff?text=Blog+Template',
  tags: ['blog', 'content', 'articles']
 }
];

const categories = ['All', 'Business', 'E-commerce', 'Portfolio', 'Blog'];

export default function TemplateSearchPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

 const filteredTemplates = templates.filter(template => {
  const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
   template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

  const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;

  return matchesSearch && matchesCategory;
 });

 return (
  <div className="space-y-6">
   <PageHeader
    title="Browse Templates"
    description="Find the perfect template for your website"
   />

   {/* Search and Filter Bar */}
   <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex flex-col md:flex-row gap-4">
     <div className="flex-1">
      <div className="relative">
       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
       <input
        type="text"
        placeholder="Search templates..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       />
      </div>
     </div>
     <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
       <Filter className="text-gray-400" />
       <select
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
       >
        {categories.map(category => (
         <option key={category} value={category}>
          {category}
         </option>
        ))}
       </select>
      </div>
      <div className="flex items-center gap-2">
       <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-400'
         }`}
       >
        <Grid className="h-5 w-5" />
       </button>
       <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400'
         }`}
       >
        <List className="h-5 w-5" />
       </button>
      </div>
     </div>
    </div>
   </div>

   {/* Templates Grid/List */}
   <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
    {filteredTemplates.map((template) => (
     <motion.div
      key={template.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${viewMode === 'list' ? 'flex' : ''
       }`}
     >
      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'aspect-video'}`}>
       <Image
        src={template.image}
        alt={template.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       />
      </div>
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
       <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
         {template.category}
        </span>
       </div>
       <p className="text-gray-600 mb-4">{template.description}</p>
       <div className="space-y-2">
        {template.features.map((feature) => (
         <div key={feature} className="flex items-center text-sm text-gray-500">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          {feature}
         </div>
        ))}
       </div>
       <div className="mt-4 flex flex-wrap gap-2">
        {template.tags.map((tag) => (
         <span
          key={tag}
          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
         >
          #{tag}
         </span>
        ))}
       </div>
       <div className="mt-6">
        <Link
         href={`/dashboard/website-builder/create?template=${template.id}`}
         className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
        >
         Use Template
        </Link>
       </div>
      </div>
     </motion.div>
    ))}
   </div>
  </div>
 );
} 