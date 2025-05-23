'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Play } from 'lucide-react';
import { toast } from 'sonner';
import { monitoringService } from '@/lib/services/monitoring-service';
import Link from 'next/link';
import ReactFlow, {
 Node,
 Edge,
 Controls,
 Background,
 useNodesState,
 useEdgesState,
 addEdge,
 Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { WorkflowNode } from '@/components/workflow-builder/WorkflowNode';
import { WorkflowSidebar } from '@/components/workflow-builder/WorkflowSidebar';
import { WorkflowToolbar } from '@/components/workflow-builder/WorkflowToolbar';

const nodeTypes = {
 workflowNode: WorkflowNode,
};

export default function VisualWorkflowBuilder() {
 const router = useRouter();
 const [nodes, setNodes, onNodesChange] = useNodesState([]);
 const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 const [selectedNode, setSelectedNode] = useState<Node | null>(null);

 const onConnect = useCallback(
  (params: Connection) => {
   const span = monitoringService.startPerformanceSpan('workflow_node_connect');
   try {
    setEdges((eds) => addEdge(params, eds));
    monitoringService.trackEvent('workflow_node_connected', {
     sourceNode: params.source,
     targetNode: params.target,
    });
   } finally {
    span.finish();
   }
  },
  [setEdges]
 );

 const onNodeClick = useCallback(
  (event: React.MouseEvent, node: Node) => {
   const span = monitoringService.startPerformanceSpan('workflow_node_select');
   try {
    setSelectedNode(node);
    monitoringService.trackEvent('workflow_node_selected', {
     nodeId: node.id,
     nodeType: node.type,
    });
   } finally {
    span.finish();
   }
  },
  [setSelectedNode]
 );

 const onSave = async () => {
  const span = monitoringService.startPerformanceSpan('workflow_save');
  try {
   // Convert nodes and edges to workflow steps
   const steps = nodes.map((node) => ({
    id: node.id,
    name: node.data.label,
    type: node.data.type,
    config: node.data.config,
    position: node.position,
   }));

   const workflowData = {
    name: 'New Workflow',
    description: 'Created with Visual Builder',
    type: 'SEQUENTIAL',
    steps,
   };

   const response = await fetch('/api/automation/workflows', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(workflowData),
   });

   if (!response.ok) {
    throw new Error('Failed to save workflow');
   }

   toast.success('Workflow saved successfully');
   monitoringService.trackEvent('workflow_saved', {
    nodeCount: nodes.length,
    edgeCount: edges.length,
   });
   router.push('/dashboard/automation/workflows');
  } catch (error) {
   toast.error('Failed to save workflow');
   monitoringService.captureError(error, {
    component: 'VisualWorkflowBuilder',
    action: 'onSave',
   });
  } finally {
   span.finish();
  }
 };

 return (
  <div className="h-screen flex flex-col">
   <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-4">
     <Link href="/dashboard/automation/workflows">
      <Button variant="ghost" size="icon">
       <ArrowLeft className="h-4 w-4" />
      </Button>
     </Link>
     <h1 className="text-2xl font-bold">Visual Workflow Builder</h1>
    </div>
    <div className="flex items-center space-x-2">
     <Button variant="outline" onClick={onSave}>
      <Save className="mr-2 h-4 w-4" />
      Save
     </Button>
     <Button>
      <Play className="mr-2 h-4 w-4" />
      Run
     </Button>
    </div>
   </div>

   <div className="flex-1 flex">
    <WorkflowSidebar
     onDragStart={(event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
     }}
    />

    <div className="flex-1">
     <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
     >
      <Background />
      <Controls />
     </ReactFlow>
    </div>

    {selectedNode && (
     <WorkflowToolbar
      node={selectedNode}
      onClose={() => setSelectedNode(null)}
      onUpdate={(updatedNode) => {
       setNodes((nds) =>
        nds.map((node) =>
         node.id === updatedNode.id ? updatedNode : node
        )
       );
      }}
     />
    )}
   </div>
  </div>
 );
} 