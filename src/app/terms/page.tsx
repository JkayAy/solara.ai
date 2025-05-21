'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ScrollText, FileText, AlertCircle, Shield, Clock, Scale } from "lucide-react";
import { useState } from "react";

const termsSections = [
 {
  id: 'introduction',
  title: 'Introduction',
  content: `Welcome to Solara. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully.`,
 },
 {
  id: 'definitions',
  title: 'Definitions',
  content: `"Service" refers to the Solara platform and all related services. "User" refers to any individual or entity using our Service. "Content" refers to any data, information, or material uploaded, stored, or processed through our Service.`,
 },
 {
  id: 'account',
  title: 'Account Terms',
  content: `You must be at least 18 years old to use this Service. You are responsible for maintaining the security of your account and password. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.`,
 },
 {
  id: 'usage',
  title: 'Acceptable Use',
  content: `You agree not to use the Service for any illegal purpose or in violation of any local, state, national, or international law. You must not transmit any worms, viruses, or any code of a destructive nature.`,
 },
 {
  id: 'privacy',
  title: 'Privacy',
  content: `Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.`,
 },
 {
  id: 'termination',
  title: 'Termination',
  content: `We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the Service, us, or third parties, or for any other reason.`,
 },
 {
  id: 'changes',
  title: 'Changes to Terms',
  content: `We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last Updated" date.`,
 },
 {
  id: 'liability',
  title: 'Limitation of Liability',
  content: `In no event shall Solara, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`,
 },
];

export default function TermsPage() {
 const [activeSection, setActiveSection] = useState('introduction');

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <div className="inline-block p-3 rounded-full bg-primary/10 mb-6">
        <ScrollText className="w-8 h-8 text-primary" />
       </div>
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
      <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
         <div className="sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Contents</h2>
          <nav className="space-y-2">
           {termsSections.map((section) => (
            <button
             key={section.id}
             onClick={() => setActiveSection(section.id)}
             className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeSection === section.id
               ? 'bg-primary text-primary-foreground'
               : 'hover:bg-muted'
              }`}
            >
             {section.title}
            </button>
           ))}
          </nav>
         </div>
        </div>

        {/* Content */}
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