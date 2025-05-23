'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layout,
  Palette,
  Code,
  Globe,
  Settings,
  FileText,
  Zap,
  Upload,
  Plus,
  Search,
  LucideIcon
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';

// TypeScript interfaces
interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface CustomizationOption {
  id: string;
  name: string;
  icon: LucideIcon;
  options: string[];
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onClick: () => void;
}

interface CustomizationOptionProps {
  option: CustomizationOption;
  selectedValue: string;
  onSelect: (value: string) => void;
}

interface MetricsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

// Move static data outside of component
const templates: Template[] = [
  {
    id: 'business',
    name: 'Business',
    description: 'Professional business website with modern design',
    features: ['About Us', 'Services', 'Portfolio', 'Contact Form', 'Blog'],
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Business+Template'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Full-featured online store with product management',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Management', 'Customer Reviews'],
    image: 'https://placehold.co/600x400/16a34a/ffffff?text=E-commerce+Template'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Creative portfolio showcase with gallery',
    features: ['Project Showcase', 'Image Gallery', 'Testimonials', 'Skills Section', 'Contact Form'],
    image: 'https://placehold.co/600x400/9333ea/ffffff?text=Portfolio+Template'
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Content-focused blog with modern layout',
    features: ['Article Management', 'Categories', 'Comments', 'Newsletter', 'Social Sharing'],
    image: 'https://placehold.co/600x400/d97706/ffffff?text=Blog+Template'
  }
];

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

const metrics = {
  totalWebsites: 12,
  activeWebsites: 8,
  templatesUsed: 4,
  storageUsed: '2.5GB'
};

// Create a separate component for the template card
const TemplateCard = ({ template, isSelected, onClick }: TemplateCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`rounded-lg border p-6 cursor-pointer transition-all ${isSelected ? 'border-primary shadow-lg' : 'hover:border-primary/50'
      }`}
    onClick={onClick}
  >
    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
      <Image
        src={template.image}
        alt={template.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
    <p className="text-muted-foreground mb-4">{template.description}</p>
    <ul className="space-y-2">
      {template.features.map((feature) => (
        <li key={feature} className="flex items-center text-sm">
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

// Create a separate component for the customization option
const CustomizationOption = ({ option, selectedValue, onSelect }: CustomizationOptionProps) => (
  <div className="rounded-lg border p-6">
    <div className="flex items-center gap-3 mb-4">
      <option.icon className="w-5 h-5 text-primary" />
      <h3 className="text-lg font-semibold">{option.name}</h3>
    </div>
    <div className="space-y-2">
      {option.options.map((opt) => (
        <button
          key={opt}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedValue === opt
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-muted'
            }`}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// Create a separate component for the metrics card
const MetricsCard = ({ icon: Icon, title, value }: MetricsCardProps) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Main component
export default function WebsiteBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customization, setCustomization] = useState({
    layout: 'Full Width',
    colors: 'Light',
    typography: 'Modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);

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
      // Redirect to the generated website's dashboard
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Presence"
        description="Create and customize your website with our AI-powered builder"
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/website-builder/upload"
          className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Upload className="h-6 w-6 text-primary mr-2" />
          <span>Upload Assets</span>
        </Link>
        <Link
          href="/dashboard/website-builder/create"
          className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Plus className="h-6 w-6 text-primary mr-2" />
          <span>Create New Website</span>
        </Link>
        <Link
          href="/dashboard/website-builder/search"
          className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Search className="h-6 w-6 text-primary mr-2" />
          <span>Browse Templates</span>
        </Link>
      </div>

      {/* Website Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricsCard icon={Globe} title="Total Websites" value={metrics.totalWebsites} />
        <MetricsCard icon={Zap} title="Active Websites" value={metrics.activeWebsites} />
        <MetricsCard icon={Layout} title="Templates Used" value={metrics.templatesUsed} />
        <MetricsCard icon={FileText} title="Storage Used" value={metrics.storageUsed} />
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onClick={() => setSelectedTemplate(template.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Customization Options */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Customize Your Website</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customizationOptions.map((option) => (
              <CustomizationOption
                key={option.id}
                option={option}
                selectedValue={customization[option.id as keyof typeof customization]}
                onSelect={(value) =>
                  setCustomization((prev) => ({
                    ...prev,
                    [option.id]: value
                  }))
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={!selectedTemplate || isGenerating}
          className={`inline-flex items-center px-6 py-3 rounded-lg ${!selectedTemplate || isGenerating
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
            } transition-colors`}
        >
          {isGenerating ? (
            <>
              <Zap className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Website
            </>
          )}
        </button>
      </div>
    </div>
  );
} 