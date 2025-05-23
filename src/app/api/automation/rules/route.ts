import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { AutomationService } from '@/lib/services/automation-service';
import { prisma } from '@/lib/prisma';
import { pusher } from '@/lib/pusher';

const automationService = new AutomationService();

export async function GET() {
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

    const rules = await prisma.automationRule.findMany({
      where: { profileId: profile.id },
    });

    return NextResponse.json(rules);
  } catch (error) {
    console.error('Error fetching automation rules:', error);
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
    const rule = await automationService.createAutomationRule({
      ...data,
      profileId: profile.id,
    });

    // Trigger real-time event
    await pusher.trigger(`profile-${profile.id}`, 'rule-created', rule);

    return NextResponse.json(rule);
  } catch (error) {
    console.error('Error creating automation rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
    const { id, ...updateData } = data;

    const rule = await prisma.automationRule.update({
      where: { id, profileId: profile.id },
      data: updateData,
    });

    // Trigger real-time event
    await pusher.trigger(`profile-${profile.id}`, 'rule-updated', rule);

    return NextResponse.json(rule);
  } catch (error) {
    console.error('Error updating automation rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Rule ID is required' },
        { status: 400 }
      );
    }

    await prisma.automationRule.delete({
      where: { id, profileId: profile.id },
    });

    // Trigger real-time event
    await pusher.trigger(`profile-${profile.id}`, 'rule-deleted', { id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting automation rule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 