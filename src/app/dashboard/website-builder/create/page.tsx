'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Layout, Palette, FileText, Globe, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomizationOption {
 id: string;
 name: string;
 icon: any;
 options: string[];
}

const customizationOptions: CustomizationOption[] = [
 {
  id: 'layout',
  name: 'Layout',
  icon: Layout,
  options: ['Full Width', 'Boxed', 'Custom']
 },
 {
  id: 'colors',
  name: 'Colors',
  icon: Palette,
  options: ['Light', 'Dark', 'Custom']
 },
 {
  id: 'typography',
  name: 'Typography',
  icon: FileText,
  options: ['Modern', 'Classic', 'Custom']
 }
];

export default function CreateWebsitePage() {
 const searchParams = useSearchParams();
 const templateId = searchParams.get('template');
 const [customization, setCustomization] = useState({
  layout: 'Full Width',
  colors: 'Light',
  typography: 'Modern'
 });
 const [isGenerating, setIsGenerating] = useState(false);
 const [step, setStep] = useState(1);

 useEffect(() => {
  if (!templateId) {
   // Redirect to template selection if no template is selected
   window.location.href = '/dashboard/website-builder/search';
  }
 }, [templateId]);

 const handleGenerate = async () => {
  setIsGenerating(true);
  // Here we would implement the actual website generation logic
  // This could involve:
  // 1. Creating the project structure
  // 2. Generating sample content
  // 3. Setting up the database
  // 4. Configuring the deployment
  setTimeout(() => {
   setIsGenerating(false);
   setStep(3);
  }, 2000);
 };

 if (!templateId) {
  return null; // Will redirect in useEffect
 }

 return (
  <div className="space-y-6">
   <PageHeader
    title="Create Website"
    description="Customize your website settings and generate your site"
   />

   {/* Progress Steps */}
   <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
     {[1, 2, 3].map((stepNumber) => (
      <div
       key={stepNumber}
       className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''
        }`}
      >
       <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= stepNumber
          ? 'bg-primary text-white'
          : 'bg-gray-200 text-gray-600'
         }`}
       >
        {stepNumber}
       </div>
       {stepNumber < 3 && (
        <div
         className={`flex-1 h-1 mx-4 ${step > stepNumber ? 'bg-primary' : 'bg-gray-200'
          }`}
        />
       )}
      </div>
     ))}
    </div>
    <div className="flex justify-between mt-2">
     <span className="text-sm text-gray-600">Customize</span>
     <span className="text-sm text-gray-600">Generate</span>
     <span className="text-sm text-gray-600">Complete</span>
    </div>
   </div>

   {step === 1 && (
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="space-y-6"
    >
     {/* Customization Options */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {customizationOptions.map((option) => (
       <div key={option.id} className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
         <option.icon className="w-5 h-5 text-primary" />
         <h3 className="text-lg font-semibold">{option.name}</h3>
        </div>
        <div className="space-y-2">
         {option.options.map((opt) => (
          <button
           key={opt}
           className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${customization[option.id as keyof typeof customization] === opt
             ? 'bg-primary text-white'
             : 'hover:bg-gray-50'
            }`}
           onClick={() =>
            setCustomization((prev) => ({
             ...prev,
             [option.id]: opt
            }))
           }
          >
           {opt}
          </button>
         ))}
        </div>
       </div>
      ))}
     </div>

     {/* Generate Button */}
     <div className="flex justify-end">
      <button
       onClick={() => setStep(2)}
       className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
      >
       Continue
       <Globe className="ml-2 h-5 w-5" />
      </button>
     </div>
    </motion.div>
   )}

   {step === 2 && (
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="space-y-6"
    >
     {/* Generation Settings */}
     <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Generation Settings</h2>
      <div className="space-y-4">
       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
         <Settings className="w-5 h-5 text-primary" />
         <span>Project Structure</span>
        </div>
        <span className="text-sm text-gray-500">Ready</span>
       </div>
       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
         <FileText className="w-5 h-5 text-primary" />
         <span>Sample Content</span>
        </div>
        <span className="text-sm text-gray-500">Ready</span>
       </div>
       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
         <Layout className="w-5 h-5 text-primary" />
         <span>Layout Configuration</span>
        </div>
        <span className="text-sm text-gray-500">Ready</span>
       </div>
      </div>
     </div>

     {/* Generate Button */}
     <div className="flex justify-end">
      <button
       onClick={handleGenerate}
       disabled={isGenerating}
       className={`inline-flex items-center px-6 py-3 rounded-lg ${isGenerating
         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
         : 'bg-primary text-white hover:bg-primary/90'
        } transition-colors`}
      >
       {isGenerating ? (
        <>
         <Sparkles className="w-5 h-5 mr-2 animate-spin" />
         Generating...
        </>
       ) : (
        <>
         Generate Website
         <Sparkles className="ml-2 h-5 w-5" />
        </>
       )}
      </button>
     </div>
    </motion.div>
   )}

   {step === 3 && (
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="bg-white rounded-lg shadow-sm p-6 text-center"
    >
     <div className="flex flex-col items-center justify-center py-12">
      <Sparkles className="w-16 h-16 text-primary mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Website Generated!</h2>
      <p className="text-gray-600 mb-6">
       Your website has been successfully generated. You can now start
       customizing it further.
      </p>
      <div className="flex gap-4">
       <a
        href="/dashboard/website-builder/preview"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
       >
        Preview Website
       </a>
       <a
        href="/dashboard/website-builder/editor"
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
       >
        Open Editor
       </a>
      </div>
     </div>
    </motion.div>
   )}
  </div>
 );
} 