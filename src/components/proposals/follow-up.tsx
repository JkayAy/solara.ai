'use client';

import { useState } from 'react';
import { Calendar, Clock, Mail, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FollowUp {
 id: string;
 type: 'reminder' | 'follow-up' | 'final-notice';
 scheduledDate: string;
 status: 'pending' | 'sent' | 'cancelled';
 template: string;
}

interface FollowUpProps {
 proposalId: string;
 clientEmail: string;
 dueDate: string;
}

const followUpTemplates = {
 reminder: {
  subject: 'Reminder: Proposal Review Required',
  body: `Dear {{clientName}},

I hope this email finds you well. I wanted to follow up on the proposal I sent you regarding {{proposalTitle}}. The proposal is still pending your review.

You can review and respond to the proposal here: {{proposalLink}}

Please let me know if you have any questions or need any clarification.

Best regards,
{{senderName}}`
 },
 'follow-up': {
  subject: 'Follow-up: Proposal Status Update',
  body: `Dear {{clientName}},

I'm reaching out regarding the proposal for {{proposalTitle}} that was sent to you. I wanted to check if you've had a chance to review it and if you have any questions.

The proposal amount is {{amount}} and is due by {{dueDate}}.

You can access the proposal here: {{proposalLink}}

Looking forward to your response.

Best regards,
{{senderName}}`
 },
 'final-notice': {
  subject: 'Final Notice: Proposal Expiring Soon',
  body: `Dear {{clientName}},

This is a final reminder that the proposal for {{proposalTitle}} will expire on {{dueDate}}. To ensure we can proceed with the project as planned, please review and respond to the proposal at your earliest convenience.

You can access the proposal here: {{proposalLink}}

If you need any assistance or have questions, please don't hesitate to reach out.

Best regards,
{{senderName}}`
 }
};

export function FollowUp({ proposalId, clientEmail, dueDate }: FollowUpProps) {
 const [followUps, setFollowUps] = useState<FollowUp[]>([]);
 const [showAddForm, setShowAddForm] = useState(false);
 const [selectedType, setSelectedType] = useState<keyof typeof followUpTemplates>('reminder');
 const [scheduledDate, setScheduledDate] = useState('');

 const addFollowUp = () => {
  const newFollowUp: FollowUp = {
   id: Math.random().toString(36).substr(2, 9),
   type: selectedType,
   scheduledDate,
   status: 'pending',
   template: followUpTemplates[selectedType].body
  };
  setFollowUps([...followUps, newFollowUp]);
  setShowAddForm(false);
  setScheduledDate('');
 };

 const removeFollowUp = (id: string) => {
  setFollowUps(followUps.filter(fu => fu.id !== id));
 };

 const getStatusColor = (status: FollowUp['status']) => {
  switch (status) {
   case 'sent':
    return 'text-green-500';
   case 'cancelled':
    return 'text-red-500';
   default:
    return 'text-yellow-500';
  }
 };

 return (
  <div className="space-y-4">
   <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold">Automated Follow-ups</h3>
    <Button
     variant="outline"
     size="sm"
     onClick={() => setShowAddForm(true)}
     className="flex items-center gap-2"
    >
     <Plus className="w-4 h-4" />
     Add Follow-up
    </Button>
   </div>

   {/* Add Follow-up Form */}
   {showAddForm && (
    <div className="bg-card rounded-lg border p-4 space-y-4">
     <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
       <label className="text-sm font-medium">Follow-up Type</label>
       <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value as keyof typeof followUpTemplates)}
        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
       >
        <option value="reminder">Reminder</option>
        <option value="follow-up">Follow-up</option>
        <option value="final-notice">Final Notice</option>
       </select>
      </div>
      <div className="space-y-2">
       <label className="text-sm font-medium">Schedule Date</label>
       <input
        type="datetime-local"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
       />
      </div>
     </div>
     <div className="flex items-center justify-end gap-3">
      <Button
       variant="outline"
       size="sm"
       onClick={() => setShowAddForm(false)}
      >
       Cancel
      </Button>
      <Button
       size="sm"
       onClick={addFollowUp}
       disabled={!scheduledDate}
      >
       Add Follow-up
      </Button>
     </div>
    </div>
   )}

   {/* Follow-ups List */}
   <div className="space-y-2">
    {followUps.map((followUp) => (
     <div
      key={followUp.id}
      className="bg-card rounded-lg border p-4 flex items-center justify-between"
     >
      <div className="flex items-center gap-4">
       <div className="p-2 bg-primary/10 rounded-lg">
        <Mail className="w-5 h-5 text-primary" />
       </div>
       <div>
        <h4 className="font-medium capitalize">{followUp.type.replace('-', ' ')}</h4>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
         <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(followUp.scheduledDate).toLocaleDateString()}
         </div>
         <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {new Date(followUp.scheduledDate).toLocaleTimeString()}
         </div>
         <span className={getStatusColor(followUp.status)}>
          {followUp.status.charAt(0).toUpperCase() + followUp.status.slice(1)}
         </span>
        </div>
       </div>
      </div>
      <Button
       variant="ghost"
       size="sm"
       onClick={() => removeFollowUp(followUp.id)}
       className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
       <Trash2 className="w-4 h-4" />
      </Button>
     </div>
    ))}
   </div>

   {/* Template Preview */}
   {selectedType && showAddForm && (
    <div className="bg-card rounded-lg border p-4 space-y-2">
     <h4 className="font-medium">Email Template Preview</h4>
     <div className="bg-muted/50 rounded-lg p-4 text-sm">
      <p className="font-medium mb-2">Subject: {followUpTemplates[selectedType].subject}</p>
      <pre className="whitespace-pre-wrap font-sans">
       {followUpTemplates[selectedType].body}
      </pre>
     </div>
    </div>
   )}
  </div>
 );
} 