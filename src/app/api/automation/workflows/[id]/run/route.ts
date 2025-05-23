import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { monitoringService } from '@/lib/services/monitoring-service';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const span = monitoringService.startPerformanceSpan('run_workflow_template');
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const template = await prisma.workflowTemplate.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    // Create a workflow instance
    const workflow = await prisma.workflow.create({
      data: {
        name: template.name,
        description: template.description,
        type: template.type,
        steps: template.steps,
        status: 'RUNNING',
        userId,
        templateId: template.id,
      },
    });

    // Start the workflow execution
    // This would typically be handled by a background job
    // For now, we'll just update the status
    await prisma.workflow.update({
      where: { id: workflow.id },
      data: { status: 'COMPLETED' },
    });

    monitoringService.trackEvent('workflow_template_run', {
      templateId: template.id,
      workflowId: workflow.id,
      type: template.type,
    });

    return NextResponse.json(workflow);
  } catch (error) {
    monitoringService.captureError(error, {
      component: 'WorkflowTemplatesAPI',
      action: 'run',
      templateId: params.id,
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    span.finish();
  }
} 