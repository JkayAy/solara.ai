'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, Sparkles } from 'lucide-react';

interface AutoReplyRule {
 id: string;
 name: string;
 conditions: {
  from?: string;
  subject?: string;
  keywords?: string[];
 };
 template: string;
}

export function AutoReplyRules() {
 const [rules, setRules] = useState<AutoReplyRule[]>([]);
 const [newRule, setNewRule] = useState<Partial<AutoReplyRule>>({
  name: '',
  conditions: {},
  template: '',
 });
 const [isGenerating, setIsGenerating] = useState(false);

 const handleAddRule = () => {
  if (!newRule.name || !newRule.template) return;

  setRules([...rules, { id: Date.now().toString(), ...newRule } as AutoReplyRule]);
  setNewRule({ name: '', conditions: {}, template: '' });
 };

 const handleDeleteRule = (ruleId: string) => {
  setRules(rules.filter(rule => rule.id !== ruleId));
 };

 const handleUpdateRule = async (ruleId: string, updates: Partial<AutoReplyRule>) => {
  try {
   const response = await fetch('/api/email', {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     ruleId,
     ...updates,
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to update rule');
   }

   setRules(rules.map(rule =>
    rule.id === ruleId ? { ...rule, ...updates } : rule
   ));
  } catch (error) {
   console.error('Error updating rule:', error);
  }
 };

 const generateTemplate = async () => {
  if (!newRule.conditions) return;

  setIsGenerating(true);
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
       content: `Generate a professional auto-reply email template for the following conditions:
                From: ${newRule.conditions.from || 'any'}
                Subject: ${newRule.conditions.subject || 'any'}
                Keywords: ${newRule.conditions.keywords?.join(', ') || 'any'}`,
      },
     ],
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to generate template');
   }

   const data = await response.json();
   setNewRule(prev => ({
    ...prev,
    template: data.content,
   }));
  } catch (error) {
   console.error('Error generating template:', error);
  } finally {
   setIsGenerating(false);
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Auto-reply Rules</h2>
    <button
     onClick={handleAddRule}
     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
    >
     <Plus className="w-4 h-4" />
     Add Rule
    </button>
   </div>

   {/* New Rule Form */}
   <div className="p-4 border rounded-lg space-y-4">
    <div>
     <label className="block text-sm font-medium mb-1">Rule Name</label>
     <input
      type="text"
      value={newRule.name}
      onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="e.g., Out of Office"
     />
    </div>

    <div>
     <label className="block text-sm font-medium mb-1">Conditions</label>
     <div className="space-y-2">
      <input
       type="text"
       value={newRule.conditions?.from || ''}
       onChange={(e) => setNewRule(prev => ({
        ...prev,
        conditions: { ...prev.conditions, from: e.target.value },
       }))}
       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
       placeholder="From (optional)"
      />
      <input
       type="text"
       value={newRule.conditions?.subject || ''}
       onChange={(e) => setNewRule(prev => ({
        ...prev,
        conditions: { ...prev.conditions, subject: e.target.value },
       }))}
       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
       placeholder="Subject (optional)"
      />
      <input
       type="text"
       value={newRule.conditions?.keywords?.join(', ') || ''}
       onChange={(e) => setNewRule(prev => ({
        ...prev,
        conditions: {
         ...prev.conditions,
         keywords: e.target.value.split(',').map(k => k.trim()),
        },
       }))}
       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
       placeholder="Keywords (comma-separated, optional)"
      />
     </div>
    </div>

    <div>
     <label className="block text-sm font-medium mb-1">Reply Template</label>
     <div className="relative">
      <textarea
       value={newRule.template}
       onChange={(e) => setNewRule(prev => ({ ...prev, template: e.target.value }))}
       className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
       placeholder="Enter your auto-reply template..."
      />
      <button
       onClick={generateTemplate}
       disabled={isGenerating}
       className="absolute right-2 bottom-2 p-2 hover:bg-muted rounded-lg"
      >
       <Sparkles className="w-4 h-4" />
      </button>
     </div>
    </div>
   </div>

   {/* Existing Rules */}
   <div className="space-y-4">
    {rules.map((rule) => (
     <div key={rule.id} className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
       <h3 className="font-medium">{rule.name}</h3>
       <div className="flex items-center gap-2">
        <button
         onClick={() => handleUpdateRule(rule.id, rule)}
         className="p-2 hover:bg-muted rounded-lg"
        >
         <Save className="w-4 h-4" />
        </button>
        <button
         onClick={() => handleDeleteRule(rule.id)}
         className="p-2 hover:bg-muted rounded-lg text-destructive"
        >
         <Trash2 className="w-4 h-4" />
        </button>
       </div>
      </div>

      <div className="space-y-2 text-sm">
       <div>
        <span className="font-medium">Conditions:</span>
        <ul className="list-disc list-inside">
         {rule.conditions.from && (
          <li>From: {rule.conditions.from}</li>
         )}
         {rule.conditions.subject && (
          <li>Subject: {rule.conditions.subject}</li>
         )}
         {rule.conditions.keywords?.length > 0 && (
          <li>Keywords: {rule.conditions.keywords.join(', ')}</li>
         )}
        </ul>
       </div>
       <div>
        <span className="font-medium">Template:</span>
        <p className="mt-1 whitespace-pre-wrap">{rule.template}</p>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
} 