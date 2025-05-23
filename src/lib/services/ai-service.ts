import { Proposal, Client } from '@/types';
import { OpenAI } from 'openai';

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
  private openai: any; // OpenAI client
  private model: string = 'gpt-4';

  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Smart task prioritization
  async prioritizeTasks(tasks: Task[]): Promise<Task[]> {
    const taskContext = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status
    }));

    const prompt = `Analyze these tasks and suggest optimal priorities based on:
    1. Due dates
    2. Dependencies
    3. Current status
    4. Task complexity
    Tasks: ${JSON.stringify(taskContext)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const prioritizedTasks = JSON.parse(response.choices[0].message.content);
    return tasks.map(task => ({
      ...task,
      priority: prioritizedTasks[task.id]?.priority || task.priority
    }));
  }

  // Smart document organization
  async organizeDocuments(documents: Document[]): Promise<Document[]> {
    const docContext = documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      content: doc.content,
      type: doc.type
    }));

    const prompt = `Analyze these documents and suggest optimal organization based on:
    1. Content similarity
    2. Document type
    3. Creation date
    4. Usage patterns
    Documents: ${JSON.stringify(docContext)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const organizedDocs = JSON.parse(response.choices[0].message.content);
    return documents.map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        category: organizedDocs[doc.id]?.category,
        tags: organizedDocs[doc.id]?.tags
      }
    }));
  }

  // Smart meeting scheduling
  async optimizeMeetingSchedule(meetings: CalendarEvent[]): Promise<CalendarEvent[]> {
    const meetingContext = meetings.map(meeting => ({
      id: meeting.id,
      title: meeting.title,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      type: meeting.type
    }));

    const prompt = `Optimize these meeting schedules based on:
    1. Meeting duration
    2. Participant availability
    3. Meeting type
    4. Time zones
    Meetings: ${JSON.stringify(meetingContext)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const optimizedMeetings = JSON.parse(response.choices[0].message.content);
    return meetings.map(meeting => ({
      ...meeting,
      startTime: new Date(optimizedMeetings[meeting.id]?.startTime),
      endTime: new Date(optimizedMeetings[meeting.id]?.endTime)
    }));
  }

  // Smart email response generation
  async generateEmailResponse(email: any): Promise<string> {
    const prompt = `Generate a professional email response based on:
    1. Original email content
    2. Context and tone
    3. Previous interactions
    4. Business objectives
    Email: ${JSON.stringify(email)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  }

  // Smart workflow automation
  async suggestWorkflowAutomation(tasks: Task[]): Promise<any> {
    const taskContext = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dependencies: task.dependencies
    }));

    const prompt = `Suggest workflow automation based on:
    1. Task patterns
    2. Dependencies
    3. Time requirements
    4. Resource allocation
    Tasks: ${JSON.stringify(taskContext)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  // Smart analytics insights
  async generateAnalyticsInsights(data: any): Promise<BusinessInsight[]> {
    const prompt = `Generate business insights based on:
    1. Performance metrics
    2. User behavior
    3. Market trends
    4. Historical data
    Data: ${JSON.stringify(data)}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content);
  }

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