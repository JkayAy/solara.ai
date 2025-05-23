import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { AutomationService } from '@/lib/services/automation-service';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { monitoringService } from '@/lib/services/monitoring-service';

const automationService = new AutomationService();

export async function GET() {
 const span = monitoringService.startPerformanceSpan('get_workflow_templates');
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const templates = await prisma.workflowTemplate.findMany({
   where: {
    userId,
   },
   orderBy: {
    createdAt: 'desc',
   },
  });

  monitoringService.trackEvent('workflow_templates_fetched', {
   count: templates.length,
  });

  return NextResponse.json(templates);
 } catch (error) {
  monitoringService.captureError(error, {
   component: 'WorkflowTemplatesAPI',
   action: 'GET',
  });
  return new NextResponse('Internal Server Error', { status: 500 });
 } finally {
  span.finish();
 }
}

export async function POST(req: Request) {
 const span = monitoringService.startPerformanceSpan('create_workflow_template');
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { name, description, type, steps } = body;

  const template = await prisma.workflowTemplate.create({
   data: {
    name,
    description,
    type,
    steps,
    userId,
   },
  });

  // Notify real-time clients
  await pusherServer.trigger(`profile-${userId}`, 'workflow-created', template);

  monitoringService.trackEvent('workflow_template_created', {
   templateId: template.id,
   type: template.type,
  });

  return NextResponse.json(template);
 } catch (error) {
  monitoringService.captureError(error, {
   component: 'WorkflowTemplatesAPI',
   action: 'POST',
  });
  return new NextResponse('Internal Server Error', { status: 500 });
 } finally {
  span.finish();
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

  const template = await prisma.workflowTemplate.update({
   where: { id, profileId: profile.id },
   data: updateData,
  });

  return NextResponse.json(template);
 } catch (error) {
  console.error('Error updating workflow template:', error);
  return NextResponse.json(
   { error: 'Internal server error' },
   { status: 500 }
  );
 }
}

export async function DELETE(req: Request) {
 const span = monitoringService.startPerformanceSpan('delete_workflow_template');
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
   return new NextResponse('Template ID is required', { status: 400 });
  }

  const template = await prisma.workflowTemplate.delete({
   where: {
    id,
    userId,
   },
  });

  // Notify real-time clients
  await pusherServer.trigger(`profile-${userId}`, 'workflow-deleted', { id });

  monitoringService.trackEvent('workflow_template_deleted', {
   templateId: id,
  });

  return new NextResponse(null, { status: 204 });
 } catch (error) {
  monitoringService.captureError(error, {
   component: 'WorkflowTemplatesAPI',
   action: 'DELETE',
  });
  return new NextResponse('Internal Server Error', { status: 500 });
 } finally {
  span.finish();
 }
} 