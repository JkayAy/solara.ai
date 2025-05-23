'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Handshake, Users, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnersPage() {
 const benefits = [
  {
   icon: Handshake,
   title: "Strategic Partnership",
   description: "Join our network of industry leaders and innovators"
  },
  {
   icon: Users,
   title: "Community Access",
   description: "Connect with our global community of developers and businesses"
  },
  {
   icon: Award,
   title: "Exclusive Benefits",
   description: "Get access to premium features and early product releases"
  },
  {
   icon: Globe,
   title: "Global Reach",
   description: "Expand your market presence with our international network"
  }
 ];

 const partnerTypes = [
  {
   title: "Technology Partners",
   description: "Integrate your technology with our platform"
  },
  {
   title: "Solution Partners",
   description: "Build and deliver custom solutions"
  },
  {
   title: "Channel Partners",
   description: "Resell and distribute our products"
  },
  {
   title: "Strategic Partners",
   description: "Collaborate on joint initiatives and innovations"
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
        Partner With Us
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Join our ecosystem of innovative partners and grow together
       </p>
      </div>
     </div>
    </section>

    {/* Benefits Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Partner Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {benefits.map((benefit) => (
        <motion.div
         key={benefit.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <benefit.icon className="w-12 h-12 text-primary mb-4" />
         <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
         <p className="text-muted-foreground">{benefit.description}</p>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Partner Types Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Partner Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {partnerTypes.map((type) => (
        <motion.div
         key={type.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-8 rounded-lg border bg-card"
        >
         <h3 className="text-2xl font-semibold mb-4">{type.title}</h3>
         <p className="text-muted-foreground mb-6">{type.description}</p>
         <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Learn More
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
       <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
       <p className="text-muted-foreground mb-8">
        Join our partner program and start growing your business today
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Become a Partner
        <Handshake className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 