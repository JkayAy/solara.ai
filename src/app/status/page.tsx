'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, AlertCircle, CheckCircle2, Clock, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

const systemComponents = [
 {
  name: 'API',
  status: 'operational',
  uptime: '99.99%',
  lastIncident: '2024-02-15',
 },
 {
  name: 'Database',
  status: 'operational',
  uptime: '99.95%',
  lastIncident: '2024-02-10',
 },
 {
  name: 'Authentication',
  status: 'operational',
  uptime: '99.98%',
  lastIncident: '2024-02-12',
 },
 {
  name: 'File Storage',
  status: 'operational',
  uptime: '99.97%',
  lastIncident: '2024-02-08',
 },
];

const incidents = [
 {
  id: 'INC-2024-001',
  title: 'API Performance Degradation',
  status: 'resolved',
  impact: 'medium',
  startTime: '2024-02-15T10:00:00Z',
  endTime: '2024-02-15T11:30:00Z',
  description: 'Users experienced slower response times when accessing the API. The issue was caused by increased load on our database servers.',
  updates: [
   {
    time: '2024-02-15T10:15:00Z',
    message: 'Investigating increased latency in API responses',
   },
   {
    time: '2024-02-15T10:45:00Z',
    message: 'Identified database connection pool exhaustion',
   },
   {
    time: '2024-02-15T11:30:00Z',
    message: 'Resolved by scaling database connection pool and optimizing queries',
   },
  ],
 },
 {
  id: 'INC-2024-002',
  title: 'Authentication Service Interruption',
  status: 'resolved',
  impact: 'high',
  startTime: '2024-02-12T15:00:00Z',
  endTime: '2024-02-12T16:45:00Z',
  description: 'Users were unable to log in to their accounts due to an issue with the authentication service.',
  updates: [
   {
    time: '2024-02-12T15:10:00Z',
    message: 'Detected authentication service errors',
   },
   {
    time: '2024-02-12T15:30:00Z',
    message: 'Identified certificate expiration issue',
   },
   {
    time: '2024-02-12T16:45:00Z',
    message: 'Resolved by renewing SSL certificates and restarting service',
   },
  ],
 },
];

const maintenance = [
 {
  title: 'Database Migration',
  status: 'scheduled',
  startTime: '2024-03-01T02:00:00Z',
  endTime: '2024-03-01T04:00:00Z',
  description: 'Planned migration to new database cluster for improved performance and reliability.',
 },
 {
  title: 'API Version Update',
  status: 'scheduled',
  startTime: '2024-03-15T01:00:00Z',
  endTime: '2024-03-15T03:00:00Z',
  description: 'Updating API to version 2.0 with new features and performance improvements.',
 },
];

export default function StatusPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
 const [lastUpdated, setLastUpdated] = useState(new Date());

 const toggleIncident = (id: string) => {
  setExpandedIncident(expandedIncident === id ? null : id);
 };

 const refreshStatus = () => {
  setLastUpdated(new Date());
 };

 const filteredIncidents = incidents.filter(incident =>
  incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  incident.description.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        System Status
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Real-time status of Solara's services and systems
       </p>
       <div className="flex items-center justify-center gap-4">
        <div className="relative max-w-xl">
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
         <input
          type="text"
          placeholder="Search incidents..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
         />
        </div>
        <button
         onClick={refreshStatus}
         className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
         title="Refresh status"
        >
         <RefreshCw className="w-5 h-5" />
        </button>
       </div>
       <p className="text-sm text-muted-foreground mt-4">
        Last updated: {lastUpdated.toLocaleString()}
       </p>
      </div>
     </div>
    </section>

    {/* System Components */}
    <section className="py-12 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-2xl font-bold mb-6">System Components</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemComponents.map((component) => (
         <motion.div
          key={component.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-lg border bg-card"
         >
          <div className="flex items-center justify-between mb-2">
           <h3 className="font-semibold">{component.name}</h3>
           <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
           <p>Status: <span className="text-green-500">Operational</span></p>
           <p>Uptime: {component.uptime}</p>
           <p>Last Incident: {component.lastIncident}</p>
          </div>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Incidents */}
    <section className="py-12 bg-muted/50">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
       <div className="space-y-4">
        {filteredIncidents.map((incident) => (
         <motion.div
          key={incident.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border rounded-lg overflow-hidden"
         >
          <button
           onClick={() => toggleIncident(incident.id)}
           className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
           <div className="flex items-center gap-4">
            <span className={`px-2 py-1 rounded text-sm ${incident.impact === 'high' ? 'bg-red-100 text-red-800' :
              incident.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
               'bg-blue-100 text-blue-800'
             }`}>
             {incident.impact}
            </span>
            <div>
             <h3 className="font-semibold">{incident.title}</h3>
             <p className="text-sm text-muted-foreground">
              {new Date(incident.startTime).toLocaleString()}
             </p>
            </div>
           </div>
           {expandedIncident === incident.id ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
           ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
           )}
          </button>
          {expandedIncident === incident.id && (
           <div className="p-4 bg-muted/50 border-t space-y-4">
            <p className="text-muted-foreground">{incident.description}</p>
            <div>
             <h4 className="font-semibold mb-2">Updates</h4>
             <div className="space-y-2">
              {incident.updates.map((update) => (
               <div key={update.time} className="flex items-start gap-2">
                <span className="text-sm text-muted-foreground">
                 {new Date(update.time).toLocaleString()}
                </span>
                <span className="text-sm">{update.message}</span>
               </div>
              ))}
             </div>
            </div>
           </div>
          )}
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Maintenance */}
    <section className="py-12 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-2xl font-bold mb-6">Scheduled Maintenance</h2>
       <div className="space-y-4">
        {maintenance.map((item) => (
         <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-lg border bg-card"
         >
          <div className="flex items-center gap-2 mb-2">
           <Clock className="w-5 h-5 text-primary" />
           <h3 className="font-semibold">{item.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
          <div className="text-sm text-muted-foreground">
           <p>Start: {new Date(item.startTime).toLocaleString()}</p>
           <p>End: {new Date(item.endTime).toLocaleString()}</p>
          </div>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Subscribe */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
       <p className="text-muted-foreground mb-8">
        Subscribe to receive status updates and incident notifications
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
         type="email"
         placeholder="Enter your email"
         className="px-4 py-3 rounded-lg border bg-background"
        />
        <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
         Subscribe
        </button>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 