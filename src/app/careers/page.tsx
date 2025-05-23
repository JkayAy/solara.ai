'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Briefcase, Users, Rocket, Heart, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CareersPage() {
 const values = [
  {
   icon: Rocket,
   title: "Innovation",
   description: "Pushing boundaries and exploring new possibilities"
  },
  {
   icon: Users,
   title: "Collaboration",
   description: "Working together to achieve extraordinary results"
  },
  {
   icon: Heart,
   title: "Passion",
   description: "Loving what we do and making an impact"
  },
  {
   icon: Zap,
   title: "Excellence",
   description: "Striving for the highest quality in everything we do"
  }
 ];

 const benefits = [
  {
   title: "Health & Wellness",
   items: ["Comprehensive health coverage", "Mental health support", "Fitness reimbursement"]
  },
  {
   title: "Learning & Growth",
   items: ["Professional development", "Conference attendance", "Learning resources"]
  },
  {
   title: "Work-Life Balance",
   items: ["Flexible hours", "Remote work options", "Generous PTO"]
  },
  {
   title: "Perks & Benefits",
   items: ["Competitive salary", "Stock options", "Home office setup"]
  }
 ];

 const openPositions = [
  {
   title: "Senior Software Engineer",
   location: "Remote",
   type: "Full-time",
   department: "Engineering"
  },
  {
   title: "Product Designer",
   location: "San Francisco",
   type: "Full-time",
   department: "Design"
  },
  {
   title: "AI Research Scientist",
   location: "Remote",
   type: "Full-time",
   department: "Research"
  },
  {
   title: "Customer Success Manager",
   location: "New York",
   type: "Full-time",
   department: "Customer Success"
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
        Build the future of AI with us
       </p>
      </div>
     </div>
    </section>

    {/* Values Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {values.map((value) => (
        <motion.div
         key={value.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card text-center"
        >
         <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
         <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
         <p className="text-muted-foreground">{value.description}</p>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Benefits Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {benefits.map((benefit) => (
        <motion.div
         key={benefit.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
         <ul className="space-y-2">
          {benefit.items.map((item) => (
           <li key={item} className="flex items-center text-muted-foreground">
            <Heart className="w-4 h-4 text-primary mr-2" />
            {item}
           </li>
          ))}
         </ul>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Open Positions Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
      <div className="grid gap-6 max-w-4xl mx-auto">
       {openPositions.map((position) => (
        <motion.div
         key={position.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
           <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
             <Globe className="w-4 h-4 mr-1" />
             {position.location}
            </span>
            <span>•</span>
            <span>{position.type}</span>
            <span>•</span>
            <span>{position.department}</span>
           </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
           Apply Now
           <Briefcase className="ml-2 w-4 h-4" />
          </button>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Don't See the Right Role?</h2>
       <p className="text-muted-foreground mb-8">
        We're always looking for talented individuals to join our team
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Send Us Your Resume
        <Briefcase className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 