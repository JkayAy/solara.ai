import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { AIService } from '@/lib/services/ai-service';
import { prisma } from '@/lib/prisma';

const aiService = new AIService();

export async function GET() {
 try {
  const { userId } = auth();
  if (!userId) {
   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
   where: { userId },
   include: {
    projects: {
     include: {
      tasks: true,
      documents: true,
     },
    },
    contacts: true,
   },
  });

  if (!profile) {
   return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // Get all proposals and clients for the profile
  const proposals = await prisma.proposal.findMany({
   where: { profileId: profile.id },
  });

  const clients = await prisma.client.findMany({
   where: { profileId: profile.id },
  });

  // Generate insights
  const insights = await aiService.generateBusinessInsights(proposals, clients);

  return NextResponse.json(insights);
 } catch (error) {
  console.error('Error generating AI insights:', error);
  return NextResponse.json(
   { error: 'Internal server error' },
   { status: 500 }
  );
 }
}

export async function POST(request: Request) {
 try {
  const { userId } = auth();
  if (!userId) {
   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
   where: { userId },
  });

  if (!profile) {
   return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const data = await request.json();
  const { type, context } = data;

  let insights;
  switch (type) {
   case 'market':
    insights = await aiService.analyzeMarketTrends();
    break;
   case 'client':
    const clients = await prisma.client.findMany({
     where: { profileId: profile.id },
    });
    insights = await aiService.analyzeClientBehavior(clients);
    break;
   case 'proposal':
    const proposals = await prisma.proposal.findMany({
     where: { profileId: profile.id },
    });
    insights = await aiService.generatePricingRecommendations(proposals);
    break;
   default:
    return NextResponse.json(
     { error: 'Invalid insight type' },
     { status: 400 }
    );
  }

  // Log the AI interaction
  await prisma.aiInteraction.create({
   data: {
    type: `insight_${type}`,
    input: JSON.stringify(context),
    output: JSON.stringify(insights),
    profileId: profile.id,
   },
  });

  return NextResponse.json(insights);
 } catch (error) {
  console.error('Error generating AI insights:', error);
  return NextResponse.json(
   { error: 'Internal server error' },
   { status: 500 }
  );
 }
} 