import { Node } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WorkflowToolbarProps {
 node: Node;
 onClose: () => void;
 onUpdate: (node: Node) => void;
}

export function WorkflowToolbar({
 node,
 onClose,
 onUpdate,
}: WorkflowToolbarProps) {
 const [label, setLabel] = useState(node.data.label);
 const [description, setDescription] = useState(node.data.description || '');

 useEffect(() => {
  setLabel(node.data.label);
  setDescription(node.data.description || '');
 }, [node]);

 const handleSave = () => {
  onUpdate({
   ...node,
   data: {
    ...node.data,
    label,
    description,
   },
  });
 };

 return (
  <Card className="w-80 border-l">
   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Node Properties</CardTitle>
    <Button variant="ghost" size="icon" onClick={onClose}>
     <X className="h-4 w-4" />
    </Button>
   </CardHeader>
   <CardContent className="space-y-4">
    <div className="space-y-2">
     <label className="text-sm font-medium">Label</label>
     <Input
      value={label}
      onChange={(e) => setLabel(e.target.value)}
      placeholder="Enter node label"
     />
    </div>
    <div className="space-y-2">
     <label className="text-sm font-medium">Description</label>
     <Textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter node description"
     />
    </div>
    <Button className="w-full" onClick={handleSave}>
     Save Changes
    </Button>
   </CardContent>
  </Card>
 );
} 