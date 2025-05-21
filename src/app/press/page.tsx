'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newspaper, Download, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function PressPage() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "Solara Raises $50M Series B to Accelerate AI Innovation",
      description: "Funding will be used to expand our AI capabilities and global presence"
    },
    {
      date: "February 28, 2024",
      title: "Solara Launches New AI Command Center",
      description: "Revolutionary AI-powered interface for business operations"
    },
    {
      date: "January 10, 2024",
      title: "Solara Named Top AI Platform of 2024",
      description: "Recognized for innovation in business automation"
    }
  ];

  const mediaResources = [
    {
      title: "Company Logo",
      format: "PNG, SVG",
      size: "2.4 MB"
    },
    {
      title: "Brand Guidelines",
      format: "PDF",
      size: "4.8 MB"
    },
    {
      title: "Product Screenshots",
      format: "ZIP",
      size: "15.2 MB"
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
                Press & Media
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Latest news, press releases, and media resources
              </p>
            </div>
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Press Releases</h2>
            <div className="grid gap-8 max-w-3xl mx-auto">
              {pressReleases.map((release) => (
                <motion.article
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {release.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                  <p className="text-muted-foreground mb-4">{release.description}</p>
                  <button className="text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                    Read More
                    <Newspaper className="ml-2 w-4 h-4" />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Media Resources Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Media Resources</h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {mediaResources.map((resource) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{resource.format}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                    <button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                      Download
                      <Download className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Media Inquiries</h2>
              <p className="text-muted-foreground mb-8">
                For press inquiries, please contact our media relations team
              </p>
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Contact Press Team
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