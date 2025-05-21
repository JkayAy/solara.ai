'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Shield, Lock, Server, Key, Eye, FileCheck, AlertTriangle } from "lucide-react";

const securityFeatures = [
 {
  title: 'Data Encryption',
  description: 'All data is encrypted both in transit and at rest using industry-standard encryption protocols.',
  icon: Lock,
 },
 {
  title: 'Secure Infrastructure',
  description: 'Our infrastructure is built on secure cloud platforms with regular security audits and updates.',
  icon: Server,
 },
 {
  title: 'Access Control',
  description: 'Role-based access control ensures that users only have access to the data they need.',
  icon: Key,
 },
 {
  title: 'Privacy Protection',
  description: 'We implement strict privacy controls and comply with global data protection regulations.',
  icon: Eye,
 },
 {
  title: 'Regular Audits',
  description: 'Our systems undergo regular security audits and penetration testing.',
  icon: FileCheck,
 },
 {
  title: 'Incident Response',
  description: 'We have a dedicated team and procedures for handling security incidents.',
  icon: AlertTriangle,
 },
];

const complianceStandards = [
 'GDPR Compliance',
 'SOC 2 Type II',
 'ISO 27001',
 'HIPAA Compliance',
 'PCI DSS',
];

export default function SecurityPage() {
 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <div className="inline-block p-3 rounded-full bg-primary/10 mb-6">
        <Shield className="w-8 h-8 text-primary" />
       </div>
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Security at Solara
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Your data security is our top priority. Learn about our comprehensive security measures and practices.
       </p>
      </div>
     </div>
    </section>

    {/* Security Features */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-12 text-center">Our Security Features</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {securityFeatures.map((feature) => (
         <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border bg-card"
         >
          <feature.icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Compliance */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-12 text-center">Compliance & Standards</h2>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {complianceStandards.map((standard) => (
         <motion.div
          key={standard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-lg border bg-card text-center"
         >
          <p className="font-medium">{standard}</p>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Security Practices */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-12 text-center">Security Practices</h2>
       <div className="space-y-8">
        <div className="p-6 rounded-lg border bg-card">
         <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
         <ul className="space-y-2 text-muted-foreground">
          <li>• End-to-end encryption for all data transfers</li>
          <li>• Regular security updates and patches</li>
          <li>• Secure data centers with 24/7 monitoring</li>
          <li>• Automated backup systems</li>
         </ul>
        </div>
        <div className="p-6 rounded-lg border bg-card">
         <h3 className="text-xl font-semibold mb-4">Access Management</h3>
         <ul className="space-y-2 text-muted-foreground">
          <li>• Multi-factor authentication</li>
          <li>• Role-based access controls</li>
          <li>• Session management and timeout</li>
          <li>• Activity logging and monitoring</li>
         </ul>
        </div>
        <div className="p-6 rounded-lg border bg-card">
         <h3 className="text-xl font-semibold mb-4">Incident Response</h3>
         <ul className="space-y-2 text-muted-foreground">
          <li>• 24/7 security monitoring</li>
          <li>• Rapid incident response team</li>
          <li>• Regular security drills</li>
          <li>• Transparent communication protocols</li>
         </ul>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* Contact Security Team */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Security Concerns?</h2>
       <p className="text-muted-foreground mb-8">
        If you have any security concerns or would like to report a vulnerability, please contact our security team.
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Contact Security Team
        <Shield className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 