'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Code, Terminal, Database, Key, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ApiPage() {
  const features = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Clean and intuitive REST API endpoints for seamless integration"
    },
    {
      icon: Terminal,
      title: "SDK Support",
      description: "Official SDKs for popular programming languages"
    },
    {
      icon: Database,
      title: "Data Access",
      description: "Secure and efficient data access patterns"
    },
    {
      icon: Key,
      title: "Authentication",
      description: "Robust authentication and authorization mechanisms"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade security with rate limiting and monitoring"
    },
    {
      icon: Zap,
      title: "Webhooks",
      description: "Real-time event notifications via webhooks"
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
                API Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Integrate Solara's powerful features into your applications
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">API Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card"
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
              <div className="bg-card rounded-lg p-6 border">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# Install the SDK
npm install @solara/api

# Initialize the client
import { SolaraClient } from '@solara/api';

const client = new SolaraClient({
  apiKey: 'your_api_key'
});

# Make your first API call
const response = await client.projects.list();`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8">
                Get your API key and start integrating Solara into your applications
              </p>
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Get API Key
                <Key className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 