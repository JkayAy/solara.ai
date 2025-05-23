'use client';

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Calendar, Mail, FileText, Users, CreditCard, Database, Zap, Settings, Search, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const categories = [
 { id: 'all', name: 'All Integrations', icon: Settings },
 { id: 'communication', name: 'Communication', icon: MessageSquare },
 { id: 'productivity', name: 'Productivity', icon: Calendar },
 { id: 'development', name: 'Development', icon: Database },
 { id: 'marketing', name: 'Marketing', icon: Users },
 { id: 'finance', name: 'Finance', icon: CreditCard },
];

const availableIntegrations = [
 {
  id: 'slack',
  name: 'Slack',
  description: 'Connect with your team in real-time',
  icon: MessageSquare,
  category: 'communication',
  status: 'available',
  features: ['Real-time messaging', 'File sharing', 'Team channels'],
 },
 {
  id: 'google-calendar',
  name: 'Google Calendar',
  description: 'Sync your schedule seamlessly',
  icon: Calendar,
  category: 'productivity',
  status: 'available',
  features: ['Event scheduling', 'Meeting management', 'Calendar sync'],
 },
 {
  id: 'gmail',
  name: 'Gmail',
  description: 'Manage your emails efficiently',
  icon: Mail,
  category: 'communication',
  status: 'available',
  features: ['Email management', 'Labels and filters', 'Search functionality'],
 },
 {
  id: 'notion',
  name: 'Notion',
  description: 'Organize your workspace',
  icon: FileText,
  category: 'productivity',
  status: 'available',
  features: ['Document management', 'Task tracking', 'Team collaboration'],
 },
 {
  id: 'hubspot',
  name: 'HubSpot',
  description: 'Streamline your marketing',
  icon: Users,
  category: 'marketing',
  status: 'available',
  features: ['CRM integration', 'Marketing automation', 'Analytics'],
 },
 {
  id: 'stripe',
  name: 'Stripe',
  description: 'Process payments securely',
  icon: CreditCard,
  category: 'finance',
  status: 'available',
  features: ['Payment processing', 'Subscription management', 'Financial reporting'],
 },
 {
  id: 'mongodb',
  name: 'MongoDB',
  description: 'Store and manage your data',
  icon: Database,
  category: 'development',
  status: 'available',
  features: ['Database management', 'Data modeling', 'Query optimization'],
 },
 {
  id: 'zapier',
  name: 'Zapier',
  description: 'Automate your workflows',
  icon: Zap,
  category: 'productivity',
  status: 'available',
  features: ['Workflow automation', 'App connections', 'Custom triggers'],
 },
];

export default function IntegrationsPage() {
 const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('all');

 const handleConnect = (integrationId: string) => {
  // In a real app, this would initiate the OAuth flow
  setConnectedIntegrations([...connectedIntegrations, integrationId]);
  toast.success('Integration connected successfully');
 };

 const handleDisconnect = (integrationId: string) => {
  setConnectedIntegrations(connectedIntegrations.filter(id => id !== integrationId));
  toast.success('Integration disconnected successfully');
 };

 const filteredIntegrations = availableIntegrations.filter((integration) => {
  const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   integration.description.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
  return matchesSearch && matchesCategory;
 });

 return (
  <DashboardShell>
   <DashboardHeader
    heading="Integrations"
    text="Connect your favorite tools and services"
   >
    <Button>
     <Plus className="mr-2 h-4 w-4" />
     Add Integration
    </Button>
   </DashboardHeader>

   <div className="grid gap-8">
    {/* Search and Categories */}
    <div className="flex flex-col gap-4">
     <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
       placeholder="Search integrations..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="pl-9"
      />
     </div>

     <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
      <TabsList className="w-full justify-start">
       {categories.map((category) => (
        <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
         <category.icon className="h-4 w-4" />
         {category.name}
        </TabsTrigger>
       ))}
      </TabsList>
     </Tabs>
    </div>

    {/* Connected Integrations */}
    {connectedIntegrations.length > 0 && (
     <div className="space-y-4">
      <h2 className="text-lg font-semibold">Connected Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {filteredIntegrations
        .filter(integration => connectedIntegrations.includes(integration.id))
        .map((integration) => (
         <Card key={integration.id}>
          <CardHeader>
           <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
             <integration.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
             <CardTitle className="text-lg">{integration.name}</CardTitle>
             <CardDescription>{integration.description}</CardDescription>
            </div>
           </div>
          </CardHeader>
          <CardContent>
           <div className="space-y-4">
            <div className="flex items-center gap-2">
             <Badge variant="default">Connected</Badge>
            </div>
            <ul className="space-y-2">
             {integration.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
               <ArrowRight className="h-4 w-4" />
               {feature}
              </li>
             ))}
            </ul>
           </div>
          </CardContent>
          <CardFooter>
           <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDisconnect(integration.id)}
           >
            Disconnect
           </Button>
          </CardFooter>
         </Card>
        ))}
      </div>
     </div>
    )}

    {/* Available Integrations */}
    <div className="space-y-4">
     <h2 className="text-lg font-semibold">Available Integrations</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredIntegrations
       .filter(integration => !connectedIntegrations.includes(integration.id))
       .map((integration) => (
        <Card key={integration.id}>
         <CardHeader>
          <div className="flex items-center gap-4">
           <div className="p-2 rounded-lg bg-primary/10">
            <integration.icon className="w-6 h-6 text-primary" />
           </div>
           <div>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
            <CardDescription>{integration.description}</CardDescription>
           </div>
          </div>
         </CardHeader>
         <CardContent>
          <div className="space-y-4">
           <div className="flex items-center gap-2">
            <Badge variant="secondary">Available</Badge>
           </div>
           <ul className="space-y-2">
            {integration.features.map((feature, index) => (
             <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowRight className="h-4 w-4" />
              {feature}
             </li>
            ))}
           </ul>
          </div>
         </CardContent>
         <CardFooter>
          <Button
           className="w-full"
           onClick={() => handleConnect(integration.id)}
          >
           Connect
          </Button>
         </CardFooter>
        </Card>
       ))}
     </div>
    </div>
   </div>
  </DashboardShell>
 );
} 