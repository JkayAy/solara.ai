import { auth } from '@clerk/nextjs';
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

const systemPrompt = `You are Solara AI, an AI assistant designed to help solo professionals manage their business operations. 
You can help with:
1. Scheduling meetings and managing calendars
2. Drafting and managing emails
3. Creating business proposals
4. Managing client relationships
5. Providing business insights and recommendations

Always be professional, concise, and helpful. When asked to perform a task, provide clear steps or execute the task if possible.`;

export async function POST(req: Request) {
      try {
            const { userId } = auth();
            if (!userId) {
                  return new Response('Unauthorized', { status: 401 });
            }

            const { messages } = await req.json();

            const response = await openai.chat.completions.create({
                  model: 'gpt-4-turbo-preview',
                  stream: true,
                  messages: [
                        {
                              role: 'system',
                              content: systemPrompt,
                        },
                        ...messages,
                  ],
            });

            const stream = OpenAIStream(response);
            return new StreamingTextResponse(stream);
      } catch (error) {
            console.error('AI Command Error:', error);
            return new Response('Error processing your request', { status: 500 });
      }
} 