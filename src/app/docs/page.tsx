'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Book, Code, Settings, Users, Shield, Star, ChevronRight, Menu } from "lucide-react";

const categories = [
 {
  title: 'Getting Started',
  items: [
   { title: 'Introduction', href: '#introduction' },
   { title: 'Quick Start Guide', href: '#quick-start' },
   { title: 'Installation', href: '#installation' },
   { title: 'Configuration', href: '#configuration' },
  ],
 },
 {
  title: 'Core Features',
  items: [
   { title: 'Authentication', href: '#auth' },
   { title: 'User Management', href: '#users' },
   { title: 'Data Models', href: '#models' },
   { title: 'API Integration', href: '#api' },
  ],
 },
 {
  title: 'Advanced Topics',
  items: [
   { title: 'Customization', href: '#customization' },
   { title: 'Security', href: '#security' },
   { title: 'Performance', href: '#performance' },
   { title: 'Deployment', href: '#deployment' },
  ],
 },
];

const articles = [
 {
  id: 'introduction',
  title: 'Introduction to Solara',
  content: `
      Solara is a powerful AI-powered operating system designed for solo professionals.
      This documentation will guide you through all the features and capabilities of our platform.
    `,
 },
 {
  id: 'quick-start',
  title: 'Quick Start Guide',
  content: `
      Get up and running with Solara in minutes. Follow these simple steps to start using our platform:
      1. Create an account
      2. Set up your profile
      3. Configure your workspace
      4. Start using the features
    `,
 },
 // Add more articles as needed
];

export default function DocumentationPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 const filteredArticles = articles.filter(article =>
  article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  article.content.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Documentation
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Everything you need to know about Solara
       </p>
       <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
         type="text"
         placeholder="Search documentation..."
         className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
       </div>
      </div>
     </div>
    </section>

    {/* Documentation Content */}
    <section className="py-12">
     <div className="container">
      <div className="flex gap-8">
       {/* Sidebar */}
       <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -300, opacity: isSidebarOpen ? 1 : 0 }}
        className="w-64 fixed lg:static bg-background border-r p-6 h-[calc(100vh-4rem)] overflow-y-auto"
       >
        <button
         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
         className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-muted"
        >
         <Menu className="w-6 h-6" />
        </button>
        <nav className="space-y-8">
         {categories.map((category) => (
          <div key={category.title}>
           <h3 className="font-semibold mb-4">{category.title}</h3>
           <ul className="space-y-2">
            {category.items.map((item) => (
             <li key={item.title}>
              <a
               href={item.href}
               className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
               <ChevronRight className="w-4 h-4 mr-2" />
               {item.title}
              </a>
             </li>
            ))}
           </ul>
          </div>
         ))}
        </nav>
       </motion.aside>

       {/* Main Content */}
       <div className="flex-1 lg:ml-64">
        <div className="prose prose-gray dark:prose-invert max-w-none">
         {filteredArticles.map((article) => (
          <motion.article
           key={article.id}
           id={article.id}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
          >
           <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
           <div className="text-muted-foreground whitespace-pre-line">
            {article.content}
           </div>
          </motion.article>
         ))}
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* Feedback Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
       <p className="text-muted-foreground mb-8">
        Can't find what you're looking for? Our support team is here to help
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Contact Support
        <Users className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 