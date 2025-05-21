import { FileText } from 'lucide-react';

interface ProposalTemplateProps {
 template: {
  id: string;
  title: string;
  description: string;
  sections: string[];
 };
 onSelect: () => void;
}

export function ProposalTemplate({ template, onSelect }: ProposalTemplateProps) {
 return (
  <button
   onClick={onSelect}
   className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 text-left transition-colors"
  >
   <div className="flex items-start gap-3">
    <div className="p-2 bg-primary/10 rounded-lg">
     <FileText className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1">
     <h3 className="font-medium">{template.title}</h3>
     <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
     <div className="flex flex-wrap gap-2 mt-3">
      {template.sections.map((section) => (
       <span
        key={section}
        className="px-2 py-1 bg-muted rounded-md text-xs"
       >
        {section}
       </span>
      ))}
     </div>
    </div>
   </div>
  </button>
 );
} 