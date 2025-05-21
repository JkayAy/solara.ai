'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, ThumbsUp, ThumbsDown, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentIntegration } from './payment-integration';

interface ClientPortalProps {
 proposal: {
  id: string;
  title: string;
  client: string;
  amount: number;
  dueDate: string;
  sections: Record<string, string>;
 };
 onClose: () => void;
}

export function ClientPortal({ proposal, onClose }: ClientPortalProps) {
 const [feedback, setFeedback] = useState('');
 const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
 const [showComments, setShowComments] = useState(false);
 const [showPayment, setShowPayment] = useState(false);

 const handleAccept = () => {
  setStatus('accepted');
  setShowPayment(true);
 };

 const handleReject = () => {
  setStatus('rejected');
  // TODO: Implement proposal rejection
 };

 const handleSubmitFeedback = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Implement feedback submission
  console.log('Feedback submitted:', feedback);
  setFeedback('');
 };

 const handlePaymentComplete = () => {
  // TODO: Update proposal status and notify relevant parties
  console.log('Payment completed for proposal:', proposal.id);
 };

 return (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[90vh] flex flex-col">
     {/* Header */}
     <div className="p-4 border-b flex items-center justify-between">
      <div>
       <h2 className="text-lg font-semibold">Proposal Review</h2>
       <p className="text-sm text-muted-foreground">Review and provide feedback on the proposal</p>
      </div>
      <div className="flex items-center gap-2">
       <Button
        variant="outline"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2"
       >
        <MessageSquare className="w-4 h-4" />
        {showComments ? 'Hide Comments' : 'Show Comments'}
       </Button>
      </div>
     </div>

     {/* Content */}
     <div className="flex-1 overflow-auto">
      <div className="p-6">
       {/* Proposal Content */}
       <div className="max-w-3xl mx-auto bg-white p-8 shadow-sm rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
         <h1 className="text-3xl font-bold mb-2">{proposal.title}</h1>
         <p className="text-muted-foreground">Prepared for {proposal.client}</p>
        </div>

        {/* Proposal Details */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
         <div>
          <p className="text-sm text-muted-foreground">Proposal Amount</p>
          <p className="text-lg font-semibold">${proposal.amount.toLocaleString()}</p>
         </div>
         <div>
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="text-lg font-semibold">{new Date(proposal.dueDate).toLocaleDateString()}</p>
         </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
         {Object.entries(proposal.sections).map(([title, content]) => (
          <div key={title} className="space-y-2">
           <h2 className="text-xl font-semibold">{title}</h2>
           <div className="prose max-w-none">
            {content.split('\n').map((paragraph, index) => (
             <p key={index} className="mb-4">
              {paragraph}
             </p>
            ))}
           </div>
          </div>
         ))}
        </div>
       </div>

       {/* Feedback Section */}
       <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-card rounded-lg border p-6">
         <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
         <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <textarea
           value={feedback}
           onChange={(e) => setFeedback(e.target.value)}
           placeholder="Enter your feedback or questions about the proposal..."
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          />
          <div className="flex items-center justify-end gap-3">
           <Button
            type="button"
            variant="outline"
            onClick={handleReject}
            disabled={status !== 'pending'}
            className="flex items-center gap-2"
           >
            <ThumbsDown className="w-4 h-4" />
            Reject
           </Button>
           <Button
            type="button"
            variant="default"
            onClick={handleAccept}
            disabled={status !== 'pending'}
            className="flex items-center gap-2"
           >
            <ThumbsUp className="w-4 h-4" />
            Accept
           </Button>
           <Button
            type="submit"
            variant="secondary"
            className="flex items-center gap-2"
           >
            <MessageSquare className="w-4 h-4" />
            Submit Feedback
           </Button>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>

     {/* Status Bar */}
     <div className="p-4 border-t">
      <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
        {status === 'accepted' && (
         <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="w-5 h-5" />
          <span>Proposal Accepted</span>
         </div>
        )}
        {status === 'rejected' && (
         <div className="flex items-center gap-2 text-red-500">
          <XCircle className="w-5 h-5" />
          <span>Proposal Rejected</span>
         </div>
        )}
        {status === 'pending' && (
         <div className="text-muted-foreground">
          Please review and provide feedback
         </div>
        )}
       </div>
       <Button variant="outline" onClick={onClose}>
        Close
       </Button>
      </div>
     </div>
    </div>
   </div>

   {/* Payment Modal */}
   {showPayment && (
    <PaymentIntegration
     proposal={{
      id: proposal.id,
      title: proposal.title,
      amount: proposal.amount,
     }}
     onClose={() => setShowPayment(false)}
     onPaymentComplete={handlePaymentComplete}
    />
   )}
  </div>
 );
} 