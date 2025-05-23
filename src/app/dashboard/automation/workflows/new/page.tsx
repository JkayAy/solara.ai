'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { monitoringService } from '@/lib/services/monitoring-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const workflowSchema = z.object({
 name: z.string().min(1, 'Name is required'),
 description: z.string().min(1, 'Description is required'),
 type: z.enum(['SEQUENTIAL', 'PARALLEL', 'CONDITIONAL']),
 steps: z.array(
  z.object({
   name: z.string().min(1, 'Step name is required'),
   type: z.enum(['ACTION', 'TRIGGER', 'CONDITION']),
   config: z.record(z.any()),
  })
 ).min(1, 'At least one step is required'),
});

type WorkflowFormValues = z.infer<typeof workflowSchema>;

export default function NewWorkflowPage() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 const form = useForm<WorkflowFormValues>({
  resolver: zodResolver(workflowSchema),
  defaultValues: {
   name: '',
   description: '',
   type: 'SEQUENTIAL',
   steps: [],
  },
 });

 const onSubmit = async (data: WorkflowFormValues) => {
  const span = monitoringService.startPerformanceSpan('create_workflow_template');
  try {
   setLoading(true);
   const response = await fetch('/api/automation/workflows', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    throw new Error('Failed to create workflow template');
   }

   toast.success('Workflow template created successfully');
   monitoringService.trackEvent('workflow_template_created', {
    type: data.type,
    stepsCount: data.steps.length,
   });
   router.push('/dashboard/automation/workflows');
  } catch (err) {
   const error = err instanceof Error ? err : new Error('Failed to create workflow template');
   toast.error('Failed to create workflow template');
   monitoringService.captureError(error, {
    component: 'NewWorkflowPage',
    action: 'onSubmit',
    formData: data,
   });
  } finally {
   setLoading(false);
   span.finish();
  }
 };

 const addStep = () => {
  const currentSteps = form.getValues('steps');
  form.setValue('steps', [
   ...currentSteps,
   {
    name: '',
    type: 'ACTION',
    config: {},
   },
  ]);
 };

 const removeStep = (index: number) => {
  const currentSteps = form.getValues('steps');
  form.setValue(
   'steps',
   currentSteps.filter((_, i) => i !== index)
  );
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center space-x-4">
    <Link href="/dashboard/automation/workflows">
     <Button variant="ghost" size="icon">
      <ArrowLeft className="h-4 w-4" />
     </Button>
    </Link>
    <h1 className="text-2xl font-bold">Create Workflow Template</h1>
   </div>

   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <Card>
      <CardHeader>
       <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
           <Input placeholder="Enter workflow name" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
           <Textarea
            placeholder="Enter workflow description"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Workflow Type</FormLabel>
          <Select
           onValueChange={field.onChange}
           defaultValue={field.value}
          >
           <FormControl>
            <SelectTrigger>
             <SelectValue placeholder="Select workflow type" />
            </SelectTrigger>
           </FormControl>
           <SelectContent>
            <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
            <SelectItem value="PARALLEL">Parallel</SelectItem>
            <SelectItem value="CONDITIONAL">Conditional</SelectItem>
           </SelectContent>
          </Select>
          <FormDescription>
           Choose how the workflow steps should be executed
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
      </CardContent>
     </Card>

     <Card>
      <CardHeader>
       <CardTitle>Workflow Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
       {form.watch('steps').map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
         <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Step {index + 1}</h3>
          <Button
           type="button"
           variant="ghost"
           size="sm"
           onClick={() => removeStep(index)}
          >
           Remove
          </Button>
         </div>

         <FormField
          control={form.control}
          name={`steps.${index}.name`}
          render={({ field }) => (
           <FormItem>
            <FormLabel>Step Name</FormLabel>
            <FormControl>
             <Input placeholder="Enter step name" {...field} />
            </FormControl>
            <FormMessage />
           </FormItem>
          )}
         />

         <FormField
          control={form.control}
          name={`steps.${index}.type`}
          render={({ field }) => (
           <FormItem>
            <FormLabel>Step Type</FormLabel>
            <Select
             onValueChange={field.onChange}
             defaultValue={field.value}
            >
             <FormControl>
              <SelectTrigger>
               <SelectValue placeholder="Select step type" />
              </SelectTrigger>
             </FormControl>
             <SelectContent>
              <SelectItem value="ACTION">Action</SelectItem>
              <SelectItem value="TRIGGER">Trigger</SelectItem>
              <SelectItem value="CONDITION">Condition</SelectItem>
             </SelectContent>
            </Select>
            <FormMessage />
           </FormItem>
          )}
         />
        </div>
       ))}

       <Button
        type="button"
        variant="outline"
        onClick={addStep}
        className="w-full"
       >
        Add Step
       </Button>
      </CardContent>
     </Card>

     <div className="flex justify-end space-x-4">
      <Button
       type="button"
       variant="outline"
       onClick={() => router.back()}
      >
       Cancel
      </Button>
      <Button type="submit" disabled={loading}>
       {loading ? 'Creating...' : 'Create Workflow'}
      </Button>
     </div>
    </form>
   </Form>
  </div>
 );
} 