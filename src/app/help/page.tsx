'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, HelpCircle, MessageSquare, Book, Video, ChevronDown, ChevronUp } from "lucide-react";

const categories = [
 {
  title: 'Getting Started',
  icon: Book,
  faqs: [
   {
    question: 'How do I create an account?',
    answer: 'To create an account, click the "Sign Up" button in the top right corner and follow the registration process. You\'ll need to provide your email address and create a password.',
   },
   {
    question: 'What are the system requirements?',
    answer: 'Solara works on all modern web browsers. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience.',
   },
  ],
 },
 {
  title: 'Account & Billing',
  icon: HelpCircle,
  faqs: [
   {
    question: 'How do I update my billing information?',
    answer: 'You can update your billing information in the Account Settings section. Navigate to Settings > Billing to manage your payment methods and subscription.',
   },
   {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. Go to Settings > Billing and click on "Cancel Subscription". Your access will continue until the end of your current billing period.',
   },
  ],
 },
 {
  title: 'Features & Usage',
  icon: Video,
  faqs: [
   {
    question: 'How do I use the AI features?',
    answer: 'Our AI features are integrated throughout the platform. You can access them through the AI Assistant button in the sidebar or use AI-powered commands in the command palette.',
   },
   {
    question: 'Can I customize my workspace?',
    answer: 'Yes, you can customize your workspace by going to Settings > Workspace. Here you can adjust layouts, themes, and other preferences to match your workflow.',
   },
  ],
 },
];

const guides = [
 {
  title: 'Getting Started Guide',
  description: 'Learn the basics of using Solara',
  icon: Book,
  href: '#',
 },
 {
  title: 'Video Tutorials',
  description: 'Watch step-by-step tutorials',
  icon: Video,
  href: '#',
 },
 {
  title: 'API Documentation',
  description: 'Integrate Solara with your tools',
  icon: MessageSquare,
  href: '#',
 },
];

export default function HelpCenterPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

 const toggleFaq = (categoryIndex: number, faqIndex: number) => {
  const key = `${categoryIndex}-${faqIndex}`;
  setExpandedFaqs(prev => ({
   ...prev,
   [key]: !prev[key],
  }));
 };

 const filteredCategories = categories.map(category => ({
  ...category,
  faqs: category.faqs.filter(faq =>
   faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
   faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ),
 })).filter(category => category.faqs.length > 0);

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Help Center
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Find answers to your questions and learn how to use Solara
       </p>
       <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
         type="text"
         placeholder="Search for help..."
         className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
       </div>
      </div>
     </div>
    </section>

    {/* Quick Guides */}
    <section className="py-12 bg-background">
     <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {guides.map((guide) => (
        <motion.a
         key={guide.title}
         href={guide.href}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
        >
         <guide.icon className="w-8 h-8 text-primary mb-4" />
         <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
         <p className="text-muted-foreground">{guide.description}</p>
        </motion.a>
       ))}
      </div>
     </div>
    </section>

    {/* FAQs */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       {filteredCategories.map((category, categoryIndex) => (
        <div key={category.title} className="mb-12">
         <div className="flex items-center gap-2 mb-6">
          <category.icon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">{category.title}</h2>
         </div>
         <div className="space-y-4">
          {category.faqs.map((faq, faqIndex) => (
           <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border rounded-lg overflow-hidden"
           >
            <button
             onClick={() => toggleFaq(categoryIndex, faqIndex)}
             className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
             <span className="font-medium">{faq.question}</span>
             {expandedFaqs[`${categoryIndex}-${faqIndex}`] ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
             ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
             )}
            </button>
            {expandedFaqs[`${categoryIndex}-${faqIndex}`] && (
             <div className="p-4 bg-muted/50 border-t">
              <p className="text-muted-foreground">{faq.answer}</p>
             </div>
            )}
           </motion.div>
          ))}
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* Contact Support */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
       <p className="text-muted-foreground mb-8">
        Our support team is available 24/7 to assist you
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
         Contact Support
         <MessageSquare className="ml-2 w-4 h-4" />
        </button>
        <button className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-muted transition-colors">
         Schedule a Call
         <Video className="ml-2 w-4 h-4" />
        </button>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 