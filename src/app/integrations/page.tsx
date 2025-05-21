'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Zap, Database, MessageSquare, Calendar, Mail, FileText, Users, CreditCard, Settings } from "lucide-react";

const categories = [
 { id: 'all', name: 'All Integrations' },
 { id: 'productivity', name: 'Productivity' },
 { id: 'communication', name: 'Communication' },
 { id: 'finance', name: 'Finance' },
 { id: 'marketing', name: 'Marketing' },
];

const integrations = [
 {
  name: 'Slack',
  description: 'Connect with your team in real-time',
  category: 'communication',
  icon: MessageSquare,
  status: 'active',
 },
 {
  name: 'Google Calendar',
  description: 'Sync your schedule seamlessly',
  category: 'productivity',
  icon: Calendar,
  status: 'active',
 },
 {
  name: 'Gmail',
  description: 'Manage your emails efficiently',
  category: 'communication',
  icon: Mail,
  status: 'active',
 },
 {
  name: 'Notion',
  description: 'Organize your workspace',
  category: 'productivity',
  icon: FileText,
  status: 'active',
 },
 {
  name: 'HubSpot',
  description: 'Streamline your marketing',
  category: 'marketing',
  icon: Users,
  status: 'active',
 },
 {
  name: 'Stripe',
  description: 'Process payments securely',
  category: 'finance',
  icon: CreditCard,
  status: 'active',
 },
 {
  name: 'MongoDB',
  description: 'Store and manage your data',
  category: 'productivity',
  icon: Database,
  status: 'active',
 },
 {
  name: 'Zapier',
  description: 'Automate your workflows',
  category: 'productivity',
  icon: Zap,
  status: 'active',
 },
];

export default function IntegrationsPage() {
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [searchQuery, setSearchQuery] = useState('');

 const filteredIntegrations = integrations.filter(integration => {
  const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
  const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   integration.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
 });

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Integrations
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Connect Solara with your favorite tools and services
       </p>
       <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
         type="text"
         placeholder="Search integrations..."
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
         key={category.id}
         onClick={() => setSelectedCategory(category.id)}
         className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id
           ? 'bg-primary text-primary-foreground'
           : 'bg-muted hover:bg-muted/80'
          }`}
        >
         {category.name}
        </button>
       ))}
      </div>
     </div>
    </section>

    {/* Integrations Grid */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {filteredIntegrations.map((integration, index) => (
        <motion.div
         key={integration.name}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
        >
         <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
           <integration.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
           <h3 className="font-semibold">{integration.name}</h3>
           <p className="text-sm text-muted-foreground">{integration.description}</p>
          </div>
         </div>
         <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Connect
         </button>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Need a Custom Integration?</h2>
       <p className="text-muted-foreground mb-8">
        We can help you build a custom integration for your specific needs
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Contact Sales
        <Settings className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 