'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, Play } from 'lucide-react';
import { toast } from 'sonner';
import { WorkflowTemplate } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { pusherClient } from '@/lib/pusher';
import { useAuth } from '@clerk/nextjs';
import { monitoringService } from '@/lib/services/monitoring-service';
import { Badge } from '@/components/ui/badge';

export default function WorkflowTemplatesPage() {
 const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
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

  channel.bind('workflow-created', (template: WorkflowTemplate) => {
   setTemplates((prevTemplates) => [...prevTemplates, template]);
   toast.success('New workflow template created');
   monitoringService.trackEvent('workflow_template_created', {
    templateId: template.id,
    type: template.type,
   });
  });

  channel.bind('workflow-updated', (template: WorkflowTemplate) => {
   setTemplates((prevTemplates) =>
    prevTemplates.map((t) => (t.id === template.id ? template : t))
   );
   toast.success('Workflow template updated');
   monitoringService.trackEvent('workflow_template_updated', {
    templateId: template.id,
    type: template.type,
   });
  });

  channel.bind('workflow-deleted', ({ id }: { id: string }) => {
   setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id));
   toast.success('Workflow template deleted');
   monitoringService.trackEvent('workflow_template_deleted', {
    templateId: id,
   });
  });

  // Initial fetch
  fetchTemplates();

  // Cleanup subscription
  return () => {
   channel.unbind_all();
   channel.unsubscribe();
  };
 }, [userId, user]);

 const fetchTemplates = async () => {
  const span = monitoringService.startPerformanceSpan('fetch_workflow_templates');
  try {
   setLoading(true);
   setError(null);
   const response = await fetch('/api/automation/workflows');
   if (!response.ok) {
    throw new Error('Failed to fetch workflow templates');
   }
   const data = await response.json();
   setTemplates(data);
   monitoringService.trackEvent('workflow_templates_fetched', {
    count: data.length,
   });
  } catch (err) {
   const error = err instanceof Error ? err : new Error('An error occurred');
   setError(error.message);
   toast.error('Failed to load workflow templates');
   monitoringService.captureError(error, {
    component: 'WorkflowTemplatesPage',
    action: 'fetchTemplates',
   });
  } finally {
   setLoading(false);
   span.finish();
  }
 };

 const handleDelete = async (id: string) => {
  const span = monitoringService.startPerformanceSpan('delete_workflow_template');
  try {
   const response = await fetch(`/api/automation/workflows?id=${id}`, {
    method: 'DELETE',
   });
   if (!response.ok) {
    throw new Error('Failed to delete workflow template');
   }
  } catch (err) {
   const error = err instanceof Error ? err : new Error('Failed to delete workflow template');
   toast.error('Failed to delete workflow template');
   monitoringService.captureError(error, {
    component: 'WorkflowTemplatesPage',
    action: 'handleDelete',
    templateId: id,
   });
  } finally {
   span.finish();
  }
 };

 const handleRun = async (id: string) => {
  const span = monitoringService.startPerformanceSpan('run_workflow_template');
  try {
   const response = await fetch(`/api/automation/workflows/${id}/run`, {
    method: 'POST',
   });
   if (!response.ok) {
    throw new Error('Failed to run workflow template');
   }
   toast.success('Workflow started successfully');
   monitoringService.trackEvent('workflow_template_run', {
    templateId: id,
   });
  } catch (err) {
   const error = err instanceof Error ? err : new Error('Failed to run workflow template');
   toast.error('Failed to run workflow template');
   monitoringService.captureError(error, {
    component: 'WorkflowTemplatesPage',
    action: 'handleRun',
    templateId: id,
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
    <h1 className="text-2xl font-bold">Workflow Templates</h1>
    <Button
     onClick={() => {
      monitoringService.trackEvent('create_workflow_button_clicked');
      router.push('/dashboard/automation/workflows/new');
     }}
    >
     <Plus className="mr-2 h-4 w-4" />
     New Template
    </Button>
   </div>

   {templates.length === 0 ? (
    <Card>
     <CardContent className="flex flex-col items-center justify-center p-6">
      <p className="text-muted-foreground mb-4">No workflow templates found</p>
      <Button
       onClick={() => {
        monitoringService.trackEvent('create_first_workflow_clicked');
        router.push('/dashboard/automation/workflows/new');
       }}
      >
       Create your first template
      </Button>
     </CardContent>
    </Card>
   ) : (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
     {templates.map((template) => (
      <Card key={template.id}>
       <CardHeader>
        <CardTitle className="flex justify-between items-center">
         {template.name}
         <div className="flex space-x-2">
          <Button
           variant="ghost"
           size="icon"
           onClick={() => {
            monitoringService.trackEvent('run_workflow_clicked', {
             templateId: template.id,
            });
            handleRun(template.id);
           }}
          >
           <Play className="h-4 w-4" />
          </Button>
          <Button
           variant="ghost"
           size="icon"
           onClick={() => {
            monitoringService.trackEvent('edit_workflow_clicked', {
             templateId: template.id,
            });
            router.push(`/dashboard/automation/workflows/${template.id}/edit`);
           }}
          >
           <Edit2 className="h-4 w-4" />
          </Button>
          <Button
           variant="ghost"
           size="icon"
           onClick={() => {
            monitoringService.trackEvent('delete_workflow_clicked', {
             templateId: template.id,
            });
            handleDelete(template.id);
           }}
          >
           <Trash2 className="h-4 w-4" />
          </Button>
         </div>
        </CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <div className="mt-4 flex items-center space-x-2">
         <Badge variant="outline">{template.type}</Badge>
         <span className="text-xs text-muted-foreground">
          Steps: {template.steps?.length || 0}
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