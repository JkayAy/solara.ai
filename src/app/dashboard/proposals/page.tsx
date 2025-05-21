'use client';

import { useState } from 'react';
import { Plus, Search, Filter, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProposalForm } from '@/components/proposals/proposal-form';

interface Proposal {
  id: string;
  title: string;
  client: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  amount: number;
  dueDate: string;
  lastUpdated: string;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    client: 'Acme Corp',
    status: 'accepted',
    amount: 5000,
    dueDate: '2024-06-01',
    lastUpdated: '2024-05-10'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'sent',
    amount: 15000,
    dueDate: '2024-06-15',
    lastUpdated: '2024-05-09'
  },
  {
    id: '3',
    title: 'Brand Identity Package',
    client: 'StartupX',
    status: 'draft',
    amount: 3000,
    dueDate: '2024-05-20',
    lastUpdated: '2024-05-08'
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    client: 'RetailPlus',
    status: 'rejected',
    amount: 8000,
    dueDate: '2024-06-30',
    lastUpdated: '2024-05-07'
  }
];

const proposalTemplates = [
  {
    id: '1',
    title: 'Standard Service Proposal',
    description: 'A comprehensive proposal template for service-based businesses',
    sections: ['Overview', 'Scope of Work', 'Timeline', 'Pricing', 'Terms & Conditions']
  },
  {
    id: '2',
    title: 'Project-Based Proposal',
    description: 'Template for project-based work with milestones and deliverables',
    sections: ['Project Overview', 'Deliverables', 'Milestones', 'Budget', 'Timeline']
  },
  {
    id: '3',
    title: 'Retainer Agreement',
    description: 'Template for ongoing service agreements and retainer-based work',
    sections: ['Services', 'Monthly Deliverables', 'Pricing Structure', 'Terms', 'Service Level Agreement']
  }
];

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof proposalTemplates[0] | undefined>();

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'accepted':
        return 'text-green-500 bg-green-50';
      case 'rejected':
        return 'text-red-500 bg-red-50';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proposals</h1>
          <p className="text-muted-foreground">Manage and track your proposals</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Proposal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search proposals..."
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
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Proposals List */}
      <div className="grid gap-4">
        {filteredProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">Client: {proposal.client}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">${proposal.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(proposal.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(proposal.status)}`}>
                  {getStatusIcon(proposal.status)}
                  <span className="capitalize">{proposal.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Proposal Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Select a Template</h2>
                <div className="grid gap-4">
                  {proposalTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowCreateForm(false);
                      }}
                      className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 text-left"
                    >
                      <h3 className="font-medium">{template.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {template.sections.map((section) => (
                          <span
                            key={section}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {section}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Form */}
      {selectedTemplate && (
        <ProposalForm
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(undefined)}
        />
      )}
    </div>
  );
} 