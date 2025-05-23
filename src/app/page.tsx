'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, SignInButton, SignUpButton } from '@clerk/nextjs';
import { ArrowRight, Mail, Calendar, FileText, Users, Sparkles, MessageSquare, CheckCircle2, Zap, Shield, Clock, BarChart, ClipboardList, Receipt, GlobeAltIcon } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const featureVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    if (userId) {
      router.push('/dashboard');
    }
  }, [userId, router]);

  const handleFeatureClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!userId) {
      setSelectedFeature(href);
    } else {
      router.push(href);
    }
  };

  const features = [
    {
      title: "Website Builder",
      description: "AI-powered website generator that creates fully structured, responsive websites with best practices and sample data",
      icon: Sparkles,
      href: "/dashboard/website-builder",
      benefits: [
        "One-click website generation",
        "Industry-standard templates",
        "SEO-optimized structure",
        "Mobile-responsive design",
        "Sample content generation",
        "Built-in analytics"
      ]
    },
    {
      title: "Integrations Hub",
      description: "Connect and manage all your favorite tools and services in one place with seamless integration",
      icon: Zap,
      href: "/dashboard/integrations",
      benefits: [
        "One-click connections",
        "Popular service integrations",
        "Custom workflow automation",
        "Real-time sync",
        "Centralized management",
        "Security controls"
      ]
    },
    {
      title: "AI Command Center",
      description: "Natural language interface for managing your business operations with advanced AI capabilities",
      icon: MessageSquare,
      href: "/dashboard/ai-command",
      benefits: ["Real-time insights", "Smart automation", "Predictive analytics"]
    },
    {
      title: "Smart Email Management",
      description: "AI-powered email organization, prioritization, and intelligent response suggestions",
      icon: Mail,
      href: "/dashboard/inbox",
      benefits: ["Priority inbox", "Auto-categorization", "Smart replies"]
    },
    {
      title: "Meeting Scheduling",
      description: "Intelligent calendar management and automated meeting coordination across time zones",
      icon: Calendar,
      href: "/dashboard/calendar",
      benefits: ["Smart scheduling", "Time zone handling", "Meeting analytics"]
    },
    {
      title: "Proposal Generation",
      description: "Create professional, customized proposals with AI assistance and templates",
      icon: FileText,
      href: "/dashboard/proposals",
      benefits: ["Custom templates", "AI suggestions", "Version control"]
    },
    {
      title: "Client Management",
      description: "Comprehensive client relationship management with advanced analytics",
      icon: Users,
      href: "/dashboard/clients",
      benefits: ["Client insights", "Interaction history", "Project tracking"]
    },
    {
      title: "Workflow Automation",
      description: "Create and manage automated workflows to streamline your business processes",
      icon: Zap,
      href: "/dashboard/automation/workflows",
      benefits: ["Custom workflows", "Task automation", "Process optimization"]
    },
    {
      title: "Time Tracking",
      description: "Track time spent on projects and tasks with AI-powered insights",
      icon: Clock,
      href: "/dashboard/projects/time-tracking",
      benefits: ["Project tracking", "Productivity insights", "Billing automation"]
    },
    {
      title: "Document Management",
      description: "Secure document storage and management with AI-powered organization",
      icon: FileText,
      href: "/dashboard/documents",
      benefits: ["Smart organization", "Version control", "Secure storage"]
    },
    {
      title: "Team Collaboration",
      description: "Enhanced team collaboration tools with real-time updates and task management",
      icon: Users,
      href: "/dashboard/team",
      benefits: ["Task management", "Team chat", "Progress tracking"]
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting for business insights",
      icon: BarChart,
      href: "/dashboard/analytics",
      benefits: ["Custom reports", "Performance metrics", "Trend analysis"]
    },
    {
      title: "Project Management",
      description: "End-to-end project management with AI-powered insights",
      icon: ClipboardList,
      href: "/dashboard/projects",
      benefits: ["Task tracking", "Resource allocation", "Progress monitoring"]
    },
    {
      title: "Invoice Management",
      description: "Automated invoice generation and payment tracking",
      icon: Receipt,
      href: "/dashboard/invoices",
      benefits: ["Auto-generation", "Payment tracking", "Financial reporting"]
    },
    {
      title: "Digital Presence",
      description: "Create and manage your digital presence with our powerful tools",
      icon: GlobeAltIcon,
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Tasks Automated", value: "1M+" },
    { label: "Time Saved", value: "500K+ hrs" },
    { label: "Success Rate", value: "99.9%" }
  ];

  const fadeInUp = {
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Your AI-powered Operating System
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Streamline your workflow, automate tasks, and focus on what matters
                most with Solara AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                  <button
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    aria-label="Sign in to Solara"
                  >
                    Sign In
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                  <button
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border hover:bg-muted transition-colors duration-200"
                    aria-label="Create a new Solara account"
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to run your business efficiently, powered by AI
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={featureVariants}
                  initial="initial"
                  whileHover="hover"
                  onHoverStart={() => setHoveredFeature(feature.title)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="relative"
                >
                  {!userId ? (
                    <SignInButton mode="modal" afterSignInUrl={feature.href}>
                      <div
                        className="group block p-6 bg-card rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-lg cursor-pointer h-full"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className="p-3 bg-primary/10 rounded-lg"
                            variants={iconVariants}
                          >
                            <feature.icon className="w-6 h-6 text-primary" />
                          </motion.div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                        </div>
                        <motion.div
                          variants={contentVariants}
                          initial="initial"
                          animate="animate"
                        >
                          <p className="text-muted-foreground mb-4">{feature.description}</p>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit) => (
                              <motion.li
                                key={benefit}
                                className="flex items-center text-sm text-muted-foreground"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                                {benefit}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        <AnimatePresence>
                          {hoveredFeature === feature.title && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-4 right-4"
                            >
                              <div className="flex items-center text-primary text-sm font-medium">
                                Sign in to try
                                <ArrowRight className="ml-1 w-4 h-4" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </SignInButton>
                  ) : (
                    <div
                      onClick={(e) => handleFeatureClick(e, feature.href)}
                      className="group block p-6 bg-card rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-lg cursor-pointer h-full"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-3 bg-primary/10 rounded-lg"
                          variants={iconVariants}
                        >
                          <feature.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <motion.div
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                      >
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit) => (
                            <motion.li
                              key={benefit}
                              className="flex items-center text-sm text-muted-foreground"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                              {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      <AnimatePresence>
                        {hoveredFeature === feature.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 right-4"
                          >
                            <div className="flex items-center text-primary text-sm font-medium">
                              Try it now
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose Solara?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the future of business management with our cutting-edge features
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Experience unparalleled speed and performance with our optimized platform"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade security with end-to-end encryption and compliance standards"
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Round-the-clock support with dedicated account managers"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-lg border"
                >
                  <benefit.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start your free trial today and experience the power of AI-driven
                productivity.
              </p>
              <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  aria-label="Start your free trial"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </SignUpButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
