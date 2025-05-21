'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Handshake, Star, Users, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnersPage() {
 const partnershipTypes = [
  {
   icon: Handshake,
   title: "Technology Partners",
   description: "Integrate our AI solutions into your platform and create powerful synergies"
  },
  {
   icon: Users,
   title: "Channel Partners",
   description: "Resell our solutions and provide value-added services to your customers"
  },
  {
   icon: Star,
   title: "Strategic Partners",
   description: "Collaborate on joint initiatives and co-create innovative solutions"
  }
 ];

 const benefits = [
  "Access to cutting-edge AI technology",
  "Dedicated partner support team",
  "Marketing and sales enablement",
  "Revenue sharing opportunities",
  "Technical training and certification",
  "Joint go-to-market strategies"
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
        Partner With Us
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Join our ecosystem and grow your business with AI-powered solutions
       </p>
      </div>
     </div>
    </section>

    {/* Partnership Types Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Partnership Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {partnershipTypes.map((type) => (
        <motion.div
         key={type.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <type.icon className="w-12 h-12 text-primary mb-4" />
         <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
         <p className="text-muted-foreground mb-4">{type.description}</p>
         <button className="text-primary hover:text-primary/80 transition-colors inline-flex items-center">
          Learn More
          <ArrowRight className="ml-2 w-4 h-4" />
         </button>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Benefits Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto">
       <h2 className="text-3xl font-bold text-center mb-12">Partner Benefits</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit) => (
         <motion.div
          key={benefit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 p-4 rounded-lg border bg-card"
         >
          <Star className="w-5 h-5 text-primary mt-1" />
          <span>{benefit}</span>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
       <p className="text-muted-foreground mb-8">
        Join our growing network of partners and unlock new opportunities
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Contact Partnership Team
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