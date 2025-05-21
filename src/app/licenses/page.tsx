'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileText, Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LicensesPage() {
 const licenseTypes = [
  {
   title: "Software License",
   description: "Terms and conditions for using Solara's software products",
   features: [
    "Commercial usage rights",
    "Updates and maintenance",
    "Technical support",
    "API access"
   ]
  },
  {
   title: "API License",
   description: "Terms for integrating with Solara's API services",
   features: [
    "API access tokens",
    "Rate limiting",
    "Data usage terms",
    "Integration support"
   ]
  },
  {
   title: "Content License",
   description: "Terms for using Solara's content and resources",
   features: [
    "Documentation usage",
    "Brand assets",
    "Marketing materials",
    "Training resources"
   ]
  }
 ];

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Licenses & Terms
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Understanding our licensing terms and conditions
       </p>
      </div>
     </div>
    </section>

    {/* License Types Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <h2 className="text-3xl font-bold text-center mb-12">License Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {licenseTypes.map((license) => (
        <motion.div
         key={license.title}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="p-6 rounded-lg border bg-card"
        >
         <FileText className="w-12 h-12 text-primary mb-4" />
         <h3 className="text-xl font-semibold mb-2">{license.title}</h3>
         <p className="text-muted-foreground mb-4">{license.description}</p>
         <ul className="space-y-2">
          {license.features.map((feature) => (
           <li key={feature} className="flex items-center text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
            {feature}
           </li>
          ))}
         </ul>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Terms Section */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto">
       <h2 className="text-3xl font-bold text-center mb-12">License Terms</h2>
       <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
         By using Solara's services, you agree to comply with our license terms and conditions.
         These terms outline the permitted uses of our software, API, and content.
        </p>
        <h3>Key Terms</h3>
        <ul>
         <li>License grants are non-transferable</li>
         <li>Usage is subject to fair use policies</li>
         <li>Compliance with applicable laws is required</li>
         <li>Regular updates and maintenance are included</li>
        </ul>
        <h3>Restrictions</h3>
        <ul>
         <li>No reverse engineering of software</li>
         <li>No unauthorized distribution</li>
         <li>No resale without proper licensing</li>
         <li>No modification of source code</li>
        </ul>
       </div>
      </div>
     </div>
    </section>

    {/* Contact Section */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
       <p className="text-muted-foreground mb-8">
        Contact our licensing team for any questions about our terms and conditions
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Contact Licensing Team
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