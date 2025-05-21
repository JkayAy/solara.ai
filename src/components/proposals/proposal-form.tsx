'use client';

import { useState } from 'react';
import { Save, Send, X, Eye, Share2 } from 'lucide-react';
import { ProposalPreview } from './proposal-preview';
import { ClientPortal } from './client-portal';
import { FollowUp } from './follow-up';

interface ProposalFormProps {
 template: {
  id: string;
  title: string;
  description: string;
  sections: string[];
 } | undefined;
 onClose: () => void;
}

export function ProposalForm({ template, onClose }: ProposalFormProps) {
 const [formData, setFormData] = useState({
  title: '',
  client: '',
  clientEmail: '',
  amount: '',
  dueDate: '',
  sections: template?.sections.reduce((acc, section) => ({
   ...acc,
   [section]: ''
  }), {}) || {}
 });
 const [showPreview, setShowPreview] = useState(false);
 const [showClientPortal, setShowClientPortal] = useState(false);
 const [showFollowUps, setShowFollowUps] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Implement proposal submission
  console.log('Proposal data:', formData);
  onClose();
 };

 const handleShare = () => {
  // TODO: Generate a unique share URL
  setShowClientPortal(true);
 };

 return (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[90vh] flex flex-col">
     {/* Header */}
     <div className="p-4 border-b flex items-center justify-between bg-card sticky top-0 z-10">
      <div>
       <h2 className="text-lg font-semibold">Create New Proposal</h2>
       <p className="text-sm text-muted-foreground">Fill in the details below</p>
      </div>
      <button
       type="button"
       onClick={onClose}
       className="p-2 hover:bg-muted rounded-lg"
      >
       <X className="w-5 h-5" />
      </button>
     </div>

     {/* Scrollable Content */}
     <div className="flex-1 overflow-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
       {/* Basic Information */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
         <label htmlFor="title" className="text-sm font-medium">
          Proposal Title
         </label>
         <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter proposal title"
          required
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="client" className="text-sm font-medium">
          Client Name
         </label>
         <input
          id="client"
          type="text"
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter client name"
          required
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="clientEmail" className="text-sm font-medium">
          Client Email
         </label>
         <input
          id="clientEmail"
          type="email"
          value={formData.clientEmail}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter client email"
          required
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="amount" className="text-sm font-medium">
          Amount ($)
         </label>
         <input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter amount"
          required
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="dueDate" className="text-sm font-medium">
          Due Date
         </label>
         <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter due date"
          required
         />
        </div>
       </div>

       {/* Template Sections */}
       <div className="space-y-4">
        <h3 className="font-medium">Proposal Content</h3>
        {template?.sections.map((section) => (
         <div key={section} className="space-y-2">
          <label htmlFor={section} className="text-sm font-medium">
           {section}
          </label>
          <textarea
           id={section}
           value={formData.sections[section]}
           onChange={(e) => setFormData({
            ...formData,
            sections: {
             ...formData.sections,
             [section]: e.target.value
            }
           })}
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
           placeholder={`Enter ${section.toLowerCase()} content`}
           required
          />
         </div>
        ))}
       </div>

       {/* Follow-ups Section */}
       <div className="space-y-4">
        <div className="flex items-center justify-between">
         <h3 className="font-medium">Automated Follow-ups</h3>
         <button
          type="button"
          onClick={() => setShowFollowUps(!showFollowUps)}
          className="text-sm text-primary hover:text-primary/80"
         >
          {showFollowUps ? 'Hide Follow-ups' : 'Show Follow-ups'}
         </button>
        </div>
        {showFollowUps && (
         <FollowUp
          proposalId="temp-id" // TODO: Generate a real ID
          clientEmail={formData.clientEmail}
          dueDate={formData.dueDate}
         />
        )}
       </div>
      </form>
     </div>

     {/* Footer with Actions */}
     <div className="p-4 border-t bg-card sticky bottom-0 z-10">
      <div className="flex items-center justify-end gap-3">
       <button
        type="button"
        onClick={() => setShowPreview(true)}
        className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center gap-2"
       >
        <Eye className="w-4 h-4" />
        Preview
       </button>
       <button
        type="button"
        onClick={handleShare}
        className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center gap-2"
       >
        <Share2 className="w-4 h-4" />
        Share
       </button>
       <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center gap-2"
       >
        <X className="w-4 h-4" />
        Cancel
       </button>
       <button
        type="submit"
        name="action"
        value="draft"
        className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg flex items-center gap-2"
       >
        <Save className="w-4 h-4" />
        Save as Draft
       </button>
       <button
        type="submit"
        name="action"
        value="send"
        className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg flex items-center gap-2"
       >
        <Send className="w-4 h-4" />
        Send Proposal
       </button>
      </div>
     </div>
    </div>
   </div>

   {showPreview && (
    <ProposalPreview
     proposal={{
      title: formData.title,
      client: formData.client,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      sections: formData.sections
     }}
     onClose={() => setShowPreview(false)}
    />
   )}

   {showClientPortal && (
    <ClientPortal
     proposal={{
      id: 'temp-id', // TODO: Generate a real ID
      title: formData.title,
      client: formData.client,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      sections: formData.sections
     }}
     onClose={() => setShowClientPortal(false)}
    />
   )}
  </div>
 );
} 