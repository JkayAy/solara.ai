import { Proposal, Client } from '@/types';

interface ProposalPrediction {
  id: string;
  title: string;
  successProbability: number;
  suggestedPrice: number;
  currentPrice: number;
  keyFactors: string[];
}

interface MarketTrend {
  category: string;
  trend: 'up' | 'down';
  percentage: number;
  description: string;
}

interface BusinessInsight {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
  impact: 'high' | 'medium' | 'low';
  date: string;
}

interface BusinessMetrics {
  successRate: number;
  avgProposalValue: number;
  clientRetention: number;
  totalRevenue: number;
}

interface PricingRecommendation {
  recommendedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  confidence: number;
}

interface ClientBehavior {
  avgResponseTime: number;
  commonIndustries: string[];
  clientSatisfaction: number;
}

export class AIService {
  // Analyze proposal success probability
  async predictProposalSuccess(proposal: Proposal): Promise<ProposalPrediction> {
    // TODO: Implement actual AI prediction logic
    // For now, return mock data
    return {
      id: proposal.id,
      title: proposal.title,
      successProbability: Math.floor(Math.random() * 40) + 60, // Random between 60-100
      suggestedPrice: proposal.amount * (Math.random() * 0.3 + 0.85), // Random between 85-115% of current price
      currentPrice: proposal.amount,
      keyFactors: [
        'Competitive pricing',
        'Strong portfolio match',
        'Client budget alignment'
      ]
    };
  }

  // Analyze market trends
  async analyzeMarketTrends(): Promise<MarketTrend[]> {
    // TODO: Implement actual market analysis logic
    // For now, return mock data
    return [
      {
        category: 'Web Development',
        trend: 'up',
        percentage: 15,
        description: 'Growing demand for responsive design'
      },
      {
        category: 'Mobile Apps',
        trend: 'down',
        percentage: 5,
        description: 'Increased competition in basic app development'
      },
      {
        category: 'UI/UX Design',
        trend: 'up',
        percentage: 20,
        description: 'High demand for user experience optimization'
      }
    ];
  }

  // Calculate key metrics
  async calculateKeyMetrics(proposals: Proposal[], clients: Client[]): Promise<BusinessMetrics> {
    // Calculate success rate
    const successfulProposals = proposals.filter(p => p.status === 'accepted');
    const successRate = (successfulProposals.length / proposals.length) * 100;

    // Calculate average proposal value
    const totalValue = proposals.reduce((sum, p) => sum + (p.amount || 0), 0);
    const avgProposalValue = totalValue / proposals.length;

    // Calculate client retention
    const activeClients = clients.filter(c => c.status === 'active');
    const clientRetention = (activeClients.length / clients.length) * 100;

    // Calculate total revenue
    const totalRevenue = successfulProposals.reduce((sum, p) => sum + (p.amount || 0), 0);

    return {
      successRate,
      avgProposalValue,
      clientRetention,
      totalRevenue
    };
  }

  // Generate pricing recommendations
  async generatePricingRecommendations(proposals: Proposal[]): Promise<PricingRecommendation> {
    const successfulProposals = proposals.filter(p => p.status === 'accepted');
    const avgAmount = successfulProposals.reduce((sum, p) => sum + (p.amount || 0), 0) / successfulProposals.length;

    // Generate dynamic pricing recommendations
    const recommendedPrice = avgAmount * 1.15; // 15% higher than average
    const minPrice = avgAmount * 0.9; // 10% lower than average
    const maxPrice = avgAmount * 1.3; // 30% higher than average

    return {
      recommendedPrice,
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      confidence: 0.85
    };
  }

  // Analyze client behavior
  async analyzeClientBehavior(clients: Client[]): Promise<ClientBehavior> {
    // Calculate average response time
    const responseTimes = clients.map(c => {
      const lastInteraction = new Date(c.lastInteraction);
      const now = new Date();
      return Math.floor((now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24));
    });
    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;

    // Get common industries
    const industries = clients.map(c => c.company?.industry || 'Unknown');
    const industryCount = industries.reduce((acc, industry) => {
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const commonIndustries = Object.entries(industryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([industry]) => industry);

    // Calculate client satisfaction (mock data for now)
    const clientSatisfaction = 85;

    return {
      avgResponseTime,
      commonIndustries,
      clientSatisfaction
    };
  }

  // Generate business insights
  async generateBusinessInsights(proposals: Proposal[], clients: Client[]): Promise<BusinessInsight[]> {
    const metrics = await this.calculateKeyMetrics(proposals, clients);
    const pricing = await this.generatePricingRecommendations(proposals);
    const behavior = await this.analyzeClientBehavior(clients);

    // Generate dynamic insights based on current data
    return [
      {
        id: '1',
        title: `Proposal Success Rate: ${metrics.successRate.toFixed(1)}%`,
        description: `Your proposals have a ${metrics.successRate.toFixed(1)}% success rate. Consider focusing on proposals in the $${pricing.priceRange.min.toLocaleString()} - $${pricing.priceRange.max.toLocaleString()} range.`,
        type: metrics.successRate > 70 ? 'success' : 'info',
        impact: 'high',
        date: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Pricing Optimization',
        description: `Based on your successful proposals, we recommend pricing around $${pricing.recommendedPrice.toLocaleString()} for optimal conversion.`,
        type: 'info',
        impact: 'high',
        date: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Client Response Time',
        description: `Average client response time is ${behavior.avgResponseTime.toFixed(1)} days. Top industries: ${behavior.commonIndustries.join(', ')}.`,
        type: behavior.avgResponseTime > 5 ? 'warning' : 'success',
        impact: 'medium',
        date: new Date().toISOString()
      }
    ];
  }
} 