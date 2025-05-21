'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Cookie, Shield, Settings, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CookiesPage() {
 const [preferences, setPreferences] = useState({
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false
 });

 const cookieTypes = [
  {
   type: "Essential Cookies",
   description: "Required for the website to function properly",
   examples: ["Authentication", "Security", "Basic functionality"],
   required: true
  },
  {
   type: "Analytics Cookies",
   description: "Help us understand how visitors interact with our website",
   examples: ["Page views", "User behavior", "Performance metrics"],
   required: false
  },
  {
   type: "Marketing Cookies",
   description: "Used to deliver personalized advertisements",
   examples: ["Ad targeting", "Campaign tracking", "Social media integration"],
   required: false
  },
  {
   type: "Preference Cookies",
   description: "Remember your settings and preferences",
   examples: ["Language", "Theme", "Layout preferences"],
   required: false
  }
 ];

 const handlePreferenceChange = (type: string) => {
  if (type === 'essential') return; // Essential cookies cannot be disabled
  setPreferences(prev => ({
   ...prev,
   [type]: !prev[type as keyof typeof prev]
  }));
 };

 const savePreferences = () => {
  // Here you would typically save the preferences to cookies/localStorage
  alert('Cookie preferences saved!');
 };

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Cookie Policy
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Learn about how we use cookies and manage your preferences
       </p>
      </div>
     </div>
    </section>

    {/* Cookie Types Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Types of Cookies We Use</h2>
      <div className="grid gap-8 max-w-3xl mx-auto">
       {cookieTypes.map((cookie) => (
        <motion.div
         key={cookie.type}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <div className="flex items-start gap-4">
          <Cookie className="w-8 h-8 text-primary mt-1" />
          <div className="flex-1">
           <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{cookie.type}</h3>
            {cookie.required && (
             <span className="text-sm text-muted-foreground">Required</span>
            )}
           </div>
           <p className="text-muted-foreground mb-4">{cookie.description}</p>
           <div className="space-y-2">
            {cookie.examples.map((example) => (
             <div key={example} className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
              {example}
             </div>
            ))}
           </div>
          </div>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Cookie Preferences Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto">
       <h2 className="text-3xl font-bold text-center mb-12">Cookie Preferences</h2>
       <div className="space-y-6">
        {cookieTypes.map((cookie) => (
         <div key={cookie.type} className="flex items-center justify-between p-4 rounded-lg border bg-card">
          <div>
           <h3 className="font-semibold">{cookie.type}</h3>
           <p className="text-sm text-muted-foreground">{cookie.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
           <input
            type="checkbox"
            className="sr-only peer"
            checked={preferences[cookie.type.toLowerCase().split(' ')[0] as keyof typeof preferences]}
            onChange={() => handlePreferenceChange(cookie.type.toLowerCase().split(' ')[0])}
            disabled={cookie.required}
           />
           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
         </div>
        ))}
        <div className="flex justify-end mt-8">
         <button
          onClick={savePreferences}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
         >
          Save Preferences
          <Settings className="ml-2 w-4 h-4" />
         </button>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* Privacy Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Your Privacy Matters</h2>
       <p className="text-muted-foreground mb-8">
        We are committed to protecting your privacy and providing you with control over your data
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-muted transition-colors">
        Read Privacy Policy
        <Shield className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 