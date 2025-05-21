import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OpenAI } from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Gmail API
const oauth2Client = new google.auth.OAuth2(
 process.env.GOOGLE_CLIENT_ID,
 process.env.GOOGLE_CLIENT_SECRET,
 process.env.GOOGLE_REDIRECT_URI
);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Get emails
export async function GET(req: Request) {
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const maxResults = parseInt(searchParams.get('maxResults') || '10');

  const response = await gmail.users.messages.list({
   userId: 'me',
   maxResults,
   q: query,
  });

  const messages = response.data.messages || [];
  const emails = await Promise.all(
   messages.map(async (message) => {
    const email = await gmail.users.messages.get({
     userId: 'me',
     id: message.id!,
    });

    const headers = email.data.payload?.headers;
    const subject = headers?.find((h) => h.name === 'Subject')?.value || '';
    const from = headers?.find((h) => h.name === 'From')?.value || '';
    const date = headers?.find((h) => h.name === 'Date')?.value || '';

    // Get email body
    const body = email.data.payload?.parts?.[0]?.body?.data || '';
    const decodedBody = Buffer.from(body, 'base64').toString();

    // Generate AI summary
    const summary = await generateSummary(decodedBody);

    // Check for auto-reply rules
    const autoReply = await checkAutoReplyRules(from, subject, decodedBody);

    return {
     id: message.id,
     subject,
     from,
     date,
     preview: decodedBody.substring(0, 100),
     summary,
     autoReply,
    };
   })
  );

  return NextResponse.json(emails);
 } catch (error) {
  console.error('Email API Error:', error);
  return new NextResponse('Error fetching emails', { status: 500 });
 }
}

// Generate AI summary of email
async function generateSummary(content: string) {
 try {
  const response = await openai.chat.completions.create({
   model: 'gpt-4-turbo-preview',
   messages: [
    {
     role: 'system',
     content: 'Summarize the following email in one concise sentence:',
    },
    {
     role: 'user',
     content,
    },
   ],
   max_tokens: 100,
  });

  return response.choices[0].message.content;
 } catch (error) {
  console.error('AI Summary Error:', error);
  return null;
 }
}

// Check auto-reply rules
async function checkAutoReplyRules(from: string, subject: string, content: string) {
 try {
  const { userId } = auth();
  if (!userId) return null;

  // Get user's auto-reply rules
  const rules = await prisma.autoReplyRule.findMany({
   where: { userId },
  });

  for (const rule of rules) {
   const matches = await checkRuleMatch(rule, from, subject, content);
   if (matches) {
    return {
     ruleId: rule.id,
     template: rule.template,
     conditions: rule.conditions,
    };
   }
  }

  return null;
 } catch (error) {
  console.error('Auto-reply check error:', error);
  return null;
 }
}

// Check if an email matches a rule
async function checkRuleMatch(rule: any, from: string, subject: string, content: string) {
 try {
  const response = await openai.chat.completions.create({
   model: 'gpt-4-turbo-preview',
   messages: [
    {
     role: 'system',
     content: `Check if the following email matches these conditions: ${JSON.stringify(rule.conditions)}`,
    },
    {
     role: 'user',
     content: `From: ${from}\nSubject: ${subject}\nContent: ${content}`,
    },
   ],
   max_tokens: 50,
  });

  const result = response.choices[0].message.content?.toLowerCase();
  return result?.includes('yes') || result?.includes('true');
 } catch (error) {
  console.error('Rule match check error:', error);
  return false;
 }
}

// Send email
export async function POST(req: Request) {
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const { to, subject, body, scheduledTime } = await req.json();

  if (scheduledTime) {
   // Store scheduled email in database
   await prisma.scheduledEmail.create({
    data: {
     userId,
     to,
     subject,
     body,
     scheduledTime: new Date(scheduledTime),
    },
   });

   return new NextResponse('Email scheduled successfully');
  }

  const message = [
   'Content-Type: text/plain; charset="UTF-8"\n',
   'MIME-Version: 1.0\n',
   `To: ${to}\n`,
   `Subject: ${subject}\n\n`,
   body,
  ].join('');

  const encodedMessage = Buffer.from(message)
   .toString('base64')
   .replace(/\+/g, '-')
   .replace(/\//g, '_')
   .replace(/=+$/, '');

  await gmail.users.messages.send({
   userId: 'me',
   requestBody: {
    raw: encodedMessage,
   },
  });

  return new NextResponse('Email sent successfully');
 } catch (error) {
  console.error('Send Email Error:', error);
  return new NextResponse('Error sending email', { status: 500 });
 }
}

// Update auto-reply rules
export async function PUT(req: Request) {
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const { ruleId, conditions, template } = await req.json();

  const rule = await prisma.autoReplyRule.update({
   where: { id: ruleId },
   data: {
    conditions,
    template,
   },
  });

  return NextResponse.json(rule);
 } catch (error) {
  console.error('Update Auto-reply Rule Error:', error);
  return new NextResponse('Error updating auto-reply rule', { status: 500 });
 }
} 