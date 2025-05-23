'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { AutomationRule } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { pusherClient } from '@/lib/pusher';
import { useAuth } from '@clerk/nextjs';
import { monitoringService } from '@/lib/services/monitoring-service';

export default function AutomationRulesPage() {
 const [rules, setRules] = useState<AutomationRule[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const router = useRouter();
 const { userId, user } = useAuth();

 useEffect(() => {
  if (!userId || !user) return;

  // Set user in monitoring services
  monitoringService.setUser({
   id: userId,
   email: user.emailAddresses[0]?.emailAddress,
   name: user.fullName,
  });

  // Subscribe to real-time events
  const channel = pusherClient.subscribe(`profile-${userId}`);

  channel.bind('rule-created', (rule: AutomationRule) => {
   setRules((prevRules) => [...prevRules, rule]);
   toast.success('New automation rule created');
   monitoringService.trackRuleCreated(rule);
  });

  channel.bind('rule-updated', (rule: AutomationRule) => {
   setRules((prevRules) =>
    prevRules.map((r) => (r.id === rule.id ? rule : r))
   );
   toast.success('Automation rule updated');
   monitoringService.trackRuleUpdated(rule);
  });

  channel.bind('rule-deleted', ({ id }: { id: string }) => {
   setRules((prevRules) => prevRules.filter((r) => r.id !== id));
   toast.success('Automation rule deleted');
   monitoringService.trackRuleDeleted(id);
  });

  // Initial fetch
  fetchRules();

  // Cleanup subscription
  return () => {
   channel.unbind_all();
   channel.unsubscribe();
  };
 }, [userId, user]);

 const fetchRules = async () => {
  const span = monitoringService.startPerformanceSpan('fetch_automation_rules');
  try {
   setLoading(true);
   setError(null);
   const response = await fetch('/api/automation/rules');
   if (!response.ok) {
    throw new Error('Failed to fetch automation rules');
   }
   const data = await response.json();
   setRules(data);
   monitoringService.trackEvent('automation_rules_fetched', {
    count: data.length,
   });
  } catch (err) {
   const error = err instanceof Error ? err : new Error('An error occurred');
   setError(error.message);
   toast.error('Failed to load automation rules');
   monitoringService.captureError(error, {
    component: 'AutomationRulesPage',
    action: 'fetchRules',
   });
  } finally {
   setLoading(false);
   span.finish();
  }
 };

 const handleDelete = async (id: string) => {
  const span = monitoringService.startPerformanceSpan('delete_automation_rule');
  try {
   const response = await fetch(`/api/automation/rules?id=${id}`, {
    method: 'DELETE',
   });
   if (!response.ok) {
    throw new Error('Failed to delete rule');
   }
   // Note: We don't need to update the state here as the real-time event will handle it
  } catch (err) {
   const error = err instanceof Error ? err : new Error('Failed to delete rule');
   toast.error('Failed to delete rule');
   monitoringService.captureError(error, {
    component: 'AutomationRulesPage',
    action: 'handleDelete',
    ruleId: id,
   });
  } finally {
   span.finish();
  }
 };

 if (loading) {
  return (
   <div className="space-y-4">
    <Skeleton className="h-8 w-[200px]" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
     {[1, 2, 3].map((i) => (
      <Card key={i}>
       <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
       </CardHeader>
       <CardContent>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px] mt-2" />
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  );
 }

 if (error) {
  return (
   <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
   </Alert>
  );
 }

 return (
  <div className="space-y-4">
   <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Automation Rules</h1>
    <Button
     onClick={() => {
      monitoringService.trackEvent('create_rule_button_clicked');
      router.push('/dashboard/automation/rules/new');
     }}
    >
     <Plus className="mr-2 h-4 w-4" />
     New Rule
    </Button>
   </div>

   {rules.length === 0 ? (
    <Card>
     <CardContent className="flex flex-col items-center justify-center p-6">
      <p className="text-muted-foreground mb-4">No automation rules found</p>
      <Button
       onClick={() => {
        monitoringService.trackEvent('create_first_rule_clicked');
        router.push('/dashboard/automation/rules/new');
       }}
      >
       Create your first rule
      </Button>
     </CardContent>
    </Card>
   ) : (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
     {rules.map((rule) => (
      <Card key={rule.id}>
       <CardHeader>
        <CardTitle className="flex justify-between items-center">
         {rule.name}
         <div className="flex space-x-2">
          <Button
           variant="ghost"
           size="icon"
           onClick={() => {
            monitoringService.trackEvent('edit_rule_clicked', {
             ruleId: rule.id,
            });
            router.push(`/dashboard/automation/rules/${rule.id}/edit`);
           }}
          >
           <Edit2 className="h-4 w-4" />
          </Button>
          <Button
           variant="ghost"
           size="icon"
           onClick={() => {
            monitoringService.trackEvent('delete_rule_clicked', {
             ruleId: rule.id,
            });
            handleDelete(rule.id);
           }}
          >
           <Trash2 className="h-4 w-4" />
          </Button>
         </div>
        </CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-sm text-muted-foreground">{rule.description}</p>
        <div className="mt-4 flex items-center space-x-2">
         <span className="text-xs text-muted-foreground">
          Trigger: {rule.triggerType}
         </span>
         <span className="text-xs text-muted-foreground">
          Action: {rule.actionType}
         </span>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   )}
  </div>
 );
} 