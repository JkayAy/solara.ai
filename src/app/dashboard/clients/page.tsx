'use client';

import { useState } from 'react';
import { Plus, Search, Mail, Phone, Building, MoreVertical, FileText, DollarSign, Calendar, Edit, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Client {
 id: string;
 name: string;
 email: string;
 phone: string;
 company: string;
 totalProposals: number;
 totalRevenue: number;
 lastInteraction: string;
 status: 'active' | 'inactive';
}

const mockClients: Client[] = [
 {
  id: '1',
  name: 'John Smith',
  email: 'john@acmecorp.com',
  phone: '+1 (555) 123-4567',
  company: 'Acme Corporation',
  totalProposals: 5,
  totalRevenue: 25000,
  lastInteraction: '2024-05-15',
  status: 'active'
 },
 {
  id: '2',
  name: 'Sarah Johnson',
  email: 'sarah@techstart.com',
  phone: '+1 (555) 987-6543',
  company: 'TechStart Inc',
  totalProposals: 3,
  totalRevenue: 15000,
  lastInteraction: '2024-05-10',
  status: 'active'
 },
 {
  id: '3',
  name: 'Michael Brown',
  email: 'michael@startupx.com',
  phone: '+1 (555) 456-7890',
  company: 'StartupX',
  totalProposals: 2,
  totalRevenue: 8000,
  lastInteraction: '2024-04-28',
  status: 'inactive'
 }
];

export default function ClientsPage() {
 const [clients, setClients] = useState<Client[]>(mockClients);
 const [searchQuery, setSearchQuery] = useState('');
 const [statusFilter, setStatusFilter] = useState<string>('all');
 const [showAddClient, setShowAddClient] = useState(false);
 const [activeMenu, setActiveMenu] = useState<string | null>(null);

 const filteredClients = clients.filter(client => {
  const matchesSearch =
   client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
   client.email.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
  return matchesSearch && matchesStatus;
 });

 const handleMenuClick = (clientId: string, event: React.MouseEvent) => {
  event.stopPropagation();
  setActiveMenu(activeMenu === clientId ? null : clientId);
 };

 const handleClientClick = (clientId: string) => {
  window.location.href = `/dashboard/clients/${clientId}`;
 };

 const handleDeleteClient = (clientId: string) => {
  setClients(clients.filter(client => client.id !== clientId));
  setActiveMenu(null);
 };

 return (
  <div className="container mx-auto p-6 space-y-6">
   {/* Header */}
   <div className="flex items-center justify-between">
    <div>
     <h1 className="text-2xl font-bold">Clients</h1>
     <p className="text-muted-foreground">Manage your client relationships</p>
    </div>
    <Button
     onClick={() => setShowAddClient(true)}
     className="flex items-center gap-2"
    >
     <Plus className="w-4 h-4" />
     Add Client
    </Button>
   </div>

   {/* Filters */}
   <div className="flex items-center gap-4">
    <div className="flex-1 relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
     <input
      type="text"
      placeholder="Search clients..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
     />
    </div>
    <select
     value={statusFilter}
     onChange={(e) => setStatusFilter(e.target.value)}
     className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
    >
     <option value="all">All Status</option>
     <option value="active">Active</option>
     <option value="inactive">Inactive</option>
    </select>
   </div>

   {/* Clients List */}
   <div className="grid gap-4">
    {filteredClients.map((client) => (
     <div
      key={client.id}
      className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleClientClick(client.id)}
     >
      <div className="flex items-start justify-between">
       <div className="space-y-1">
        <h3 className="font-semibold">{client.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
         <div className="flex items-center gap-1">
          <Building className="w-4 h-4" />
          {client.company}
         </div>
         <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          {client.email}
         </div>
         <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          {client.phone}
         </div>
        </div>
       </div>
       <div className="relative">
        <button
         className="p-2 hover:bg-muted rounded-lg"
         onClick={(e) => handleMenuClick(client.id, e)}
        >
         <MoreVertical className="w-4 h-4" />
        </button>
        {activeMenu === client.id && (
         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
          <button
           className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
           onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/dashboard/clients/${client.id}`;
           }}
          >
           <Edit className="w-4 h-4" />
           Edit Client
          </button>
          <button
           className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
           onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement send message functionality
           }}
          >
           <MessageSquare className="w-4 h-4" />
           Send Message
          </button>
          <button
           className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-muted flex items-center gap-2"
           onClick={(e) => {
            e.stopPropagation();
            handleDeleteClient(client.id);
           }}
          >
           <Trash2 className="w-4 h-4" />
           Delete Client
          </button>
         </div>
        )}
       </div>
      </div>
      <div className="mt-4 flex items-center gap-6 text-sm">
       <div className="flex items-center gap-1">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span>{client.totalProposals} Proposals</span>
       </div>
       <div className="flex items-center gap-1">
        <DollarSign className="w-4 h-4 text-muted-foreground" />
        <span>${client.totalRevenue.toLocaleString()}</span>
       </div>
       <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span>Last interaction: {new Date(client.lastInteraction).toLocaleDateString()}</span>
       </div>
       <div className={`ml-auto px-2 py-1 rounded-full text-xs ${client.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
        }`}>
        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
       </div>
      </div>
     </div>
    ))}
   </div>

   {/* Add Client Modal */}
   {showAddClient && (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
     <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl">
       <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
        <form className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
           <label htmlFor="name" className="text-sm font-medium">
            Client Name
           </label>
           <input
            id="name"
            type="text"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter client name"
           />
          </div>
          <div className="space-y-2">
           <label htmlFor="company" className="text-sm font-medium">
            Company
           </label>
           <input
            id="company"
            type="text"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter company name"
           />
          </div>
          <div className="space-y-2">
           <label htmlFor="email" className="text-sm font-medium">
            Email
           </label>
           <input
            id="email"
            type="email"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter email address"
           />
          </div>
          <div className="space-y-2">
           <label htmlFor="phone" className="text-sm font-medium">
            Phone
           </label>
           <input
            id="phone"
            type="tel"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter phone number"
           />
          </div>
         </div>
         <div className="flex justify-end gap-3">
          <Button
           type="button"
           variant="outline"
           onClick={() => setShowAddClient(false)}
          >
           Cancel
          </Button>
          <Button type="submit">
           Add Client
          </Button>
         </div>
        </form>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
} 