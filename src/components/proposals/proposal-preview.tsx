'use client';

import { useState } from 'react';
import { Download, Eye, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReactToPrint } from 'react-to-print';

interface ProposalPreviewProps {
 proposal: {
  title: string;
  client: string;
  amount: number;
  dueDate: string;
  sections: Record<string, string>;
 };
 onClose: () => void;
}

export function ProposalPreview({ proposal, onClose }: ProposalPreviewProps) {
 const [isLoading, setIsLoading] = useState(false);
 const previewRef = useReactToPrint({
  content: () => document.getElementById('proposal-content'),
 });

 const handleExportPDF = async () => {
  setIsLoading(true);
  try {
   // TODO: Implement PDF export using a library like jsPDF
   await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
   previewRef();
  } catch (error) {
   console.error('Failed to export PDF:', error);
  } finally {
   setIsLoading(false);
  }
 };

 const handleShare = async () => {
  try {
   // TODO: Implement sharing functionality
   await navigator.share({
    title: proposal.title,
    text: `Proposal for ${proposal.client}`,
    // url: proposal.shareUrl, // To be implemented
   });
  } catch (error) {
   console.error('Failed to share:', error);
  }
 };

 return (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[90vh] flex flex-col">
     {/* Header */}
     <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
       <Eye className="w-5 h-5" />
       <h2 className="text-lg font-semibold">Proposal Preview</h2>
      </div>
      <div className="flex items-center gap-2">
       <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2"
       >
        <Share2 className="w-4 h-4" />
        Share
       </Button>
       <Button
        variant="outline"
        size="sm"
        onClick={previewRef}
        className="flex items-center gap-2"
       >
        <Printer className="w-4 h-4" />
        Print
       </Button>
       <Button
        variant="default"
        size="sm"
        onClick={handleExportPDF}
        disabled={isLoading}
        className="flex items-center gap-2"
       >
        <Download className="w-4 h-4" />
        {isLoading ? 'Exporting...' : 'Export PDF'}
       </Button>
      </div>
     </div>

     {/* Preview Content */}
     <div className="flex-1 overflow-auto p-6">
      <div id="proposal-content" className="max-w-3xl mx-auto bg-white p-8 shadow-sm">
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

       {/* Footer */}
       <div className="mt-12 pt-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
         <p>Thank you for considering this proposal</p>
         <p className="mt-2">For any questions, please contact us at support@example.com</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 