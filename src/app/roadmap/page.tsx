'use client';

import React from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Sparkles, Zap, Settings, Users, Shield, Star, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const statuses = [
 { id: 'all', name: 'All Features', icon: Sparkles },
 { id: 'planned', name: 'Planned', icon: Clock },
 { id: 'in-progress', name: 'In Progress', icon: ArrowRight },
 { id: 'completed', name: 'Completed', icon: CheckCircle2 },
];

const roadmapItems = [
 {
  title: 'AI-Powered Analytics',
  description: 'Advanced analytics powered by machine learning',
  status: 'in-progress',
  category: 'Analytics',
  progress: 75,
  features: [
   'Predictive analytics',
   'Custom report builder',
   'Real-time insights',
  ],
  estimatedRelease: 'Q2 2024',
 },
 {
  title: 'Mobile App',
  description: 'Native mobile applications for iOS and Android',
  status: 'planned',
  category: 'Platform',
  progress: 0,
  features: [
   'Offline support',
   'Push notifications',
   'Biometric authentication',
  ],
  estimatedRelease: 'Q3 2024',
 },
 {
  title: 'Advanced Automation',
  description: 'Enhanced workflow automation capabilities',
  status: 'planned',
  category: 'Productivity',
  progress: 0,
  features: [
   'Custom automation rules',
   'AI-powered suggestions',
   'Multi-step workflows',
  ],
  estimatedRelease: 'Q4 2024',
 },
 {
  title: 'Team Collaboration',
  description: 'Improved team collaboration features',
  status: 'completed',
  category: 'Collaboration',
  progress: 100,
  features: [
   'Real-time collaboration',
   'Team spaces',
   'Activity tracking',
  ],
  estimatedRelease: 'Q1 2024',
 },
];

const RoadmapPage: React.FC = () => {
 const [selectedStatus, setSelectedStatus] = useState('all');
 const [searchQuery, setSearchQuery] = useState('');

 const filteredItems = roadmapItems.filter(item => {
  const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
  const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   item.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesStatus && matchesSearch;
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
      React.createElement('h1', { className: 'text-4xl md:text-6xl font-bold mb-6' }, 'Product Roadmap'),
      React.createElement('p', { className: 'text-xl text-muted-foreground mb-8' }, 'See what we\'re building and what\'s coming next'),
      React.createElement(
       'div',
       { className: 'relative max-w-xl mx-auto' },
       React.createElement(Search, { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' }),
       React.createElement('input', {
        type: 'text',
        placeholder: 'Search roadmap items...',
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
      statuses.map((status) =>
       React.createElement(
        'button',
        {
         key: status.id,
         onClick: () => setSelectedStatus(status.id),
         className: `inline-flex items-center px-4 py-2 rounded-full transition-colors ${
          selectedStatus === status.id
           ? 'bg-primary text-primary-foreground'
           : 'bg-muted hover:bg-muted/80'
         }`
        },
        React.createElement(status.icon, { className: 'w-4 h-4 mr-2' }),
        status.name
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
      filteredItems.map((item, index) =>
       React.createElement(
        motion.div,
        {
         key: item.title,
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
            item.category
           ),
           React.createElement(
            'span',
            { className: 'text-sm text-muted-foreground' },
            item.estimatedRelease
           )
          ),
          React.createElement('h3', { className: 'text-xl font-semibold mb-2' }, item.title),
          React.createElement('p', { className: 'text-muted-foreground' }, item.description)
         ),
         React.createElement(
          'div',
          { className: 'p-2 rounded-lg bg-primary/10' },
          statuses.find(s => s.id === item.status)?.icon &&
           React.createElement(statuses.find(s => s.id === item.status)!.icon, {
            className: 'w-6 h-6 text-primary'
           })
         )
        ),
        React.createElement(
         'div',
         { className: 'mb-4' },
         React.createElement(
          'div',
          { className: 'h-2 bg-muted rounded-full overflow-hidden' },
          React.createElement('div', {
           className: 'h-full bg-primary transition-all duration-500',
           style: { width: `${item.progress}%` }
          })
         ),
         React.createElement(
          'div',
          { className: 'flex justify-between text-sm text-muted-foreground mt-1' },
          React.createElement('span', null, 'Progress'),
          React.createElement('span', null, `${item.progress}%`)
         )
        ),
        React.createElement(
         'ul',
         { className: 'space-y-2' },
         item.features.map((feature) =>
          React.createElement(
           'li',
           { key: feature, className: 'flex items-center text-sm' },
           React.createElement('span', { className: 'w-1.5 h-1.5 rounded-full bg-primary mr-2' }),
           feature
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
      React.createElement('h2', { className: 'text-3xl font-bold mb-6' }, 'Have a Feature Request?'),
      React.createElement(
       'p',
       { className: 'text-muted-foreground mb-8' },
       'We\'d love to hear your ideas and suggestions for future features'
      ),
      React.createElement(
       'button',
       { className: 'inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors' },
       'Submit Feature Request',
       React.createElement(ArrowRight, { className: 'ml-2 w-4 h-4' })
      )
     )
    )
   )
  ),
  React.createElement(Footer)
 );
};

export default RoadmapPage; 