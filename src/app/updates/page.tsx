'use client';

import React from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Sparkles, Zap, Settings, Users, Shield, Star, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const categories = [
 { id: 'all', name: 'All Updates', icon: Sparkles },
 { id: 'features', name: 'New Features', icon: Star },
 { id: 'improvements', name: 'Improvements', icon: Zap },
 { id: 'fixes', name: 'Bug Fixes', icon: Shield },
];

const updates = [
 {
  version: '1.2.0',
  date: 'March 15, 2024',
  category: 'features',
  title: 'Advanced Analytics Dashboard',
  description: 'Introducing our new analytics dashboard with real-time insights and customizable reports.',
  changes: [
   'Real-time data visualization',
   'Custom report builder',
   'Export functionality',
  ],
 },
 {
  version: '1.1.5',
  date: 'March 10, 2024',
  category: 'improvements',
  title: 'Performance Optimizations',
  description: 'Significant performance improvements across the platform.',
  changes: [
   'Reduced load times by 40%',
   'Optimized database queries',
   'Improved caching system',
  ],
 },
 {
  version: '1.1.4',
  date: 'March 5, 2024',
  category: 'fixes',
  title: 'Bug Fixes and Stability',
  description: 'Various bug fixes and stability improvements.',
  changes: [
   'Fixed authentication issues',
   'Resolved data sync problems',
   'Improved error handling',
  ],
 },
];

const UpdatesPage = () => {
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [searchQuery, setSearchQuery] = useState('');

 const filteredUpdates = updates.filter(update => {
  const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
  const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   update.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
 });

 return React.createElement(
  'div',
  { className: 'min-h-screen flex flex-col' },
  React.createElement(Header),
  React.createElement(
   'main',
   { className: 'flex-1' },
   React.createElement(
    'div',
    { className: 'py-20 bg-gradient-to-b from-background to-muted/50' },
    React.createElement(
     'div',
     { className: 'container' },
     React.createElement(
      'div',
      { className: 'max-w-3xl mx-auto text-center' },
      React.createElement('h1', { className: 'text-4xl md:text-6xl font-bold mb-6' }, 'Product Updates'),
      React.createElement('p', { className: 'text-xl text-muted-foreground mb-8' }, 'Stay up to date with our latest features and improvements'),
      React.createElement(
       'div',
       { className: 'relative max-w-xl mx-auto' },
       React.createElement(Search, { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' }),
       React.createElement('input', {
        type: 'text',
        placeholder: 'Search updates...',
        className: 'w-full pl-10 pr-4 py-3 rounded-lg border bg-background',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value)
       })
      )
     )
    )
   ),
   React.createElement(
    'div',
    { className: 'py-12 bg-background' },
    React.createElement(
     'div',
     { className: 'container' },
     React.createElement(
      'div',
      { className: 'flex flex-wrap justify-center gap-4' },
      categories.map((category) =>
       React.createElement(
        'button',
        {
         key: category.id,
         onClick: () => setSelectedCategory(category.id),
         className: `inline-flex items-center px-4 py-2 rounded-full transition-colors ${
          selectedCategory === category.id
           ? 'bg-primary text-primary-foreground'
           : 'bg-muted hover:bg-muted/80'
         }`
        },
        React.createElement(category.icon, { className: 'w-4 h-4 mr-2' }),
        category.name
       )
      )
     )
    )
   ),
   React.createElement(
    'div',
    { className: 'py-20 bg-muted/50' },
    React.createElement(
     'div',
     { className: 'container' },
     React.createElement(
      'div',
      { className: 'max-w-4xl mx-auto space-y-8' },
      filteredUpdates.map((update, index) =>
       React.createElement(
        motion.div,
        {
         key: update.version,
         initial: { opacity: 0, y: 20 },
         animate: { opacity: 1, y: 0 },
         transition: { delay: index * 0.1 },
         className: 'p-6 rounded-lg border bg-card'
        },
        React.createElement(
         'div',
         { className: 'flex items-start justify-between mb-4' },
         React.createElement(
          'div',
          null,
          React.createElement(
           'div',
           { className: 'flex items-center gap-2 mb-2' },
           React.createElement(
            'span',
            { className: 'px-2 py-1 text-sm rounded-full bg-primary/10 text-primary' },
            update.version
           ),
           React.createElement(
            'span',
            { className: 'text-sm text-muted-foreground' },
            update.date
           )
          ),
          React.createElement('h3', { className: 'text-xl font-semibold mb-2' }, update.title),
          React.createElement('p', { className: 'text-muted-foreground' }, update.description)
         ),
         React.createElement(
          'div',
          { className: 'p-2 rounded-lg bg-primary/10' },
          categories.find(c => c.id === update.category)?.icon &&
           React.createElement(categories.find(c => c.id === update.category)!.icon, {
            className: 'w-6 h-6 text-primary'
           })
         )
        ),
        React.createElement(
         'ul',
         { className: 'space-y-2' },
         update.changes.map((change) =>
          React.createElement(
           'li',
           { key: change, className: 'flex items-center text-sm' },
           React.createElement('span', { className: 'w-1.5 h-1.5 rounded-full bg-primary mr-2' }),
           change
          )
         )
        )
       )
      )
     )
    )
   ),
   React.createElement(
    'div',
    { className: 'py-20 bg-background' },
    React.createElement(
     'div',
     { className: 'container' },
     React.createElement(
      'div',
      { className: 'max-w-3xl mx-auto text-center' },
      React.createElement('h2', { className: 'text-3xl font-bold mb-6' }, 'Stay Updated'),
      React.createElement(
       'p',
       { className: 'text-muted-foreground mb-8' },
       'Subscribe to our newsletter to receive updates about new features and improvements'
      ),
      React.createElement(
       'div',
       { className: 'flex gap-4 max-w-md mx-auto' },
       React.createElement('input', {
        type: 'email',
        placeholder: 'Enter your email',
        className: 'flex-1 px-4 py-3 rounded-lg border bg-background'
       }),
       React.createElement(
        'button',
        { className: 'inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors' },
        'Subscribe',
        React.createElement(ArrowRight, { className: 'ml-2 w-4 h-4' })
       )
      )
     )
    )
   )
  ),
  React.createElement(Footer)
 );
};

export default UpdatesPage; 