'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Search, Book, MessageSquare, Video, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Book,
      title: "Documentation",
      description: "Detailed guides and API references",
      href: "/docs"
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      href: "/community"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides and webinars",
      href: "/tutorials"
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Articles and best practices",
      href: "/kb"
    }
  ];

  const popularTopics = [
    "Getting Started Guide",
    "Account Setup",
    "API Integration",
    "Billing & Subscription",
    "Security Best Practices",
    "Troubleshooting Common Issues"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                How can we help?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to your questions and learn more about Solara
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <motion.a
                  key={category.title}
                  href={category.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                >
                  <category.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Topics Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Popular Topics</h2>
              <div className="grid gap-4">
                {popularTopics.map((topic) => (
                  <motion.a
                    key={topic}
                    href={`/kb/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold">{topic}</h3>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Our support team is here to help you with any questions
              </p>
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Contact Support
                <Mail className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 