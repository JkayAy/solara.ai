'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Download, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import { monitoringService } from '@/lib/services/monitoring-service';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface Template {
 id: string;
 name: string;
 description: string;
 category: string;
 author: {
  name: string;
  avatar: string;
  reputation: number;
 };
 rating: number;
 downloads: number;
 likes: number;
 tags: string[];
 verified: boolean;
 featured: boolean;
 trending: boolean;
 lastUpdated: string;
 contributors: Array<{
  name: string;
  avatar: string;
  role: string;
 }>;
}

interface Analytics {
 totalAutomations: number;
 timeSaved: string;
 successRate: number;
 activeWorkflows: number;
 monthlyTrend: {
  date: string;
  value: number;
 }[];
 topPerformingWorkflows: Array<{
  name: string;
  successRate: number;
  timeSaved: string;
  runs: number;
 }>;
 efficiencyScore: number;
 costSavings: string;
 productivityGain: number;
 automationHealth: {
  status: 'healthy' | 'warning' | 'critical';
  issues: number;
  lastCheck: string;
 };
}

const categories = [
 'All',
 'Automation',
 'Integration',
 'Notification',
 'Data Processing',
 'Scheduling',
];

function TemplateCardSkeleton() {
 return (
  <Card>
   <CardHeader>
    <div className="flex items-center justify-between">
     <Skeleton className="h-6 w-32" />
     <Skeleton className="h-4 w-16" />
    </div>
   </CardHeader>
   <CardContent>
    <Skeleton className="h-4 w-full mb-4" />
    <div className="flex flex-wrap gap-2 mb-4">
     <Skeleton className="h-6 w-20" />
     <Skeleton className="h-6 w-24" />
     <Skeleton className="h-6 w-16" />
    </div>
    <div className="flex items-center justify-between">
     <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
     </div>
     <Skeleton className="h-8 w-24" />
    </div>
   </CardContent>
  </Card>
 );
}

export default function MarketplacePage() {
 const [templates, setTemplates] = useState<Template[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);
 const [isLoadingMore, setIsLoadingMore] = useState(false);
 const [analytics, setAnalytics] = useState<Analytics>({
  totalAutomations: 0,
  timeSaved: '0h',
  successRate: 0,
  activeWorkflows: 0,
  monthlyTrend: [],
  topPerformingWorkflows: [],
  efficiencyScore: 0,
  costSavings: '0',
  productivityGain: 0,
  automationHealth: {
   status: 'healthy',
   issues: 0,
   lastCheck: '',
  },
 });

 useEffect(() => {
  fetchTemplates();
  fetchAnalytics();
 }, []);

 const fetchTemplates = async (pageNum = 1) => {
  const span = monitoringService.startPerformanceSpan('fetch_marketplace_templates');
  try {
   if (pageNum === 1) setLoading(true);
   else setIsLoadingMore(true);

   const response = await fetch(`/api/marketplace/templates?page=${pageNum}&limit=12`);
   if (!response.ok) throw new Error('Failed to fetch templates');

   const data = await response.json();

   if (pageNum === 1) {
    setTemplates(data.templates);
   } else {
    setTemplates(prev => [...prev, ...data.templates]);
   }

   setHasMore(data.hasMore);
   monitoringService.trackEvent('marketplace_templates_fetched', {
    page: pageNum,
    count: data.templates.length,
   });
  } catch (error) {
   toast.error('Failed to load templates');
   monitoringService.captureError(error, {
    component: 'MarketplacePage',
    action: 'fetchTemplates',
   });
  } finally {
   setLoading(false);
   setIsLoadingMore(false);
   span.finish();
  }
 };

 const fetchAnalytics = async () => {
  try {
   const response = await fetch('/api/analytics');
   if (!response.ok) throw new Error('Failed to fetch analytics');
   const data = await response.json();
   setAnalytics(data);
  } catch (error) {
   console.error('Failed to load analytics:', error);
  }
 };

 useEffect(() => {
  const observer = new IntersectionObserver(
   (entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
     setPage(prev => prev + 1);
     fetchTemplates(page + 1);
    }
   },
   { threshold: 0.1 }
  );

  const loadMoreTrigger = document.getElementById('load-more-trigger');
  if (loadMoreTrigger) observer.observe(loadMoreTrigger);

  return () => observer.disconnect();
 }, [hasMore, isLoadingMore, page]);

 const filteredTemplates = templates.filter((template) => {
  const matchesSearch = template.name
   .toLowerCase()
   .includes(searchQuery.toLowerCase());
  const matchesCategory =
   selectedCategory === 'All' || template.category === selectedCategory;
  return matchesSearch && matchesCategory;
 });

 return (
  <div className="space-y-6">
   {/* Enhanced Analytics Dashboard */}
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Automations</CardTitle>
      <BarChart className="h-4 w-4 text-muted-foreground" />
     </CardHeader>
     <CardContent>
      <div className="text-2xl font-bold">{analytics.totalAutomations}</div>
      <Progress value={analytics.totalAutomations} className="h-2 mt-2" />
      <p className="text-xs text-muted-foreground mt-2">
       {analytics.productivityGain}% more productive
      </p>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
      <Clock className="h-4 w-4 text-muted-foreground" />
     </CardHeader>
     <CardContent>
      <div className="text-2xl font-bold">{analytics.timeSaved}</div>
      <p className="text-xs text-muted-foreground">This month</p>
      <p className="text-xs text-green-600 mt-1">
       {analytics.costSavings} in cost savings
      </p>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
      <CheckCircle className="h-4 w-4 text-muted-foreground" />
     </CardHeader>
     <CardContent>
      <div className="text-2xl font-bold">{analytics.successRate}%</div>
      <Progress value={analytics.successRate} className="h-2 mt-2" />
      <div className="flex items-center space-x-2 mt-2">
       <Badge
        variant="secondary"
        className={`${analytics.automationHealth.status === 'healthy'
          ? 'bg-green-100 text-green-700'
          : analytics.automationHealth.status === 'warning'
           ? 'bg-yellow-100 text-yellow-700'
           : 'bg-red-100 text-red-700'
         }`}
       >
        {analytics.automationHealth.status}
       </Badge>
       {analytics.automationHealth.issues > 0 && (
        <span className="text-xs text-red-600">
         {analytics.automationHealth.issues} issues
        </span>
       )}
      </div>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
      <TrendingUp className="h-4 w-4 text-muted-foreground" />
     </CardHeader>
     <CardContent>
      <div className="text-2xl font-bold">{analytics.efficiencyScore}</div>
      <div className="h-[60px] mt-2">
       <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analytics.monthlyTrend}>
         <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
         />
         <XAxis dataKey="date" hide />
         <YAxis hide />
         <RechartsTooltip />
        </LineChart>
       </ResponsiveContainer>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Top Performing Workflows */}
   <Card>
    <CardHeader>
     <CardTitle className="text-lg">Top Performing Workflows</CardTitle>
    </CardHeader>
    <CardContent>
     <div className="space-y-4">
      {analytics.topPerformingWorkflows.map((workflow, index) => (
       <div key={index} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
         <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <span className="text-purple-700 font-medium">{index + 1}</span>
         </div>
         <div>
          <p className="font-medium">{workflow.name}</p>
          <p className="text-sm text-muted-foreground">
           {workflow.runs} runs this month
          </p>
         </div>
        </div>
        <div className="flex items-center space-x-4">
         <div className="text-right">
          <p className="text-sm font-medium text-green-600">
           {workflow.successRate}% success
          </p>
          <p className="text-xs text-muted-foreground">
           Saves {workflow.timeSaved}
          </p>
         </div>
         <Button variant="ghost" size="sm">
          View
         </Button>
        </div>
       </div>
      ))}
     </div>
    </CardContent>
   </Card>

   <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Workflow Templates</h1>
    <Button>
     <Download className="mr-2 h-4 w-4" />
     Upload Template
    </Button>
   </div>

   <div className="flex space-x-4">
    <div className="relative flex-1">
     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
     <Input
      placeholder="Search templates..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-8"
     />
    </div>
    <div className="flex space-x-2">
     {categories.map((category) => (
      <Button
       key={category}
       variant={selectedCategory === category ? 'default' : 'outline'}
       onClick={() => setSelectedCategory(category)}
      >
       {category}
      </Button>
     ))}
    </div>
   </div>

   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {loading ? (
     Array.from({ length: 6 }).map((_, i) => (
      <TemplateCardSkeleton key={i} />
     ))
    ) : (
     <>
      {filteredTemplates.map((template) => (
       <Card
        key={template.id}
        className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
       >
        <CardHeader>
         <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
           <Avatar className="h-8 w-8">
            <AvatarImage src={template.author.avatar} />
            <AvatarFallback>{template.author.name[0]}</AvatarFallback>
           </Avatar>
           <div>
            <CardTitle className="text-lg flex items-center space-x-2">
             {template.name}
             {template.verified && (
              <TooltipProvider>
               <Tooltip>
                <TooltipTrigger>
                 <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Verified
                 </Badge>
                </TooltipTrigger>
                <TooltipContent>
                 <p>Verified by our team</p>
                </TooltipContent>
               </Tooltip>
              </TooltipProvider>
             )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
             by {template.author.name}
            </p>
           </div>
          </div>
          <div className="flex items-center space-x-2">
           <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">{template.rating}</span>
           </div>
           {template.trending && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
             Trending
            </Badge>
           )}
          </div>
         </div>
        </CardHeader>
        <CardContent>
         <p className="text-sm text-muted-foreground mb-4">
          {template.description}
         </p>
         <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag) => (
           <Badge key={tag} variant="secondary">
            {tag}
           </Badge>
          ))}
         </div>
         <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
           <span>Popularity</span>
           <span>{template.downloads} downloads</span>
          </div>
          <Progress value={(template.downloads / 1000) * 100} className="h-2" />
          <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
            <TooltipProvider>
             <Tooltip>
              <TooltipTrigger>
               <div className="flex items-center space-x-1">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{template.downloads}</span>
               </div>
              </TooltipTrigger>
              <TooltipContent>
               <p>Total downloads</p>
              </TooltipContent>
             </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
             <Tooltip>
              <TooltipTrigger>
               <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{template.likes}</span>
               </div>
              </TooltipTrigger>
              <TooltipContent>
               <p>Total likes</p>
              </TooltipContent>
             </Tooltip>
            </TooltipProvider>
           </div>
           <Button size="sm">Use Template</Button>
          </div>
          {template.contributors.length > 0 && (
           <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Contributors</p>
            <div className="flex -space-x-2">
             {template.contributors.map((contributor, index) => (
              <TooltipProvider key={index}>
               <Tooltip>
                <TooltipTrigger>
                 <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={contributor.avatar} />
                  <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                 </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                 <p>{contributor.name} - {contributor.role}</p>
                </TooltipContent>
               </Tooltip>
              </TooltipProvider>
             ))}
            </div>
           </div>
          )}
         </div>
        </CardContent>
       </Card>
      ))}
      {isLoadingMore && (
       Array.from({ length: 3 }).map((_, i) => (
        <TemplateCardSkeleton key={`loading-${i}`} />
       ))
      )}
      <div id="load-more-trigger" className="h-4" />
     </>
    )}
   </div>
  </div>
 );
} 