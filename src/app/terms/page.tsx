'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  const termsSections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: 'Welcome to Solara. By accessing our services, you agree to these terms.'
    },
    {
      id: 'definitions',
      title: 'Definitions',
      content: 'Key terms used throughout these Terms of Service.'
    },
    {
      id: 'services',
      title: 'Services',
      content: 'Description of the services provided by Solara.'
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      content: 'Rules and guidelines for user accounts and responsibilities.'
    },
    {
      id: 'privacy',
      title: 'Privacy',
      content: 'How we handle and protect your data.'
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: 'Rights and restrictions regarding intellectual property.'
    }
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
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Last updated: March 15, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Table of Contents */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
                    <nav className="space-y-2">
                      {termsSections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Terms Content */}
                <div className="lg:col-span-3">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {termsSections.map((section) => (
                      <motion.div
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                      >
                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                        <p className="text-muted-foreground">{section.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Questions About Our Terms?</h2>
              <p className="text-muted-foreground mb-8">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Contact Legal Team
                <FileText className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 