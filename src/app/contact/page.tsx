"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
  console.log(formData);
 };

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Contact Us
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Get in touch with our team
       </p>
      </div>
     </div>
    </section>

    <section className="py-20 bg-background">
     <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
       {/* Contact Information */}
       <div>
        <div className="bg-muted/50 rounded-lg p-8 mb-8">
         <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
         <div className="space-y-6">
          <div className="flex items-start space-x-4">
           <Mail className="w-6 h-6 text-primary mt-1" />
           <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-muted-foreground">support@solara.ai</p>
            <p className="text-muted-foreground">sales@solara.ai</p>
           </div>
          </div>
          <div className="flex items-start space-x-4">
           <Phone className="w-6 h-6 text-primary mt-1" />
           <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
           </div>
          </div>
          <div className="flex items-start space-x-4">
           <MapPin className="w-6 h-6 text-primary mt-1" />
           <div>
            <h3 className="font-semibold mb-1">Office</h3>
            <p className="text-muted-foreground">
             123 Innovation Drive<br />
             San Francisco, CA 94107<br />
             United States
            </p>
           </div>
          </div>
         </div>
        </div>
       </div>

       {/* Contact Form */}
       <div>
        <form onSubmit={handleSubmit} className="space-y-6">
         <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
           Name
          </label>
          <input
           type="text"
           id="name"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           className="w-full px-4 py-2 rounded-lg border bg-background"
           required
          />
         </div>
         <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
           Email
          </label>
          <input
           type="email"
           id="email"
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           className="w-full px-4 py-2 rounded-lg border bg-background"
           required
          />
         </div>
         <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
           Subject
          </label>
          <input
           type="text"
           id="subject"
           value={formData.subject}
           onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
           className="w-full px-4 py-2 rounded-lg border bg-background"
           required
          />
         </div>
         <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
           Message
          </label>
          <textarea
           id="message"
           value={formData.message}
           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
           rows={4}
           className="w-full px-4 py-2 rounded-lg border bg-background"
           required
          />
         </div>
         <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
         >
          Send Message
         </button>
        </form>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 