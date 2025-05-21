export interface Proposal {
 id: string;
 title: string;
 client: string;
 status: 'draft' | 'sent' | 'accepted' | 'rejected';
 amount: number;
 dueDate: string;
 lastUpdated: string;
 sections: ProposalSection[];
 followUps: FollowUp[];
}

export interface ProposalSection {
 id: string;
 title: string;
 content: string;
 order: number;
}

export interface FollowUp {
 id: string;
 date: string;
 status: 'scheduled' | 'completed' | 'cancelled';
 notes: string;
}

export interface Client {
 id: string;
 name: string;
 email: string;
 phone: string;
 company: string;
 totalProposals: number;
 totalRevenue: number;
 lastInteraction: number; // Days since last interaction
 status: 'active' | 'inactive';
}

export interface ProposalTemplate {
 id: string;
 title: string;
 description: string;
 sections: ProposalSection[];
}

export interface BusinessMetrics {
 successRate: number;
 avgProposalValue: number;
 clientRetention: number;
 totalRevenue: number;
}

export interface PricingRecommendation {
 recommendedPrice: number;
 priceRange: {
  min: number;
  max: number;
 };
 confidence: number;
}

export interface ClientBehavior {
 avgResponseTime: number;
 commonIndustries: string[];
 clientSatisfaction: number;
} 