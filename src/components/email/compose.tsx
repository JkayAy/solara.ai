'use client';

import { useState } from 'react';
import { Send, Sparkles, X, Save, Clock } from 'lucide-react';

interface ComposeEmailProps {
 onClose: () => void;
 initialTo?: string;
 initialSubject?: string;
}

const emailTemplates = [
 {
  name: 'Meeting Follow-up',
  subject: 'Follow-up: {{meetingTopic}}',
  body: `Hi {{name}},

Thank you for your time in our meeting about {{meetingTopic}}. I wanted to follow up on the key points we discussed:

{{keyPoints}}

Please let me know if you need any clarification or have additional questions.

Best regards,
{{yourName}}`,
 },
 {
  name: 'Project Proposal',
  subject: 'Project Proposal: {{projectName}}',
  body: `Dear {{name}},

I'm excited to share our proposal for {{projectName}}. Here's a summary of what we discussed:

{{projectSummary}}

Key Deliverables:
{{deliverables}}

Timeline: {{timeline}}
Budget: {{budget}}

Please review and let me know if you'd like any adjustments.

Best regards,
{{yourName}}`,
 },
 {
  name: 'Thank You Note',
  subject: 'Thank You',
  body: `Hi {{name}},

I wanted to express my sincere gratitude for {{reason}}. Your {{support/help/guidance}} means a lot to me.

{{personalNote}}

Thank you again,
{{yourName}}`,
 },
];

export function ComposeEmail({ onClose, initialTo = '', initialSubject = '' }: ComposeEmailProps) {
 const [to, setTo] = useState(initialTo);
 const [subject, setSubject] = useState(initialSubject);
 const [body, setBody] = useState('');
 const [isSending, setIsSending] = useState(false);
 const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
 const [showTemplates, setShowTemplates] = useState(false);
 const [scheduledTime, setScheduledTime] = useState<string | null>(null);

 const handleSend = async () => {
  setIsSending(true);
  try {
   const response = await fetch('/api/email', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     to,
     subject,
     body,
     scheduledTime,
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to send email');
   }

   onClose();
  } catch (error) {
   console.error('Error sending email:', error);
   // Handle error (show toast notification, etc.)
  } finally {
   setIsSending(false);
  }
 };

 const handleTemplateSelect = (template: typeof emailTemplates[0]) => {
  setSelectedTemplate(template.name);
  setSubject(template.subject);
  setBody(template.body);
  setShowTemplates(false);
 };

 const handleAIAssist = async () => {
  try {
   const response = await fetch('/api/ai/command', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     messages: [
      {
       role: 'user',
       content: `Help me write a professional email with the following details:
                To: ${to}
                Subject: ${subject}
                Context: ${body.substring(0, 100)}...`,
      },
     ],
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to get AI assistance');
   }

   const data = await response.json();
   setBody(data.content);
  } catch (error) {
   console.error('Error getting AI assistance:', error);
  }
 };

 return (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-card rounded-lg shadow-lg w-full max-w-3xl">
     <div className="p-4 border-b flex items-center justify-between">
      <h2 className="text-lg font-semibold">New Message</h2>
      <button
       onClick={onClose}
       className="p-2 hover:bg-muted rounded-full"
      >
       <X className="w-5 h-5" />
      </button>
     </div>

     <div className="p-4 space-y-4">
      <div>
       <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
       />
      </div>
      <div>
       <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
       />
      </div>
      <div>
       <textarea
        placeholder="Write your message..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full h-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
       />
      </div>

      <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
        <button
         onClick={() => setShowTemplates(!showTemplates)}
         className="p-2 hover:bg-muted rounded-lg text-sm"
        >
         Templates
        </button>
        <button
         onClick={handleAIAssist}
         className="p-2 hover:bg-muted rounded-lg text-sm flex items-center gap-2"
        >
         <Sparkles className="w-4 h-4" />
         AI Assist
        </button>
        <button
         onClick={() => setScheduledTime(scheduledTime ? null : new Date().toISOString())}
         className="p-2 hover:bg-muted rounded-lg text-sm flex items-center gap-2"
        >
         <Clock className="w-4 h-4" />
         Schedule
        </button>
       </div>
       <div className="flex items-center gap-2">
        <button
         onClick={onClose}
         className="px-4 py-2 rounded-lg border hover:bg-muted"
        >
         Cancel
        </button>
        <button
         onClick={handleSend}
         disabled={isSending || !to || !subject || !body}
         className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
         <Send className="w-4 h-4" />
         {isSending ? 'Sending...' : 'Send'}
        </button>
       </div>
      </div>

      {showTemplates && (
       <div className="absolute left-4 bottom-20 bg-card border rounded-lg shadow-lg p-4 w-64">
        <h3 className="font-medium mb-2">Email Templates</h3>
        <div className="space-y-2">
         {emailTemplates.map((template) => (
          <button
           key={template.name}
           onClick={() => handleTemplateSelect(template)}
           className="w-full text-left p-2 hover:bg-muted rounded-lg text-sm"
          >
           {template.name}
          </button>
         ))}
        </div>
       </div>
      )}

      {scheduledTime && (
       <div className="absolute left-4 bottom-20 bg-card border rounded-lg shadow-lg p-4">
        <h3 className="font-medium mb-2">Schedule Email</h3>
        <input
         type="datetime-local"
         value={scheduledTime}
         onChange={(e) => setScheduledTime(e.target.value)}
         className="w-full p-2 border rounded-lg"
        />
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
} 