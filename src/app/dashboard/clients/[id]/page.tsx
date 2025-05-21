'use client';

import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Building, FileText, DollarSign, Calendar, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Proposal {
  id: string;
  title: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  date: string;
}

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
  proposals: Proposal[];
  notes: string;
}

const mockClient: Client = {
  id: '1',
  name: 'John Smith',
  email: 'john@acmecorp.com',
  phone: '+1 (555) 123-4567',
  company: 'Acme Corporation',
  totalProposals: 5,
  totalRevenue: 25000,
  lastInteraction: '2024-05-15',
  status: 'active',
  proposals: [
    {
      id: '1',
      title: 'Website Redesign Project',
      amount: 5000,
      status: 'accepted',
      date: '2024-05-15'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      amount: 15000,
      status: 'pending',
      date: '2024-05-10'
    },
    {
      id: '3',
      title: 'Brand Identity Package',
      amount: 3000,
      status: 'rejected',
      date: '2024-04-28'
    }
  ],
  notes: 'Key decision maker. Prefers email communication. Interested in long-term partnership.'
};

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [client] = useState<Client>(mockClient);
  const [activeTab, setActiveTab] = useState<'overview' | 'proposals' | 'notes'>('overview');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Send Message
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Edit Client
          </Button>
        </div>
      </div>

      {/* Client Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{client.email}</span>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{client.phone}</span>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>{client.company}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Proposals</span>
          </div>
          <p className="text-2xl font-semibold mt-2">{client.totalProposals}</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-semibold mt-2">${client.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last Interaction</span>
          </div>
          <p className="text-2xl font-semibold mt-2">
            {new Date(client.lastInteraction).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status</span>
          </div>
          <p className={`text-2xl font-semibold mt-2 ${client.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'proposals'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground'
              }`}
          >
            Proposals
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'notes'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground'
              }`}
          >
            Notes
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              {client.proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-card rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(proposal.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">
                        ${proposal.amount.toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${proposal.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : proposal.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : proposal.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'proposals' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">All Proposals</h2>
              <Button>Create New Proposal</Button>
            </div>
            <div className="space-y-4">
              {client.proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-card rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(proposal.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">
                        ${proposal.amount.toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${proposal.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : proposal.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : proposal.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Client Notes</h2>
              <Button>Add Note</Button>
            </div>
            <div className="bg-card rounded-lg border p-4">
              <p className="text-muted-foreground">{client.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 