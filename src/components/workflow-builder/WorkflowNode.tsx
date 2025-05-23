import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const WorkflowNode = memo(({ data, isConnectable }: NodeProps) => {
 return (
  <Card className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
   <Handle
    type="target"
    position={Position.Top}
    isConnectable={isConnectable}
   />
   <div className="flex flex-col">
    <div className="flex items-center">
     <Badge variant="outline" className="mr-2">
      {data.type}
     </Badge>
     <div className="font-bold">{data.label}</div>
    </div>
    {data.description && (
     <div className="text-sm text-gray-500">{data.description}</div>
    )}
   </div>
   <Handle
    type="source"
    position={Position.Bottom}
    isConnectable={isConnectable}
   />
  </Card>
 );
}); 