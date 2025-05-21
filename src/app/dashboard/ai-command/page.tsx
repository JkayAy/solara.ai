'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Send, Sparkles, Calendar, Mail, FileText, Users } from 'lucide-react';

const commandSuggestions = [
  {
    title: 'Schedule Meeting',
    description: 'Schedule a meeting with a client',
    icon: Calendar,
    prompt: 'Schedule a meeting with John Doe for next Tuesday at 2 PM',
  },
  {
    title: 'Draft Email',
    description: 'Compose a professional email',
    icon: Mail,
    prompt: 'Draft an email to follow up on our last meeting',
  },
  {
    title: 'Create Proposal',
    description: 'Generate a business proposal',
    icon: FileText,
    prompt: 'Create a proposal for website development services',
  },
  {
    title: 'Client Summary',
    description: 'Get a summary of client interactions',
    icon: Users,
    prompt: 'Summarize all interactions with Acme Corp',
  },
];

export default function AICommandPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/ai/command',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    await handleSubmit(e);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${message.role === 'assistant'
                  ? 'bg-muted'
                  : 'bg-primary text-primary-foreground'
                }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Quick Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commandSuggestions.map((suggestion) => (
              <button
                key={suggestion.title}
                onClick={() => handleInputChange({ target: { value: suggestion.prompt } } as any)}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <suggestion.icon className="w-5 h-5 text-primary mt-1" />
                <div className="text-left">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleCommandSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your command or question..."
              className="w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isProcessing}
            />
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
} 