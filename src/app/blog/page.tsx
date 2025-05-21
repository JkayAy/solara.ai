'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Search, Calendar, Tag, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

const categories = [
 'All Posts',
 'Product Updates',
 'Engineering',
 'Company News',
 'AI & Machine Learning',
 'Best Practices',
];

const blogPosts = [
 {
  id: 1,
  title: 'Introducing Our New AI-Powered Analytics Dashboard',
  excerpt: 'We\'re excited to announce the launch of our new analytics dashboard, powered by advanced machine learning algorithms.',
  category: 'Product Updates',
  date: 'March 15, 2024',
  readTime: '5 min read',
  image: '/blog/analytics-dashboard.jpg',
  featured: true,
 },
 {
  id: 2,
  title: 'How We\'re Scaling Our Infrastructure for Global Growth',
  excerpt: 'Learn about the technical challenges we faced and the solutions we implemented to scale our platform globally.',
  category: 'Engineering',
  date: 'March 10, 2024',
  readTime: '8 min read',
  image: '/blog/infrastructure.jpg',
  featured: true,
 },
 {
  id: 3,
  title: 'The Future of AI in Business Automation',
  excerpt: 'Exploring the latest trends and developments in AI-powered business automation.',
  category: 'AI & Machine Learning',
  date: 'March 5, 2024',
  readTime: '6 min read',
  image: '/blog/ai-automation.jpg',
  featured: false,
 },
 {
  id: 4,
  title: 'Best Practices for Implementing AI in Your Workflow',
  excerpt: 'A comprehensive guide to successfully integrating AI tools into your business processes.',
  category: 'Best Practices',
  date: 'February 28, 2024',
  readTime: '7 min read',
  image: '/blog/ai-implementation.jpg',
  featured: false,
 },
 {
  id: 5,
  title: 'Announcing Our Series A Funding Round',
  excerpt: 'We\'re thrilled to announce our Series A funding round and our plans for the future.',
  category: 'Company News',
  date: 'February 20, 2024',
  readTime: '4 min read',
  image: '/blog/funding.jpg',
  featured: false,
 },
 {
  id: 6,
  title: 'Building a Culture of Innovation',
  excerpt: 'How we foster innovation and creativity within our team.',
  category: 'Company News',
  date: 'February 15, 2024',
  readTime: '5 min read',
  image: '/blog/innovation.jpg',
  featured: false,
 },
];

export default function BlogPage() {
 const [selectedCategory, setSelectedCategory] = useState('All Posts');
 const [searchQuery, setSearchQuery] = useState('');

 const filteredPosts = blogPosts.filter(post => {
  const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
  const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
 });

 const featuredPosts = filteredPosts.filter(post => post.featured);
 const regularPosts = filteredPosts.filter(post => !post.featured);

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Solara Blog
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Insights, updates, and stories from our team
       </p>
       <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
         type="text"
         placeholder="Search articles..."
         className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
       </div>
      </div>
     </div>
    </section>

    {/* Categories */}
    <section className="py-12 bg-background">
     <div className="container">
      <div className="flex flex-wrap justify-center gap-4">
       {categories.map((category) => (
        <button
         key={category}
         onClick={() => setSelectedCategory(category)}
         className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted hover:bg-muted/80'
          }`}
        >
         {category}
        </button>
       ))}
      </div>
     </div>
    </section>

    {/* Featured Posts */}
    {featuredPosts.length > 0 && (
     <section className="py-20 bg-muted/50">
      <div className="container">
       <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {featuredPosts.map((post) => (
          <motion.article
           key={post.id}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-6 rounded-lg border bg-card"
          >
           <div className="aspect-video bg-muted rounded-lg mb-6">
            {/* Add actual images when available */}
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
             <Tag className="w-8 h-8 text-primary" />
            </div>
           </div>
           <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center">
             <Calendar className="w-4 h-4 mr-2" />
             {post.date}
            </span>
            <span className="flex items-center">
             <Clock className="w-4 h-4 mr-2" />
             {post.readTime}
            </span>
           </div>
           <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
           <p className="text-muted-foreground mb-4">{post.excerpt}</p>
           <button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            Read More
            <ArrowRight className="ml-2 w-4 h-4" />
           </button>
          </motion.article>
         ))}
        </div>
       </div>
      </div>
     </section>
    )}

    {/* Regular Posts */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
         <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border bg-card"
         >
          <div className="aspect-video bg-muted rounded-lg mb-6">
           {/* Add actual images when available */}
           <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <Tag className="w-8 h-8 text-primary" />
           </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
           <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {post.date}
           </span>
           <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {post.readTime}
           </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
          <button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
           Read More
           <ArrowRight className="ml-2 w-4 h-4" />
          </button>
         </motion.article>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Newsletter Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
       <p className="text-muted-foreground mb-8">
        Get the latest updates, news, and insights delivered straight to your inbox.
       </p>
       <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <input
         type="email"
         placeholder="Enter your email"
         className="flex-1 px-4 py-3 rounded-lg border bg-background"
        />
        <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
         Subscribe
        </button>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 