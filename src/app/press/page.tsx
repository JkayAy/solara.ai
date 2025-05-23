'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newspaper, Download, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PressPage() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "Solara Launches New AI-Powered Platform",
      description: "Revolutionary platform brings advanced AI capabilities to businesses worldwide"
    },
    {
      date: "February 28, 2024",
      title: "Solara Raises $50M in Series B Funding",
      description: "Investment will accelerate product development and global expansion"
    },
    {
      date: "January 20, 2024",
      title: "Solara Partners with Global Tech Leaders",
      description: "Strategic partnerships to enhance AI capabilities and market reach"
    }
  ];

  const mediaResources = [
    {
      icon: FileText,
      title: "Company Overview",
      description: "Learn about our mission, vision, and values"
    },
    {
      icon: Download,
      title: "Media Kit",
      description: "Download our logo, images, and brand guidelines"
    },
    {
      icon: Newspaper,
      title: "Press Releases",
      description: "Read our latest announcements and news"
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
                Press Room
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
            <div className="grid gap-8 max-w-4xl mx-auto">
              {pressReleases.map((release) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card"
                >
                  <p className="text-sm text-muted-foreground mb-2">{release.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                  <p className="text-muted-foreground mb-4">{release.description}</p>
                  <button className="text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                    Read More
                    <FileText className="ml-2 w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Resources Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Media Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {mediaResources.map((resource) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border bg-card text-center"
                >
                  <resource.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Download
                    <Download className="ml-2 w-4 h-4" />
                  </button>
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