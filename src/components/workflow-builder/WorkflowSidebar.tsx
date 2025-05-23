import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, TrendingUp, History, Brain, Zap } from 'lucide-react';
import { DragEvent, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const nodeTypes = [
 {
  type: 'TRIGGER',
  label: 'Trigger',
  description: 'Start your workflow',
  category: 'Start',
  icon: '⚡',
 },
 {
  type: 'ACTION',
  label: 'Action',
  description: 'Perform an action',
  category: 'Actions',
  icon: '🔧',
 },
 {
  type: 'CONDITION',
  label: 'Condition',
  description: 'Add conditional logic',
  category: 'Logic',
  icon: '🔀',
 },
 {
  type: 'AI',
  label: 'AI Assistant',
  description: 'Add AI-powered automation',
  category: 'AI',
  icon: '🤖',
 },
];

const popularTemplates = [
 {
  id: '1',
  name: 'Email Notification Flow',
  description: 'Send notifications based on events',
  nodes: ['TRIGGER', 'CONDITION', 'ACTION'],
 },
 {
  id: '2',
  name: 'Data Processing Pipeline',
  description: 'Process and transform data automatically',
  nodes: ['TRIGGER', 'AI', 'ACTION'],
 },
];

const aiSuggestions = [
 {
  id: 'ai-1',
  type: 'SMART_SUGGESTION',
  label: 'Smart Workflow',
  description: 'AI analyzes your patterns and suggests optimal workflow',
  confidence: 95,
  timeSaved: '2 hours/week',
  roi: '$500/month',
  complexity: 'Medium',
  estimatedSetupTime: '15 mins',
  similarUsers: 124,
  successRate: 98,
 },
 {
  id: 'ai-2',
  type: 'AUTOMATION',
  label: 'Auto-Complete',
  description: 'AI predicts and completes your workflow',
  confidence: 88,
  timeSaved: '1.5 hours/week',
  roi: '$300/month',
  complexity: 'Low',
  estimatedSetupTime: '5 mins',
  similarUsers: 89,
  successRate: 95,
 },
];

interface WorkflowSidebarProps {
 onDragStart: (event: DragEvent, nodeType: string) => void;
 onTemplateSelect: (template: any) => void;
 userHistory?: any[];
 userPreferences?: any;
}

export function WorkflowSidebar({
 onDragStart,
 onTemplateSelect,
 userHistory = [],
 userPreferences = {}
}: WorkflowSidebarProps) {
 const [searchQuery, setSearchQuery] = useState('');
 const [aiSuggestions, setAiSuggestions] = useState([]);
 const [isAiLoading, setIsAiLoading] = useState(false);

 useEffect(() => {
  // Load AI suggestions based on user history and preferences
  loadAiSuggestions();
 }, [userHistory, userPreferences]);

 const loadAiSuggestions = async () => {
  setIsAiLoading(true);
  try {
   const response = await fetch('/api/ai/suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     userHistory,
     userPreferences,
     includeMetrics: true,
     includeSimilarUsers: true,
     includeROI: true,
    }),
   });
   const data = await response.json();
   setAiSuggestions(data.suggestions);
  } catch (error) {
   console.error('Failed to load AI suggestions:', error);
  } finally {
   setIsAiLoading(false);
  }
 };

 const filteredNodes = nodeTypes.filter((node) =>
  node.label.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div className="w-80 border-r bg-gray-50 p-4">
   <Tabs defaultValue="nodes" className="w-full">
    <TabsList className="grid w-full grid-cols-3">
     <TabsTrigger value="nodes">Nodes</TabsTrigger>
     <TabsTrigger value="templates">Templates</TabsTrigger>
     <TabsTrigger value="history">History</TabsTrigger>
    </TabsList>

    <TabsContent value="nodes" className="mt-4">
     <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
       placeholder="Search nodes..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="pl-8"
      />
     </div>

     {/* Enhanced AI Suggestions Section */}
     <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
       <div className="flex items-center space-x-2">
        <Brain className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-medium">AI Suggestions</h3>
       </div>
       <Badge variant="secondary" className="bg-purple-100 text-purple-700">
        Personalized
       </Badge>
      </div>
      <div className="space-y-3">
       {isAiLoading ? (
        <Card className="p-3">
         <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
         </div>
        </Card>
       ) : (
        aiSuggestions.map((suggestion) => (
         <TooltipProvider key={suggestion.id}>
          <Tooltip>
           <TooltipTrigger>
            <Card
             className="cursor-pointer hover:shadow-md transition-shadow border-purple-100"
             onClick={() => onTemplateSelect(suggestion)}
            >
             <CardHeader className="p-3">
              <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-500" />
                <CardTitle className="text-sm font-medium">
                 {suggestion.label}
                </CardTitle>
               </div>
               <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {suggestion.confidence}% match
               </Badge>
              </div>
             </CardHeader>
             <CardContent className="p-3 pt-0 space-y-3">
              <p className="text-xs text-gray-500">
               {suggestion.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
               <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>Saves {suggestion.timeSaved}</span>
               </div>
               <div className="flex items-center space-x-1 text-blue-600">
                <span>ROI: {suggestion.roi}</span>
               </div>
               <div className="flex items-center space-x-1 text-purple-600">
                <span>Success: {suggestion.successRate}%</span>
               </div>
               <div className="flex items-center space-x-1 text-gray-600">
                <span>{suggestion.similarUsers} similar users</span>
               </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
               <span>Complexity: {suggestion.complexity}</span>
               <span>Setup: {suggestion.estimatedSetupTime}</span>
              </div>
             </CardContent>
            </Card>
           </TooltipTrigger>
           <TooltipContent>
            <div className="space-y-2">
             <p>Based on your workflow patterns and preferences</p>
             <p className="text-xs text-muted-foreground">
              {suggestion.similarUsers} users with similar patterns have implemented this
             </p>
            </div>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>
        ))
       )}
      </div>
     </div>

     {/* Existing Nodes Section */}
     <div className="space-y-4">
      {filteredNodes.map((node) => (
       <Card
        key={node.type}
        className="cursor-move hover:shadow-md transition-shadow"
        draggable
        onDragStart={(event) => onDragStart(event, node.type)}
       >
        <CardHeader className="p-3">
         <div className="flex items-center space-x-2">
          <span className="text-xl">{node.icon}</span>
          <CardTitle className="text-sm font-medium">
           {node.label}
          </CardTitle>
         </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
         <div className="flex items-center justify-between">
          <Badge variant="outline">{node.category}</Badge>
         </div>
         <p className="text-xs text-gray-500 mt-2">
          {node.description}
         </p>
        </CardContent>
       </Card>
      ))}
     </div>
    </TabsContent>

    <TabsContent value="templates" className="mt-4">
     <div className="space-y-4">
      {popularTemplates.map((template) => (
       <Card
        key={template.id}
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => onTemplateSelect(template)}
       >
        <CardHeader className="p-3">
         <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
           {template.name}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
         </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
         <p className="text-xs text-gray-500 mb-2">
          {template.description}
         </p>
         <div className="flex flex-wrap gap-1">
          {template.nodes.map((node) => (
           <Badge key={node} variant="secondary" className="text-xs">
            {node}
           </Badge>
          ))}
         </div>
        </CardContent>
       </Card>
      ))}
     </div>
    </TabsContent>

    <TabsContent value="history" className="mt-4">
     <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
       <History className="h-4 w-4" />
       <span>Recent Workflows</span>
      </div>
      {/* Add recent workflows history here */}
     </div>
    </TabsContent>
   </Tabs>
  </div>
 );
} 