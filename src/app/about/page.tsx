'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Users, Target, Heart, Zap, Award, Globe, ArrowRight } from "lucide-react";

const values = [
 {
  title: 'Innovation',
  description: 'We push boundaries and embrace new technologies to create better solutions.',
  icon: Zap,
 },
 {
  title: 'Customer First',
  description: 'Our customers are at the heart of everything we do.',
  icon: Heart,
 },
 {
  title: 'Excellence',
  description: 'We strive for excellence in every aspect of our work.',
  icon: Award,
 },
 {
  title: 'Global Impact',
  description: 'We aim to make a positive impact on businesses worldwide.',
  icon: Globe,
 },
];

const teamMembers = [
 {
  name: 'Sarah Johnson',
  role: 'CEO & Co-founder',
  bio: 'Former tech executive with 15+ years of experience in AI and enterprise software.',
  image: '/team/sarah.jpg',
 },
 {
  name: 'Michael Chen',
  role: 'CTO & Co-founder',
  bio: 'AI researcher and software architect with expertise in machine learning systems.',
  image: '/team/michael.jpg',
 },
 {
  name: 'Emily Rodriguez',
  role: 'Head of Product',
  bio: 'Product leader with a passion for creating intuitive user experiences.',
  image: '/team/emily.jpg',
 },
 {
  name: 'David Kim',
  role: 'Head of Engineering',
  bio: 'Full-stack developer and system architect with a focus on scalability.',
  image: '/team/david.jpg',
 },
];

export default function AboutPage() {
 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        About Solara
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        We're on a mission to revolutionize how businesses leverage AI and automation
       </p>
      </div>
     </div>
    </section>

    {/* Mission Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-xl text-muted-foreground">
         To empower businesses with intelligent automation and AI-driven insights,
         enabling them to focus on what matters most.
        </p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <Target className="w-8 h-8 text-primary mb-4" />
         <h3 className="text-xl font-semibold mb-2">What We Do</h3>
         <p className="text-muted-foreground">
          We build intelligent software solutions that help businesses automate
          complex workflows, make data-driven decisions, and scale their operations
          efficiently.
         </p>
        </motion.div>
        <motion.div
         initial={{ opacity: 0, x: 20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <Users className="w-8 h-8 text-primary mb-4" />
         <h3 className="text-xl font-semibold mb-2">Who We Serve</h3>
         <p className="text-muted-foreground">
          From startups to enterprises, we help organizations of all sizes
          transform their operations with cutting-edge AI and automation
          technology.
         </p>
        </motion.div>
       </div>
      </div>
     </div>
    </section>

    {/* Values Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value) => (
         <motion.div
          key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border bg-card text-center"
         >
          <value.icon className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
          <p className="text-muted-foreground">{value.description}</p>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Team Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
         <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border bg-card"
         >
          <div className="flex items-start space-x-4">
           <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
            {/* Add actual images when available */}
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
             <Users className="w-8 h-8 text-primary" />
            </div>
           </div>
           <div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-primary mb-2">{member.role}</p>
            <p className="text-muted-foreground">{member.bio}</p>
           </div>
          </div>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Join Us Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
       <p className="text-muted-foreground mb-8">
        We're always looking for talented individuals who share our passion for
        innovation and excellence.
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        View Open Positions
        <ArrowRight className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 