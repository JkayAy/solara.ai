'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Building2, Users, Rocket, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CareersPage() {
 const benefits = [
  {
   icon: Building2,
   title: "Modern Workspace",
   description: "Work in a state-of-the-art office designed for collaboration and productivity"
  },
  {
   icon: Users,
   title: "Diverse Team",
   description: "Join a global team of talented individuals from different backgrounds"
  },
  {
   icon: Rocket,
   title: "Growth Opportunities",
   description: "Continuous learning and career advancement opportunities"
  },
  {
   icon: Heart,
   title: "Work-Life Balance",
   description: "Flexible hours and remote work options to maintain a healthy balance"
  }
 ];

 const openPositions = [
  {
   title: "Senior Software Engineer",
   department: "Engineering",
   location: "Remote",
   type: "Full-time"
  },
  {
   title: "Product Designer",
   department: "Design",
   location: "Remote",
   type: "Full-time"
  },
  {
   title: "AI Research Scientist",
   department: "Research",
   location: "Remote",
   type: "Full-time"
  },
  {
   title: "Customer Success Manager",
   department: "Customer Success",
   location: "Remote",
   type: "Full-time"
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
        Join Our Team
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Help us build the future of AI-powered business solutions
       </p>
      </div>
     </div>
    </section>

    {/* Benefits Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Why Join Solara?</h2>
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

    {/* Open Positions Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
      <div className="grid gap-6 max-w-3xl mx-auto">
       {openPositions.map((position) => (
        <motion.div
         key={position.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors"
        >
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
           <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{position.department}</span>
            <span>•</span>
            <span>{position.location}</span>
            <span>•</span>
            <span>{position.type}</span>
           </div>
          </div>
          <button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
           Apply Now
           <ArrowRight className="ml-2 w-4 h-4" />
          </button>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 