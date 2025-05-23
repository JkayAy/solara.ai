'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Search, Zap, Database, MessageSquare, Calendar, Mail, FileText, Users, CreditCard, Settings } from "lucide-react";

const integrations = [
  {
    name: 'Slack',
    description: 'Connect with your team in real-time',
    icon: MessageSquare,
  },
  {
    name: 'Google Calendar',
    description: 'Sync your schedule seamlessly',
    icon: Calendar,
  },
  {
    name: 'Gmail',
    description: 'Manage your emails efficiently',
    icon: Mail,
  },
  {
    name: 'Notion',
    description: 'Organize your workspace',
    icon: FileText,
  },
  {
    name: 'HubSpot',
    description: 'Streamline your marketing',
    icon: Users,
  },
  {
    name: 'Stripe',
    description: 'Process payments securely',
    icon: CreditCard,
  },
  {
    name: 'MongoDB',
    description: 'Store and manage your data',
    icon: Database,
  },
  {
    name: 'Zapier',
    description: 'Automate your workflows',
    icon: Zap,
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Integrations
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect Solara with your favorite tools and services
              </p>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <integration.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <a
                    href="/sign-up"
                    className="block w-full py-2 text-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need a Custom Integration?</h2>
              <p className="text-muted-foreground mb-8">
                We can help you build a custom integration for your specific needs
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Sales
                <Settings className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 