'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { AutomationRule } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ruleSchema = z.object({
 name: z.string().min(1, 'Name is required'),
 description: z.string().min(1, 'Description is required'),
 triggerType: z.string().min(1, 'Trigger type is required'),
 actionType: z.string().min(1, 'Action type is required'),
 conditions: z.string().optional(),
 isActive: z.boolean().default(true),
});

type RuleFormData = z.infer<typeof ruleSchema>;

const TRIGGER_TYPES = [
 'new_proposal',
 'proposal_status_change',
 'client_created',
 'task_completed',
 'document_uploaded',
];

const ACTION_TYPES = [
 'send_notification',
 'create_task',
 'update_status',
 'send_email',
 'create_document',
];

export default function RuleFormPage({
 params,
}: {
 params: { action: string };
}) {
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [submitting, setSubmitting] = useState(false);
 const router = useRouter();
 const isEdit = params.action !== 'new';

 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<RuleFormData>({
  resolver: zodResolver(ruleSchema),
  defaultValues: {
   isActive: true,
  },
 });

 useEffect(() => {
  if (isEdit) {
   fetchRule();
  } else {
   setLoading(false);
  }
 }, [isEdit]);

 const fetchRule = async () => {
  try {
   const response = await fetch(`/api/automation/rules/${params.action}`);
   if (!response.ok) {
    throw new Error('Failed to fetch rule');
   }
   const rule: AutomationRule = await response.json();
   setValue('name', rule.name);
   setValue('description', rule.description);
   setValue('triggerType', rule.triggerType);
   setValue('actionType', rule.actionType);
   setValue('conditions', rule.conditions || '');
   setValue('isActive', rule.isActive);
  } catch (err) {
   setError(err instanceof Error ? err.message : 'An error occurred');
   toast.error('Failed to load rule');
  } finally {
   setLoading(false);
  }
 };

 const onSubmit = async (data: RuleFormData) => {
  try {
   setSubmitting(true);
   const response = await fetch('/api/automation/rules', {
    method: isEdit ? 'PUT' : 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     ...data,
     id: isEdit ? params.action : undefined,
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to save rule');
   }

   toast.success(`Rule ${isEdit ? 'updated' : 'created'} successfully`);
   router.push('/dashboard/automation/rules');
  } catch (err) {
   toast.error(`Failed to ${isEdit ? 'update' : 'create'} rule`);
  } finally {
   setSubmitting(false);
  }
 };

 if (loading) {
  return (
   <div className="space-y-4">
    <Skeleton className="h-8 w-[200px]" />
    <Card>
     <CardContent className="p-6">
      <Skeleton className="h-4 w-[250px] mb-4" />
      <Skeleton className="h-4 w-[200px] mb-4" />
      <Skeleton className="h-4 w-[150px]" />
     </CardContent>
    </Card>
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
   <h1 className="text-2xl font-bold">
    {isEdit ? 'Edit Rule' : 'Create New Rule'}
   </h1>

   <form onSubmit={handleSubmit(onSubmit)}>
    <Card>
     <CardHeader>
      <CardTitle>Rule Details</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <div className="space-y-2">
       <label htmlFor="name">Name</label>
       <Input
        id="name"
        {...register('name')}
        placeholder="Enter rule name"
       />
       {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
       )}
      </div>

      <div className="space-y-2">
       <label htmlFor="description">Description</label>
       <Textarea
        id="description"
        {...register('description')}
        placeholder="Enter rule description"
       />
       {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
       )}
      </div>

      <div className="space-y-2">
       <label htmlFor="triggerType">Trigger Type</label>
       <Select
        onValueChange={(value) => setValue('triggerType', value)}
        defaultValue={register('triggerType').value}
       >
        <SelectTrigger>
         <SelectValue placeholder="Select trigger type" />
        </SelectTrigger>
        <SelectContent>
         {TRIGGER_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
           {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
       {errors.triggerType && (
        <p className="text-sm text-red-500">{errors.triggerType.message}</p>
       )}
      </div>

      <div className="space-y-2">
       <label htmlFor="actionType">Action Type</label>
       <Select
        onValueChange={(value) => setValue('actionType', value)}
        defaultValue={register('actionType').value}
       >
        <SelectTrigger>
         <SelectValue placeholder="Select action type" />
        </SelectTrigger>
        <SelectContent>
         {ACTION_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
           {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
       {errors.actionType && (
        <p className="text-sm text-red-500">{errors.actionType.message}</p>
       )}
      </div>

      <div className="space-y-2">
       <label htmlFor="conditions">Conditions (Optional)</label>
       <Textarea
        id="conditions"
        {...register('conditions')}
        placeholder="Enter rule conditions"
       />
      </div>

      <div className="flex justify-end space-x-2">
       <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
       >
        Cancel
       </Button>
       <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : isEdit ? 'Update Rule' : 'Create Rule'}
       </Button>
      </div>
     </CardContent>
    </Card>
   </form>
  </div>
 );
} 